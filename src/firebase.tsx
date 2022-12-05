import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithCustomToken,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const apiKey = import.meta.env.VITE_PROJECT_API_KEY;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "habit-app-36bd6.firebaseapp.com",
  projectId: "habit-app-36bd6",
  storageBucket: "habit-app-36bd6.appspot.com",
  messagingSenderId: "983013190748",
  appId: "1:983013190748:web:2d2d9f446763cda1fe4a99",
  measurementId: "G-D82CE27B4Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google Auth
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        habits: [],
        history: [],
      });
    }
    return user;
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

// Email & Password Creation
const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

// Send Password Reset
const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

// Logout
const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
