const canvas = document.getElementById('cadeCanvas')
const context = canvas.getContext('2d')

const SELECTED_COLOR = "#a87738"
const DEFAULT_COLOR = "#000"
const GRID_COLOR = "#9c8c73"
const BOX_COLOR = "#2b8742"
const DIV_COLOR = "#f5f5f5"
const BTN_COLOR = "#efefef"
const BTN_HOVER_COLOR = "#e0e0e0"

let drawnComp;

var scale = 1
var offsetX = 10
var offsetY = 10
const dotSize = 1
const dotSpace = 20

var movedX = 0
var movedY = 0

held = false

var cursorX
var cursorY

function createImageButton(url, text) {
    let btn = document.createElement("input")
    btn.type = "button"
    //btn.value = COMPONENTS_LIST[i].name
    if (text) 
    btn.value = text
    btn.style.background = `url(${url})`
    btn.style.backgroundRepeat = "no-repeat"
    btn.style.backgroundSize = "contain"
    btn.style.backgroundPositionY = "center"
    
    btn.style.borderWidth = "1px"
    btn.style.borderColor = BTN_HOVER_COLOR
    btn.style.backgroundColor = BTN_COLOR

    if (!text) {
    btn.addEventListener('mouseout', () => {
        btn.style.backgroundColor = BTN_COLOR
    })
    btn.addEventListener('mouseover', () => {
        btn.style.backgroundColor = BTN_HOVER_COLOR
    })
}

    btn.style.height = "25px"
    btn.style.width = "25px"
    if (text)
    btn.style.width = "50px"

    return btn
}

    let heightLimit = 500
    let widthLimit = 500

function updateCanvas() {

     canvas.width = window.innerWidth
        canvas.height = window.innerHeight

    context.fillStyle = "#ffffff"
    context.fillRect(0, 0, canvas.width, canvas.height)

    drawGrid(0, 0)
    drawGrid(1, 0)
    drawGrid(0, 1)
    drawGrid(1, 1)
    drawAxis()

    if (drawnComp) {
        drawComponent(drawnComp)
        clearOptions()
        drawnComp.options.addOptions()
        }

}

function drawComponent(comp) {

    /*if (comp.inouts.length > 0) {
        for (let inout of comp.inouts)
        new Arc(inout,0.25,0,2*Math.PI,1,"#0f0").translate(comp.position).translate([offsetX, offsetY]).draw()
    }*/

    for (let i = 0; i < comp.symbol.strokes.length; i++) {
    comp.symbol.strokes[i].clone().translate(comp.position).translate([offsetX, offsetY]).draw()
    }
}

function drawGrid(mX, mY) {

    context.fillStyle = GRID_COLOR
    for (let x = (offsetX)*dotSpace*scale; x < canvas.width && x < scale*(widthLimit+dotSpace*offsetX); x += dotSpace*scale) {
        for (let y = (offsetY)*dotSpace*scale; y < canvas.height && y < scale*(heightLimit+dotSpace*offsetY); y += dotSpace*scale) {
            context.fillRect(x-(mX?widthLimit*0.8*scale:0), y-(mY?heightLimit*0.8*scale:0), dotSize, dotSize)
        }
    }
}

function drawAxis() {
    new Line([-widthLimit/20+2, 0], [widthLimit/20-1, 0], 2, "#bbb").translate([offsetX, offsetY]).draw()
    new Line([0, heightLimit/20-1], [0, -heightLimit/20+2], 2, "#bbb").translate([offsetX, offsetY]).draw()
}




function mouseupEvent(event) {
    if (event.target !== canvas) return;

held = false


}

function mousemoveEvent(event) {
    
    //if (document.activeElement.nodeName.toLocaleLowerCase() === 'input')
    //    return



    cursorX = Math.round(event.pageX/dotSpace/scale)
    cursorY = Math.round(event.pageY/dotSpace/scale)

    
    if (event.buttons === 1 && document.activeElement.nodeName.toLowerCase() !== 'input') {
        offsetX += event.movementX/dotSpace/scale
        offsetY += event.movementY/dotSpace/scale
 
        
    }

    if (!held) return

        movedX += event.movementX/dotSpace/scale
        movedY += event.movementY/dotSpace/scale

        let floorX = Math.floor(movedX)
        let floorY = Math.floor(movedY)


            movedX -= floorX
            movedY -= floorY
            //if (selectedComponent.length > 0)
            //    for (let c of selectedComponent)
            //        c.moveTo([Math.floor(event.pageX/dotSpace/scale-offsetX-objOffsetX), Math.floor(event.pageY/dotSpace/scale-offsetY-objOffsetY)])
            updateCanvas()


}

clickedX = 0
clickedY = 0
selectedX = 0
selectedY = 0
pressedShift = false
drawnArea = false

function mousedownEvent(event) {
    drawnArea = false;

    clickedX = event.pageX / dotSpace / scale;
    clickedY = event.pageY / dotSpace / scale;
    pressedShift = event.shiftKey;

    if (event.target !== canvas) return;

    held = true

updateCanvas()

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

window.addEventListener("resize", () => updateCanvas())

window.addEventListener("wheel", (event) => {
    if (document.activeElement.nodeName.toLocaleLowerCase() === 'input' || document.activeElement.nodeName.toLocaleLowerCase() === 'textarea')
       return
    scale += event.deltaY * -0.001
    if (scale < 0.3) scale = 0.3
    if (scale > 4.4) scale = 4.4
    updateCanvas()
})

function getHitboxFromCorners(c1, c2) {
    let hitbox = []
    for (let i = c1[0]; i <= c2[0]; i++)
        for (let j = c1[1]; j <= c2[1]; j++)
            hitbox.push([i, j])
    return hitbox
}

updateCanvas()