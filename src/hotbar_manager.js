const COMPONENTS_LIST = [
    
    new Texto(),
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
    new ContactoLógico(),
    new BobinaLógica(),
    //new S71215C(),
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
    "S7 1200 1215C": "S75",
    "Texto": "txt",
    "Contacto": "Lct",
    "Bobina": "Lbn"
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
let btn = createImageButton(`imgs/new.png`)
btn.className = "navbarButton"
btn.onclick = () => {
    stopSimulation()
    components = []
    wires = []
    currGrafcetStages = []
    updateCanvas()
}

navbarDiv.appendChild(btn)

btn = createImageButton(`imgs/save.png`)
btn.className = "navbarButton"
btn.onclick = () => {
    let componentsText = "v1.1\n"
    for (var i in components) {
        componentsText += `${components[i].position[0]}\u{001d}${components[i].position[1]}\u{001d}${abreviatures[components[i].name]}`
        for (option of components[i].options.options) {
            console.log(option)
            if (typeof option.value === "object") { 
                componentsText += `\u{001d}` + option.value.id
                console.log(option.value)}
            else
                componentsText += `\u{001d}` + option.value
        }

        componentsText += "\n"
    }
    for (var i in wires) {
        componentsText += `${wires[i].start[0]}\u{001d}${wires[i].start[1]}\u{001d}Wre\u{001d}${wires[i].end[0]}\u{001d}${wires[i].end[1]}\n`
    }
    downloadTextFile("file.jad", componentsText)
}
navbarDiv.appendChild(btn)

function prepareFileLoad() {
    stopSimulation()
      components = []
      wires = []
      currGrafcetStages = []
      lines.shift()
}

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
      console.log("File contents:", contents);
      lines = contents.split("\n")
      if (lines[0] === "v1") {
        prepareFileLoad()
        loadv1(lines)
        console.log("Loaded file from v1")
        return
      }
      if (lines[0] === "v1.1") {
        prepareFileLoad()
        loadv1_1(lines)
        console.log("Loaded file from v1.1")
        return
      }
      document.alert("Versión del archivo no soportada")
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

    let marcasMap = {}

    // Etapa Cero
    let i = 0;
    for (var co in etapaNodes) {
        let currEtapa = etapaNodes[co]

        let currMarcas = currEtapa.etapa.options.options[1].value.trim().split(",")

        for (let marca of currMarcas) {
            marca = marca.trim()
            if (marcasMap[marca] == null || !marcasMap[marca]) marcasMap[marca] = []
            marcasMap[marca].push(currEtapa.etapa.options.options[0].value)
        }
        
        let c = addComponent(new ContactoLógico()).moveTo([2 + 3*(i+1), 5]);
        c.options.options[0].value = i;
        c.options.options[1].value = CONTACTO_NC_COLLECTION;
        selectComponent(c);
        unselectSelectedComponent(c);
        
        // Fase Etapas
        for (var j in currEtapa.prevTransiciones) {
            calculateContactMatrix(currEtapa, j)
            // console.log(j)
        }
        
        i++
    }
    let c2 = addComponent(new BobinaLógica()).moveTo([3*(i+2)-1, 5]);
    c2.options.options[0].value = "0";
    c2.options.options[1].value = BOBINA_SET_COLLECTION;
    selectComponent(c2);
    unselectSelectedComponent(c2)

    // Fase Actuadores (Marcas)
    
    for (let [marca, etapasMarca] of Object.entries(marcasMap)) {
    c = addComponent(new ContactoLógico()).moveTo([5, currHeight + 5])
    c.options.options[0].value = etapasMarca[0];
    c.options.options[1].value = NONE_COLLECTION;
    selectComponent(c);
    unselectSelectedComponent(c);

    etapasMarca.shift()

    c = addComponent(new BobinaLógica()).moveTo([9, currHeight + 5])
    c.options.options[0].value = marca;
    c.options.options[1].value = NONE_COLLECTION;
    selectComponent(c);
    unselectSelectedComponent(c);
    currHeight += 4

 for (let i = 0; i < etapasMarca.length; i++) {
            currHeight += 5
            c = addComponent(new ContactoLógico()).moveTo([5, currHeight])
            c.options.options[0].value = etapasMarca[i];
            c.options.options[1].value = NONE_COLLECTION;
            selectComponent(c);
            unselectSelectedComponent(c);

            wires.push(new Line([3, currHeight-3], [3, currHeight+1], 1, DEFAULT_COLOR, false))
            wires.push(new Line([7, currHeight-3], [7, currHeight+1], 1, DEFAULT_COLOR, false))
        }
        updateCanvas()

    }

};


navbarDiv.appendChild(btn)

