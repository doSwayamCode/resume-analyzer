import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBXFXP1PIhC70UNR41PJ7BZHXDN4O4zk-E",
  authDomain: "resume-analyzer-c6519.firebaseapp.com",
  projectId: "resume-analyzer-c6519",
  storageBucket: "resume-analyzer-c6519.firebasestorage.app",
  messagingSenderId: "766502598046",
  appId: "1:766502598046:web:de96764e53f71bc740d28f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);