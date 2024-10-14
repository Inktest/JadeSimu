const loadv1_1 = (line) => {

    let abreviature, firstCoord, secondCoord, lines;
    for (let i = 0; i < line.length-1; i++) {
        currLine = line[i].split(`\u{001d}`)
        firstCoord = parseFloat(currLine[0])
        secondCoord = parseFloat(currLine[1])
        abreviature = currLine[2]
        currLine.splice(0, 3)
        lines = currLine
    console.log({abv: abreviature, c1: firstCoord, c2: secondCoord, line: lines})
    let c
    if (abreviature == "Get") {
        c = addComponent(new Grafcet()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        selectComponent(c)
    }

    if (abreviature == "Gtr") {
        c = addComponent(new GrafcetTransicion()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        selectComponent(c)
    }

    if (abreviature == "Vvn") {
        c = addComponent(new Vaiven()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        selectComponent(c)
    }

    if (abreviature == "Vfc") {
        c = addComponent(new FC()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        selectComponent(c)
    }

    if (abreviature == "Ton") {
        c = addComponent(new TemporizacionLogica()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]?lines[1]:TEMP_TON_COLLECTION.clone()
        selectComponent(c)
    }

    if (abreviature == "Vcc") {
        c = addComponent(new Fuente()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        selectComponent(c)
    }

    if (abreviature == "Swt") {
        c = addComponent(new Pulsador()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        selectComponent(c)
    }

    if (abreviature == "S75") {
        c = addComponent(new S71215C()).moveTo([firstCoord, secondCoord])
        selectComponent(c)
    }

    if (abreviature == "txt") {
        c = addComponent(new Texto()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        selectComponent(c)
    }

    if (abreviature == "Lct") {
        c = addComponent(new ContactoLógico()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = [NONE_COLLECTION, BOBINA_SET_COLLECTION, BOBINA_RESET_COLLECTION, CONTACTO_NC_COLLECTION, CONTACTO_FS_COLLECTION, CONTACTO_FB_COLLECTION][lines[1]].clone()
        selectComponent(c)
    }

    if (abreviature == "Lbn") {
        c = addComponent(new BobinaLógica()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = [NONE_COLLECTION, BOBINA_SET_COLLECTION, BOBINA_RESET_COLLECTION, CONTACTO_NC_COLLECTION, CONTACTO_FS_COLLECTION, CONTACTO_FB_COLLECTION][lines[1]].clone()
        selectComponent(c)
    }

    if (abreviature == "Wre") {
        wires.push(new Line([firstCoord, secondCoord], [lines[0], lines[1]], 1, DEFAULT_COLOR))
    }
    unselectSelectedComponent()
    held = false;
}
updateCanvas()
convertDiagramToNodes()

}