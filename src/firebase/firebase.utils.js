import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCHqybKWg8W4ov6et08Zhke-tL-J26hQRw",
  authDomain: "crwn-db-6b18e.firebaseapp.com",
  projectId: "crwn-db-6b18e",
  storageBucket: "crwn-db-6b18e.appspot.com",
  messagingSenderId: "253048028381",
  appId: "1:253048028381:web:8488efc802c634e5a2af34",
  measurementId: "G-PEZCHPLW5Q",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
