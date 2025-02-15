import { Fragment, useState } from "react";
import TextField from "../TextField";

function Part1({ formData, onChange, missingValues = [] }) {
    const onValueChange = (key, value) => {
        onChange(key, value)
    }

    return (
        <Fragment>
            <h2>Information about the Location</h2>
            <div className="input-row">
                <TextField showError={missingValues.includes("name")} name="Name" id="name" value={formData.name} onChange={(event) => { onValueChange("name", event.target.value) }}></TextField>
            </div>

            <div className="input-row">
                <div className="input-group">
                    <label htmlFor="textarea">Desctiption</label>
                    <textarea id="textarea" className={`${missingValues.includes("description") ? "error" : ""}`} rows="5" value={formData.description} onChange={(event) => { onValueChange("description", event.target.value) }}></textarea>
                    {missingValues.includes("description") ? <span className="input-error">This field is required</span> : ""}
                </div>
            </div>

            <div className="input-row">
                <TextField name="Postal code" id="postalCode" showError={missingValues.includes("postalCode")} value={formData.postalCode} onChange={(event) => { onValueChange("postalCode", event.target.value) }}></TextField>
                <TextField name="City" id="city" showError={missingValues.includes("city")} value={formData.city} onChange={(event) => { onValueChange("city", event.target.value) }}></TextField>
                <TextField name="Address" id="address" showError={missingValues.includes("address")} value={formData.address} onChange={(event) => { onValueChange("address", event.target.value) }}></TextField>
            </div>

            <hr />
            <h3>Operational hours</h3>
            <div className="input-group">
                <label htmlFor="select">Open At</label>
                <div className="input-row">
                    <select value={formData.openAt} onChange={(event) => { onValueChange("openAt", event.target.value) }} id="select">
                        <option value="Every Day">Every Day</option>
                        <option value="Weekdays">Weekdays</option>
                        <option value="Weekends">Weekends</option>
                    </select>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="from">From</label>
                        <input className={`${missingValues.includes("from")? "error": ""}`} value={formData.from} onChange={(event) => {onValueChange("from", event.target.value)}} type="time" id="from" />
                        {missingValues.includes("from")? <span className="input-error">This field is required</span>: ""}
                    </div>
                    <div className="input-group">
                        <label htmlFor="to">To</label>
                        <input className={`${missingValues.includes("to")? "error": ""}`} value={formData.to} onChange={(event) => {onValueChange("to", event.target.value)}} type="time" id="to" />
                        {missingValues.includes("to")? <span className="input-error">This field is required</span>: ""}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Part1;