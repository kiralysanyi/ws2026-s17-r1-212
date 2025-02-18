import { Fragment } from "react"

function Part3({ formData, onChange }) {
    return (
        <Fragment>
            <h2>Amenities and Services</h2>
            <label className="cnr-label">
                <input type="checkbox" checked={formData["freeWiFi"]} onChange={(event) => {onChange("freeWiFi", event.target.checked)}} />
                <span>Free Wi-Fi</span>
            </label>
            <label className="cnr-label">
                <input type="checkbox" checked={formData["accessibleEntry"]} onChange={(event) => {onChange("accessibleEntry", event.target.checked)}} />
                <span>Accessible entry</span>
            </label>
            <label className="cnr-label">
                <input type="checkbox" checked={formData["loungeArea"]} onChange={(event) => {onChange("loungeArea", event.target.checked)}} />
                <span>Lounge Area</span>
            </label>
            <label className="cnr-label">
                <input type="checkbox" checked={formData["backgroundMusic"]} onChange={(event) => {onChange("backgroundMusic", event.target.checked)}} />
                <span>Background music</span>
            </label>
            <label className="cnr-label">
                <input type="checkbox" checked={formData["customerService"]} onChange={(event) => {onChange("customerService", event.target.checked)}} />
                <span>Personal customer service</span>
            </label>

            <hr />

            <h3>Parking</h3>

            <div className="input-row" onChange={(event) => { onChange("parking", event.target.value) }}>
                <label className="cnr-label">
                    {/* Added readOnly flag to supress some react error messages, because the code works, and I hate when the console is flooded with a bunch of error messages */}
                    <input type="radio" name="radio-parking" value="Easy" readOnly checked={formData["parking"] == "Easy"? true: false} />
                    <span>Easy</span>
                </label>
                <label className="cnr-label">
                    <input type="radio" name="radio-parking" readOnly value="Medium" checked={formData["parking"] == "Medium"? true: false} />
                    <span>Medium</span>
                </label>
                <label className="cnr-label">
                    <input type="radio" name="radio-parking" readOnly value="Hard" checked={formData["parking"] == "Hard"? true: false} />
                    <span>Hard</span>
                </label>
            </div>
        </Fragment>
    )
}

export default Part3