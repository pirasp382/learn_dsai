import "./button.css"
import PropTypes from "prop-types";

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

Button.propTypes={
    onClick:PropTypes.func,
    disabled:PropTypes.bool,
    outline:PropTypes.bool,
    text:PropTypes.string
}

export default Button;