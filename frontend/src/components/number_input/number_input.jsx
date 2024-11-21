import "./number_input.css"
import PropTypes from "prop-types";

function NumberInput({value, onChange, placehoder, min, title}){

    return <div className={"number-input"}>
        <h3>{title}</h3>
        <input
            value={value}
            type={"number"}
            onChange={onChange}
            placeholder={placehoder}
            min={min}
        />
    </div>
}

NumberInput.propTypes={
    value:PropTypes.string,
    onChange:PropTypes.func,
    placeholder:PropTypes.string,
    min:PropTypes.string,
    title:PropTypes.string
}



export default NumberInput;