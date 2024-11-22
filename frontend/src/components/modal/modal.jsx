import "./modal.css"
import PropTypes from "prop-types";
import {useEffect} from "react";

function Modal({isOpen, onClose, title, children}) {
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
    return <div className={"modal-overlay"} onClick={onClose}>
        <div className={"modal-content"}>
            <header className={"modal-header"}>
                <h3>{title}</h3>
                <button className={"close-button"} onClick={onClose}>
                    &times;
                </button>
            </header>
            <div className={"modal-body"}>
                {children}
            </div>
            <footer className={"modal-footer"}>
                <button className={"close-button"} onClick={onClose}>
                    Close
                </button>
            </footer>
        </div>
    </div>
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.node,
}

export default Modal;