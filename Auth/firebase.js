import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBraf4BoyQ7e31UXrUGDqoOfmUn2kB1LX4",
  authDomain: "crafttell-7ca96.firebaseapp.com",
  databaseURL: "https://crafttell-7ca96-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crafttell-7ca96",
  storageBucket: "crafttell-7ca96.appspot.com",
  messagingSenderId: "455556265744",
  appId: "1:455556265744:web:76d91f51854ede5ad4d795",
  measurementId: "G-XEZWJH4GFP"
};

const app = initializeApp(firebaseConfig);

// Services
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };