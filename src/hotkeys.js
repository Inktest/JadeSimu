function handleDeleteKeyPress(event) {
   deleteSelectedObject()
}
function handleRKeyPress(event) {
    //rotateSelectedObject()
}

function handleWKeyPress(event) {
    unselectSelectedComponent()
    wire = new Line([cursorX,cursorY], [,], 1, DEFAULT_COLOR, false)
    if (currWire == null)
        currWire = wire
    currWire.draw()
}


function handleQKeyPress(event) {
    for (let i = 0; i < wires.length; i++) {
        if ((cursorY-wires[i].start[1])*(cursorX-wires[i].end[0]) == (cursorY-wires[i].end[1])*(cursorX-wires[i].start[0])) {
            if ((wires[i].start[0] == wires[i].end[0] && 
                (wires[i].start[1] <= cursorY && cursorY <= wires[i].end[1] ||
                wires[i].end[1] <= cursorY && cursorY <= wires[i].start[1])
            ) || (
                wires[i].start[1] == wires[i].end[1] && 
                (wires[i].start[0] <= cursorX && cursorX <= wires[i].end[0] ||
                wires[i].end[0] <= cursorX && cursorX <= wires[i].start[0])
            )) {
            console.log(wires[i])
            wires.splice(i, 1)
            updateCanvas()
            break
        }
        }
    }
}