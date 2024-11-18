import "./number_output.css"

function Number_Output({title, value}) {

    return (
        <div>
            {value ? <div className={"number-output"}>
                <h3>{title}</h3>
                {value}
            </div> : ""}
        </div>
    )
}

export default Number_Output;