// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBdll81oF8yD-gRYVFYIVyWlUg0m0p8xXs",
  authDomain: "mtechzilla-44edc.firebaseapp.com",
  projectId: "mtechzilla-44edc",
  storageBucket: "mtechzilla-44edc.appspot.com",
  messagingSenderId: "139494214421",
  appId: "1:139494214421:web:43676b4fc42ea99cbf771c",
  measurementId: "G-6VXXM87LE0"
};

// Initialize Firebase
 initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };