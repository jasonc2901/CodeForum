import React from 'react';
import firebase from 'firebase/app';
import CodeImg from '../assets/code.png';
import GoogleButton from 'react-google-button';
import Paper from '@material-ui/core/Paper';


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
            <GoogleButton style={{ alignSelf: 'center' }} onClick={signInWithGoogle} />
            <Paper elevation={3} style={{ width: '45vh', alignSelf: 'center', marginTop: '50px' }}>
                <p className='greeting'>Welcome to the CodingForum, join now and ask any coding related questions!</p>
            </Paper>
        </React.Fragment>
    )
}

export default SignIn;
