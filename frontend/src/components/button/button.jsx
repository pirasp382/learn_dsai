import React from 'react';
import './button.css';

const Button = ({ onClick, disabled, outline, text, icon, variant = 'primary', size = 'md' }) => {
    const getVariantClass = () => {
        switch(variant) {
            case 'primary': return outline ? 'btn-outline-primary' : 'btn-primary';
            case 'secondary': return outline ? 'btn-outline-secondary' : 'btn-secondary';
            case 'success': return outline ? 'btn-outline-success' : 'btn-success';
            case 'danger': return outline ? 'btn-outline-danger' : 'btn-danger';
            default: return outline ? 'btn-outline-primary' : 'btn-primary';
        }
    };
    
    const getSizeClass = () => {
        switch(size) {
            case 'sm': return 'btn-sm';
            case 'lg': return 'btn-lg';
            default: return 'btn-md';
        }
    };
    
    return (
        <button 
            className={`btn ${getVariantClass()} ${getSizeClass()}`}
            onClick={onClick} 
            disabled={disabled}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            {text}
        </button>
    );
};

export default Button;