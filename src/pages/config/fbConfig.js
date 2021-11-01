
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
// Your web app's Firebase configuration
const Config = {
  apiKey: "AIzaSyCNtc0h3OHQhMCOLC0Taqwk1JwwMWC1wRI",
  authDomain: "healthcare-cec69.firebaseapp.com",
  projectId: "healthcare-cec69",
  storageBucket: "healthcare-cec69.appspot.com",
  messagingSenderId: "492324651857",
  appId: "1:492324651857:web:ff296e8f114e8ce7fb8970"
};
// Initialize Firebase
firebase.initializeApp(Config)
export default firebase;

export const auth = firebase.auth()
export const firestoredb = firebase.firestore()
