import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

function Navbar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();
    
    const navItems = [
        { path: '/', label: '🏠 Home', icon: '🏠' },
        { path: '/salary', label: '💰 Gehaltsvorhersage', icon: '💰' },
        { path: '/introvert', label: '🧠 Persönlichkeitsanalyse', icon: '🧠' }
    ];
    
    const toggleMobileMenu = () => {
        setIsMobileOpen(!isMobileOpen);
    };
    
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    ML Predictor
                </Link>
                
                <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                    {isMobileOpen ? '✕' : '☰'}
                </button>
                
                <ul className={`navbar-menu ${isMobileOpen ? 'mobile-open' : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link 
                                to={item.path} 
                                className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
                                onClick={() => setIsMobileOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;