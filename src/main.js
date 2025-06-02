const canvas = document.getElementById('cadeCanvas')
const context = canvas.getContext('2d')

setInterval(() => {
    if (simuActivated) runThroughNodes()
}, 100)

var page_width = 1748
var page_height = 1240
var page_margin = 3
var page_vertical = false

var project_name = "Proyecto 1"
var project_name_size = 35
var project_author = "Pablo Espinar"

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

var selectedComponent = []
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

  if (selectedComponent.length > 0) 
    for (let c of selectedComponent)
        drawComponent(c)
if (!simuActivated)
    convertDiagramToNodes()

}

function drawGrid() {
    let heightLimit = page_vertical?page_width:page_height
    let widthLimit = page_vertical?page_height:page_width
    context.fillStyle = GRID_COLOR
    for (let x = offsetX*dotSpace*scale; x < canvas.width && x < scale*(widthLimit+dotSpace*offsetX); x += dotSpace*scale) {
        for (let y = offsetY*dotSpace*scale; y < canvas.height && y < scale*(heightLimit+dotSpace*offsetY); y += dotSpace*scale) {
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

    rel_height = page_vertical?page_width:page_height
    rel_width = page_vertical?page_height:page_width

   drawBoxLine(page_vertical?page_margin:1, page_vertical?1:page_margin, page_vertical?page_margin:1, Math.floor(rel_height/20)-2)
   drawBoxLine(page_vertical?page_margin:1, page_vertical?1:page_margin, Math.floor(rel_width/20)-2, page_vertical?1:page_margin)
   drawBoxLine(Math.floor(rel_width/20)-2, page_vertical?1:page_margin, Math.floor(rel_width/20)-2, Math.floor(rel_height/20)-2)
   drawBoxLine(page_vertical?page_margin:1, Math.floor(rel_height/20)-2, Math.floor(rel_width/20)-2, Math.floor(rel_height/20)-2)

   drawBoxLine(Math.floor(rel_width/20)-31,  Math.floor(rel_height/20)-6, Math.floor(rel_width/20)-2,  Math.floor(rel_height/20)-6)
   drawBoxLine(Math.floor(rel_width/20)-16, Math.floor(rel_height/20)-6, Math.floor(rel_width/20)-16, Math.floor(rel_height/20)-2)
   drawBoxLine(Math.floor(rel_width/20)-31,  Math.floor(rel_height/20)-6, Math.floor(rel_width/20)-31, Math.floor(rel_height/20)-2)
   drawBoxLine(Math.floor(rel_width/20)-16,  Math.floor(rel_height/20)-4.5, Math.floor(rel_width/20)-2,  Math.floor(rel_height/20)-4.5)


   context.fillStyle = BOX_COLOR
        

        context.textBaseline = "middle"
        context.textAlign = "left"
            context.font = `${40*scale}px Arial`
        context.fillText("JadeSimu", (Math.floor(rel_width/20)-26+offsetX)*dotSpace*scale,(Math.floor(rel_height/20)-3.5+offsetY)*dotSpace*scale)

        context.font = `${project_name_size*scale}px Arial`
        context.fillText(project_name, (Math.floor(rel_width/20)-15+offsetX)*dotSpace*scale,(Math.floor(rel_height/20)-3.25+offsetY)*dotSpace*scale)

        context.font = `${17*scale}px Arial`
        context.fillText(project_author, (Math.floor(rel_width/20)-15+offsetX)*dotSpace*scale,(Math.floor(rel_height/20)-5.25+offsetY)*dotSpace*scale)


        img = new Image()
        img.src = 'imgs/logo_outline.png'
        context.drawImage(img, (Math.floor(rel_width/20)-31+offsetX)*dotSpace*scale, (Math.floor(rel_height/20)-6.5+offsetY)*dotSpace*scale, 100*scale, 100*scale)

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

function drawComponent(comp) {

    if (comp.inouts.length > 0) {
        for (let inout of comp.inouts)
        new Arc(inout,0.25,0,2*Math.PI,1,"#0f0").translate(comp.position).translate([offsetX, offsetY]).draw()
    }

    for (let i = 0; i < comp.symbol.strokes.length; i++) {
    comp.symbol.strokes[i].clone().translate(comp.position).translate([offsetX, offsetY]).draw()
    }
}


//updateCanvas()