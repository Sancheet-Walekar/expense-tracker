import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZWAsy8yw8wqhevewdcuZ-viDJo1L1_DU",
  authDomain: "fir-expense-tracker-68d86.firebaseapp.com",
  projectId: "fir-expense-tracker-68d86",
  storageBucket: "fir-expense-tracker-68d86.firebasestorage.app",
  messagingSenderId: "358221219912",
  appId: "1:358221219912:web:a3c7047a88e9552eed307d",
  measurementId: "G-E3PYQQRWFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export { db,auth,provider,doc,setDoc };