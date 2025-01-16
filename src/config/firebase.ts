import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyBXFXP1PIhC70UNR41PJ7BZHXDN4O4zk-E",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "resume-analyzer-c6519.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "resume-analyzer-c6519",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "resume-analyzer-c6519.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "766502598046",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:766502598046:web:de96764e53f71bc740d28f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);