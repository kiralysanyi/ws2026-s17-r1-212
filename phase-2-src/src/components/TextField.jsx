import { Fragment } from "react";


function TextField({ id, showError, name, placeholder, onChange, value }) {
    return (
        <Fragment>
            <div className="input-group">
                <label htmlFor={id}>{name}</label>
                <input onChange={onChange} value={value} className={showError ? "error" : ""} type="text" id={id} placeholder={placeholder} />
                {showError ? <span className="input-error">This field is required</span> : ""}
            </div>
        </Fragment>
    )
}

export default TextField;