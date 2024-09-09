import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import "../styles/components/header.css";

function BurgerMenu({ renderLinks }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
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
        </div>
    );
}

export default BurgerMenu;