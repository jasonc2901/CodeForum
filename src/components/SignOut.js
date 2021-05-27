import React from 'react';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useWindowSize from '../providers/ScreenSizeProvider';


function SignOut() {
    //stores the firebase auth
    const auth = firebase.auth();

    //call the window size hook for dynamic resizing
    const windowSize = useWindowSize();

    return (
        auth.currentUser ?
            <Button
                variant="contained"
                color="gray"
                style={{
                    contain: 'content',
                    width: `${windowSize.height / 1.5}px`,
                    fontSize: windowSize.width < 10 ? `${windowSize.width / 40}px` : '10px'
                }}
                startIcon={<ExitToAppIcon />}
                onClick={() => auth.signOut()}
            >
                Logout
</Button>
            : null
    )
}



export default SignOut
