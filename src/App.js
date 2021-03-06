import React from 'react';

import CodeImg from './assets/header-code.png';

//import the config from firebase file
import config from './firebase';

//firebase/firestore imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//firebase hooks imports
import { useAuthState } from 'react-firebase-hooks/auth';

//styling import
import './styling/custom.css';

//import components 
import SignIn from './components/SignIn';
import Header from './components/Header';
import ChatRoom from './components/ChatRoom';

//initialize the firebase application
firebase.initializeApp(config);

//get references to auth and firestore
const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {/* STATIC HEADER THAT PERSISTS THROUGHOUT APP */}
      <Header />
      <section>
        {user ? <ChatRoom firebase={firebase} firestore={firestore} auth={auth} /> : <SignIn />}
      </section>
    </div>
  );
}


export default App;

