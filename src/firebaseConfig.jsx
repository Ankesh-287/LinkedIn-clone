// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBzyq2t_j-qjhlW1UNltTaUqAZnlskM1L8",
  authDomain: "linkedin-clone-c1d9c.firebaseapp.com",
  projectId: "linkedin-clone-c1d9c",
  storageBucket: "linkedin-clone-c1d9c.appspot.com",
  messagingSenderId: "399224998234",
  appId: "1:399224998234:web:a083031da707fe57840b63",
  measurementId: "G-GDL4WJVM2M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);

export { auth, app, fireStore, storage };
