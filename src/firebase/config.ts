// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from  'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9TLhkSkTc7ImSpSFwglh3BUHygQh_96E",
  authDomain: "astro-authentication-98b21.firebaseapp.com",
  projectId: "astro-authentication-98b21",
  storageBucket: "astro-authentication-98b21.firebasestorage.app",
  messagingSenderId: "1034780469286",
  appId: "1:1034780469286:web:a216697260567f39bc9ee7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
auth.languageCode = 'es' // para el idioma del navegador

export const firebase = {
    app, 
    auth,
}