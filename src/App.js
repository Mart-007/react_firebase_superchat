
import React, {useState, useRef} from 'react';
import './App.css';

//import firebase sdk along with firestore and authentication
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//import some hooks 
import { useAuthState } from 'react-firebase-hooks/auth';
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
//  const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1>💬</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

//Sign in Component
const SignIn = () => {
  const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider(); 
      auth.signInWithPopup(provider);
  }

  return(
      <>
          <div className="signIn-container">
              <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
              <p>Do not violate the community guidelines or you will be banned for life</p>
          </div>
      </>
  )
}

//Sign out Component
const SignOut = () => {
  return auth.currentUser &&(
      <>
          <div className="signOut-container">
              <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
          </div>  
      </>
  )
}

//ChatRoom Component
const ChatRoom = () => {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages'); //reference a firestore collection
  const query = messagesRef.orderBy('createdAt').limit(25); //query documents in a collection

  const [messages] = useCollectionData(query, { idField: 'id' }); //listen to data with a -hook-
  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid, 
      photoURL
    })
  }
  //loop each document - map array of message and each message I used a dedicated ChatMessage component that has a key props with msg.id and pass the document data as message props
  //sakit sa bangs nito repapips
  return (
      <>
          <main>
              
              {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/> )} 
              <span ref={dummy}></span>
          </main>
          <form onSubmit={sendMessage}>

              <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Kahit ano lang!" />
              <button type="submit" disabled={!formValue}>🕊️</button>

          </form>
      </>
  )
}

//ChatMessage Component
const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message; //to see the actual text by accessing props message
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
      <>
          <div className={`message ${messageClass}`}>
              <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
              <p>{text}</p>
          </div>
      </>
  )
}
export default App;
