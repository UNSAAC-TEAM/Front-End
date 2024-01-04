// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwEDGt3H1Lzqhbw0JPwDkOU7m9Y_lBkV8",
  authDomain: "courseapp-75000.firebaseapp.com",
  projectId: "courseapp-75000",
  storageBucket: "courseapp-75000.appspot.com",
  messagingSenderId: "856269609357",
  appId: "1:856269609357:web:5ac8ffceca42b5a1aac5c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage }; // Exporta el módulo de Firebase Storage
