import { Fragment } from "react";


function TextField({ id, error, name, placeholder, onChange, value }) {
    return (
        <Fragment>
            <div className="input-group">
                <label htmlFor={id}>{name}</label>
                <input onChange={onChange} value={value} className={error ? "error" : ""} type="text" id={id} placeholder={placeholder} />
                {error ? <span className="input-error">{error}</span> : ""}
            </div>
        </Fragment>
    )
}

export default TextField;