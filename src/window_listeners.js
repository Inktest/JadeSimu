window.addEventListener('resize', updateCanvas)

function mouseupEvent(event) {
    if (event.target !== canvas) return;
    held = false
    calculateHitboxMap()
}

function mousemoveEvent(event) {
    

    cursorX = Math.round(event.pageX/dotSpace/scale)
    cursorY = Math.round(event.pageY/dotSpace/scale)

    if (currWire != null) {
        updateCanvas()
        if (Math.abs(cursorX-currWire.start[0]) < Math.abs(cursorY-currWire.start[1]))
            currWire.end = [currWire.start[0],cursorY]
        else 
            currWire.end = [cursorX, currWire.start[1]]
        currWire.draw()
    }

    if (!selectedComponent) return
    if (held) {
        movedX += event.movementX/dotSpace/scale
        movedY += event.movementY/dotSpace/scale

        let floorX = Math.floor(movedX)
        let floorY = Math.floor(movedY)

        if (Math.abs(floorX) >= 1 || Math.abs(floorY) >= 1) {
            movedX -= floorX
            movedY -= floorY
            selectedComponent.translate([floorX,floorY])
            updateCanvas()
        }
    }

}

function mousedownEvent(event) {
    if (event.target !== canvas) return;
        unselectSelectedComponent()
    if (currWire != null && currWire.end != [0,0])
        wires.push(currWire)
    currWire = null
    let component = hitboxMap[[Math.floor(event.pageX/dotSpace/scale), Math.floor(event.pageY/dotSpace/scale)]]
    if (!component) {
        if (!simuActivated)
            updateCanvas()
        return
    }
    
    selectComponent(component[0])
}

if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
    canvas.addEventListener("touchend", (event) => {
        mouseupEvent(event)
     event.preventDefault();   
    })
    
    canvas.addEventListener("touchmove", (event) => {
        mousemoveEvent(event)
     event.preventDefault();   
    })
    
    canvas.addEventListener("touchstart", (event) => {
        mousedownEvent(event)
     event.preventDefault();   
    });
} else {
    window.addEventListener("mouseup", (event) => mouseupEvent(event))
    window.addEventListener("mousemove", (event) => mousemoveEvent(event))
    window.addEventListener("mousedown", (event) => mousedownEvent(event));
}

window.addEventListener("wheel", (event) => {
    scale += event.deltaY * -0.001
    if (scale < 0.3) scale = 0.3
    if (scale > 4.4) scale = 4.4
    updateCanvas()
})

window.addEventListener("keydown", (event) => {
    
    switch (event.key.toLowerCase()) {
        case "delete": handleDeleteKeyPress(event); break
        case "r": handleRKeyPress(event); break
        case "w": handleWKeyPress(event); break
    }
});