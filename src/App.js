
import React from 'react';
import './App.css';

//import firebase sdk along with firestore and authentication
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//import some hooks 
import { useAuthState } from 'react-fibase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//paste the initialize from your firebase here
firebase.initializeApp({
    apiKey: "AIzaSyBaMb4j9C_T9NVMKVJT5iYAgyeNXH56JE8",
    authDomain: "bordsgc.firebaseapp.com",
    projectId: "bordsgc",
    storageBucket: "bordsgc.appspot.com",
    messagingSenderId: "876876904361",
    appId: "1:876876904361:web:f9f55f29d7547f39f6f6b8",
    measurementId: "G-G5FEDPPSZK"
})
 //set authentication as global variables
 const auth = firebase.auth();
 const firestore = firebase.firestore();
 const analytics = firebase.analytics();

function App() {
  return (
    <div className="App">
      <h1>This is for testing </h1>
    </div>
  );
}

export default App;
