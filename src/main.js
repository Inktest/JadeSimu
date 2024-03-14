const canvas = document.getElementById('cadeCanvas')
const context = canvas.getContext('2d')

const A3_width = 4961
const A3_height = 3508
const dotSize = 1
const dotSpace = 20

const SELECTED_COLOR = "#a87738"
const DEFAULT_COLOR = "#000"
const GRID_COLOR = "#9c8c73"
const DIV_COLOR = "#f5f5f5"
const BTN_COLOR = "#efefef"
const BTN_HOVER_COLOR = "#e0e0e0"

var scale = 1

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

function updateCanvas() {
  canvas.width = Math.min(window.innerWidth, A3_width*scale)
  canvas.height = Math.min(window.innerHeight, A3_height*scale)

  drawGrid()
  drawComponents()
  drawWires()
  if (selectedComponent) drawComponent(selectedComponent)
if (!simuActivated)
    convertDiagramToNodes()

}

function drawGrid() {
    
    context.fillStyle = GRID_COLOR
    for (let x = 0; x < canvas.width; x += dotSpace*scale) {
        for (let y = 0; y < canvas.height; y += dotSpace*scale) {
            context.fillRect(x, y, dotSize, dotSize)
        }
    }
}

function drawWires() {
    for (let i = 0; i < wires.length; i++) 
        wires[i].draw()
}

function drawComponents() {

    for (let i = 0; i < components.length; i++) {
        drawComponent(components[i])
    }
}

function drawComponent(component) {

    for (let i = 0; i < component.symbol.strokes.length; i++) {
    component.symbol.strokes[i].clone().translate(component.position).draw()
    }
}


updateCanvas()