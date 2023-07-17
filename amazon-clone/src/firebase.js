// Import the functions you need from the SDKs you need
import firebase from 'firebase';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA430I9H3XqqrWFc90YouLNyfAZr3BSL_E",
  authDomain: "clone-9e4ea.firebaseapp.com",
  projectId: "clone-9e4ea",
  storageBucket: "clone-9e4ea.appspot.com",
  messagingSenderId: "849832364988",
  appId: "1:849832364988:web:c49605f0a25e6da36c79b9",
  measurementId: "G-BPC2F1L7MN"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
export default firebase;