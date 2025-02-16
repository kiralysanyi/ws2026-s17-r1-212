/* Layout planner thing */

import WashingMachineSvg from "../../assets/washing-machine.svg"
import SpaceSvg from "../../assets/space.svg"
import ArmchairSvg from "../../assets/armchair.svg"

import { Fragment, useState } from "react"
import GridCell from "../GridCell";

const gridColumns = 5;
const gridRows = 6

//generate json based on the above values
const gridTemplateJson = {}
Array.from({ length: gridColumns }).map((_, col) => {
    gridTemplateJson[col] = {}
    Array.from({ length: gridRows }).map((_, row) => {
        gridTemplateJson[col][row] = "Empty"
    })
})
//simple function to determine if the cell is next to a wall
function isWallNearby(col, row, cells) {
    //check for always allowed cells
    if (
        row === 0 ||
        row === gridRows - 1 ||
        col === 0 ||
        col === gridColumns - 1
    ) {
        return true;
    }

    //check nearby cells for walls
    if (
        (cells[col - 1]?.[row] === "Wall") ||
        (cells[col + 1]?.[row] === "Wall") ||
        (cells[col]?.[row - 1] === "Wall") ||
        (cells[col]?.[row + 1] === "Wall")
    ) {
        return true;
    }

    return false;
}

let savedFloorPlan = gridTemplateJson;
try {
    savedFloorPlan = JSON.parse(window.name)["floorplanner"]
    savedFloorPlan = savedFloorPlan ? savedFloorPlan : gridTemplateJson
} catch (error) {
    console.log("No saved data found for floor planner");
}

function Part2({ onChange }) {
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

            <div className="grid">
                {
                    // render grid
                    Array.from({ length: gridRows }).map((_, row) => (
                        Array.from({ length: gridColumns }).map((_, col) => (
                            <GridCell key={`${col}-${row}`} row={row} col={col} type={cells[col][row]} allowPlacement={isWallNearby(col, row, cells)} onClear={
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