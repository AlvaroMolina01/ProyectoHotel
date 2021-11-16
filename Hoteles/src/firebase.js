import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyDNc0kXJ1KtUSzwcdiHK1cZHAqakh6eMVs",
    authDomain: "apphotel-6928e.firebaseapp.com",
    projectId: "apphotel-6928e",
    storageBucket: "apphotel-6928e.appspot.com",
    messagingSenderId: "922312676829",
    appId: "1:922312676829:web:dc7632f28f7c80d80c5234"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()