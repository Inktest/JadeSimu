const COMPONENTS_LIST = [
    
    new Texto(),
    //new Fuente(),
    //new Tierra(),
    //new FuenteAlimentacion(),
    //new Transformador()
    //new Diferencial(),
    //new ReleTermico(),
    //new Diodo(),
    //new Contactor(),
    //new Conmutador(),
    //new Pulsador(),
    //new PulsadorConmutado(),
    //new ContactoTemporizado(),
    //new ConmutadorTemporizado(),
    //new Bobina(),
    //new MotorAC(),
    // new MotorDC(),
    //new Piloto(),
    //new EightDisplay(),
    //new Fusible(),
    //new Condensador(),
    //new Grafcet(),
    //new GrafcetTransicion(),
    new Arrow(),
    //new Vaiven(),
    //new FC(),
    //new TemporizacionLogica(),
    //new ContactoLogico(),
    //new BobinaLogica(),
    //new S71215C(),
    //new S7SM1223(),
]

let dirHandle;
let currFile;

class ComponentGroup {
    constructor(name, imageName, elements) {
        this.name = name
        this.imageName = imageName
        this.elements = elements
    }
}


const GROUP_LIST = [
    new ComponentGroup("Alimentación", "Fuente", [
        new Fuente(),
        new Tierra(),
        new FuenteAlimentacion(),
        new Transformador()
    ]),
    new ComponentGroup("Protecciones", "Diferencial", [
        new Diferencial(),
        new ReleTermico(),
        new Diodo(),
        new Condensador()
    ]),
    new ComponentGroup("Contactos", "Contactor", [
        new Contactor(),
        new Conmutador(),
        new Pulsador(),
        new PulsadorConmutado(),
        new ContactoTemporizado(),
        new ConmutadorTemporizado(),
        new Fusible()
    ]),
    new ComponentGroup("Actuadores", "Bobina", [
        new Bobina(),
        new MotorAC(),
        new Piloto(),
        new EightDisplay(),
        new Vaiven(),
    ]),
    new ComponentGroup("Grafcet", "Grafcet", [
        new Grafcet(),
        new GrafcetTransicion(),
        new FC(),
        new TemporizacionLogica(),
        new ContactoLogico(),
        new BobinaLogica()
    ]),
    new ComponentGroup("Neumática", "ActuadorLineal", [
        new ActuadorLineal(),
        new ActuadorGiratorio(),
        new PinzaNeumatica()
    ]),
    new ComponentGroup("Autómatas", "S71215C", [
        new S71215C()
    ])
]

var simuActivated = false

const abreviatures = {
    "Etapa de Grafcet": "Get",
    "Transición de Grafcet": "Gtr",
    "Vaivén": "Vvn",
    "Final de Carrera": "Vfc",
    "Temporizador": "Ton",
    "Contacto Logico": "Lct",
    "Bobina Logica": "Lbn",
    "Alimentación": "Vcc",
    "Contacto Pulsador": "Swt",
    "S7 1200 1215C": "S75",
    "Texto": "txt",
    "Contacto": "Lct",
    "Contactor": "Ctr",
    "Bobina": "Lbn",
    "Toma de Tierra": "Gnd",
    "Fuente de Alimentación":"Alm",
    "Transformador":"Tsf",
    "Diferencial":"Dif",
    "Relé Térmico":"Ter",
    "Diodo":"Led",
    "Contacto Conmutado":"CCo",
    "Contacto Pulsador Conmutado":"CPC",
    "Temporizador":"Tmp",
    "Contacto Conmutado Temporizado":"CCT",
    "Motor de Corriente Alterna":"mCA",
    "Señalización Óptica":"Opt",
    "Display de 7 Segmentos":"Ds7",
    "Fusible":"Fus",
    "Condensador":"Cdr",
    "Bobina":"Bob",
    "Contacto Temporizado": "CTm",
    "Continuación de Linea": "Arr",
    "Actuador Lineal": "Nal",
    "Actuador Giratorio": "Nag",
    "Pinza Neumática": "Npz",
    "Cable": "Wr2"
}

function stopSimulation() {
    simuActivated = false
    let savedData = localStorage.getItem('components')
    if (savedData)
        loadFromFileText(savedData)


updateCanvas()
}

