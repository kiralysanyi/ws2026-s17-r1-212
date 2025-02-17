import { gridColumns, gridRows } from "./gridconf";

//simple function to determine if the cell is next to a wall
function isWallNearby(col, row, cells) {
    //convert col and row to int because for some reason it converts to string the way here. Now I know why I decided to learn kotlin on december 28 2024 🤣
    col = parseInt(col)
    row = parseInt(row)
    //check for always allowed cells
    if (
        row == 0 ||
        row == gridRows - 1 ||
        col == 0 ||
        col == gridColumns - 1
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

// grid object: {col:{row:"item"}}

/**
 * Returns true if valid (all washers and dryers next to wall or grid edge), returns false if not valid
 * @param {*} grid 
 */
function GridValidator(grid) {
    for (let col in grid) {
        for (let row in grid[col]) {
            if (grid[col][row].toLowerCase().includes("washer") || grid[col][row].toLowerCase().includes("dryer")) {
                if (!isWallNearby(col, row, grid)) {
                    return false;
                }
            }
        }
    }

    return true;
}

export default GridValidator;