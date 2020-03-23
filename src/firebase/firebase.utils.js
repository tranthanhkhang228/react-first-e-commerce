import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyARH991tNiO9WcMPuwU6QBxaKI35NR-nUU',
  authDomain: 'react-first-e-commerce.firebaseapp.com',
  databaseURL: 'https://react-first-e-commerce.firebaseio.com',
  projectId: 'react-first-e-commerce',
  storageBucket: 'react-first-e-commerce.appspot.com',
  messagingSenderId: '739374213640',
  appId: '1:739374213640:web:7a485739a78670d5a3ffbd',
  measurementId: 'G-9VFDH91SC2',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
