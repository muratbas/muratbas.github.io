"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllPostsAsync } from "@/lib/blogStore";
import { BlogPost } from "@/lib/types/blog";

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllPostsAsync();
        setPosts(data.filter((p) => p.isPublished));
      } catch (err) {
        console.error("Failed to load blog posts:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = posts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div
      className="max-w-7xl mx-auto px-6 sm:px-10 py-8"
      style={{ fontFamily: "var(--font-clash), sans-serif" }}
    >
      {/* Blog Header & Title (Yazılar & Notlar removed) */}
      <div className="border-b border-slate-200 pb-8 mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Murat Baş Blog
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-[#209CEE] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs text-slate-500 font-medium">Yazılar yükleniyor...</p>
        </div>
      ) : posts.length === 0 ? (
        /* Public Clean Empty State */
        <div className="text-center py-20 px-6 bg-slate-50 border border-slate-200/80 rounded-3xl max-w-2xl mx-auto">
          <div className="w-12 h-12 bg-blue-50 text-[#209CEE] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <span className="material-symbols-outlined text-2xl">article</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Henüz Blog Yazısı Yayınlanmadı</h3>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
            Çok yakında yeni yazılar ve teknik notlar burada yer alacaktır.
          </p>
        </div>
      ) : (
        <>
          {/* Featured Post Card */}
          {featuredPost && (
            <article className="mb-14 bg-white border border-slate-200/80 rounded-3xl overflow-hidden hover:border-slate-300 transition-all duration-300 shadow-xs group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-[380px] overflow-hidden bg-slate-100">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-slate-900 text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                        Öne Çıkan
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {featuredPost.createdAt}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500 font-medium">
                        {featuredPost.readingTime}
                      </span>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 group-hover:text-[#209CEE] transition-colors leading-snug">
                        {featuredPost.title}
                      </h2>
                    </Link>
                    <p className="text-slate-600 mt-4 text-sm leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100">
                    <span className="text-xs text-slate-500 font-medium">Murat Baş</span>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="text-xs font-semibold text-slate-900 group-hover:text-[#209CEE] inline-flex items-center gap-1 transition-colors"
                    >
                      Oku
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Grid of Regular Posts */}
          {regularPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col group shadow-xs"
                >
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <span>{post.createdAt}</span>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#209CEE] transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-slate-600 text-xs sm:text-sm mt-3 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Murat Baş</span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-semibold text-slate-900 group-hover:text-[#209CEE] inline-flex items-center gap-1 transition-colors"
                      >
                        Oku
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
