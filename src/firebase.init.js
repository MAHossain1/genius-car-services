// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBods6PPvkes6Cf-XnbEDPUFKmdWCn-YkI",
  authDomain: "genius-car-services-e60ea.firebaseapp.com",
  projectId: "genius-car-services-e60ea",
  storageBucket: "genius-car-services-e60ea.appspot.com",
  messagingSenderId: "339577029876",
  appId: "1:339577029876:web:073a24f53b13f3c03fcaa1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
