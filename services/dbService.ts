
import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  setDoc,
  enableIndexedDbPersistence
} from "firebase/firestore";

// Global error handler for components to listen to
export const onPermissionError = (callback: (error: boolean) => void) => {
  window.addEventListener('firestore-permission-error', () => callback(true));
};

export const dbService = {
  COLLECTIONS: {
    JOBS: 'jobs',
    EXAMS: 'exams',
    SCHOLARSHIPS: 'scholarships',
    ADMISSIONS: 'admissions',
    HANDWRITTEN: 'handwritten',
    MACHINES: 'machines',
    PYQS: 'pyqs',
    CONFIG: 'config'
  },

  listenToCollection: (collectionName: string, callback: (data: any[]) => void) => {
    if (!db) return () => {};

    try {
      const q = query(collection(db, collectionName));
      return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(data);
      }, (error: any) => {
        console.error(`Firestore Listen Error (${collectionName}):`, error);
        if (error.code === 'permission-denied') {
          window.dispatchEvent(new CustomEvent('firestore-permission-error'));
        }
      });
    } catch (e) {
      console.error("Query Error:", e);
      return () => {};
    }
  },

  saveItem: async (collectionName: string, item: any) => {
    if (!db) {
      alert("Database is initializing. Please wait...");
      return;
    }

    const timestamp = new Date().toISOString();
    try {
      if (item.id && typeof item.id === 'string') {
        const docRef = doc(db, collectionName, item.id);
        await setDoc(docRef, { ...item, updatedAt: timestamp }, { merge: true });
      } else {
        await addDoc(collection(db, collectionName), {
          ...item,
          postedDate: timestamp
        });
      }
    } catch (e: any) {
      console.error("Save Error:", e);
      if (e.code === 'permission-denied') {
        alert("Permission Denied: Ensure Firebase Rules are set to 'allow read, write: if true;'");
      }
    }
  },

  deleteItem: async (collectionName: string, id: string | number) => {
    if (!db) return;
    try {
      await deleteDoc(doc(db, collectionName, id.toString()));
    } catch (e) {
      console.error("Delete Error:", e);
    }
  },

  saveConfig: async (config: any) => {
    if (!db) return;
    try {
      await setDoc(doc(db, 'settings', 'siteConfig'), config);
    } catch (e) {
      console.error("Config Error:", e);
    }
  },

  listenToConfig: (callback: (config: any) => void) => {
    if (!db) return () => {};
    return onSnapshot(doc(db, 'settings', 'siteConfig'), (snapshot) => {
      if (snapshot.exists()) callback(snapshot.data());
    }, (error: any) => {
      if (error.code === 'permission-denied') {
        window.dispatchEvent(new CustomEvent('firestore-permission-error'));
      }
    });
  }
};
