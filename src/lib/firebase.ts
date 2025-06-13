
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

// Your web app's Firebase configuration
// IMPORTANT: These values MUST come from your .env.local file and be correctly
// prefixed with NEXT_PUBLIC_ for Next.js to expose them to the browser.
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
if (typeof window !== 'undefined') { // This block runs on the CLIENT-SIDE
    console.log("Firebase Studio Debug (CLIENT): Attempting to initialize Firebase with this config:", firebaseConfig);
    if (!firebaseConfig.apiKey) {
        console.error("Firebase Studio Debug (CLIENT): Firebase API Key is missing or undefined!");
    }
    if (!firebaseConfig.projectId) {
        console.error("Firebase Studio Debug (CLIENT): Firebase Project ID is missing or undefined!");
    }
    if (!firebaseConfig.appId) {
        console.error("Firebase Studio Debug (CLIENT): Firebase App ID is missing or undefined!");
    }
} else { // This block runs on the SERVER-SIDE
    console.log("Firebase Studio Debug (SERVER): Attempting to initialize Firebase with this config:", firebaseConfig);
    if (!firebaseConfig.apiKey) {
        console.error("Firebase Studio Debug (SERVER): Firebase API Key is missing or undefined!");
    }
    if (!firebaseConfig.projectId) {
        console.error("Firebase Studio Debug (SERVER): Firebase Project ID is missing or undefined!");
    }
    if (!firebaseConfig.appId) {
        console.error("Firebase Studio Debug (SERVER): Firebase App ID is missing or undefined!");
    }
}

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  try {
    // Check for essential config values before attempting to initialize
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
      const missingKeys = Object.entries(firebaseConfig)
        .filter(([key, value]) => !value && ['apiKey', 'projectId', 'appId'].includes(key))
        .map(([key]) => key)
        .join(', ');
      throw new Error(`Firebase configuration is missing essential keys: [${missingKeys}]. Check your .env.local file and ensure variables are prefixed with NEXT_PUBLIC_ and the server was restarted.`);
    }
    app = initializeApp(firebaseConfig);
  } catch (error: any) {
    const errorMessage = `Firebase Studio Debug: Error during initializeApp: ${error.message || error}. This usually means your .env.local file is missing/incorrect or you haven't restarted the dev server.`;
    console.error(errorMessage);
    // To prevent a hard crash during SSR if init fails, especially in a dev environment,
    // we will throw a more informative error. In a production app, you might handle this differently.
    throw new Error(errorMessage);
  }
} else {
  app = getApps()[0];
}

const auth: Auth = getAuth(app); // This line will fail if 'app' is not valid due to bad config.

export { app, auth };
