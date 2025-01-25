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
    let aCursorX = parseInt(cursorX-offsetX) 
    let aCursorY = parseInt(cursorY-offsetY) 
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

function handleCKeyPress(event) {
    if (event.ctrlKey && selectedComponent) {
    let c = addComponent(selectedComponent.clone(), true)
        unselectSelectedComponent()
        selectComponent(c)
    }
}

function handleArrowKeyPress(event) {
    if (!event.ctrlKey) return
    for (let c of components) {
        switch (event.key.toLowerCase().replace("arrow", "")) {
            case "up": c.translate([0, -1]); break
            case "down": c.translate([0, 1]); break
            case "right": c.translate([1, 0]); break
            case "left": c.translate([-1, 0]); break
        }
    }
    for (let w of wires) {
        switch (event.key.toLowerCase().replace("arrow", "")) {
            case "up": w.translate([0, -1]); break
            case "down": w.translate([0, 1]); break
            case "right": w.translate([1, 0]); break
            case "left": w.translate([-1, 0]); break
        }
    }
    updateCanvas()
    saveComponents()
}