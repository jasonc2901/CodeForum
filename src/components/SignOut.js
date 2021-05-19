import React from 'react';
import firebase from 'firebase/app';

function SignOut() {
    const auth = firebase.auth();

    return (
        auth.currentUser ?
            <button className="sign-out" onClick={() => auth.signOut()}>Logout</button>
            : null
    )
}

export default SignOut
