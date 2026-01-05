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
  // Listen to any collection (Jobs, Admissions, etc.) in real-time
  listenToCollection: (collectionName: string, callback: (data: any[]) => void) => {
    if (!db) return () => {};
    
    const q = query(collection(db, collectionName));
    return onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(items);
    }, (error) => {
      console.error(`Error listening to ${collectionName}:`, error);
      callback([]);
    });
  },

  // Save or Update an item
  saveItem: async (collectionName: string, item: any) => {
    if (!db) return;
    try {
      if (item.id) {
        // Update existing
        const docRef = doc(db, collectionName, String(item.id));
        const { id, ...data } = item;
        await updateDoc(docRef, data);
      } else {
        // Create new
        await addDoc(collection(db, collectionName), {
          ...item,
          createdAt: new Date().toISOString()
        });
      }
      return { success: true };
    } catch (e) {
      console.error("Firebase Save Error:", e);
      return { success: false };
    }
  },

  // Delete an item
  deleteItem: async (collectionName: string, id: string | number) => {
    if (!db) return;
    try {
      await deleteDoc(doc(db, collectionName, String(id)));
    } catch (e) {
      console.error("Firebase Delete Error:", e);
    }
  },

  // Listen to site-wide config (Hero Title, Marquee)
  listenToConfig: (callback: (config: any) => void) => {
    if (!db) return () => {};
    
    const docRef = doc(db, "settings", "siteConfig");
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data());
      } else {
        // Default if not exists
        callback({
          heroTitle: "India’s Largest ITI Students Community",
          heroSubTitle: "Access premium trade theory notes and job alerts.",
          marqueeUpdates: ["Welcome to ITI Tech Hub Cloud!"]
        });
      }
    });
  }
};