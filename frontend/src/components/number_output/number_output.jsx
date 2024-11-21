import "./number_output.css"
import PropTypes from "prop-types";

function NumberOutput({title, value}) {

    return (
        <div>
            {value ? <div className={"number-output"}>
                <h3>{title}</h3>
                {value}
            </div> : ""}
        </div>
    )
}

NumberOutput.propTypes={
    title:PropTypes.string,
    value:PropTypes.string
}

export default NumberOutput;