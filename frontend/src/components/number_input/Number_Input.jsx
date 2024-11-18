import "./Number_Input.css"

function Number_Input({value, onChange, placehoder, min, title}){

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

export default Number_Input;