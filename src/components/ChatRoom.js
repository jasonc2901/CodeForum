//react imports
import React, { useRef, useState, useEffect } from 'react';

//import icons
import SendIcon from '../assets/send.png';
import MenuIcon from '../assets/menu.png';

//firebase / hooks imports
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';

//components 
import ChatBubble from './ChatBubble';
import Sidebar from "react-sidebar";



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

    //state to hold the sidebar open values
    const [sidebarOpen, setSidebarOpen] = useState(false);

    //reference to the firebase auth
    const auth = firebase.auth();


    //function to handle the sending of a message
    const sendMessage = async (e) => {
        //prevent page refresh upon message send
        e.preventDefault();

        //extract uid and photoURL from auth user
        const { uid, photoURL } = auth.currentUser;

        //store the current server timestamp
        const createdAt = props.firebase.firestore.FieldValue.serverTimestamp();

        //call the add msg to db function
        await addMsgToDb(msgValue, createdAt, uid, photoURL);

        //clear the form
        setMsgValue('');
    }

    const sidebarBtnClick = (e) => {
        !sidebarOpen ? setSidebarOpen(true) : setSidebarOpen(false);
    }
    //any time messages are updated, scroll to the bottom
    useEffect(() => {
        scrollToBottom();
    }, [messages])


    //function that scrolls page to the bottom
    const scrollToBottom = () => {
        placeholder.current.scrollIntoView({ behavior: 'smooth' });
    }

    //function to add the sent message to the collection
    const addMsgToDb = async (text, created, userId, pic) => {
        await messagesReference.add({
            text: text,
            createdAt: created,
            uid: userId,
            photoURL: pic
        });
    }

    //stores the content for the sidebars
    const sidebarContent = () => {
        return (
            <React.Fragment>
                <h1 style={{ color: '#6895e9', width: '200px' }}>Rooms</h1>
                <h2>React</h2>
                <h2>Python</h2>
                <h2>Flutter</h2>
                <h2>JavaScript</h2>
                <h2>Swift</h2>
                <h2>C#</h2>
                <h2>C++</h2>
                <h2>C</h2>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <main>
                <Sidebar
                    sidebar={sidebarContent()}
                    open={sidebarOpen}
                    onSetOpen={sidebarBtnClick}
                    styles={{ sidebar: { background: "white" } }}
                />
                {messages ? messages.map(msg => <ChatBubble key={msg.id} message={msg} />) : null}
                <div ref={placeholder}></div>
            </main>
            <form onSubmit={sendMessage}>
                <button type='reset' className='sidebarBtn' onClick={sidebarBtnClick}>
                    <img className='drawerBtn' src={MenuIcon} alt='menu'></img>
                </button>
                <input value={msgValue} onChange={(e) => setMsgValue(e.target.value)} placeholder="Ask a coding question!" />
                <button type="submit" disabled={!msgValue}>
                    <img className='sendBtn' src={SendIcon} alt='send'></img>
                </button>
            </form>
        </React.Fragment>

    )


}

export default ChatRoom
