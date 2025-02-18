/*
    Types: Washer (8kg), Washer (11kg), Dryer (18kg), Dryer (25kg), Wall, Entrance, Empty, Waiting Area, Folding Tables
*/

import { useState } from "react";
import WashingMachineSvg from "../assets/washing-machine.svg"
import SpaceSvg from "../assets/space.svg"
import ArmchairSvg from "../assets/armchair.svg"

//allowPlacement means allow dryer/washing machine in cell
function GridCell({ type, onPlacedElement, row, col, onClear }) {
    const displayName = type;
    type = type.toLowerCase()
    const [dragOver, setDragOver] = useState(false)

    const iconMap = {
        "waiting area": ArmchairSvg,
        "folding table": SpaceSvg,
    };

    const icon = type.includes("washer") || type.includes("dryer")
        ? WashingMachineSvg
        : iconMap[type] || null;

    const onDragOver = (e) => {
        e.preventDefault();
        setDragOver(true)
    }

    const onDragLeave = () => {
        setDragOver(false)
    }

    const onDrop = (e) => {
        setDragOver(false)
        const data = e.dataTransfer.getData("text");
        console.log(data, col, row)
        onPlacedElement(row, col, data)
    }

    return (
        <div
            onClick={() => { onClear(row, col, "-") }}
            onDoubleClick={() => { onPlacedElement(row, col, "Wall") }}
            onContextMenu={(e) => { e.preventDefault(); onPlacedElement(row, col, "Entrance") }}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`grid-item ${type} ${dragOver ? "dragover" : ""}`}
        >
            {icon ? <img src={icon} alt={type} /> : ""}
            {type != "-" && type != "entrance" ? <span>{displayName}</span> : ""}
        </div>
    )
}

export default GridCell;