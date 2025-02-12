


function mouseupEvent(event) {
    if (event.target !== canvas) return;
    
    if (pressedShift && drawnArea) {
        for (let i = Math.min(Math.floor(clickedX), Math.floor(selectedX)); i <= Math.max(Math.ceil(clickedX), Math.ceil(selectedX)); i++)
            for (let j = Math.min(Math.floor(clickedY), Math.floor(selectedY)); j <= Math.max(Math.ceil(clickedY), Math.ceil(selectedY)); j++) {
        let component = hitboxMap[[Math.floor(i-offsetX), Math.floor(j-offsetY)]]
        if (!component) {
            continue
        }
        for (let c of component)
            selectComponent(c, true)
        
    } 
    updateCanvas()     
}
held = false
calculateHitboxMap()
saveComponents()

}

function mousemoveEvent(event) {
    
    //if (document.activeElement.nodeName.toLocaleLowerCase() === 'input')
    //    return



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

    
    if (event.buttons === 1 && selectedComponent.length == 0 && document.activeElement.nodeName.toLowerCase() !== 'input') {
        if (pressedShift) {
            updateCanvas()
            selectedX = event.pageX/dotSpace/scale
            selectedY = event.pageY/dotSpace/scale
            drawnArea = true
            new RectangleArray([clickedX, clickedY], [ selectedX, selectedY], 1, "#f00").draw()
        } else {
        offsetX += event.movementX/dotSpace/scale
        offsetY += event.movementY/dotSpace/scale
        updateCanvas()
    }
        
    }

    if (!held) return

        movedX += event.movementX/dotSpace/scale
        movedY += event.movementY/dotSpace/scale

        let floorX = Math.floor(movedX)
        let floorY = Math.floor(movedY)

        if (Math.abs(floorX) >= 1 || Math.abs(floorY) >= 1) {

            if (selectedComponent.length > 0)
                for (let c of selectedComponent)
                    c.translate([floorX, floorY])

            movedX -= floorX
            movedY -= floorY
            //if (selectedComponent.length > 0)
            //    for (let c of selectedComponent)
            //        c.moveTo([Math.floor(event.pageX/dotSpace/scale-offsetX-objOffsetX), Math.floor(event.pageY/dotSpace/scale-offsetY-objOffsetY)])
            updateCanvas()
        }

}

objOffsetX = 0
objOffsetY = 0

clickedX = 0
clickedY = 0
selectedX = 0
selectedY = 0
pressedShift = false
drawnArea = false

function mousedownEvent(event) {

drawnArea = false

    clickedX = event.pageX/dotSpace/scale//-offsetX
    clickedY = event.pageY/dotSpace/scale//-offsetY
    pressedShift = event.shiftKey
    
    if (event.target !== canvas) return;
    if (!event.shiftKey) unselectSelectedComponent()
    if (currWire != null && currWire.end != [0,0]) {
        //wires.push(currWire)
        let cW = new WireComponent(currWire.start)
        cW.options.options[0].setValue(currWire.start[1] - currWire.end[1])
        cW.options.options[1].setValue(currWire.start[0] - currWire.end[0])
        let c = addComponent(cW)
        selectComponent(c)
        unselectSelectedComponent()
        c.position = currWire.end
    }
    currWire = null
    let component = hitboxMap[[Math.floor(event.pageX/dotSpace/scale-offsetX), Math.floor(event.pageY/dotSpace/scale-offsetY)]]
    if (!component) {
        if (!simuActivated)
            updateCanvas()
        return
    }
    if (event.shiftKey)
        for (let c of component)
            selectComponent(c, true)
    else 
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
        case "arrowup": case "arrowdown": case "arrowleft": case "arrowright": handleArrowKeyPress(event); break
    }
});

window.addEventListener('load', () => {
    let savedData = localStorage.getItem('components')
    if (savedData)
        loadFromFileText(savedData)
})