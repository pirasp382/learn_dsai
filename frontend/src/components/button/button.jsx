import "./button.css"

function Button({onClick, disabled, outline, text}) {

    return (
        <div>
            <button className={`button ${outline ? "outline" : ""} ${disabled ? "disabled" : ""}`}
                    onClick={onClick}
                    disabled={disabled}
            >
                {text}
            </button>
        </div>
    )
}

export default Button;