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
            console.log(wires[i])
            wires.splice(i, 1)
            updateCanvas()
            break
        }
    }
}