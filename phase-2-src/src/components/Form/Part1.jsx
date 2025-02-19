import { Fragment } from "react";
import TextField from "../TextField";

function Part1({ formData, onChange, errors = {} }) {
    const onValueChange = (key, value) => {
        onChange(key, value)
    }

    return (
        <Fragment>
            <h2>Information about the Location</h2>
            <div className="input-row">
                <TextField
                    error={errors["name"] ? errors["name"] : null }
                    name="Name"
                    id="name"
                    value={formData.name}
                    onChange={(event) => { onValueChange("name", event.target.value) }}
                ></TextField>
            </div>

            <div className="input-row">
                <div className="input-group">
                    <label htmlFor="textarea">Desctiption</label>
                    <textarea
                        id="textarea"
                        className={`${errors.hasOwnProperty("description") ? "error" : ""}`}
                        rows="5"
                        value={formData.description}
                        onChange={(event) => { onValueChange("description", event.target.value) }}
                    ></textarea>
                    {errors.hasOwnProperty("description") ? <span className="input-error">{errors["description"]}</span> : ""}
                </div>
            </div>

            <div className="input-row">
                <TextField
                    name="Postal code"
                    id="postalCode"
                    error={errors["postalCode"] ? errors["postalCode"] : null}
                    value={formData.postalCode}
                    onChange={(event) => { onValueChange("postalCode", event.target.value) }}
                ></TextField>

                <TextField
                    name="City"
                    id="city"
                    error={errors["city"] ? errors["city"] : null}
                    value={formData.city}
                    onChange={(event) => { onValueChange("city", event.target.value) }}
                ></TextField>

                <TextField
                    name="Address"
                    id="address"
                    error={errors["address"] ? errors["address"] : null}
                    value={formData.address}
                    onChange={(event) => { onValueChange("address", event.target.value) }}
                ></TextField>
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
                        <input
                            className={`${errors.hasOwnProperty("from") ? "error" : ""}`}
                            value={formData.from}
                            onChange={(event) => { onValueChange("from", event.target.value) }}
                            type="time"
                            id="from"
                        />
                        {errors.hasOwnProperty("from") ? <span className="input-error">{errors["from"]}</span> : ""}
                    </div>
                    <div className="input-group">
                        <label htmlFor="to">To</label>
                        <input className={`${errors.hasOwnProperty("to") ? "error" : ""}`} value={formData.to} onChange={(event) => { onValueChange("to", event.target.value) }} type="time" id="to" />
                        {errors.hasOwnProperty("to") ? <span className="input-error">{errors["to"]}</span> : ""}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Part1;