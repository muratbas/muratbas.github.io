"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllPostsAsync, savePostAsync, deletePostAsync } from "@/lib/blogStore";
import { getAllProjectsAsync, saveProjectAsync, deleteProjectAsync } from "@/lib/projectStore";
import { BlogPost } from "@/lib/types/blog";
import { ProjectItem } from "@/lib/types/project";
import { storage, isFirebaseConfigured } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Client-side image compressor (resizes photos to max 1200px and 80% JPEG quality)
const compressImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8);
          resolve(compressedDataUrl);
        } else {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"blog" | "projects">("blog");

  // Blog Posts State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  // Projects State
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);

  // Upload States
  const [uploadMessage, setUploadMessage] = useState("");

  const EXPECTED_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "9GdHjSiL";

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("muratbas_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  const loadAllData = async () => {
    loadPosts();
    loadProjects();
  };

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

  const loadProjects = async () => {
    setLoadingProjects(true);
    try {
      const data = await getAllProjectsAsync();
      setProjects(data);
    } catch (err) {
      console.error("Error loading projects:", err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === EXPECTED_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("muratbas_admin_auth", "true");
      setAuthError("");
      loadAllData();
    } else {
      setAuthError("Hatalı şifre! Lütfen şifrenizi kontrol edin.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("muratbas_admin_auth");
  };

  // Blog Post Handlers
  const handleOpenCreatePost = () => {
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

  const handleDeletePost = async (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    await deletePostAsync(id);
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

  // Project Handlers
  const handleOpenCreateProject = () => {
    setEditingProject({
      title: "",
      description: "",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "",
      liveUrl: "#",
      featured: true,
    });
  };

  const handleDeleteProject = async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    await deleteProjectAsync(id);
    loadProjects();
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.description) return;

    await saveProjectAsync({
      ...editingProject,
      title: editingProject.title,
      description: editingProject.description,
    });

    setEditingProject(null);
    loadProjects();
  };

  // Helper image upload handler with fallback & client-side compression
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadMessage("Görsel işleniyor...");

    try {
      // 1. Compress image to a clean Data URL first
      const compressedUrl = await compressImageFile(file);

      // 2. Try Firebase Storage upload if configured
      if (storage && isFirebaseConfigured) {
        try {
          setUploadMessage("Firebase Storage'a yükleniyor...");
          const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
          const storageRef = ref(storage, `uploads/${Date.now()}_${cleanFileName}`);
          await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(storageRef);
          onComplete(downloadUrl);
          setUploadMessage("Görsel Firebase Storage'a başarıyla yüklendi!");
          return;
        } catch (storageErr) {
          console.warn("Firebase Storage izni/bağlantısı yok. Optimize görsel Data URL olarak kaydediliyor:", storageErr);
        }
      }

      // 3. Fallback to optimized compressed Data URL
      onComplete(compressedUrl);
      setUploadMessage("Görsel optimize edilip yüklendi!");
    } catch (err) {
      console.error("Image upload error:", err);
      setUploadMessage("Görsel işleme hatası oluştu.");
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
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              Ana Sayfa
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Yönetim Paneli</h1>
          <p className="text-slate-600 text-xs mt-1 mb-6">
            Blog ve Proje yönetimi için şifrenizi girin.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Yönetici Şifresi
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
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

  // 2. Project Editor Form
  if (editingProject) {
    return (
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {editingProject.id ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Proje başlığı, açıklaması, görseli ve bağlantıları.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditingProject(null)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-4 py-2 rounded-full"
            >
              İptal Et
            </button>
          </div>
        </div>

        <form onSubmit={handleSaveProject} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Proje Başlığı *
            </label>
            <input
              type="text"
              value={editingProject.title || ""}
              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
              placeholder="Örn: Hotel Management System"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#209CEE]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Proje Açıklaması *
            </label>
            <textarea
              rows={4}
              value={editingProject.description || ""}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              placeholder="Projenin detaylı açıklaması..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#209CEE]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Proje Görsel URL'si
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={editingProject.image || ""}
                onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                placeholder="https://..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#209CEE]"
              />
              <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">upload_file</span>
                Yükle
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, (url) => setEditingProject({ ...editingProject, image: url }))
                  }
                  className="hidden"
                />
              </label>
            </div>
            {uploadMessage && <p className="text-xs text-[#209CEE] mt-1.5 font-medium">{uploadMessage}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                GitHub Bağlantısı (URL)
              </label>
              <input
                type="text"
                value={editingProject.githubUrl || ""}
                onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                placeholder="https://github.com/muratbas/repo"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#209CEE]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Canlı Demo Bağlantısı (URL)
              </label>
              <input
                type="text"
                value={editingProject.liveUrl || ""}
                onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                placeholder="https://proje.com"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#209CEE]"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-full"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-full transition-all hover:scale-105"
            >
              Projeyi Kaydet
            </button>
          </div>
        </form>
      </div>
    );
  }

  // 3. Blog Post Editor Form
  if (editingPost) {
    return (
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {editingPost.id ? "Yazıyı Düzenle" : "Yeni Blog Yazısı Oluştur"}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Yazı başlığı, özet, kapak görseli ve içerik.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditingPost(null)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-4 py-2 rounded-full"
            >
              İptal Et
            </button>
          </div>
        </div>

        <form onSubmit={handleSavePost} className="space-y-6">
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
                URL Slug
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

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Kapak Görseli (URL)
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
                Yükle
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, (url) => setEditingPost({ ...editingPost, coverImage: url }))
                  }
                  className="hidden"
                />
              </label>
            </div>
            {uploadMessage && <p className="text-xs text-[#209CEE] mt-1.5 font-medium">{uploadMessage}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Kısa Özet (Excerpt)
            </label>
            <textarea
              rows={2}
              value={editingPost.excerpt || ""}
              onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
              placeholder="Yazı özet..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#209CEE]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Yazı İçeriği *
            </label>
            <textarea
              rows={12}
              value={editingPost.content || ""}
              onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              placeholder="Yazı içeriğinizi girin..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-[#209CEE]"
              required
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingPost(null)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-full"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-full transition-all hover:scale-105"
            >
              Yazıyı Kaydet
            </button>
          </div>
        </form>
      </div>
    );
  }

  // 4. Main Dashboard with Tabs
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Yönetim Paneli</h1>
          <p className="text-xs text-slate-500 mt-1">
            Blog yazılarını ve portföy projelerinizi buradan yönetin.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-full transition-all hover:scale-105 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            Ana Sayfa
          </Link>

          {activeTab === "blog" ? (
            <button
              onClick={handleOpenCreatePost}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-5 py-2.5 rounded-full transition-all hover:scale-105 flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Yeni Blog Yazısı
            </button>
          ) : (
            <button
              onClick={handleOpenCreateProject}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-5 py-2.5 rounded-full transition-all hover:scale-105 flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Yeni Proje Ekle
            </button>
          )}

          <button
            onClick={handleLogout}
            className="text-xs font-semibold text-slate-600 hover:text-red-600 bg-slate-100 px-4 py-2.5 rounded-full transition-colors"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
        <button
          onClick={() => setActiveTab("blog")}
          className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === "blog"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Blog Yazıları ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === "projects"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Projeler ({projects.length})
        </button>
      </div>

      {/* Tab Content: Blog Posts */}
      {activeTab === "blog" && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          {loadingPosts ? (
            <div className="text-center py-12">
              <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs text-slate-500">Blog yazıları yükleniyor...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 px-4">
              <p className="text-sm font-medium text-slate-600 mb-3">Kayıtlı blog yazısı bulunmamaktadır.</p>
              <button
                onClick={handleOpenCreatePost}
                className="bg-slate-900 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-slate-800 transition-colors"
              >
                + İlk Blog Yazısını Ekle
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
                        <button
                          onClick={() => setEditingPost(post)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                          title="Düzenle"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
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
      )}

      {/* Tab Content: Projects */}
      {activeTab === "projects" && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          {loadingProjects ? (
            <div className="text-center py-12">
              <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs text-slate-500">Projeler yükleniyor...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 px-4">
              <p className="text-sm font-medium text-slate-600 mb-3">Kayıtlı proje bulunmamaktadır.</p>
              <button
                onClick={handleOpenCreateProject}
                className="bg-slate-900 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-slate-800 transition-colors"
              >
                + İlk Projeyi Ekle
              </button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">Proje Başlığı</th>
                  <th className="py-4 px-4">Açıklama</th>
                  <th className="py-4 px-6 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden relative bg-slate-100 flex-shrink-0 border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="line-clamp-1">{project.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      <p className="line-clamp-1 max-w-md">{project.description}</p>
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                          title="Düzenle"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
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
      )}
    </div>
  );
}
