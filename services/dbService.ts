
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
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(items);
    }, (error) => {
      console.error(`Error listening to ${collectionName}:`, error);
      callback([]);
    });
  },

  saveItem: async (collectionName: string, item: any) => {
    if (!db) return;
    try {
      if (item.id) {
        const docRef = doc(db, collectionName, String(item.id));
        const { id, ...data } = item;
        await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
      } else {
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
        callback(docSnap.data());
      } else {
        callback({
          heroTitle: "India’s Largest ITI Students Community",
          heroSubTitle: "Access premium trade theory notes.",
          marqueeUpdates: ["Welcome to ITI Tech Hub Cloud!"],
          primaryColor: "#2563eb"
        });
      }
    });
  },

  // Admin Profile Management
  getAdminProfile: async () => {
    if (!db) return null;
    const docRef = doc(db, "settings", "adminProfile");
    const snap = await getDoc(docRef);
    if (snap.exists()) return snap.data();
    // Default if not set in cloud yet
    return { username: "admin", password: "itiadmin123" };
  },

  saveAdminProfile: async (profile: any) => {
    if (!db) return;
    const docRef = doc(db, "settings", "adminProfile");
    await setDoc(docRef, profile);
  }
};
