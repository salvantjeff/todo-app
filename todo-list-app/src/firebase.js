import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeRMbhO43lED1NkZBYg6U99fQwFPPTKw0",
  authDomain: "todolist-b1e8b.firebaseapp.com",
  projectId: "todolist-b1e8b",
  storageBucket: "todolist-b1e8b.appspot.com",
  messagingSenderId: "413529189719",
  appId: "1:413529189719:web:da795c4a99d2320d036212"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const collectionRef = collection(db, 'users');

const googleProvider = new GoogleAuthProvider();
auth.languageCode = 'it';
async function continueWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    const q = query(collectionRef, where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collectionRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        authProvider: "google",
      });
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  };
};

async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('SUCCESS: you signed in');
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    alert(errorMessage);
  };
};

async function signup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('SUCCESS: your account has been created');
    console.log(user);
    await addDoc(collectionRef, {
      uid: user.uid,
      email: email,
      password: password,
      authProvider: "local",
    });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    alert(errorMessage);
  };
};

async function sendPasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    alert(errorMessage);
  }
};

async function logout() {
  try {
    await signOut(auth);
    console.log('Sign-out successful')
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    alert(errorMessage);
  };
};

export {
  auth,
  db,
  continueWithGoogle,
  login,
  signup,
  sendPasswordReset,
  logout,
};