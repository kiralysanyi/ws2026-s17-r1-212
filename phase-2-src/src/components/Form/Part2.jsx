/* Layout planner thing */

import WashingMachineSvg from "../../assets/washing-machine.svg"
import SpaceSvg from "../../assets/space.svg"
import ArmchairSvg from "../../assets/armchair.svg"
import AlertSvg from "../../assets/alert.svg"

import { Fragment, useState } from "react"
import GridCell from "../GridCell";

import { gridColumns, gridRows } from "../../gridconf";

//generate json based on the above values
const gridTemplateJson = {}
Array.from({ length: gridColumns }).map((_, col) => {
    gridTemplateJson[col] = {}
    Array.from({ length: gridRows }).map((_, row) => {
        gridTemplateJson[col][row] = "-"
    })
})

let savedFloorPlan = gridTemplateJson;
try {
    savedFloorPlan = JSON.parse(window.name)["floorplanner"]
    savedFloorPlan = savedFloorPlan ? savedFloorPlan : gridTemplateJson
} catch (error) {
    console.log("No saved data found for floor planner");
}

function Part2({ onChange, showError }) {
    const [cells, setCells] = useState(savedFloorPlan)
    const setCell = (row, col, type) => {
        setCells((prev) => (
            {
                ...prev,
                [col]: {
                    ...prev[col],
                    [row]: type
                }
            }
        ))
    }

    onChange(cells)

    console.log("Layout: ", cells)

    const handleDragStart = (event, type) => {
        event.dataTransfer.clearData();
        event.dataTransfer.setData("text/plain", type);
    }

    return (
        <Fragment>
            <h2>Shop Layout</h2>
            <div className="dnd-row">
                <div className="grid-item washer" draggable onDragStart={(e) => { handleDragStart(e, "Washer (8 kg)") }}>
                    <img src={WashingMachineSvg} alt="Washing Machine" />
                    <span>Washer (8 kg)</span>
                </div>
                <div className="grid-item washer" draggable onDragStart={(e) => { handleDragStart(e, "Washer (11 kg)") }}>
                    <img src={WashingMachineSvg} alt="Washing Machine" />
                    <span>Washer (11 kg)</span>
                </div>
                <div className="grid-item dryer" draggable onDragStart={(e) => { handleDragStart(e, "Dryer (18 kg)") }}>
                    <img src={WashingMachineSvg} alt="Drying Machine" />
                    <span>Dryer (18 kg)</span>
                </div>
                <div className="grid-item dryer" draggable onDragStart={(e) => { handleDragStart(e, "Dryer (25 kg)") }}>
                    <img src={WashingMachineSvg} alt="Drying Machine" />
                    <span>Dryer (25 kg)</span>
                </div>
                <div className="grid-item" draggable onDragStart={(e) => { handleDragStart(e, "Waiting Area") }}>
                    <img src={ArmchairSvg} alt="Waiting Area" />
                    <span>Waiting Area</span>
                </div>
                <div className="grid-item" draggable onDragStart={(e) => { handleDragStart(e, "Folding Tables") }}>
                    <img src={SpaceSvg} alt="Folding Tables" />
                    <span>Folding Table</span>
                </div>
            </div>

            {showError ? <div className="alert">
                <img src={AlertSvg} alt="Alert" />
                <span>Washers or Dryers can only be next to a wall.</span>
            </div> : ""}



            <div className="grid">
                {
                    // render grid
                    Array.from({ length: gridRows }).map((_, row) => (
                        Array.from({ length: gridColumns }).map((_, col) => (
                            <GridCell key={`${col}-${row}`} row={row} col={col} type={cells[col][row]} onClear={
                                setCell
                            } onPlacedElement={setCell}></GridCell>
                        ))
                    ))
                }
            </div>
        </Fragment>
    )
}

export default Part2