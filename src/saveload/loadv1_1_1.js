const loadv1_1_1 = (line) => {

    const StrokeCollectionListv1_1_1 = [NONE_COLLECTION, BOBINA_SET_COLLECTION, BOBINA_RESET_COLLECTION, CONTACTO_NC_COLLECTION, CONTACTO_FS_COLLECTION, LED_DIODO_COLLECTION, FOTO_DIODO_COLLECTION, ZENER_DIODO_COLLECTION, SCHOTTKY_DIODO_COLLECTION, TUNEL_DIODO_COLLECTION, VARICAP_DIODO_COLLECTION, PULSADOR_COLLECTION, SETA_COLLECTION, FC_COLLECTION, INTERRUPTOR_COLLECTION, SENSOR_COLLECTION, TIRADOR_COLLECTION, LLAVE_COLLECTION, GENERAL_COLLECTION, PEDAL_COLLECTION, VOLANTE_COLLECTION, MANIVELA_COLLECTION, PALANCA_COLLECTION, LEVA_COLLECTION, RETARDO_ON_COLLECTION, RETARDO_OFF_COLLECTION, RETARDO_ONOFF_COLLECTION, RETARDO_ON_BOBINA_COLLECTION, RETARDO_OFF_BOBINA_COLLECTION, RETARDO_ONOFF_BOBINA_COLLECTION, REMANENCIA_BOBINA_COLLECTION, ENCLAVAMIENTO_BOBINA_COLLECTION, INTERMITENTE_BOBINA_COLLECTION, TEMP_TON_COLLECTION, IMPULSO_BOBINA_COLLECTION, RELE_TERMICO_ADD, ACTUADOR_LINEAR_NO_AMORTIGUACION, ACTUADOR_LINEAR_AMORTIGUACION, ACTUADOR_SENSOR_FC]

    let abreviature, firstCoord, secondCoord, lines;
    
    let boxData = line[0].split(`\u{001d}`)
    page_vertical = boxData[0] == "true"
    project_name = boxData[1]
    project_name_size = boxData[2]
    project_author = boxData[3]
    page_height = boxData[4]?parseInt(boxData[4]):1240
    page_width = boxData[5]?parseInt(boxData[5]):1748


    for (let i = 1; i < line.length-1; i++) {
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
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = !lines[3]
        c.options.options[4].value = StrokeCollectionListv1_1_1[lines[4]].clone().translate([-2,2])
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
        c.options.options[2].value = lines[2]
        selectComponent(c)
    }

    if (abreviature == "Lct") {
        c = addComponent(new ContactoLógico()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = StrokeCollectionListv1_1_1[lines[1]].clone()
        selectComponent(c)
    }

    if (abreviature == "Lbn") {
        c = addComponent(new BobinaLógica()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = StrokeCollectionListv1_1_1[lines[1]].clone()
        selectComponent(c)
    }

    if (abreviature == "Gnd") {
        c = addComponent(new Tierra()).moveTo([firstCoord, secondCoord])
        selectComponent(c)
    }

    if (abreviature == "Alm") {
        c = addComponent(new FuenteAlimentacion()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = lines[3]
        c.options.options[4].value = lines[4]
        c.options.options[5].value = lines[5]
        c.options.options[6].value = lines[6] === "true"
        selectComponent(c)
    }

    if (abreviature == "Tsf") {
        c = addComponent(new Transformador()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = lines[3]
        c.options.options[4].value = lines[4]
        c.options.options[5].value = lines[5]
        c.options.options[6].value = lines[6]
        c.options.options[7].value = !lines[7]
        selectComponent(c)
    }

    if (abreviature == "Dif") {
        c = addComponent(new Diferencial()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        selectComponent(c)
    }

    if (abreviature == "Ter") {
        c = addComponent(new ReleTermico()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = lines[3]
        c.options.options[4].value = lines[4]
        c.options.options[5].value = lines[5]
        c.options.options[6].value = lines[6]
        selectComponent(c)
    }

    if (abreviature == "Led") {
        c = addComponent(new Diodo()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = StrokeCollectionListv1_1_1[lines[3]].clone().translate([0,2])
        selectComponent(c)
    }

    if (abreviature == "CCo") {
        c = addComponent(new Conmutador()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = lines[3]
        selectComponent(c)
    }

    if (abreviature == "CPC") {
        c = addComponent(new PulsadorConmutado()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = lines[3]
        c.options.options[4].value = StrokeCollectionListv1_1_1[lines[4]].clone().translate([-2,2])
        selectComponent(c)
    }

    if (abreviature == "Tmp") {
        c = addComponent(new TemporizacionLogica()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = StrokeCollectionListv1_1_1[lines[2]].clone()
        selectComponent(c)
    }

    if (abreviature == "CCT") {
        c = addComponent(new ConmutadorTemporizado()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = lines[3]
        c.options.options[4].value = StrokeCollectionListv1_1_1[lines[4]].clone().translate([-2,2])
        selectComponent(c)
    }

    if (abreviature == "CTm") {
        c = addComponent(new ContactoTemporizado()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = lines[3] === "true"
        c.options.options[4].value = StrokeCollectionListv1_1_1[lines[4]].clone().translate([-2,2])
        selectComponent(c)
    }

    if (abreviature == "mCA") {
        c = addComponent(new MotorAC()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = lines[3]
        c.options.options[4].value = lines[4]
        c.options.options[5].value = lines[5]
        c.options.options[6].value = lines[6]
        c.options.options[7].value = lines[7]
        c.options.options[8].value = lines[8] === "true"
        c.options.options[9].value = lines[9] === "true"
        selectComponent(c)
    }

    if (abreviature == "Opt") {
        c = addComponent(new Piloto()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = lines[3] === "true"
        c.options.options[4].value = lines[4]
        selectComponent(c)
    }

    if (abreviature == "Ds7") {
        c = addComponent(new EightDisplay()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = lines[3]
        c.options.options[4].value = lines[4]
        c.options.options[5].value = lines[5]
        c.options.options[6].value = lines[6]
        c.options.options[7].value = lines[7]
        c.options.options[8].value = lines[8]
        c.options.options[9].value = lines[9]
        c.options.options[10].value = lines[10]  === "true"
        selectComponent(c)
    }

    if (abreviature == "Fus") {
        c = addComponent(new Fusible()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        selectComponent(c)
    }

    if (abreviature == "Cdr") {
        c = addComponent(new Condensador()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0] === "true"
        selectComponent(c)
    }

    if (abreviature == "Bob") {
        c = addComponent(new Bobina()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = StrokeCollectionListv1_1_1[lines[3]].clone().translate([0, 2])
        selectComponent(c)
    }

    if (abreviature == "Ctr") {
        c = addComponent(new Contactor()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = lines[3] === "true"
        selectComponent(c)
    }

    if (abreviature == "Arr") {
        c = addComponent(new Arrow()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        selectComponent(c)
    }

    if (abreviature == "Nal") {
        c = addComponent(new ActuadorLineal()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = lines[3] === "true"
        c.options.options[4].value = lines[4] === "true"
        c.options.options[5].value = StrokeCollectionListv1_1_1[lines[5]].clone().translate([1, 0])
        c.options.options[6].value = StrokeCollectionListv1_1_1[lines[6]].clone()
        if (c.options.options[6].value.id === 38) c.options.options[6].value.translate([-1, -0.75])
        selectComponent(c)
    }

    if (abreviature == "Nag") {
        c = addComponent(new ActuadorGiratorio()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = StrokeCollectionListv1_1_1[lines[3]].clone()
        if (c.options.options[3].value.id === 38) c.options.options[3].value.translate([-1, -0.75])
        selectComponent(c)
    }

    if (abreviature == "Npz") {
        c = addComponent(new PinzaNeumatica()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        c.options.options[2].value = lines[2]
        c.options.options[3].value = lines[3] === "true"
        c.options.options[4].value = StrokeCollectionListv1_1_1[lines[4]].clone()
        if (c.options.options[4].value.id === 38) c.options.options[4].value.translate([-1, -0.75])
        selectComponent(c)
    }

    if (abreviature == "Wr2") {
        c = addComponent(new WireComponent()).moveTo([firstCoord, secondCoord])
        c.options.options[0].value = lines[0]
        c.options.options[1].value = lines[1]
        selectComponent(c)
    }

    // TODO: Add Neumatica

    if (abreviature == "Wre") {
        //wires.push(new Line([firstCoord, secondCoord], [lines[0], lines[1]], 1, DEFAULT_COLOR))

        let cW = new WireComponent([firstCoord, secondCoord])
        cW.options.options[0].setValue(secondCoord - lines[1])
        cW.options.options[1].setValue(firstCoord - lines[0])
        let c = addComponent(cW)
        selectComponent(c)
        unselectSelectedComponent()
        c.position = [parseInt(lines[0]), parseInt(lines[1])]

    }
    unselectSelectedComponent()
    held = false;
}
updateCanvas()
convertDiagramToNodes()

}