// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCGgVyV9oL1dy1Ba7cMscqP04u_ru51uhA",
    authDomain: "yakap-ticketing-system.firebaseapp.com",
    projectId: "yakap-ticketing-system",
    storageBucket: "yakap-ticketing-system.appspot.com",
    messagingSenderId: "966287741955",
    appId: "1:966287741955:web:62ae6f4177deae9b6faa36",
    measurementId: "G-MLMTVV1X6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {firestore, auth};