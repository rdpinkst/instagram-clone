import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3ObaBVa1UqRRXr47KdzivxrOsFIY9qaU",
  authDomain: "insta-clone-f3771.firebaseapp.com",
  projectId: "insta-clone-f3771",
  storageBucket: "insta-clone-f3771.appspot.com",
  messagingSenderId: "239707590758",
  appId: "1:239707590758:web:b6af43c8b2129ed8821da7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
