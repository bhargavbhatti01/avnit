import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANwwbu0Q6HJ3CscUZV9qyvlcj4rvRx6EU",
  authDomain: "avnit-f05d4.firebaseapp.com",
  projectId: "avnit-f05d4",
  storageBucket: "avnit-f05d4.appspot.com",
  messagingSenderId: "495903492831",
  appId: "1:495903492831:web:7fb0ce0e49a5900f36376a",
  measurementId: "G-CR2PGKFF9F"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const firestore = getFirestore(app);