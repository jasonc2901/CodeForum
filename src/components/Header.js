import React from 'react'
import CodeImg from '../assets/header-code.png';
import SignOut from '../components/SignOut';

function Header() {
    return (
        <header>
            <img className='header-icon' src={CodeImg} alt='header-icon'></img>
            <h1>CodingForum</h1>
            <div className='spacer'></div>
            <SignOut />
        </header>
    )
}

export default Header
