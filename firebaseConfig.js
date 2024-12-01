import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDhsTtLom3BqB8tFTnfNvpoJLzzflRvgcU",
    authDomain: "network-t9.firebaseapp.com",
    projectId: "network-t9",
    storageBucket: "network-t9.firebasestorage.app",
    messagingSenderId: "765445786482",
    appId: "1:765445786482:android:fbef0bd96232b91fad2beb",
    measurementId: "G-XXXXXX" // Optional if enabled
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
