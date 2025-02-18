import { Fragment } from "react"

function Part3({ formData, onChange }) {
    return (
        <Fragment>
            <h2>Amenities and Services</h2>
            <label className="cnr-label">
                <input type="checkbox" onChange={(event) => {onChange("freeWiFi", event.target.checked)}} />
                <span>Free Wi-Fi</span>
            </label>
            <label className="cnr-label">
                <input type="checkbox" onChange={(event) => {onChange("accessibleEntry", event.target.checked)}} />
                <span>Accessible entry</span>
            </label>
            <label className="cnr-label">
                <input type="checkbox" onChange={(event) => {onChange("loungeArea", event.target.checked)}} />
                <span>Lounge Area</span>
            </label>
            <label className="cnr-label">
                <input type="checkbox" onChange={(event) => {onChange("backgroundMusic", event.target.checked)}} />
                <span>Background music</span>
            </label>
            <label className="cnr-label">
                <input type="checkbox" onChange={(event) => {onChange("customerService", event.target.checked)}} />
                <span>Personal customer service</span>
            </label>

            <hr />

            <h3>Parking</h3>

            <div className="input-row" onChange={(event) => { onChange("parking", event.target.value) }}>
                <label className="cnr-label">
                    <input type="radio" name="radio-parking" value="Easy" defaultChecked />
                    <span>Easy</span>
                </label>
                <label className="cnr-label">
                    <input type="radio" name="radio-parking" value="Medium" />
                    <span>Medium</span>
                </label>
                <label className="cnr-label">
                    <input type="radio" name="radio-parking" value="Hard" />
                    <span>Hard</span>
                </label>
            </div>
        </Fragment>
    )
}

export default Part3