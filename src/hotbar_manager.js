const COMPONENTS_LIST = [
    
    new Fuente(),
    // new Tierra(),
    // new FuenteAlimentacion(),
    // new Transformador(),
    // new Diferencial(),
    // new ReleTermico(),
    // new Diodo(),
    // new Contactor(),
    // new Conmutador(),
    // new Pulsador(),
    // new PulsadorConmutado(),
    // new ContactoTemporizado(),
    // new ConmutadorTemporizado(),
    // new Bobina(),
    // new MotorAC(),
    // new MotorDC(),
    // new Piloto(),
    // new EightDisplay(),
    // new Fusible(),
    // new Condensador(),
    new Grafcet(),
    new GrafcetTransicion(),
    new Vaiven(),
    new FC(),
    //new TemporizacionLogica(),
    //new ContactoLógico(),
    //new BobinaLógica(),
    new S71215C(),
    //new S7SM1223()
]

var simuActivated = false

const abreviatures = {
    "Etapa de Grafcet": "Get",
    "Transición de Grafcet": "Gtr",
    "Vaivén": "Vvn",
    "Final de Carrera": "Vfc",
    "Temporizador": "Ton",
    "Contacto": "Lct",
    "Bobina": "Lbn",
    "Alimentación": "Vcc",
    "Contacto Pulsador": "Swt",
    "S7 1200 1215C": "S75"
}

function stopSimulation() {
    simuActivated = false
etapasDone = false
for (var i in etapasList) {
    etapasList[i].deactivate()
}
for (var i in simuButtons) {
    navbarDiv.removeChild(navbarDiv.lastChild)
}
for (var i in vaivenesDerecha) {
    vaivenesDerecha[i].roundPosition()
}
vaivenesDerecha = {}
vaivenesIzquierda = {}
simuButtons = []
updateCanvas()
}

let navbarDiv = document.getElementById("navbarDiv")
let btn = createImageButton(`imgs/save.png`)
btn.className = "navbarButton"
btn.onclick = () => {
    let componentsText = "v1\n"
    for (var i in components) {
        componentsText += components[i].position[0]
        componentsText += abreviatures[components[i].name]
        componentsText += components[i].position[1]
        componentsText += " "
        componentsText += components[i].options.options[0].value
        componentsText += "\n"
        if (components[i].options.options[1]) {
            componentsText += components[i].options.options[1].value
            componentsText += "\n"
        }
    }
    for (var i in wires) {
        componentsText += wires[i].start[0]
        componentsText += "Wre"
        componentsText += wires[i].start[1]
        componentsText += " "
        componentsText += `${wires[i].end[0]},${wires[i].end[1]}`
        componentsText += "\n"
    }
    downloadTextFile("file.jad", componentsText)
}
navbarDiv.appendChild(btn)

btn = createImageButton(`imgs/load.png`)
btn.className = "navbarButton"
btn.onclick = () => {

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.jad,.jade';

  input.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
      const contents = event.target.result;
      lines = contents.split("\n")
      if (lines[0] != "v1") {
        document.alert("Versión del archivo no soportada")
        return
      }
      stopSimulation()
      components = []
      wires = []
      currGrafcetStages = []
      lines.shift()
      console.log("File contents:", contents);
      for (let i = 0; i < lines.length; i++) {
        let coordRegex = /[0-9]*/
        let abrRegex = /.../
        let match = lines[i].match(coordRegex)
        let firstCoord = Number.parseInt(match[0])
        lines[i] = lines[i].replace(coordRegex, '')

        let abreviature = lines[i].match(abrRegex)[0]
        lines[i] = lines[i].replace(abrRegex, '')

        match = lines[i].match(coordRegex)
        let secondCoord = Number.parseInt(match[0])
        lines[i] = lines[i].replace(coordRegex, '')
        lines[i] = lines[i].replace(' ', '')

        console.log({abv: abreviature, c1: firstCoord, c2: secondCoord, line: lines[i]})
        let c
        if (abreviature == "Get") {
            c = addComponent(new Grafcet()).moveTo([firstCoord, secondCoord])
            c.options.options[0].value = lines[i]
            c.options.options[1].value = lines[++i]
            selectComponent(c)
        }

        if (abreviature == "Gtr") {
            c = addComponent(new GrafcetTransicion()).moveTo([firstCoord, secondCoord])
            c.options.options[0].value = lines[i]
            selectComponent(c)
        }

        if (abreviature == "Vvn") {
            c = addComponent(new Vaiven()).moveTo([firstCoord, secondCoord])
            c.options.options[0].value = lines[i]
            c.options.options[1].value = lines[++i]
            selectComponent(c)
        }

        if (abreviature == "Vfc") {
            c = addComponent(new FC()).moveTo([firstCoord, secondCoord])
            c.options.options[0].value = lines[i]
            selectComponent(c)
        }

        if (abreviature == "Ton") {
            c = addComponent(new TemporizacionLogica()).moveTo([firstCoord, secondCoord])
            c.options.options[0].value = lines[i]
            selectComponent(c)
        }

        if (abreviature == "Vcc") {
            c = addComponent(new Fuente()).moveTo([firstCoord, secondCoord])
            c.options.options[0].value = lines[i]
            selectComponent(c)
        }

        if (abreviature == "Swt") {
            c = addComponent(new Pulsador()).moveTo([firstCoord, secondCoord])
            c.options.options[0].value = lines[i]
            selectComponent(c)
        }

        if (abreviature == "S75") {
            c = addComponent(new S71215C()).moveTo([firstCoord, secondCoord])
            selectComponent(c)
        }

        if (abreviature == "Wre") {
            wires.push(new Line([firstCoord, secondCoord], lines[i].split(","), 1, DEFAULT_COLOR))
        }
        
        updateCanvas()
        convertDiagramToNodes()
        unselectSelectedComponent()
      }
    };
    reader.readAsText(file);
  };
  
  input.click();

}

