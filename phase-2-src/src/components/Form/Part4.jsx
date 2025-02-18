import { copyToClipboard, exportFloorplan } from "../../utils";

function Part4() {
    return (
        <div className="step-4-screen">
            <h3>Successful submission!</h3>
            <p>Thank you for the new location registration!</p>
            <button className="btn" onClick={copyToClipboard}>COPY FORM VALUE</button>
            <button className="btn" onClick={exportFloorplan}>EXPORT FLOORPLAN</button>

            <hr />

            <button className="btn" onClick={() => {window.name = ""; location.reload()}}>START OVER</button>
        </div>
    )
}

export default Part4