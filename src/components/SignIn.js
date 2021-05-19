import React from 'react';
import firebase from 'firebase/app';
import CodeImg from '../assets/code.png';


function SignIn() {
    //auth 
    const auth = firebase.auth();

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <React.Fragment>
            <div className='code-img-div'>
                <img alt='code' src={CodeImg}></img>
            </div>
            <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
            <div className='greeting-div'>
                <p className='greeting'>Welcome to the CodingForum, join now and ask any coding related questions!</p>
            </div>
        </React.Fragment>
    )
}

export default SignIn;
