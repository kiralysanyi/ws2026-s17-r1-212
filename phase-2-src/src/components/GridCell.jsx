/*
    Types: Washer (8kg), Washer (11kg), Dryer (18kg), Dryer (25kg), Wall, Entrance, Empty, Waiting Area, Folding Tables
*/

import { useState } from "react";

//allowPlacement means allow dryer/washing machine in cell
function GridCell({ type, allowPlacement, onPlacedElement, placementDeclined, row, col, onClear }) {
    const displayName = type;
    type = type.toLowerCase()
    const [dragOver, setDragOver] = useState(false)

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
        if (allowPlacement) {
            onPlacedElement(row, col, data)
        } else {
            if (!data.toLowerCase().includes("washer") && !data.toLowerCase().includes("dryer")) {
                onPlacedElement(row, col, data)
            }
        }
    }

    return (
        <div 
        onClick={() => {onClear(row,col, "empty")}}
        onDoubleClick={() =>{onPlacedElement(row, col, "Wall")}}
        onContextMenu={(e) => {e.preventDefault(); onPlacedElement(row, col, "Entrance")}}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`grid-item ${type} ${dragOver? "dragover":""}`}
        >
            {type != "empty" && type != "entrance" ? <span>{displayName}</span>:""}
        </div>
    )
}

export default GridCell;