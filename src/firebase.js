import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAlZBlkRyEcgZALC3I5aeQFPwLiarfFGes",
    authDomain: "crud-simple-react-firebase.firebaseapp.com",
    projectId: "crud-simple-react-firebase",
    storageBucket: "crud-simple-react-firebase.appspot.com",
    messagingSenderId: "665664461354",
    appId: "1:665664461354:web:dbea199e9481b17f880153"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

export {db, auth, firebase}