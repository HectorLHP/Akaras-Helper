// src/auth.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
} from 'firebase/auth';

// Get Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
// console.log('Using Firebase API Key:', firebaseConfig.apiKey);

// Initialize Firebase App (if it hasn't been initialized already)
const appFirebase = initializeApp(firebaseConfig);

// Get Firebase authentication instance
export const auth = getAuth(appFirebase);

// Register a new user
export function registerUser(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User registered:', userCredential.user);
        resolve(userCredential); // Resolve the promise when registration is successful
      })
      .catch((error) => {
        console.error('Error registering user:', error); // Log the whole error object for inspection
        if (error.code === 'auth/email-already-in-use') {
          reject(
            new Error(
              'This email is already registered. Please log in or use a different email.'
            )
          );
        } else {
          reject(
            new Error(error.message || 'Registration failed. Please try again.')
          );
        }
      });
  });
}

// Login an existing user
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User logged in:', userCredential.user);
      return userCredential.user; // Resolve with the logged-in user
    })
    .catch((error) => {
      console.error('Error logging in:', error.message);
      throw new Error(error.message); // Pass the error back to the caller
    });
}

// Auth state listener
export function listenAuthState() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is logged in:', user);
    } else {
      console.log('No user is logged in');
    }
  });
}

export default {
  registerUser,
  loginUser,
  listenAuthState,
};
