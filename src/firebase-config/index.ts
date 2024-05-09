import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCotUQ-TC3C5E88yZJFeOgfqTR5-qdXUAk",
  authDomain: "databasecloud-crochet.firebaseapp.com",
  projectId: "databasecloud-crochet",
  storageBucket: "databasecloud-crochet.appspot.com",
  messagingSenderId: "599047374442",
  appId: "1:599047374442:web:3ca4066ef3cc8b8093ac13",
  measurementId: "G-FSJY6TLQKN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
