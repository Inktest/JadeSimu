function unselectSelectedComponent() {
    if (selectedComponent) {
        selectedComponent.roundPosition()
        selectedComponent.symbol.setColor(DEFAULT_COLOR)
        selectedComponent.update()
        selectedComponent = null
            }
        clearOptions()
        saveComponents()
}

function spawnObjectAtCursor(obj) {
    unselectSelectedComponent()
    components.push(obj)
    selectedComponent = obj
    selectedComponent.options.addOptions()
    obj.symbol.setColor(SELECTED_COLOR)
    held = true
    updateCanvas()
}

function deleteSelectedObject() {
    if (!selectedComponent) return
    let index = components.findIndex(c => c === selectedComponent)
    if (index === -1) return

    let grafIndex = currGrafcetStages.findIndex(c => c === selectComponent)
    if (grafIndex !== -1) currGrafcetStages.splice(grafIndex, 1)

    unselectSelectedComponent()
    components.splice(index, 1)
    updateCanvas()
    calculateHitboxMap()
    saveComponents()
}

function selectComponent(obj) {
    if (simuActivated) return
    obj.symbol.setColor(SELECTED_COLOR)
    selectedComponent = obj
    selectedComponent.options.addOptions()
    held = true
    movedX = 0
    movedY = 0
    updateCanvas()
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
    if (!selectedComponent) return
    selectedComponent.rotate90Deg()
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
      return
    }
    if (lines[0] === "v1.1") {
      prepareFileLoad()
      loadv1_1(lines)
      console.log("Loaded file from v1.1")
      updateCanvas()
      return
    }
    if (lines[0] === "v1.1.1") {
      prepareFileLoad()
      loadv1_1_1(lines)
      console.log("Loaded file from v1.1.1")
      updateCanvas()
      return
    }
    alert("Versión del archivo no soportada")
}