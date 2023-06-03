import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB5USlsRkWn4zn0Xx6qJCqVO-_4crw2_-s",
    authDomain: "acciojon-project.firebaseapp.com",
    projectId: "acciojon-project",
    storageBucket: "acciojon-project.appspot.com",
    messagingSenderId: "146335447938",
    appId: "1:146335447938:web:dec76fc6ded14da107ed9b",
    measurementId: "G-KPL1TZXMWZ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const auth = firebase.auth();
  const db = firebaseApp.firestore();
  export {auth,db}