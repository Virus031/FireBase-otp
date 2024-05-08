// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHA9okqqH4pzgqnjub5WSmOKys2FW5Mqw",
  authDomain: "otp-project-553f2.firebaseapp.com",
  projectId: "otp-project-553f2",
  storageBucket: "otp-project-553f2.appspot.com",
  messagingSenderId: "879146858980",
  appId: "1:879146858980:web:5928227026d7253577eff1",
  measurementId: "G-VWWV6PXEV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);