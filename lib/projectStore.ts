import { ProjectItem } from "./types/project";
import { db, isFirebaseConfigured } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const STORAGE_KEY = "muratbas_projects";
const COLLECTION_NAME = "projects";

const DEFAULT_PROJECTS: ProjectItem[] = [];

export function getStoredProjects(): ProjectItem[] {
  if (typeof window === "undefined") return DEFAULT_PROJECTS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_PROJECTS;
    const parsed: ProjectItem[] = JSON.parse(data);
    const filtered = parsed.filter(
      (p) => p.id !== "hotel-management" && p.id !== "time-is-up" && p.id !== "omu-forum"
    );
    if (filtered.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
    return filtered;
  } catch (e) {
    console.error("Failed to read projects from localStorage", e);
    return DEFAULT_PROJECTS;
  }
}

export function saveProjects(projects: ProjectItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error("Failed to save projects to localStorage", e);
  }
}

export function clearAllLocalProjects() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear projects from localStorage", e);
  }
}

export async function getAllProjectsAsync(): Promise<ProjectItem[]> {
  if (db && isFirebaseConfigured) {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        return snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as ProjectItem;
          return {
            ...data,
            id: docSnap.id,
            url: data.url || data.liveUrl || data.githubUrl || "",
          };
        });
      } else {
        return [];
      }
    } catch (err) {
      console.warn("Firestore projects fetch error:", err);
    }
  }
  return getStoredProjects().map((p) => ({
    ...p,
    url: p.url || p.liveUrl || p.githubUrl || "",
  }));
}

export async function saveProjectAsync(
  projectData: Partial<ProjectItem> & { title: string; description: string }
): Promise<ProjectItem> {
  const id = projectData.id || Date.now().toString();
  const finalProject: ProjectItem = {
    id,
    title: projectData.title,
    description: projectData.description,
    image:
      projectData.image ||
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    url: projectData.url || "",
    featured: projectData.featured ?? true,
  };

  // 1. Save to Firestore Cloud Store
  if (db && isFirebaseConfigured) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await setDoc(docRef, finalProject, { merge: true });
    } catch (err) {
      console.error("Error saving project to Firestore:", err);
    }
  }

  // 2. Save to LocalStorage Fallback
  const projects = getStoredProjects();
  const existingIndex = projects.findIndex((p) => p.id === id);
  if (existingIndex >= 0) {
    projects[existingIndex] = finalProject;
  } else {
    projects.unshift(finalProject);
  }
  saveProjects(projects);

  return finalProject;
}

export async function deleteProjectAsync(id: string): Promise<void> {
  if (db && isFirebaseConfigured) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error("Error deleting project from Firestore:", err);
    }
  }

  const projects = getStoredProjects().filter((p) => p.id !== id);
  saveProjects(projects);
}
