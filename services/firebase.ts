import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// These values are safe to keep in code for Firestore.
const firebaseConfig = {
  apiKey: "AIzaSyCkPc2YrJ2OVYYC3Qf1pe2eGHaDqTBMEqc",
  authDomain: "itihubtech.firebaseapp.com",
  projectId: "itihubtech",
  storageBucket: "itihubtech.firebasestorage.app",
  messagingSenderId: "257749155856",
  appId: "1:257749155856:web:b74674b5100bb4d1b1ca95"
};

let db: Firestore | null = null;

try {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  console.log("🔥 Firebase Cloud Connected: Vercel Ready");
} catch (error) {
  console.error("Firebase Init Error:", error);
}

export { db };