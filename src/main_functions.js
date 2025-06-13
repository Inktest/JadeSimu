function unselectSelectedComponent(noColorUpdate) {
        for (let c of selectedComponent) {
        c.roundPosition()
        if (!noColorUpdate) c.symbol.setColor(DEFAULT_COLOR)
        if (selectedComponent.length == 1)
             c.update()
    }
    selectedComponent = []

        clearOptions()
        saveComponents()
}

function spawnObjectAtCursor(obj) {
    unselectSelectedComponent()
    components.push(obj)
    selectedComponent = [obj]
    selectedComponent.options.addOptions()
    obj.symbol.setColor(SELECTED_COLOR)
    held = true
    updateCanvas()
}

function deleteSelectedObject() {
    if (selectedComponent.length == 0) return

    for (let comp of selectedComponent) {

    let index = components.findIndex(c => c === comp)
    if (index === -1) return

    let grafIndex = currGrafcetStages.findIndex(c => c === comp)
    if (grafIndex !== -1) currGrafcetStages.splice(grafIndex, 1)

        components.splice(index, 1)
    }
    unselectSelectedComponent()
    saveComponents()
    updateCanvas()
    calculateHitboxMap()
}

function selectComponent(obj, add, noColorUpdate) {
    //if (simuActivated) return
    if (!add) unselectSelectedComponent()
    if (!noColorUpdate) obj.symbol.setColor(SELECTED_COLOR)
    if (add) {
        let index = selectedComponent.findIndex(c => c === obj)
        if (index === -1) 
        selectedComponent.push(obj)
        clearOptions()
        if (selectedComponent.length == 1) {
            selectedComponent[0].options.addOptions()
        } else {
            new MultipleComponents().options.addOptions()
        }
    } else {
        selectedComponent = [obj]
        selectedComponent[0].options.addOptions()
    }
    held = true
    movedX = 0
    movedY = 0
    if (!add) updateCanvas()
}

function calculateHitboxMap() {
    hitboxMap = {}
    for (let i = 0; i < components.length; i++) {
        let effectiveHitbox = components[i].getEffectiveHitbox()
        for (let j = 0; j < effectiveHitbox.length; j++) {
            if (!hitboxMap[effectiveHitbox[j]]) hitboxMap[effectiveHitbox[j]] = []
            hitboxMap[effectiveHitbox[j]].push(components[i])
        }
    }
}

function rotateSelectedObject() {
    if (selectedComponent.length == 0) return
    for (let c of selectedComponent) {
        let dif = [c.position[1]-selectedComponent[0].position[1], -(c.position[0]-selectedComponent[0].position[0])]
    c.rotate90Deg()
    c.moveTo(selectedComponent[0].position)
    c.translate(dif)
}
    updateCanvas()
    calculateHitboxMap()
}

function clearOptions() {
    let div = document.getElementById("optionsDiv")
    div.innerHTML = ""
    div.style = "height: 0px; visibility: hidden"
}

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

function downloadTextFile(name, content) {
    const link = document.createElement('a')
    const file = new Blob([content], {type: 'text/plain'})

    link.href = URL.createObjectURL(file)
    link.download = name
    link.click()
    URL.revokeObjectURL(link.href)
}

function saveComponents() {
    console.log("saveComponents")
    localStorage.setItem("components", getSaveText())
}

function loadFromFileText(contents) {
    console.log("File contents:", contents);
    lines = contents.split("\n")
    if (lines[0] === "v1") {
      prepareFileLoad()
      loadv1(lines)
      console.log("Loaded file from v1")
      updateCanvas()
      document.getElementById('loading-screen').style.display = 'none';
      return
    }
    if (lines[0] === "v1.1") {
      prepareFileLoad()
      loadv1_1(lines)
      console.log("Loaded file from v1.1")
      updateCanvas()
      document.getElementById('loading-screen').style.display = 'none';
      return
    }
    if (lines[0] === "v1.1.1") {
      prepareFileLoad()
      loadv1_1_1(lines)
      console.log("Loaded file from v1.1.1")
      updateCanvas()
      document.getElementById('loading-screen').style.display = 'none';
      return
    }
    if (lines[0] === "v2") {
        prepareFileLoad()
        loadv2(lines)
        console.log("Loaded file from v2")
        updateCanvas()
        return
    }
    alert("Versión del archivo no soportada")
    document.getElementById('loading-screen').style.display = 'none';
}