navbarDiv.appendChild(btn)

var currSwitches = []
var simuButtons = []
var fcPositions = {}
var vaivenesDerecha = {}
var vaivenesIzquierda = {}
var temporizadores = {}

btn = createImageButton(`imgs/simulate.png`)
btn.className = "navbarButton"
btn.onclick = () => {
    if (!simuActivated) {
    etapasDone = false
    simuActivated = true
    unselectSelectedComponent()
    convertDiagramToNodes()

    contactsList = []
    vaivenesDerecha = {}
    vaivenesIzquierda = {}
    fcPositions = {}
    temporizadores = {}

    for (let i = 0; i < components.length; i++) {
        if (components[i].name == "Transición de Grafcet") {
            Array.from(new Set(components[i].options.options[0].value.match(/[a-zA-Z0-9-]+\d*/g))).forEach(variable => {
                if (!contactsList.includes(variable))
                    contactsList.push(variable)
            });

    }
        if (components[i].name == "Vaivén") {
            vaivenesDerecha[components[i].options.options[0].value] = components[i]
            vaivenesIzquierda[components[i].options.options[1].value] = components[i]
        }

        if (components[i].name == "Final de Carrera") {
            fcPositions[components[i].position] = components[i]
        }

        if (components[i].name == "Temporizador") {
            temporizadores[components[i].options.options[0].value] = components[i]
        }
    }
    let newbtn;
    for (let i in contactsList) {
        newbtn = null;
        if (isNaN(contactsList[i])) {
        console.log(contactsList[i]);
        newbtn = createImageButton(``, contactsList[i]);
        newbtn.className = "navbarButton";
        (function(btn, index) {
            btn.onclick = () => {
                activatedTrans[contactsList[index]] = !activatedTrans[contactsList[index]];
                btn.style.backgroundColor = BTN_COLOR
                if (activatedTrans[contactsList[index]])
                btn.style.backgroundColor = "#0f0";
                step();
            };
        })(newbtn, i);
        navbarDiv.appendChild(newbtn);
        simuButtons.push(newbtn);
    }
    }
    
    checkFCActivated()

    return
}
stopSimulation()
}


navbarDiv.appendChild(btn)

var currHeight = 0

btn = createImageButton(`imgs/tia.png`)
btn.className = "navbarButton"
btn.onclick = () => {

    currHeight = 4

    // Etapa Cero
    let i = 0;
    for (var co in etapaNodes) {
        i++
        let currEtapa = etapaNodes[co]

        let c = addComponent(new ContactoLógico()).moveTo([3 + 3*i, 5]);
        c.options.options[0].value = "_X" + i;
        c.options.options[1].value = CONTACTO_NC_COLLECTION;
        selectComponent(c);
        unselectSelectedComponent(c);

        // Fase Etapas
        for (var j in currEtapa.prevTransiciones) {
          let str = currEtapa.prevTransiciones[j].transicion.options.options[0].value
          calculateContactMatrix(str, currEtapa.prevTransiciones[j].prevEtapas, j)
          // console.log(j)
        }

    }

    let c2 = addComponent(new BobinaLógica()).moveTo([3*(i+2), 5]);
    c2.options.options[0].value = "_X0";
    c2.options.options[1].value = NONE_COLLECTION;
    selectComponent(c2);
    unselectSelectedComponent(c2)

};


