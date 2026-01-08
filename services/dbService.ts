
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  setDoc,
  getDoc
} from "firebase/firestore";
import { db } from "./firebase";

export const dbService = {
  listenToCollection: (collectionName: string, callback: (data: any[]) => void) => {
    if (!db) return () => {};
    
    // Attempting a sorted query
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
    
    return onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(items);
    }, (error) => {
      console.error(`Error listening to ${collectionName}:`, error);
      // Fallback: If orderBy fails (e.g. missing index or missing fields), try simple fetch
      const fallbackQ = query(collection(db, collectionName));
      onSnapshot(fallbackQ, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Manual sort as fallback
        items.sort((a: any, b: any) => {
          const dateA = a.createdAt || a.updatedAt || "";
          const dateB = b.createdAt || b.updatedAt || "";
          return dateB.localeCompare(dateA);
        });
        callback(items);
      });
    });
  },

  saveItem: async (collectionName: string, item: any) => {
    if (!db) return;
    try {
      const timestamp = new Date().toISOString();
      if (item.id) {
        const docRef = doc(db, collectionName, String(item.id));
        const { id, ...data } = item;
        // Ensure createdAt is NEVER lost during updates
        await setDoc(docRef, { 
          ...data, 
          updatedAt: timestamp,
          createdAt: data.createdAt || timestamp // Fallback if somehow missing
        }, { merge: true });
      } else {
        await addDoc(collection(db, collectionName), {
          ...item,
          createdAt: timestamp,
          updatedAt: timestamp
        });
      }
      return { success: true };
    } catch (e) {
      console.error("Firebase Save Error:", e);
      return { success: false };
    }
  },

  deleteItem: async (collectionName: string, id: string | number) => {
    if (!db) return;
    try {
      await deleteDoc(doc(db, collectionName, String(id)));
    } catch (e) {
      console.error("Firebase Delete Error:", e);
    }
  },

  listenToConfig: (callback: (config: any) => void) => {
    if (!db) return () => {};
    const docRef = doc(db, "settings", "siteConfig");
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback({ id: 'siteConfig', ...docSnap.data() });
      } else {
        callback({
          id: 'siteConfig',
          siteName: "ITI Tech Hub",
          heroTitle: "India’s Largest ITI Students Community",
          heroSubTitle: "Access premium trade theory notes.",
          marqueeUpdates: ["Welcome to ITI Tech Hub Cloud!"],
          primaryColor: "#2563eb"
        });
      }
    });
  },

  getAdminProfile: async () => {
    if (!db) return null;
    const docRef = doc(db, "settings", "adminProfile");
    const snap = await getDoc(docRef);
    if (snap.exists()) return snap.data();
    return { username: "admin", password: "itiadmin123" };
  },

  saveAdminProfile: async (profile: any) => {
    if (!db) return;
    const docRef = doc(db, "settings", "adminProfile");
    await setDoc(docRef, profile, { merge: true });
  }
};
