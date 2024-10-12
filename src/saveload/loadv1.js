const loadv1 = (lines) => {
    for (let i = 0; i < lines.length-1; i++) {
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

        if (abreviature == "txt") {
            c = addComponent(new Texto()).moveTo([firstCoord, secondCoord])
            c.options.options[0].value = lines[i]
            c.options.options[1].value = lines[++i]
            selectComponent(c)
        }

        if (abreviature == "Wre") {
            wires.push(new Line([firstCoord, secondCoord], lines[i].split(","), 1, DEFAULT_COLOR))
        }
        
        updateCanvas()
        convertDiagramToNodes()
        unselectSelectedComponent()
        held = false;
      }
}