import React, { useState, useEffect } from 'react';
import "../styles/components/header.css";

import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

import Image from '../assets/logo.svg';

function Header() {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {isMobile ? (
                <Menu>
                    <div className="logo">
                        <img src={Image} alt="Logo" />
                    </div>                
                    <Link to="/">Login</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/users">Users</Link>
                </Menu>
            ) : (
                <header>
                    <div className="logo">
                        <img src={Image} alt="Logo" />
                    </div>                
                    <Link to="/">Login</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/users">Users</Link>
                </header>
            )}
        </>

    );
}

export default Header;