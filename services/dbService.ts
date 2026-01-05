
import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  setDoc
} from "firebase/firestore";

const LOCAL_STORAGE_PREFIX = 'iti_hub_cloud_fallback_';

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
    if (!db) {
      const loadLocal = () => {
        const stored = localStorage.getItem(LOCAL_STORAGE_PREFIX + collectionName);
        callback(stored ? JSON.parse(stored) : []);
      };
      loadLocal();
      window.addEventListener('storage', loadLocal);
      return () => window.removeEventListener('storage', loadLocal);
    }

    try {
      const q = query(collection(db, collectionName));
      return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(data);
        localStorage.setItem(LOCAL_STORAGE_PREFIX + collectionName, JSON.stringify(data));
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
    const timestamp = new Date().toISOString();
    
    if (!db) {
      const stored = localStorage.getItem(LOCAL_STORAGE_PREFIX + collectionName);
      const data = stored ? JSON.parse(stored) : [];
      const newItem = { ...item, id: item.id || Date.now(), postedDate: item.postedDate || timestamp };
      const updated = item.id && data.find((i: any) => i.id === item.id)
        ? data.map((i: any) => i.id === item.id ? newItem : i)
        : [newItem, ...data];
      localStorage.setItem(LOCAL_STORAGE_PREFIX + collectionName, JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      return;
    }

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
      console.error("Firestore Save Error:", e);
      if (e.code === 'permission-denied') {
        alert("Permission Denied: Go to Firebase Console > Firestore > Rules and set 'allow read, write: if true;'");
      } else {
        alert("Error saving to cloud. Check console for details.");
      }
    }
  },

  deleteItem: async (collectionName: string, id: string | number) => {
    if (!db) {
      const stored = localStorage.getItem(LOCAL_STORAGE_PREFIX + collectionName);
      const data = stored ? JSON.parse(stored) : [];
      const updated = data.filter((i: any) => i.id !== id);
      localStorage.setItem(LOCAL_STORAGE_PREFIX + collectionName, JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      return;
    }

    try {
      await deleteDoc(doc(db, collectionName, id.toString()));
    } catch (e) {
      console.error("Firestore Delete Error:", e);
    }
  },

  saveConfig: async (config: any) => {
    if (!db) {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'config', JSON.stringify(config));
      window.dispatchEvent(new Event('storage'));
      return;
    }
    try {
      await setDoc(doc(db, 'settings', 'siteConfig'), config);
    } catch (e) {
      console.error("Config Save Error:", e);
    }
  },

  listenToConfig: (callback: (config: any) => void) => {
    if (!db) {
      const stored = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'config');
      if (stored) callback(JSON.parse(stored));
      return () => {};
    }
    return onSnapshot(doc(db, 'settings', 'siteConfig'), (snapshot) => {
      if (snapshot.exists()) callback(snapshot.data());
    }, (error: any) => {
      if (error.code === 'permission-denied') {
        window.dispatchEvent(new CustomEvent('firestore-permission-error'));
      }
    });
  }
};
