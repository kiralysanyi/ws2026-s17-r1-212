import { Fragment, useState } from "react";
import TextField from "../TextField";

function Part1({ formData, onChange, missingValues = []}) {
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
                    <textarea id="textarea" rows="5" value={formData.description} onChange={(event) => { onValueChange("description", event.target.value) }}></textarea>
                </div>
            </div>

            <div className="input-row">
                <TextField name="Postal code" id="postalCode" showError={missingValues.includes("postalCode")} value={formData.postalCode} onChange={(event) => { onValueChange("postalCode", event.target.value) }}></TextField>
                <TextField name="City" id="city" showError={missingValues.includes("city")} value={formData.city} onChange={(event) => { onValueChange("city", event.target.value) }}></TextField>
                <TextField name="Address" id="address" showError={missingValues.includes("address")} value={formData.address} onChange={(event) => { onValueChange("address", event.target.value) }}></TextField>
            </div>

            <h2>Subtitle inside the form</h2>

            <div className="input-group">
                <label htmlFor="select">Open At</label>
                <select value={formData.openAt} onChange={(event) => { onValueChange("openAt", event.target.value) }} id="select">
                    <option value="Every Day">Every Day</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Weekends">Weekends</option>
                </select>
            </div>

            <hr />
        </Fragment>
    )
}

export default Part1;