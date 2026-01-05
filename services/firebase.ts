
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase project config from firebase.google.com
const firebaseConfig = {
  apiKey: "AIzaSyAs-PLACEHOLDER-YOUR-KEY",
  authDomain: "iti-tech-hub.firebaseapp.com",
  projectId: "iti-tech-hub",
  storageBucket: "iti-tech-hub.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghij"
};

// If you don't have a Firebase project yet, the app will fall back to LocalStorage in dbService.ts
let app;
let db: any = null;

try {
    if (firebaseConfig.apiKey !== "AIzaSyAs-PLACEHOLDER-YOUR-KEY") {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
    }
} catch (e) {
    console.error("Firebase Initialization Error:", e);
}

export { db };
