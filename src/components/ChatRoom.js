//react imports
import React, { useRef, useState, useEffect } from 'react';

//import icons
import SendIcon from '@material-ui/icons/Send';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

//firebase / hooks imports
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import useWindowSize from '../providers/ScreenSizeProvider';
//components 
import ChatBubble from './ChatBubble';
import Sidebar from "react-sidebar";




function ChatRoom(props) {
    //placeholder div to allow for automatic scroll to bottom
    const scrollDiv = useRef();

    //all available rooms
    //TODO: PULL ALL AVAILABLE ROOMS DIRECTLY FROM FIREBASE
    //TODO: ALLOW USER TO CREATE A NEW ROOM ?
    const rooms = [
        'React',
        'Python',
        'Flutter',
        'JavaScript',
        'Swift',
        'C#',
        'C++',
        'C'
    ];

    //current room 
    const [currentRoom, setCurrentRoom] = useState(rooms[0]);

    //get a reference to the forum collection associated with each room
    const forumReference = props.firestore.collection('forum').doc(currentRoom).collection(`${currentRoom}-Messages`);

    //create the query - only show 30 most recent messages
    const query = forumReference.orderBy('createdAt').limit(30);

    //store the data returned from database
    const [messages] = useCollectionData(query, { idField: 'id' });

    //state to hold the value entered in the message input
    const [msgValue, setMsgValue] = useState('');

    //state to hold the sidebar open values
    const [sidebarOpen, setSidebarOpen] = useState(false);

    //sidebar selected index
    const [sidebarSelectedIndex, setSidebarSelectedIndex] = useState(0);

    //reference to the firebase auth
    const auth = firebase.auth();

    //get the screen size hook
    const screenSize = useWindowSize();


    //function to handle the sending of a message
    const sendMessage = async (e) => {
        //prevent page refresh upon message send
        e.preventDefault();

        //extract uid and photoURL from auth user
        const { uid, photoURL, displayName } = auth.currentUser;

        //store the current server timestamp
        const createdAt = props.firebase.firestore.FieldValue.serverTimestamp();

        //call the add msg to db function
        await addMsgToDb(msgValue, createdAt, uid, photoURL, displayName);

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
        scrollDiv.current.scrollIntoView({ behavior: 'smooth' });
    }

    //function to add the sent message to the collection
    const addMsgToDb = async (text, created, userId, pic, sender) => {
        await forumReference.add({
            text: text,
            createdAt: created,
            uid: userId,
            photoURL: pic,
            sender: sender
        });
    }

    const updateSelected = (index) => {
        //set the current index
        setSidebarSelectedIndex(index);

        //update the selected room state
        setCurrentRoom(rooms[index]);

    }

    //stores the content for the sidebars
    const sidebarContent = () => {
        return (
            <React.Fragment>
                <div style={{ borderBottom: '1px solid #6895e9' }}>
                    <h1 style={{ color: 'gray', width: '200px', marginBottom: '0px' }}>Rooms</h1>
                    <h5 style={{ color: 'gray', width: '200px' }}>Current Room: {currentRoom} </h5>
                </div>
                {rooms.map((room, index) => (
                    sidebarSelectedIndex === index ?
                        <div className='itemSelected' onClick={() => updateSelected(index)}>
                            <h1>{room}</h1>
                        </div> :
                        <div className='itemDeselected' onClick={() => updateSelected(index)}>
                            <h1>{room}</h1>
                        </div>
                ))}
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Sidebar
                className='sidebar'
                sidebar={sidebarContent()}
                open={sidebarOpen}
                onSetOpen={sidebarBtnClick}
                styles={{
                    sidebar: {
                        position: 'fixed',
                        marginBottom: '0px',
                        background: "white",
                        padding: '10px',
                        minHeight: '100vh !important',
                        height: '10vh !important',
                        zIndex: '1000'
                    }
                }
                }
            />
            <main>
                {messages ? messages.map(msg => <ChatBubble key={msg.id} message={msg} />) : null}
                <div ref={scrollDiv}></div>
            </main>
            <form onSubmit={sendMessage}>
                <IconButton
                    type='reset'
                    onClick={sidebarBtnClick}
                    style={
                        {
                            width: '10vh',
                            paddingLeft: '40px',
                            paddingRight: '40px',
                            background: '#6895e9',
                            borderRadius: '0px'
                        }
                    }>
                    <MenuIcon style={{ color: 'white' }} />
                </IconButton>
                <input style={{
                    fontSize: screenSize.width < 20 ? `${screenSize.width / 20}px` : '20px'
                }}
                    value={msgValue}
                    onChange={(e) => setMsgValue(e.target.value)}
                    placeholder="Ask a coding question!" />
                <IconButton type='submit' disabled={!msgValue} style={{ color: 'white', background: '#6895e9', borderRadius: '0px', width: '9vh' }}>
                    <SendIcon />
                </IconButton>
            </form>
        </React.Fragment>

    )


}

export default ChatRoom
