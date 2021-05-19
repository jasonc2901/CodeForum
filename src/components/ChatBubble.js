import React from 'react';
import firebase from 'firebase/app';
import NoIconImg from '../assets/no-icon.png';

function ChatBubble(props) {
    const auth = firebase.auth();

    const { text, uid, photoURL } = props.message;

    let messageClass = '';

    if (uid === auth.currentUser.uid) {
        messageClass = 'sent';
    } else {
        messageClass = 'received';
    }

    return (
        <React.Fragment>
            <div className={`message ${messageClass}`}>
                <img alt='img' src={photoURL || NoIconImg} />
                <p>{text}</p>
            </div>
        </React.Fragment>
    )
}

export default ChatBubble
