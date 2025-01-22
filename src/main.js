const canvas = document.getElementById('cadeCanvas')
const context = canvas.getContext('2d')

const A4_width = 1748
const A4_height = 1240
const dotSize = 1
const dotSpace = 20

const SELECTED_COLOR = "#a87738"
const DEFAULT_COLOR = "#000"
const GRID_COLOR = "#9c8c73"
const BOX_COLOR = "#2b8742"
const DIV_COLOR = "#f5f5f5"
const BTN_COLOR = "#efefef"
const BTN_HOVER_COLOR = "#e0e0e0"

var scale = 1
var offsetX = 0
var offsetY = 0

var hitboxMap = {}
var wires = []
var currWire
var components = []

var selectedComponent
var held

var movedX = 0
var movedY = 0

var cursorX
var cursorY


var currGrafcetStages = []

function updateCanvas(noUpdateRes) {
    if (!noUpdateRes) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }

context.fillStyle = "#ffffff"
context.fillRect(0, 0, canvas.width, canvas.height)

  drawGrid()
  drawComponents()
  drawWires()
  drawBox()

  if (selectedComponent) drawComponent(selectedComponent)
if (!simuActivated)
    convertDiagramToNodes()

}

function drawGrid() {
    
    context.fillStyle = GRID_COLOR
    for (let x = offsetX*dotSpace*scale; x < canvas.width && x < scale*(A4_width+dotSpace*offsetX); x += dotSpace*scale) {
        for (let y = offsetY*dotSpace*scale; y < canvas.height && y < scale*(A4_height+dotSpace*offsetY); y += dotSpace*scale) {
            context.fillRect(x, y, dotSize, dotSize)
        }
    }
}

function drawBoxLine(x1, y1, x2, y2) {
    context.strokeStyle = BOX_COLOR
    
    context.beginPath()
    context.moveTo((x1+offsetX)*dotSpace*scale+0.5, (y1+offsetY)*dotSpace*scale+0.5)
    context.lineTo((x2+offsetX)*dotSpace*scale+0.5, (y2 + offsetY)*dotSpace*scale+0.5)
    context.lineWidth = 2
    context.stroke()

    context.fillRect(5, 5, 1, 1)
}

function drawBox() {
   drawBoxLine(1, 3, 1, 61)
   drawBoxLine(1, 3, 86, 3)
   drawBoxLine(86, 3, 86, 61)
   drawBoxLine(1, 61, 86, 61)
   drawBoxLine(55, 57, 86, 57)
   drawBoxLine(70, 57, 70, 61)
   drawBoxLine(55, 57, 55, 61)
   drawBoxLine(70, 58.5, 86, 58.5)

   context.fillStyle = BOX_COLOR
        

        context.textBaseline = "middle"
        context.textAlign = "left"
        context.font = `${40*scale}px Arial`
        context.fillText("JadeSimu", (60+offsetX)*dotSpace*scale,(59+offsetY)*dotSpace*scale)
   

        img = new Image()
        img.src = 'imgs/logo_outline.png'
        context.drawImage(img, (55+offsetX)*dotSpace*scale, (56.5+offsetY)*dotSpace*scale, 100*scale, 100*scale)

}

function drawWires() {
    for (let i = 0; i < wires.length; i++) 
        wires[i].clone().translate([offsetX, offsetY]).draw()
}

function drawComponents() {

    for (let i = 0; i < components.length; i++) {
        drawComponent(components[i])
    }
}

function drawComponent(component) {

    for (let i = 0; i < component.symbol.strokes.length; i++) {
    component.symbol.strokes[i].clone().translate(component.position).translate([offsetX, offsetY]).draw()
    }
}


updateCanvas()