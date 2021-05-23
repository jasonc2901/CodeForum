import React from 'react';
import firebase from 'firebase/app';
import NoIconImg from '../assets/no-icon.png';
import Tooltip from '@material-ui/core/Tooltip';

function ChatBubble(props) {
    const auth = firebase.auth();

    const { text, uid, photoURL, sender } = props.message;

    let messageClass = '';

    if (uid === auth.currentUser.uid) {
        messageClass = 'sent';
    } else {
        messageClass = 'received';
    }

    return (
        <React.Fragment>
            <div className={`message ${messageClass}`}>
                <Tooltip title={sender}>
                    <img alt='img' src={photoURL || NoIconImg} />
                </Tooltip>
                <p>
                    {text}
                </p>
            </div>
        </React.Fragment>
    )
}

export default ChatBubble
