
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkPc2YrJ2OVYYC3Qf1pe2eGHaDqTBMEqc",
  authDomain: "itihubtech.firebaseapp.com",
  projectId: "itihubtech",
  storageBucket: "itihubtech.firebasestorage.app",
  messagingSenderId: "257749155856",
  appId: "1:257749155856:web:b74674b5100bb4d1b1ca95"
};

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

console.log("🚀 Firebase Cloud Status: Online & Connected");

export { db };