let navbarDiv = document.getElementById("navbarDiv")
let groupDiv = document.getElementById("navbarDiv2")
let btn = createImageButton(`imgs/new.png`)
btn.className = "navbarButton"
btn.title = "Nuevo Proyecto"
btn.onclick = () => {
    stopSimulation()
    components = []
    wires = []
    currGrafcetStages = []

    page_width = 1748
    page_height = 1240
    page_margin = 3
    page_vertical = false

    project_author = "Pablo Espinar"
    project_name = "Proyecto 1"
    project_name_size = "35"
    updateCanvas()
    saveComponents()
    currFile = ""
}

navbarDiv.appendChild(btn)

function getSaveText() {
    let componentsText = `v1.1.1\n${page_vertical}\u{001d}${project_name}\u{001d}${project_name_size}\u{001d}${project_author}\u{001d}${page_height}\u{001d}${page_width}\u{001d}${page_margin}\n`
    for (var i in components) {
        componentsText += `${components[i].position[0]}\u{001d}${components[i].position[1]}\u{001d}${abreviatures[components[i].name]}`
        for (option of components[i].options.options) {
            //console.log(option)
            if (typeof option.value === "object") { 
                componentsText += `\u{001d}` + option.value.id
                //console.log(option.value)
            }
            else
                componentsText += `\u{001d}` + option.value
        }

        componentsText += "\n"
    }
    for (var i in wires) {
        componentsText += `${wires[i].start[0]}\u{001d}${wires[i].start[1]}\u{001d}Wre\u{001d}${wires[i].end[0]}\u{001d}${wires[i].end[1]}\n`
    }
    return componentsText
}

btn = createImageButton(`imgs/save.png`)
btn.className = "navbarButton"
btn.title = "Guardar Proyecto"
btn.onclick = async () => {
    if (dirHandle) {
        try {
            let promptN = currFile ? currFile : (prompt("Nombre del Archivo") + ".jad");
            if (!promptN) return;
        
            fileHandle = await dirHandle.getFileHandle(promptN, { create: true });
            writable = await fileHandle.createWritable();
            await writable.write(getSaveText());
            await writable.close();
            currFile = promptN
            return
        } catch (error) {
            alert("Error: No se pudo guardar el archivo en la carpeta, guardando en descargas");
        }
        
    }

    
    downloadTextFile(project_name?project_name+".jad":"jadeFile.jad", getSaveText())
}
navbarDiv.appendChild(btn)

function prepareFileLoad() {
    unselectSelectedComponent()
      components = []
      wires = []
      currGrafcetStages = []
      lines.shift()
      project_author = ""
      project_name = ""
      project_name_size = "35"
}

btn = createImageButton(`imgs/load.png`)
btn.className = "navbarButton"
btn.title = "Abrir Proyecto"
btn.onclick = () => {


 groupDiv.innerHTML = ''
             let btn2 = createImageButton(`imgs/fromFolder.png`)
            btn2.className = "navbarButton"
            btn2.title = "Abrir Proyecto desde Archivo"
            btn2.onclick = () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.jad,.jade';

                input.onchange = function(e) {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = function(event) {
                    loadFromFileText(event.target.result)
                    saveComponents()
                    dirHandle = null
                    };
                    reader.readAsText(file);
                };
                
                input.click();
            
            }
            navbarDiv2.appendChild(btn2)

            btn2 = createImageButton(`imgs/load.png`)
            btn2.className = "navbarButton"
            btn2.title = "Abrir Carpeta"
            btn2.onclick = async () => {
                if (!dirHandle) {
                try {
                    dirHandle = await window.showDirectoryPicker();
                } catch (err) {
                    console.error("Error opening folder:", err);
                    return
                }

            }

            unselectSelectedComponent()
            let optionsDiv = document.getElementById("optionsDiv");
            let nameDiv = document.createElement("div");
            nameDiv.className = "nameDiv";
            nameDiv.innerHTML = "Archivos";
            optionsDiv.appendChild(nameDiv);
    

             let id = 0

             sortedValues = []
             for await (const entry of dirHandle.values()) {
                sortedValues.push(entry)
             }

             sortedValues = sortedValues.sort((a, b) => 
                a.name.localeCompare(b.name)
            );
             for await (const entry of sortedValues) {
                if (entry.kind === "file" && (entry.name.endsWith(".jad") || entry.name.endsWith(".jade"))) {
                addClickableToOptionsDiv("file"+id, entry.name, async () => {
                    currFile = entry.name
                    fileHandle = await dirHandle.getFileHandle(entry.name)
                    file = await fileHandle.getFile()
                    loadFromFileText(await file.text())
                    saveComponents()
                })
                id++
            }
            optionsDiv.style = `height: ${25+25*id}px; visibility: visible`;
            }
         
           

            }
            navbarDiv2.appendChild(btn2)

            btn2 = createImageButton(`imgs/cancel.png`)
            btn2.className = "navbarButton"
            btn2.title = "Cerrar Carpeta"
            btn2.onclick = async () => {
               dirHandle = null
               clearOptions()
            }
            navbarDiv2.appendChild(btn2)


}
navbarDiv.appendChild(btn)



