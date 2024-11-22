import "./number_input.css"
import PropTypes from "prop-types";
import {Tooltip} from "react-tooltip";

function NumberInput({id, value, onChange, placeholder, min, title, hasTooltip, toolTipText}) {

    return <div className={"number-input"}>
        <h3>{title}</h3>
        <a className={id}>
            <input
                value={value}
                type={"number"}
                onChange={onChange}
                placeholder={placeholder}
                min={min}
            />
        </a>
        <div>
            {hasTooltip ?
                <Tooltip className={"tooltip"} anchorSelect={"." + id}
                         place={"top-end"}>{toolTipText}</Tooltip> : ""}
        </div>
    </div>
}

NumberInput.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    min: PropTypes.string,
    title: PropTypes.string,
    hasTooltip: PropTypes.bool,
    toolTipText: PropTypes.string,
}


export default NumberInput;