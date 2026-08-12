import { BlogPost } from "./types/blog";
import { db, isFirebaseConfigured } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const STORAGE_KEY = "muratbas_blog_posts";
const COLLECTION_NAME = "blog_posts";

// ----------------------------------------------------
// LOCAL STORAGE FALLBACK FUNCTIONS
// ----------------------------------------------------
export function getStoredPosts(): BlogPost[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed: BlogPost[] = JSON.parse(data);
    const filtered = parsed.filter((p) => p.id !== "1" && p.id !== "2" && p.id !== "3");
    if (filtered.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
    return filtered;
  } catch (e) {
    console.error("Failed to read posts from localStorage", e);
    return [];
  }
}

export function savePosts(posts: BlogPost[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error("Failed to save posts to localStorage", e);
  }
}

export function clearAllLocalPosts() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear localStorage", e);
  }
}

// ----------------------------------------------------
// FIREBASE FIRESTORE CLOUD STORE FUNCTIONS
// ----------------------------------------------------

/**
 * Fetch all posts from Firebase Firestore (or fallback to LocalStorage)
 */
export async function getAllPostsAsync(): Promise<BlogPost[]> {
  if (db && isFirebaseConfigured) {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        const firestorePosts: BlogPost[] = snapshot.docs.map((docSnap) => ({
          ...(docSnap.data() as BlogPost),
          id: docSnap.id,
        }));
        return firestorePosts;
      } else {
        return [];
      }
    } catch (err) {
      console.warn("Firestore posts fetch warning, falling back to LocalStorage:", err);
    }
  }
  return getStoredPosts();
}

/**
 * Fetch single post by slug from Firebase Firestore (or fallback)
 */
export async function getPostBySlugAsync(slug: string): Promise<BlogPost | undefined> {
  if (db && isFirebaseConfigured) {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = query(colRef, where("slug", "==", slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        return {
          ...(docSnap.data() as BlogPost),
          id: docSnap.id,
        };
      }
    } catch (err) {
      console.warn("Firestore slug fetch warning:", err);
    }
  }
  return getStoredPosts().find((p) => p.slug === slug);
}

/**
 * Save or update post in Firebase Firestore and sync LocalStorage
 */
export async function savePostAsync(
  postData: Partial<BlogPost> & { title: string; content: string }
): Promise<BlogPost> {
  const now = new Date().toISOString().split("T")[0];
  const slug =
    postData.slug ||
    postData.title
      .toLowerCase()
      .replace(/[^a-z0-9-çğıöşü]/g, "-")
      .replace(/-+/g, "-");

  const wordCount = postData.content.trim().split(/\s+/).length;
  const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} dk okuma`;
  const id = postData.id || Date.now().toString();

  const finalPost: BlogPost = {
    id,
    title: postData.title,
    slug,
    excerpt: postData.excerpt || postData.content.substring(0, 150) + "...",
    content: postData.content,
    coverImage:
      postData.coverImage ||
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    createdAt: postData.createdAt || now,
    updatedAt: now,
    readingTime,
    isPublished: postData.isPublished ?? true,
    featured: postData.featured ?? false,
  };

  // 1. Sync to Firebase Firestore if connected
  if (db && isFirebaseConfigured) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await setDoc(docRef, finalPost, { merge: true });
      console.log("Successfully saved post to Firestore:", id);
    } catch (err) {
      console.error("Error saving post to Firestore:", err);
    }
  }

  // 2. Sync to LocalStorage fallback
  const posts = getStoredPosts();
  const existingIndex = posts.findIndex((p) => p.id === id || p.slug === slug);
  if (existingIndex >= 0) {
    posts[existingIndex] = finalPost;
  } else {
    posts.unshift(finalPost);
  }
  savePosts(posts);

  return finalPost;
}

/**
 * Delete post from Firebase Firestore and LocalStorage
 */
export async function deletePostAsync(id: string): Promise<void> {
  if (db && isFirebaseConfigured) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error("Error deleting post from Firestore:", err);
    }
  }

  const posts = getStoredPosts().filter((p) => p.id !== id);
  savePosts(posts);
}

// Synchronous legacy wrappers for backwards compatibility
export function getPostBySlug(slug: string): BlogPost | undefined {
  return getStoredPosts().find((p) => p.slug === slug);
}

export function createOrUpdatePost(postData: Partial<BlogPost> & { title: string; content: string }): BlogPost {
  const posts = getStoredPosts();
  const now = new Date().toISOString().split("T")[0];
  const slug = postData.slug || postData.title.toLowerCase().replace(/[^a-z0-9-çğıöşü]/g, "-").replace(/-+/g, "-");
  const id = postData.id || Date.now().toString();

  const existingIndex = posts.findIndex((p) => p.id === id || p.slug === slug);
  const wordCount = postData.content.trim().split(/\s+/).length;
  const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} dk okuma`;

  const updatedPost: BlogPost = {
    id,
    title: postData.title,
    slug,
    excerpt: postData.excerpt || postData.content.substring(0, 150) + "...",
    content: postData.content,
    coverImage: postData.coverImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    createdAt: postData.createdAt || now,
    updatedAt: now,
    readingTime,
    isPublished: postData.isPublished ?? true,
    featured: postData.featured ?? false,
  };

  if (existingIndex >= 0) {
    posts[existingIndex] = updatedPost;
  } else {
    posts.unshift(updatedPost);
  }
  savePosts(posts);

  if (db && isFirebaseConfigured) {
    savePostAsync(updatedPost).catch(console.error);
  }

  return updatedPost;
}

export function deletePost(id: string) {
  const posts = getStoredPosts().filter((p) => p.id !== id);
  savePosts(posts);
  if (db && isFirebaseConfigured) {
    deletePostAsync(id).catch(console.error);
  }
}
