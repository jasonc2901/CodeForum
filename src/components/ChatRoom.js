import React, { useRef, useState, useEffect } from 'react';

//import icons
import SendIcon from '../assets/send.png';

//firebase hooks imports
import { useCollectionData } from 'react-firebase-hooks/firestore';

import firebase from 'firebase/app';

//components 
import ChatBubble from './ChatBubble';


function ChatRoom(props) {
    //placeholder div to allow for automatic scroll to bottom
    const placeholder = useRef();

    //get a reference to the messages collection in database
    const messagesReference = props.firestore.collection('messages');

    //create the query - only show 30 most recent messages
    const query = messagesReference.orderBy('createdAt').limit(30);

    //store the data returned from database
    const [messages] = useCollectionData(query, { idField: 'id' });

    //state to hold the value entered in the message input
    const [msgValue, setMsgValue] = useState('');

    //reference to the firebase auth
    const auth = firebase.auth();


    //function to handle the sending of a message
    const sendMessage = async (e) => {
        //prevent page refresh upon message send
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesReference.add({
            text: msgValue,
            createdAt: props.firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        setMsgValue('');
        placeholder.current.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        placeholder.current.scrollIntoView({ behavior: 'smooth' });
    })

    return (
        <React.Fragment>
            <main>
                {messages ? messages.map(msg => <ChatBubble key={msg.id} message={msg} />) : null}
                <div ref={placeholder}></div>
            </main>

            <form onSubmit={sendMessage}>
                <input value={msgValue} onChange={(e) => setMsgValue(e.target.value)} placeholder="Ask a coding question!" />
                <button type="submit" disabled={!msgValue}>
                    <img className='sendBtn' src={SendIcon} alt='send'></img>
                </button>
            </form>
        </React.Fragment>

    )


}

export default ChatRoom
