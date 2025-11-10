// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4Pp1uQHyT32XWbc4Al7rKEtghAp7flvE",
  authDomain: "campuslearn-fc6a8.firebaseapp.com",
  projectId: "campuslearn-fc6a8",
  storageBucket: "campuslearn-fc6a8.firebasestorage.app",
  messagingSenderId: "1039159377523",
  appId: "1:1039159377523:web:17bd7dcb63d5217f4b7406"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
