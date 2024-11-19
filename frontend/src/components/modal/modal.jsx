import "./modal.css"

function Modal({isOpen, onClose, title, children}) {
    if (!isOpen) return null;
    return <div className={"modal-overlay"}>
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

export default Modal;