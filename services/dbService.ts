
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

const LOCAL_STORAGE_PREFIX = 'iti_hub_';

export const dbService = {
  // Collection Names
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

  // Generic Listener for Real-time Updates
  listenToCollection: (collectionName: string, callback: (data: any[]) => void) => {
    if (!db) {
      // Fallback to LocalStorage events for same-device sync
      const loadLocal = () => {
        const stored = localStorage.getItem(LOCAL_STORAGE_PREFIX + collectionName);
        callback(stored ? JSON.parse(stored) : []);
      };
      loadLocal();
      window.addEventListener('storage', loadLocal);
      return () => window.removeEventListener('storage', loadLocal);
    }

    const q = query(collection(db, collectionName), orderBy('postedDate', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(data);
      // Also sync to local storage for offline use
      localStorage.setItem(LOCAL_STORAGE_PREFIX + collectionName, JSON.stringify(data));
    });
  },

  // Save or Update an item
  saveItem: async (collectionName: string, item: any) => {
    if (!db) {
      const stored = localStorage.getItem(LOCAL_STORAGE_PREFIX + collectionName);
      const data = stored ? JSON.parse(stored) : [];
      const updated = item.id && data.find((i: any) => i.id === item.id)
        ? data.map((i: any) => i.id === item.id ? item : i)
        : [{ ...item, id: Date.now() }, ...data];
      localStorage.setItem(LOCAL_STORAGE_PREFIX + collectionName, JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      return;
    }

    if (item.id && typeof item.id === 'string') {
      const docRef = doc(db, collectionName, item.id);
      await setDoc(docRef, item, { merge: true });
    } else {
      await addDoc(collection(db, collectionName), {
        ...item,
        postedDate: new Date().toISOString()
      });
    }
  },

  // Delete an item
  deleteItem: async (collectionName: string, id: string | number) => {
    if (!db) {
      const stored = localStorage.getItem(LOCAL_STORAGE_PREFIX + collectionName);
      const data = stored ? JSON.parse(stored) : [];
      const updated = data.filter((i: any) => i.id !== id);
      localStorage.setItem(LOCAL_STORAGE_PREFIX + collectionName, JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      return;
    }

    await deleteDoc(doc(db, collectionName, id.toString()));
  },

  // Site Config (Hero/Marquee)
  saveConfig: async (config: any) => {
    if (!db) {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'config', JSON.stringify(config));
      window.dispatchEvent(new Event('storage'));
      return;
    }
    await setDoc(doc(db, 'settings', 'siteConfig'), config);
  },

  listenToConfig: (callback: (config: any) => void) => {
    if (!db) {
      const stored = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'config');
      if (stored) callback(JSON.parse(stored));
      return () => {};
    }
    return onSnapshot(doc(db, 'settings', 'siteConfig'), (snapshot) => {
      if (snapshot.exists()) callback(snapshot.data());
    });
  }
};