// navbarDiv.appendChild(btn)

function calculateContactMatrix(str, sets, index) {

    let currVar = ""

    let currMatrix = [[]]
    let currMatX = 0
    let currMatY = 0
    let currMatYs = []
    let lastContactPos;

    let pluses = 0

    for (let i = 0; i < str.length; i++) {

        if (["*", "+"].includes(str[i])) {

            if (!currMatrix[currMatX]) currMatrix[currMatX] = []
            currMatrix[currMatX][currMatY] = currVar
            currVar = ""
        }

        switch (str[i]) {
            case "+": 
                currMatY++
                pluses++
            break;
            case "*":
                if (str[i-1] == ")") {
                    let currMatPop = currMatYs.pop() | 0
                    currMatrix[currMatX][currMatY+1] = "*"+currMatPop
                    //currMatY = currMatPop
                }
                currMatX++
            break;
            case "(": 
            currMatYs.push(currMatY)
            break;
            case ")": break;
            default:
                currVar += str[i]
        }
    }
    if (!currMatrix[currMatX]) currMatrix[currMatX] = []
    currMatrix[currMatX][currMatY] = currVar

    let mat = currMatrix

    for (let k = 0; k < mat.length; k++) {
        for (let l = 0; l < mat[k].length; l++) {
            
        if (mat[k][l]) {
            
            if (mat[k][l].startsWith("*")) {
                let m = mat[k][l].split("").pop()
                wires.push(new Line([7 + 3*k, 3 + 3*(l) + currHeight], [7 + 3*k, 3+3*(l)-3*Number.parseInt(m) + currHeight], 1, DEFAULT_COLOR, false))
            } else {
                
                let c = addComponent(new ContactoLógico()).moveTo([5 + 3*k, 5 + 3*l + currHeight]);
                lastContactPos = [5 + 3*k, 5 + 3*l + currHeight]
                if (mat[k][l].startsWith("_")) {
                    let tmp = mat[k][l].split("")
                    tmp.shift()
                    console.log(tmp)
                    mat[k][l] = tmp.join("")
                    c.options.options[1].value = CONTACTO_NC_COLLECTION;
                } else {
                    c.options.options[1].value = NONE_COLLECTION;
                }
                c.options.options[0].value = mat[k][l];
                selectComponent(c);
                unselectSelectedComponent(c);
            }
        }
    }
}

    wires.push(new Line([3, 6 + currHeight], [3, 6 + 3*pluses + currHeight], 1, DEFAULT_COLOR, false))
wires.push(new Line([7 + 3*currMatX, 6 + currHeight], [7 + 3*currMatX, 6 + 3*pluses + currHeight], 1, DEFAULT_COLOR, false))
sets = [... new Set(sets)]
for (var i in sets) {
    console.log(i, sets[i].etapa.options.options[0].value, sets[i])
    lastContactPos = [lastContactPos[0]+3, lastContactPos[1]]
let c = addComponent(new ContactoLógico()).moveTo(lastContactPos);
                c.options.options[0].value = sets[i].etapa.options.options[0].value;
                c.options.options[1].value = NONE_COLLECTION;
                selectComponent(c);
                unselectSelectedComponent(c);
}

if (index !== 0) {
    
}

currHeight += 3*pluses + 4
    return currMatrix

}

function addComponent(comp) {
    let c = comp.clone().moveTo([cursorX,cursorY])

        if (c.name == "Etapa de Grafcet")  {
            c.symbol.strokes[11].text = currGrafcetStages.length
            c.options.options[0].setValue(currGrafcetStages.length)
            currGrafcetStages.push(c)
        
        }
        
    components.push(c)
    updateCanvas()
    return c
}

for (let i = 0; i < COMPONENTS_LIST.length; i++) {

    let btn = createImageButton(`imgs/components/${COMPONENTS_LIST[i].imageName}.png`)
    btn.className = "navbarButton"
    btn.onclick = () => {
        let c = addComponent(COMPONENTS_LIST[i])
        unselectSelectedComponent()
        selectComponent(c)
    
    }

    navbarDiv.appendChild(btn)
}