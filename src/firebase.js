// import { initializeApp } from "firebase/app";


// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "1:537920897045:web:20984a34d702d61e018e1c"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // 👈 IN LINES KO DHYAN SE DEKHEIN (Exports)


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsW9gGqouh-aRa0IviLFS-rmp8uO5OErk",
  authDomain: "quiz-811d6.firebaseapp.com",
  projectId: "quiz-811d6",
  storageBucket: "quiz-811d6.firebasestorage.app",
  messagingSenderId: "537920897045",
  appId: "1:537920897045:web:20984a34d702d61e018e1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;