// src/auth.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
  onAuthStateChanged,
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
console.log('Using Firebase API Key:', firebaseConfig.apiKey);

// Initialize Firebase App (if it hasn't been initialized already)
const appFirebase = initializeApp(firebaseConfig);


// Get Firebase authentication instance
const auth = getAuth(appFirebase);

// Register a new user
export function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User registered:', userCredential.user);
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.error('This email is already in use.');
        alert(
          'This email is already registered. Please log in or use a different email.'
        );
      } else {
        console.error('Error registering user:', error.message);
        alert('Registration failed. Please try again.');
      }
    });
}


// Login an existing user
export function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User logged in:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error logging in:', error.message);
    });
}

// Logout current user
export function logoutUser() {
  signOut(auth)
    .then(() => {
      console.log('User logged out');
    })
    .catch((error) => {
      console.error('Error logging out:', error.message);
    });
}

// Guest access (anonymous login)
export function useGuest() {
  signInAnonymously(auth)
    .then((userCredential) => {
      console.log('Guest user logged in:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error with guest login:', error.message);
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
  logoutUser,
  useGuest,
  listenAuthState,
};
