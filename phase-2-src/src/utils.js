// Export / copy to clipboard function of Part4 (step 4 of form)

import { gridColumns, gridRows } from "./gridconf";

function convertGridToCSV(grid) {
    let rows = []
    let row = [];
    // r = row, c = column
    for (let r = 0; r < gridRows; r++) {
        for (let c in grid) {
            row.push(grid[c][r])
        }
        rows.push(row)
        row = []
    }

    let output = ""
    for (let i in rows) {
        output += rows[i].join(",") + "\n"
    }
    output = output.trim();
    return output;
}

function copyToClipboard() {
    let formData = sessionStorage.getItem("formdata")
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    //I have added this alert because I hate when I get no feedback when copying with a button press
    window.alert("Copied form data to clipboard")
}

function exportFloorplan() {
    let grid = JSON.parse(sessionStorage.getItem("floorplanner"))
    let csv = convertGridToCSV(grid)
    let blob = new Blob([csv], { type: "text/csv" })
    const blobURL = URL.createObjectURL(blob)
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "floorplan.csv";
    link.click();
    URL.revokeObjectURL(fileUrl);
}

export { exportFloorplan, copyToClipboard }