function calculateContactMatrix(currEtapa, index) {

    let currVar = ""
    let sets = currEtapa.prevTransiciones[index].prevEtapas
    let str = currEtapa.prevTransiciones[index].transicion.options.options[0].value

    let currMatrix = [[]]
    let currMatX = 0
    let currMatY = 0
    let currMatYs = []
    let openBrackets = []
    let lastContactPos;

    let initHeight = currHeight;

    let pluses = 0

    for (let i = 0; i < str.length; i++) {

        if (["*", "+"].includes(str[i])) {

            if (!currMatrix[currMatX]) currMatrix[currMatX] = []
            if (!currMatrix[currMatX][currMatY]) currMatrix[currMatX][currMatY] = ""
            
            currMatrix[currMatX][currMatY] += currVar
            currVar = ""
        }

        switch (str[i]) {
            case "+": 
            if (openBrackets != [] && openBrackets.length > 0) {
                if (!currMatrix[openBrackets.at(-1)][currMatY+1]) currMatrix[openBrackets.at(-1)][currMatY+1] = ""
                currMatrix[openBrackets.at(-1)][currMatY+1] += "+"
            }
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
            openBrackets.push(currMatX)
            break;
            case ")": 
            if (!currMatrix[currMatX]) currMatrix[currMatX] = []
            currMatrix[currMatX][currMatY] = "|"
            openBrackets.pop()
            break;
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
            mat[k][l] = mat[k][l].trim()
            if (mat[k][l].startsWith("*")) {
                let m = mat[k][l].split("").pop()
                wires.push(new Line([7 + 3*k, 3 + 4*(l) + currHeight], [7 + 3*k, 3+4*(l)-4*Number.parseInt(m) + currHeight], 1, DEFAULT_COLOR, false))
            } else {
                
                lastContactPos = [5 + 3*k, 5 + 4*l + currHeight]
                let c = addComponent(new ContactoLógico()).moveTo(lastContactPos);

                if (mat[k][l].startsWith("+")) {
                    let tmp = mat[k][l].split("")
                    tmp.shift()
                    mat[k][l] = tmp.join("")
                    wires.push(new Line(lastContactPos, [5 + 3*k, 5 + 4*l + currHeight - 4], 1, DEFAULT_COLOR, false).translate([-2, 1]))
                }

                if (mat[k][l].startsWith("|")) {
                    let tmp = mat[k][l].split("")
                    tmp.shift()
                    mat[k][l] = tmp.join("")
                    let tempMatY = currMatY-1
                    while (tempMatY > 0) {
                        tempMatY--
                        if (currMatrix[currMatX][tempMatY]) break;
                        tempMatX = currMatX
                        while (tempMatX > 0) {
                            wires.push(new Line([5 + 3*tempMatX+4, 5 + 4*tempMatY + currHeight], [5 + 3*tempMatX, 5 + 4*tempMatY + currHeight], 1, DEFAULT_COLOR, false).translate([-2, 1]))
                            if (currMatrix[tempMatX-1][tempMatY]) break;
                            tempMatX--
                        }
                    }

                }

                if (mat[k][l].startsWith("_")) {
                    let tmp = mat[k][l].split("")
                    tmp.shift()
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

    wires.push(new Line([3, 6 + currHeight], [3, 6 + 4*pluses + currHeight], 1, DEFAULT_COLOR, false))
wires.push(new Line([7 + 3*currMatX, 6 + currHeight], [7 + 3*currMatX, 6 + 4*pluses + currHeight], 1, DEFAULT_COLOR, false))
sets = [... new Set(sets)]
for (var i in sets) {
    lastContactPos = [lastContactPos[0]+3, lastContactPos[1]]
let c = addComponent(new ContactoLógico()).moveTo(lastContactPos);
                c.options.options[0].value = sets[i].etapa.options.options[0].value;
                c.options.options[1].value = NONE_COLLECTION;
                selectComponent(c);
                unselectSelectedComponent(c);
            }
            lastContactPos = [lastContactPos[0]+3, lastContactPos[1]]
            c = addComponent(new BobinaLógica().clone()).moveTo(lastContactPos);
                            c.options.options[0].value = currEtapa.etapa.options.options[0].value;
                            c.options.options[1].value = BOBINA_SET_COLLECTION;
                            selectComponent(c);
                            unselectSelectedComponent(c);
                            lastContactPos = [lastContactPos[0], lastContactPos[1]+4]
for (var i in sets) {
    if (i>0) {
        lastContactPos = [lastContactPos[0], lastContactPos[1]+4]
        currHeight += 4
    }
    wires.push(new Line([lastContactPos[0]-2, lastContactPos[1]+1], [lastContactPos[0]-2, lastContactPos[1]-3], 1, DEFAULT_COLOR, false))
c = addComponent(new BobinaLógica().clone()).moveTo(lastContactPos);
                            c.options.options[0].value = sets[i].etapa.options.options[0].value;
                            c.options.options[1].value = BOBINA_RESET_COLLECTION;
                            selectComponent(c);
                            unselectSelectedComponent(c);
}
if (index !== 0) {
    // Ni idea qué quería hacer aquí
}

currHeight += 4*pluses + 9
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