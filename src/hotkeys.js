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