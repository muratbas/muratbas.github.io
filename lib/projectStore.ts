import { ProjectItem } from "./types/project";
import { siteConfig } from "@/data/siteData";
import { db, isFirebaseConfigured } from "./firebase";

const STORAGE_KEY = "muratbas_projects";
const COLLECTION_NAME = "projects";

// Initial seed projects from siteConfig (without tags)
const DEFAULT_PROJECTS: ProjectItem[] = siteConfig.projects.map((p) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  image: p.image,
  liveUrl: p.link,
  featured: true,
}));

export function getStoredProjects(): ProjectItem[] {
  if (typeof window === "undefined") return DEFAULT_PROJECTS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      return DEFAULT_PROJECTS;
    }
    return JSON.parse(data);
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

export async function getAllProjectsAsync(): Promise<ProjectItem[]> {
  if (db && isFirebaseConfigured) {
    try {
      const { collection, getDocs } = require("firebase/firestore");
      const colRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        return snapshot.docs.map((docSnap: any) => ({
          ...(docSnap.data() as ProjectItem),
          id: docSnap.id,
        }));
      }
    } catch (err) {
      console.warn("Firestore projects fetch error, using local fallback:", err);
    }
  }
  return getStoredProjects();
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
    githubUrl: projectData.githubUrl || "",
    liveUrl: projectData.liveUrl || "#",
    featured: projectData.featured ?? true,
  };

  if (db && isFirebaseConfigured) {
    try {
      const { doc, setDoc } = require("firebase/firestore");
      const docRef = doc(db, COLLECTION_NAME, id);
      await setDoc(docRef, finalProject, { merge: true });
    } catch (err) {
      console.error("Error saving project to Firestore:", err);
    }
  }

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
      const { doc, deleteDoc } = require("firebase/firestore");
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error("Error deleting project from Firestore:", err);
    }
  }

  const projects = getStoredProjects().filter((p) => p.id !== id);
  saveProjects(projects);
}
