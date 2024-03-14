const COMPONENTS_LIST = [
    
    /*new Fuente(),
    new Tierra(),
    new FuenteAlimentacion(),
    new Transformador(),
    new Diferencial(),
    new ReleTermico(),
    new Diodo(),
    new Contactor(),
    new Conmutador(),
    new Pulsador(),
    new PulsadorConmutado(),
    new ContactoTemporizado(),
    new ConmutadorTemporizado(),
    new Bobina(),
    new MotorAC(),
    new MotorDC(),
    new Piloto(),
    new EightDisplay(),
    new Fusible(),
    new Condensador(),*/
    new Grafcet(),
    new GrafcetTransicion()
]

var simuActivated = false

const abreviatures = {
    "Etapa de Grafcet": "Get",
    "Transición de Grafcet": "Gtr"
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
simuButtons = []
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

btn = createImageButton(`imgs/simulate.png`)
btn.className = "navbarButton"
btn.onclick = () => {
    if (!simuActivated) {
    etapasDone = false
    simuActivated = true
    unselectSelectedComponent()
    convertDiagramToNodes()

    contactsList = []

    for (let i = 0; i < components.length; i++) {
        if (components[i].name == "Transición de Grafcet") {
            Array.from(new Set(components[i].options.options[0].value.match(/[a-zA-Z0-9-]+\d*/g))).forEach(variable => {
                if (!contactsList.includes(variable))
                    contactsList.push(variable)
            });

    }
    }
    let newbtn;
    for (let i in contactsList) {
        newbtn = null;
        console.log(contactsList[i]);
        newbtn = createImageButton(``, contactsList[i]);
        newbtn.className = "navbarButton";
        (function(btn, index) {
            btn.onclick = () => {
                activatedTrans[contactsList[index]] = !activatedTrans[contactsList[index]];
                console.log(index, contactsList[index]);
                btn.style.backgroundColor = BTN_COLOR
                if (activatedTrans[contactsList[index]])
                btn.style.backgroundColor = "#0f0";
                step();
            };
        })(newbtn, i);
        navbarDiv.appendChild(newbtn);
        simuButtons.push(newbtn);
    }
    
    

    return
}
stopSimulation()
}


navbarDiv.appendChild(btn)


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