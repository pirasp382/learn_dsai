
import "./modal.css";
import PropTypes from "prop-types";
import { useEffect } from "react";

function Modal({ isOpen, onClose, title, children, size = "xl" }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (!isOpen) return null;

    const getSizeClass = () => {
        switch(size) {
            case 'sm': return 'modal-sm';
            case 'md': return 'modal-md';
            case 'lg': return 'modal-lg';
            case 'xl': return 'modal-xl';
            case 'full': return 'modal-full';
            default: return 'modal-xl';
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content ${getSizeClass()}`} onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <button className="modal-close-btn" onClick={onClose}>
                        &times;
                    </button>
                </header>
                
                <div className="modal-body">
                    {children}
                </div>
                
                <footer className="modal-footer">
                    <button className="modal-footer-btn" onClick={onClose}>
                        Schließen
                    </button>
                </footer>
            </div>
        </div>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full'])
};

export default Modal;