


function mouseupEvent(event) {
    if (event.target !== canvas) return;
    held = false
    calculateHitboxMap()
}

function mousemoveEvent(event) {
    
    if (document.activeElement.nodeName.toLocaleLowerCase() === 'input')
        return

    cursorX = Math.round(event.pageX/dotSpace/scale)
    cursorY = Math.round(event.pageY/dotSpace/scale)

    if (currWire != null) {
        updateCanvas()
        if (Math.abs(parseInt(cursorX-offsetX+0.5)-currWire.start[0]) < Math.abs(parseInt(cursorY-offsetY+0.5)-currWire.start[1]))
            currWire.end = [currWire.start[0],parseInt(cursorY-offsetY+0.5)]
        else 
            currWire.end = [parseInt(cursorX-offsetX+0.5), currWire.start[1]]
        currWire.clone().translate([offsetX, offsetY]).draw()
    }

    
    if (event.buttons === 1 && !selectedComponent) {
        offsetX += event.movementX/dotSpace/scale
        offsetY += event.movementY/dotSpace/scale
        
        updateCanvas()
        
    }

    if (!held) return

        movedX += event.movementX/dotSpace/scale
        movedY += event.movementY/dotSpace/scale

        let floorX = Math.floor(movedX)
        let floorY = Math.floor(movedY)

        if (Math.abs(floorX) >= 1 || Math.abs(floorY) >= 1) {
            movedX -= floorX
            movedY -= floorY
            if (selectedComponent)
                selectedComponent.moveTo([Math.floor(event.pageX/dotSpace/scale-offsetX-objOffsetX), Math.floor(event.pageY/dotSpace/scale-offsetY-objOffsetY)])
            updateCanvas()
        }

}

objOffsetX = 0
objOffsetY = 0

function mousedownEvent(event) {

    
    if (event.target !== canvas) return;
        unselectSelectedComponent()
    if (currWire != null && currWire.end != [0,0])
        wires.push(currWire)
    currWire = null
    let component = hitboxMap[[Math.floor(event.pageX/dotSpace/scale-offsetX), Math.floor(event.pageY/dotSpace/scale-offsetY)]]
    if (!component) {
        if (!simuActivated)
            updateCanvas()
        return
    }
    
    selectComponent(component[0])
    objOffsetX = event.pageX/dotSpace/scale-offsetX - component[0].position[0]
    objOffsetY = event.pageY/dotSpace/scale-offsetY - component[0].position[1]
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
    
    if (document.activeElement.nodeName.toLocaleLowerCase() !== 'input')
    switch (event.key.toLowerCase()) {
        case "delete": handleDeleteKeyPress(event); break
        case "r": handleRKeyPress(event); break
        case "w": handleWKeyPress(event); break
        case "q": handleQKeyPress(event); break
        case "c": handleCKeyPress(event); break
    }
});

window.addEventListener('load', () => {
    let savedData = localStorage.getItem('components')
    if (savedData)
        loadFromFileText(savedData)
})