btn = createImageButton(`imgs/print.png`)
btn.className = "navbarButton"
btn.title = "Imprimir"
btn.onclick = () => {

    //const { jsPDF } = window.jspdf;
    let prevScale = scale;
    let prevOffsetX = offsetX;
    let prevOffsetY = offsetY;

    canvas.width = page_vertical?page_height:page_width
    canvas.height = page_vertical?page_width:page_height

    scale = 1;
    offsetX = 0;
    offsetY = 0;

    updateCanvas(true)

    relationConstant = 0.56179775280898876404494382022472

    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    let pdfHeight = page_vertical?page_width:page_height
    let pdfWidth = page_vertical?page_height:page_width
    var pdf = new jsPDF( pdfHeight*relationConstant, "px", pdfWidth*relationConstant);
  
    
    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.save(project_name?project_name+".pdf":"jadePdf.pdf");

    scale = prevScale
    offsetX = prevOffsetX
    offsetY = prevOffsetY
    updateCanvas()

}

navbarDiv.appendChild(btn)

function addTextboxToOptionsDiv(id, optionName, value, width, optionFunction) {
    let optionsDiv = document.getElementById("optionsDiv");

    let div = document.createElement("div")
    let textbox = document.createElement('input')
    textbox.className = "opt-txtbox"
    textbox.type = 'text'
    textbox.value = value
    textbox.id = "opt-txt-"+id
    textbox.autocomplete = "off"
    textbox.style += `;width: ${width}px`
    textbox.onchange = () => {
        optionFunction(document.getElementById("opt-txt-" + id).value);
        updateCanvas()
    }

    div.appendChild(document.createTextNode(optionName + " "));
    div.appendChild(textbox)

    optionsDiv.appendChild(div);
}

function addCheckboxToOptionsDiv(id, optionName, value, optionFunction) {
    let optionsDiv = document.getElementById("optionsDiv");

    let div = document.createElement("div")
    let textbox = document.createElement('input')
    textbox.className = "opt-checkbox"
    textbox.type = 'checkbox'
    textbox.checked = value
    textbox.id = "opt-chk-" + id
    textbox.onchange = () => {
        optionFunction(document.getElementById("opt-chk-" + id).checked)
        updateCanvas()
    }

    div.appendChild(document.createTextNode(optionName + " "));
    div.appendChild(textbox)

    optionsDiv.appendChild(div);
}

function addButtonTextToOptionsDiv(id, optionName, value, optionFunction) {
    let optionsDiv = document.getElementById("optionsDiv");

    let div = document.createElement("div")
    let textbox = document.createElement('input')
    textbox.className = "opt-button"
    textbox.type = 'button'
    textbox.id = "opt-btn-" + id
    textbox.value = "#"
    textbox.onclick = () => {
        optionFunction()
    }

    div.appendChild(textbox)
    div.appendChild(document.createTextNode(" " + optionName));

    optionsDiv.appendChild(div);
}

function addClickableToOptionsDiv(id, optionName, optionFunction) {
    let optionsDiv = document.getElementById("optionsDiv");

    let div = document.createElement("div")
    div.onclick = optionFunction
    if (optionName == currFile) 
        div.style += ";cursor: pointer;;color:rgb(0, 91, 8);"
    else
    div.style += ";cursor: pointer;;color:rgb(75, 168, 83);"

//div.style += ";cursor: pointer;"

    div.appendChild(document.createTextNode(optionName + " "));

    optionsDiv.appendChild(div);
}

