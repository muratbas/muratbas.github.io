/* eslint-disable @typescript-eslint/no-explicit-any */

let db: any = null;
let storage: any = null;
let isFirebaseConfigured = false;

try {
  const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const firebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (firebaseApiKey && firebaseProjectId) {
    // Dynamic import safety fallback for build environments
    const { initializeApp, getApps, getApp } = require("firebase/app");
    const { getFirestore } = require("firebase/firestore");
    const { getStorage } = require("firebase/storage");

    const firebaseConfig = {
      apiKey: firebaseApiKey,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: firebaseProjectId,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    isFirebaseConfigured = true;
  }
} catch (e) {
  console.warn("Firebase fallback mode:", e);
}

export { db, storage, isFirebaseConfigured };
