import React, { useState, useEffect } from 'react';
import "../styles/components/header.css";
import "../App.css";

import { Link, useNavigate } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

import Image from '../assets/logo.svg';

function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const userIdFromToken = JSON.parse(localStorage.getItem('userId'));
            setUserId(userIdFromToken);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const renderLinks = (closeMenu) => (
        <>
            <Link to="/dashboard" onClick={closeMenu}>Tableau de bord</Link>
            <Link to="/projects" onClick={closeMenu}>Mes Projets</Link>
            <Link to="/users" onClick={closeMenu}>Les utilisateurs</Link>
            <Link to={`/users/${userId}`} onClick={closeMenu}>Mon Compte</Link>
            {isLoggedIn ? (
                <button onClick={() => { handleLogout(); closeMenu(); }}>Déconnexion</button>
            ) : (
                <Link className='button_main' to="/" onClick={closeMenu}>Connexion</Link>
            )}
        </>
    );

    return (
        <header>
            <div className="logo">
                <img src={Image} alt="Logo" />
            </div>
            {isMobile ? (
                <>
                    <Menu 
                        right 
                        isOpen={menuOpen} 
                        onStateChange={(state) => handleStateChange(state)}
                    >
                        {renderLinks(closeMenu)}
                    </Menu>
                    <button className="menu-toggle" onClick={toggleMenu}>
                        ☰
                    </button>
                </>
            ) : (
                <nav>
                    {renderLinks(() => {})}
                </nav>
            )}
        </header>
    );
}

export default Header;