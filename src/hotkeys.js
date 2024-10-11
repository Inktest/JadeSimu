function handleDeleteKeyPress(event) {
   deleteSelectedObject()
}
function handleRKeyPress(event) {
    //rotateSelectedObject()
}

function handleWKeyPress(event) {
    unselectSelectedComponent()
    wire = new Line([parseInt(cursorX-offsetX+0.5),parseInt(cursorY-offsetY+0.5)], [,], 1, DEFAULT_COLOR, false)
    if (currWire == null)
        currWire = wire
    currWire.draw()
}


function handleQKeyPress(event) {
    let aCursorX = parseInt(cursorX-offsetX+0.5) 
    let aCursorY = parseInt(cursorY-offsetY+0.5) 
    for (let i = 0; i < wires.length; i++) {
        if ((aCursorY-wires[i].start[1])*(aCursorX-wires[i].end[0]) == (aCursorY-wires[i].end[1])*(aCursorX-wires[i].start[0])) {
            if ((wires[i].start[0] == wires[i].end[0] && 
                (wires[i].start[1] <= aCursorY && aCursorY <= wires[i].end[1] ||
                wires[i].end[1] <= aCursorY && aCursorY <= wires[i].start[1])
            ) || (
                wires[i].start[1] == wires[i].end[1] && 
                (wires[i].start[0] <= aCursorX && aCursorX <= wires[i].end[0] ||
                wires[i].end[0] <= aCursorX && aCursorX <= wires[i].start[0])
            )) {
            console.log(wires[i])
            wires.splice(i, 1)
            updateCanvas()
            break
        }
        }
    }
}