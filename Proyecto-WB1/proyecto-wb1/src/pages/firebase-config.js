// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcJgJKBqFF2kAwmaVmHCaGUZhs9qAT2X8",
  authDomain: "proyecto-fe6e8.firebaseapp.com",
  projectId: "proyecto-fe6e8",
  storageBucket: "proyecto-fe6e8.appspot.com",
  messagingSenderId: "1022874251106",
  appId: "1:1022874251106:web:8b37bf201dd924ee0a063b"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

export { appFirebase, db };
