
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

// Your web app's Firebase configuration
// IMPORTANT: Replace these with your actual Firebase project configuration.
// You should store these in an .env.local file and ensure it's in your .gitignore.
// Example .env.local:
// NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
// NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
// NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

const firebaseConfig = {
  apiKey: "AIzaSyDDeSlw8otPo6wOUBEQsM6NpzEW202QDUw",
  authDomain: "vendorlink-6iujp.firebaseapp.com",
  projectId: "vendorlink-6iujp",
  storageBucket: "vendorlink-6iujp.firebasestorage.app",
  messagingSenderId: "829800170717",
  appId: "1:829800170717:web:8b24fabfc2f24c6a7b4734"
};


// Log the config to the console for debugging.
// THIS IS THE MOST IMPORTANT PART FOR YOU TO CHECK IN YOUR BROWSER.
if (typeof window !== 'undefined') { // Ensure this only runs on the client-side
    console.log("Firebase Studio Debug: Attempting to initialize Firebase with this config:", firebaseConfig);
    if (!firebaseConfig.apiKey) {
        console.error("Firebase Studio Debug: Firebase API Key is missing or undefined!");
    }
}

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth: Auth = getAuth(app); // Error happens here if 'app' is not valid due to bad config

export { app, auth };
