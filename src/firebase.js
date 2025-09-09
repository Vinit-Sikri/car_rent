// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Debug: Check if environment variables are loaded
console.log("Environment variables check:");
console.log("API Key:", import.meta.env.VITE_FIREBASE_API_KEY ? "✓ Loaded" : "✗ Missing");
console.log("Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID ? "✓ Loaded" : "✗ Missing");
console.log("Auth Domain:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? "✓ Loaded" : "✗ Missing");

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication + provider (for Google login)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;