function addTextToOptionsDiv(text) {
    let optionsDiv = document.getElementById("optionsDiv");

    let div = document.createElement("div")
    div.appendChild(document.createTextNode(text + " "));
    optionsDiv.appendChild(div);
}

btn = createImageButton(`imgs/settings.png`)
btn.className = "navbarButton"
btn.title = "Opciones"
btn.onclick = () => {
   unselectSelectedComponent()
   let optionsDiv = document.getElementById("optionsDiv");
   let nameDiv = document.createElement("div");
   nameDiv.className = "nameDiv";
   nameDiv.innerHTML = "Opciones";
   optionsDiv.appendChild(nameDiv);
    optionsDiv.style = `height: 175px; visibility: visible`;

    addTextboxToOptionsDiv("height", "Altura", page_height, 50, (height) => {page_height = isNaN(parseInt(height))?page_height:parseInt(height)})
    addTextboxToOptionsDiv("width", "Anchura", page_width, 50, (width) => {page_width = isNaN(parseInt(width))?page_width:parseInt(width)})
    addTextboxToOptionsDiv("margin", "Margen", page_margin, 50, (val) => {page_margin = isNaN(parseInt(val))?page_margin:parseInt(val)})

    addTextboxToOptionsDiv("name", "Proyecto", project_name, 100, (name) => {project_name = name})
    addTextboxToOptionsDiv("nameSize", "Tamaño Texto", project_name_size, 25, (name) => {project_name_size = name})
    addTextboxToOptionsDiv("author", "Autor", project_author, 100, (name) => {project_author = name})
    addCheckboxToOptionsDiv("vertical", "Página Vertical", page_vertical, (val) => {page_vertical = val})
/*var project_name = "Proyecto 1"
var project_name_size = 35
var project_author = "Pablo Espinar"*/

}
navbarDiv.appendChild(btn)

btn = createImageButton(`imgs/info.png`)
btn.className = "navbarButton"
btn.title = "Información"
btn.onclick = () => {
   unselectSelectedComponent()
   let optionsDiv = document.getElementById("optionsDiv");
   let nameDiv = document.createElement("div");
   nameDiv.className = "nameDiv";
   nameDiv.innerHTML = "Información";
   optionsDiv.appendChild(nameDiv);
    optionsDiv.style = `height: 135px; visibility: visible`;

        addTextToOptionsDiv("W > Añadir Cable")
        addTextToOptionsDiv("Supr > Borrar Componente")
        addTextToOptionsDiv("Ctrl C > Clonar Componente")
        addTextToOptionsDiv("Ctrl Flecha > Mover Todo")
        addTextToOptionsDiv("Shift Click > Seleccionar")


}
navbarDiv.appendChild(btn)

