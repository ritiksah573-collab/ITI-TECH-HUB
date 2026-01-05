
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * YOUR REAL CLOUD CONFIG (CONNECTED TO 'itihubtech')
 */
const firebaseConfig = {
  apiKey: "AIzaSyCkPc2YrJ2OVYYC3Qf1pe2eGHaDqTBMEqc",
  authDomain: "itihubtech.firebaseapp.com",
  projectId: "itihubtech",
  storageBucket: "itihubtech.firebasestorage.app",
  messagingSenderId: "257749155856",
  appId: "1:257749155856:web:b74674b5100bb4d1b1ca95"
};

let db: any = null;

try {
    // Initializing with your actual project credentials
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("🚀 ITI Tech Hub Cloud: Connected to itihubtech project.");
} catch (e) {
    console.error("Firebase Connection Error:", e);
}

export { db };
