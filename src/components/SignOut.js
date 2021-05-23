import React from 'react';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


function SignOut() {
    const auth = firebase.auth();

    return (

        auth.currentUser ?
            <Button
                variant="contained"
                color="gray"
                style={{ width: '40vh' }}
                startIcon={<ExitToAppIcon />}
                onClick={() => auth.signOut()}
            >
                Logout
</Button>
            : null
    )
}

export default SignOut
