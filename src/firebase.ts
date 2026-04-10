import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

function initFirebase(): { app: FirebaseApp; auth: Auth } | null {
  if (!firebaseConfig.apiKey) {
    console.warn(
      "[SmartVision] Firebase is not configured (add VITE_FIREBASE_* to .env). Google login is disabled."
    );
    return null;
  }
  try {
    const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
    return { app, auth: getAuth(app) };
  } catch (e) {
    console.error("[SmartVision] Firebase failed to initialize:", e);
    return null;
  }
}

const fb = initFirebase();
export const auth: Auth | null = fb?.auth ?? null;
export const googleProvider = new GoogleAuthProvider();
