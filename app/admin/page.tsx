"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllPostsAsync, savePostAsync, deletePostAsync, clearAllLocalPosts } from "@/lib/blogStore";
import { BlogPost } from "@/lib/types/blog";
import { storage } from "@/lib/firebase";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  // Target admin password (defaults to "123" if env not set)
  const EXPECTED_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "123";

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("muratbas_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      loadPosts();
    }
  }, []);

  const loadPosts = async () => {
    setLoadingPosts(true);
    try {
      const data = await getAllPostsAsync();
      setPosts(data);
    } catch (err) {
      console.error("Error loading posts:", err);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === EXPECTED_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("muratbas_admin_auth", "true");
      setAuthError("");
      loadPosts();
    } else {
      setAuthError("Hatalı şifre! (Varsayılan şifre: 123)");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("muratbas_admin_auth");
  };

  const handleOpenCreate = () => {
    setEditingPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
      isPublished: true,
      featured: false,
    });
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost({ ...post });
  };

  const handleDelete = async (id: string) => {
    // Instant UI state update
    setPosts((prev) => prev.filter((p) => p.id !== id));
    await deletePostAsync(id);
    loadPosts();
  };

  const handleClearAll = async () => {
    clearAllLocalPosts();
    setPosts([]);
    loadPosts();
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost?.title || !editingPost?.content) return;

    await savePostAsync({
      ...editingPost,
      title: editingPost.title,
      content: editingPost.content,
    });

    setEditingPost(null);
    loadPosts();
  };

  // Insert helper snippets into content editor
  const insertContentSnippet = (prefix: string, suffix: string = "") => {
    if (!editingPost) return;
    const current = editingPost.content || "";
    setEditingPost({
      ...editingPost,
      content: current + `\n${prefix}Örnek Metin${suffix}\n`,
    });
  };

  // Safe Image Upload (Firebase Storage when connected, or FileReader Base64 fallback)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingPost) return;

    setIsUploading(true);
    setUploadMessage("Görsel yükleniyor...");

    try {
      if (storage) {
        const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
        const storageRef = ref(storage, `blog_images/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        setEditingPost({ ...editingPost, coverImage: downloadUrl });
        setUploadMessage("Görsel Firebase Storage'a yüklendi!");
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setEditingPost({ ...editingPost, coverImage: event.target.result as string });
            setUploadMessage("Görsel yüklendi.");
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error(err);
      setUploadMessage("Yükleme hatası oluştu.");
    } finally {
      setIsUploading(false);
    }
  };

  // 1. Password Login View
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 px-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">lock</span>
            </div>
            {/* Ana Sayfa Button */}
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              Ana Sayfa
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Blog Yönetim Paneli</h1>
          <p className="text-slate-600 text-xs mt-1 mb-6">
            Yönetici girişi için şifrenizi girin.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Yönetici Şifresi (Varsayılan: 123)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="123"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#209CEE] focus:bg-white transition-colors"
                required
              />
            </div>

            {authError && (
              <p className="text-xs text-red-600 font-medium">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm py-2.5 rounded-xl transition-all hover:scale-[1.02]"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Post Editor Modal/View
  if (editingPost) {
    return (
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {editingPost.id ? "Yazıyı Düzenle" : "Yeni Blog Yazısı Oluştur"}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Yazı başlığı, özet, kapak görseli ve zengin içerik metni.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              Ana Sayfa
            </Link>
            <button
              onClick={() => setEditingPost(null)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-4 py-2 rounded-full"
            >
              İptal Et
            </button>
          </div>
        </div>

        <form onSubmit={handleSavePost} className="space-y-6">
          {/* Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Yazı Başlığı *
              </label>
              <input
                type="text"
                value={editingPost.title || ""}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                placeholder="Örn: Next.js 15 Gelişmeleri"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#209CEE]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                URL Slug (İsteğe Bağlı)
              </label>
              <input
                type="text"
                value={editingPost.slug || ""}
                onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                placeholder="otomatik-olusturulur"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#209CEE]"
              />
            </div>
          </div>

          {/* Cover Image & File Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Kapak Görseli Bağlantısı (URL)
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={editingPost.coverImage || ""}
                onChange={(e) => setEditingPost({ ...editingPost, coverImage: e.target.value })}
                placeholder="https://..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#209CEE]"
              />
              <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">upload_file</span>
                Görsel Yükle
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            {uploadMessage && <p className="text-xs text-[#209CEE] mt-1.5 font-medium">{uploadMessage}</p>}
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Kısa Özet (Excerpt)
            </label>
            <textarea
              rows={2}
              value={editingPost.excerpt || ""}
              onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
              placeholder="Yazı kartlarında görünecek kısa özet..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#209CEE]"
            />
          </div>

          {/* Content Editor Toolbar & Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
              <label className="text-xs font-semibold text-slate-700">
                Yazı İçeriği (Markdown / Metin) *
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => insertContentSnippet("## ")}
                  className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded font-medium"
                >
                  + Başlık
                </button>
                <button
                  type="button"
                  onClick={() => insertContentSnippet("[Bağlantı Metni](https://link.com)")}
                  className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded font-medium"
                >
                  + Link
                </button>
                <button
                  type="button"
                  onClick={() => insertContentSnippet("![Açıklama](https://gorsel-linki.com)")}
                  className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded font-medium"
                >
                  + Görsel
                </button>
                <button
                  type="button"
                  onClick={() => insertContentSnippet("> ")}
                  className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded font-medium"
                >
                  + Alıntı
                </button>
                <button
                  type="button"
                  onClick={() => insertContentSnippet("```typescript\n// kod\n```")}
                  className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded font-medium"
                >
                  + Kod
                </button>
              </div>
            </div>
            <textarea
              rows={12}
              value={editingPost.content || ""}
              onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              placeholder="Yazı içeriğinizi girin..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-[#209CEE]"
              required
            />
          </div>

          {/* Options */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={editingPost.isPublished ?? true}
                onChange={(e) => setEditingPost({ ...editingPost, isPublished: e.target.checked })}
                className="w-4 h-4 rounded text-[#209CEE]"
              />
              Yayınla
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={editingPost.featured ?? false}
                onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                className="w-4 h-4 rounded text-[#209CEE]"
              />
              Öne Çıkan Yap
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingPost(null)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-full transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-full transition-all hover:scale-105 shadow-xs"
            >
              Yazıyı Kaydet
            </button>
          </div>
        </form>
      </div>
    );
  }

  // 3. Posts Overview Table / Dashboard View
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Blog Yönetim Paneli</h1>
          <p className="text-xs text-slate-500 mt-1">
            Yazılarınızı yönetin, düzenleyin veya yeni makale ekleyin.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Ana Sayfa Button */}
          <Link
            href="/"
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-full transition-all hover:scale-105 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            Ana Sayfa
          </Link>
          {posts.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-red-600 hover:bg-red-50 bg-slate-100 px-4 py-2.5 rounded-full transition-colors"
            >
              Hepsini Temizle
            </button>
          )}
          <button
            onClick={handleOpenCreate}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-xs flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Yeni Yazı Ekle
          </button>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold text-slate-600 hover:text-red-600 bg-slate-100 px-4 py-2.5 rounded-full transition-colors"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        {loadingPosts ? (
          <div className="text-center py-12">
            <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs text-slate-500">Yazılar yükleniyor...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-sm font-medium text-slate-600 mb-3">Kayıtlı yazı bulunmamaktadır.</p>
            <button
              onClick={handleOpenCreate}
              className="bg-slate-900 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-slate-800 transition-colors"
            >
              + İlk Yazıyı Ekle
            </button>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Başlık</th>
                <th className="py-4 px-4">Tarih</th>
                <th className="py-4 px-4">Durum</th>
                <th className="py-4 px-6 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">
                    <div className="flex items-center gap-2">
                      {post.featured && (
                        <span className="bg-blue-100 text-[#209CEE] text-[10px] font-bold px-2 py-0.5 rounded">
                          ÖNE ÇIKAN
                        </span>
                      )}
                      <span className="line-clamp-1">{post.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-500 whitespace-nowrap">{post.createdAt}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {post.isPublished ? (
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                        Yayında
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full">
                        Taslak
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-1.5 text-slate-500 hover:text-[#209CEE] transition-colors"
                        title="Görüntüle"
                      >
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                        title="Düzenle"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 text-slate-500 hover:text-red-600 transition-colors"
                        title="Sil"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