btn = createImageButton(`imgs/other.png`)
btn.className = "navbarButton"
btn.title = "Otros"
btn.onclick = () => {
   unselectSelectedComponent()
   let optionsDiv = document.getElementById("optionsDiv");
   let nameDiv = document.createElement("div");
   nameDiv.className = "nameDiv";
   nameDiv.innerHTML = "Otros";
   optionsDiv.appendChild(nameDiv);
    optionsDiv.style = `height: 135px; visibility: visible`;

        addButtonTextToOptionsDiv("uno", "Reorganizar Etapas", "tres", () => {
            let numEtapasNum = [];
let numEtapasAlpha = [];

// Separate numeric and alphanumeric values
for (let c of components) {
    let val = c.options.options[0].value;
    if (c.name == "Etapa de Grafcet") {
        if (/^\d*$/.test(val)) {
            numEtapasNum.push(val); // Starts with a number → Numeric group
        } else {
            numEtapasAlpha.push(val); // Starts with a letter → Alphanumeric group
        }
    }
}

// Function to extract prefix, number, and suffix
function extractParts(str) {
    let match
    match = str.match(/^([A-Za-z]*)(\d+)([A-Za-z]*)$/i); // Match [Letter Prefix][Number][Suffix]
    return match ? { prefix: match[1] || "", num: parseInt(match[2]), suffix: match[3] || "" } : null;
}

// Process numeric values (renumbered sequentially, preserving suffixes)

let uniqueSortedNum = [...new Set(numEtapasNum)]
    .map(extractParts)
    .sort((a, b) => {
        a.num - b.num
        });

let mappingNum = new Map();
uniqueSortedNum.forEach((val, index) => mappingNum.set(`${val.num}${val.suffix}`, `${index}${val.suffix}`));

// Process alphanumeric values (sorted and renumbered within groups)
let groupedAlpha = new Map();
numEtapasAlpha.forEach(val => {
    let parts = extractParts(val);
    if (!groupedAlpha.has(parts.prefix)) {
        groupedAlpha.set(parts.prefix, []);
    }
    groupedAlpha.get(parts.prefix).push(parts);
});

// Sort and remap each alphanumeric group separately
let mappingAlpha = new Map();
groupedAlpha.forEach((values, prefix) => {
    values.sort((a, b) => a.num - b.num); // Sort by number
    values.forEach((val, index) => {
        mappingAlpha.set(`${val.prefix}${val.num}${val.suffix}`, `${val.prefix}${index}${val.suffix}`);
    });
});

// Apply mappings
for (let c of components) {
    let val = c.options.options[0].value;
    if (c.name == "Etapa de Grafcet") {
        if (mappingNum.has(val)) {
            c.options.options[0].value = mappingNum.get(val);
        } else if (mappingAlpha.has(val)) {
            c.options.options[0].value = mappingAlpha.get(val);
        }
        c.symbol.strokes[11].text = c.options.options[0].value;
    }
}
updateCanvas();

        })

        addButtonTextToOptionsDiv("dos", "Incrementar Etapas", "tres", () => {
            let numEtapasNum = [];
            let numEtapasAlpha = [];
        
            // Separate numeric and alphanumeric values
            for (let c of components) {
                let val = c.options.options[0].value;
                if (c.name == "Etapa de Grafcet") {
                    if (/^\d+$/.test(val)) {
                        numEtapasNum.push(val); // Pure numeric values
                    } else {
                        numEtapasAlpha.push(val); // Alphanumeric values
                    }
                }
            }
        
            // Function to extract prefix, number, and suffix
            function extractParts(str) {
                let match = str.match(/^([A-Za-z]*)(\d+)([A-Za-z]*)$/i); // Match [Prefix][Number][Suffix]
                return match ? { prefix: match[1] || "", num: parseInt(match[2]), suffix: match[3] || "" } : null;
            }
        
            // Increment all numeric values
            let mappingNum = new Map();
            numEtapasNum.forEach(val => {
                let parts = extractParts(val);
                mappingNum.set(val, `${parts.num + 1}${parts.suffix}`);
            });
        
            // Increment all alphanumeric values
            let mappingAlpha = new Map();
            numEtapasAlpha.forEach(val => {
                let parts = extractParts(val);
                mappingAlpha.set(val, `${parts.prefix}${parts.num + 1}${parts.suffix}`);
            });
        
            // Apply mappings
            for (let c of components) {
                let val = c.options.options[0].value;
                if (c.name == "Etapa de Grafcet") {
                    if (mappingNum.has(val)) {
                        c.options.options[0].value = mappingNum.get(val);
                    } else if (mappingAlpha.has(val)) {
                        c.options.options[0].value = mappingAlpha.get(val);
                    }
                    c.symbol.strokes[11].text = c.options.options[0].value;
                }
            }
            updateCanvas();
        });
        
      


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
btn.title = "Simular"
btn.onclick = () => {
    if (!simuActivated) {
    simuActivated = true
    saveComponents()
    convertComponentsToNodes()  
        runThroughNodes()

    return
}
    stopSimulation()
}


//navbarDiv.appendChild(btn)



var currHeight = 0
var currTemp = 0
var marcasMap = {}

btn = createImageButton(`imgs/tia.png`)
btn.className = "navbarButton"
btn.title = "Pasar a Contactos"
btn.onclick = () => {

    let grafcetSCLCodeEtapaCero = "IF"
    let grafcetSCLCodeFaseEtapas = ""

    currTemp = 0
    currHeight = 4

    marcasMap = {}

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
        
        let c = addComponent(new ContactoLogico()).moveTo([2 + 3*(i+1), 5]);
        c.options.options[0].value = i;
        c.options.options[1].value = CONTACTO_NC_COLLECTION;
        grafcetSCLCodeEtapaCero += ` NOT "Etapa ${i}" AND`
        selectComponent(c);
        unselectSelectedComponent(c);
        
        // Fase Etapas
        
        for (var j in currEtapa.prevTransiciones) {
            calculateContactMatrix(currEtapa, j, currTemp)
            console.log(currEtapa.prevTransiciones[j])

            let sclTemp = "IF"

            currEtapa.prevTransiciones[j].prevEtapas.pop()
            for (var k in currEtapa.prevTransiciones[j].prevEtapas) {
                sclTemp += ` "Etapa ${currEtapa.prevTransiciones[j].prevEtapas[k].etapa.options.options[0].value}" AND `
            }
            sclTemp += "\""
            let scpAdd = currEtapa.prevTransiciones[j].transicion.options.options[0].value
            .replace(/\*/g, '" AND "')
            .replace(/\+/g, '" OR "')
            .replace(/_/g, ' NOT "') 
            .replace(/\(/g, '( "') 
            .replace(/\)/g, '" )') 
            sclTemp += `${scpAdd}" THEN`
            for (var k in currEtapa.prevTransiciones[j].etapas) {
                sclTemp += ` "Etapa ${currEtapa.prevTransiciones[j].etapas[k].etapa.options.options[0].value}" := 1;`
            }
            for (var k in currEtapa.prevTransiciones[j].prevEtapas) {
                sclTemp += ` "Etapa ${currEtapa.prevTransiciones[j].prevEtapas[k].etapa.options.options[0].value}" := 0;`
            }
            sclTemp += `END_IF;`
            grafcetSCLCodeFaseEtapas += sclTemp + "\n\n"
        }
        
        i++
    }

    grafcetSCLCodeEtapaCero = grafcetSCLCodeEtapaCero.split("")
    grafcetSCLCodeEtapaCero.pop()
    grafcetSCLCodeEtapaCero.pop()
    grafcetSCLCodeEtapaCero.pop()
    grafcetSCLCodeEtapaCero = grafcetSCLCodeEtapaCero.join("")
    grafcetSCLCodeEtapaCero += `THEN "Etapa 0" := 1; END_IF;`

    console.log(grafcetSCLCodeEtapaCero + "\n\n" + grafcetSCLCodeFaseEtapas)

    let c2 = addComponent(new BobinaLogica()).moveTo([3*(i+2)-1, 5]);
    c2.options.options[0].value = "0";
    c2.options.options[1].value = BOBINA_SET_COLLECTION;
    selectComponent(c2);
    unselectSelectedComponent(c2)

    // Fase Actuadores (Marcas)
    
 let currMarcaTemp = 0

    for (let [marca, etapasMarca] of Object.entries(marcasMap)) {
    c = addComponent(new ContactoLogico()).moveTo([5, currHeight + 5])
    c.options.options[0].value = etapasMarca[0];
    c.options.options[1].value = NONE_COLLECTION;
    selectComponent(c);
    unselectSelectedComponent(c);

    etapasMarca.shift()

    if (marca.replace(/[0-9]*\#T[0-9]*/, "").trim() === "" && marca.replace(/[0-9]*#T[0-9]*/, "") !== marca) {
        c = addComponent(new TemporizacionLogica()).moveTo([9, currHeight + 5])
        c.options.options[0].value = "#T" + marca.replace(/[0-9]*\#T/, "")
        currMarcaTemp++
        c.options.options[1].value = marca.replace(/\#T[0-9]*/, "")
    } else {


    c = addComponent(new BobinaLogica()).moveTo([9, currHeight + 5])
    c.options.options[1].value = NONE_COLLECTION;
    if (marca.replace(/[ ]*?\:\=[ ]*?1[ ]*?/, "") !== marca) {
        c.options.options[1].value = BOBINA_SET_COLLECTION;
        marca = marca.replace(/[ ]*?\:\=[ ]*?1[ ]*?/, "")
    }
    if (marca.replace(/[ ]*?\:\=[ ]*?0[ ]*?/, "") !== marca) {
        c.options.options[1].value = BOBINA_RESET_COLLECTION;
        marca = marca.replace(/[ ]*?\:\=[ ]*?0[ ]*?/, "")
    }
    c.options.options[0].value = marca;
}
    selectComponent(c);
    unselectSelectedComponent(c);
    currHeight += 5

    
 for (let i = 0; i < etapasMarca.length; i++) {
            currHeight += 4
            c = addComponent(new ContactoLogico()).moveTo([5, currHeight])
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


// navbarDiv.appendChild(btn)

function calculateContactMatrix(currEtapa, index) {

    let currVar = ""
    let sets = currEtapa.prevTransiciones[index].prevEtapas
    sets = [... new Set(sets)]
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
            
            if (currVar.trim().replace(/\/[0-9]*s/, "") === "") {
                for (var j in sets) {
                    marcasMap[currVar.replace("/", "").replace("s", "") + "#T" + currTemp] = [sets[j].etapa.options.options[0].value]
                }
                currVar = currVar.replace("s", "").replace(/\/[0-9]*/, "") + "#T" + currTemp
                currTemp++
            }

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
    if (currVar.trim().replace(/\/[0-9]*s/, "") === "") {
        for (var j in sets) {
            marcasMap[currVar.replace("/", "").replace("s", "") + "#T" + currTemp] = [sets[j].etapa.options.options[0].value]
        }
        currVar = currVar.replace("s", "").replace(/\/[0-9]*/, "") + "#T" + currTemp
        currTemp++
    }
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
                let c = addComponent(new ContactoLogico()).moveTo(lastContactPos);

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
for (var i in sets) {
    lastContactPos = [lastContactPos[0]+3, lastContactPos[1]]
let c = addComponent(new ContactoLogico()).moveTo(lastContactPos);
                c.options.options[0].value = sets[i].etapa.options.options[0].value;
                c.options.options[1].value = NONE_COLLECTION;
                selectComponent(c);
                unselectSelectedComponent(c);
            }
            lastContactPos = [lastContactPos[0]+3, lastContactPos[1]]
            c = addComponent(new BobinaLogica().clone()).moveTo(lastContactPos);
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
c = addComponent(new BobinaLogica().clone()).moveTo(lastContactPos);
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



function addComponent(comp, copy) {
    let c = comp.clone().moveTo([cursorX-offsetX,cursorY-offsetY])
    if (!copy) {
        if (c.name == "Etapa de Grafcet")  {
            let currGrafcetsNumbers = []
            for (let comp of components) {
                if (comp.name == "Etapa de Grafcet") {
                    currGrafcetsNumbers.push(Number.parseInt(comp.options.options[0].value))
                }
            }
            let grafVal = 0
            while (currGrafcetsNumbers.indexOf(grafVal) != -1) {
                grafVal++
            }
            c.symbol.strokes[11].text = grafVal
            c.options.options[0].setValue(grafVal)
            currGrafcetStages.push(c)
        
        }
    }
    components.push(c)
    updateCanvas()
    return c
}

for (let i = 0; i < COMPONENTS_LIST.length; i++) {

    let btn = createImageButton(`imgs/components/${COMPONENTS_LIST[i].imageName}.png`)
    btn.className = "navbarButton"
    btn.title = COMPONENTS_LIST[i].name
    btn.onclick = () => {
        let c = addComponent(COMPONENTS_LIST[i])
        unselectSelectedComponent()
        selectComponent(c)

    
    }

    navbarDiv.appendChild(btn)
}

for (let group of GROUP_LIST) {
     let btn = createImageButton(`imgs/components/${group.imageName}.png`)
    btn.className = "navbarButton"
    btn.onclick = () => {
        groupDiv.innerHTML = ''
        for (let component of group.elements) {
             let btn2 = createImageButton(`imgs/components/${component.imageName}.png`)
            btn2.className = "navbarButton"
            btn2.title = component.name
            btn2.onclick = () => {
                let c = addComponent(component)
                unselectSelectedComponent()
                c.roundPosition()
                selectComponent(c)
            
            }
            navbarDiv2.appendChild(btn2)
        }
    }
    navbarDiv.appendChild(btn)
}
