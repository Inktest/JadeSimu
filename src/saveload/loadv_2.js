const loadv2 = async (line) => {

    const StrokeCollectionListv1_1_1 = [NONE_COLLECTION, BOBINA_SET_COLLECTION, BOBINA_RESET_COLLECTION, CONTACTO_NC_COLLECTION, CONTACTO_FS_COLLECTION, LED_DIODO_COLLECTION, FOTO_DIODO_COLLECTION, ZENER_DIODO_COLLECTION, SCHOTTKY_DIODO_COLLECTION, TUNEL_DIODO_COLLECTION, VARICAP_DIODO_COLLECTION, PULSADOR_COLLECTION, SETA_COLLECTION, FC_COLLECTION, INTERRUPTOR_COLLECTION, SENSOR_COLLECTION, TIRADOR_COLLECTION, LLAVE_COLLECTION, GENERAL_COLLECTION, PEDAL_COLLECTION, VOLANTE_COLLECTION, MANIVELA_COLLECTION, PALANCA_COLLECTION, LEVA_COLLECTION, RETARDO_ON_COLLECTION, RETARDO_OFF_COLLECTION, RETARDO_ONOFF_COLLECTION, RETARDO_ON_BOBINA_COLLECTION, RETARDO_OFF_BOBINA_COLLECTION, RETARDO_ONOFF_BOBINA_COLLECTION, REMANENCIA_BOBINA_COLLECTION, ENCLAVAMIENTO_BOBINA_COLLECTION, INTERMITENTE_BOBINA_COLLECTION, TEMP_TON_COLLECTION, IMPULSO_BOBINA_COLLECTION, RELE_TERMICO_ADD, ACTUADOR_LINEAR_NO_AMORTIGUACION, ACTUADOR_LINEAR_AMORTIGUACION, ACTUADOR_SENSOR_FC]
    const abreviaturesLookup = {
        "Vcc": "components/fuente.a",
        "Swt": "components/pulsador.a",
        "S75": "components/s7-1215C.a",
        "Lbn": "components/bobina-l.a",
        "Gnd": "components/tierra.a",
        "Alm": "components/fuente-a.a",
        "Tsf": "components/transformador.a",
        "Ter": "components/rele-t.a",
        "Led": "components/diodo.a",
        "CCo": "components/conmutador.a" ,
        "CPC": "components/conmutador-p.a",
        "Opt": "components/piloto.a",
        "Ds7": "components/7seg.a",
        "Fus": "components/fusible.a",
        "Cdr": "components/condensador.a",
        "Bob": "components/bobina.a",
        "txt": "components/text.a",
        "Arr": "components/arrow.a",
        "Ctr": "components/contator.a",
        "Get": "components/etapa.a",
        "Gtr": "components/transicion.a",
        "Vvn": "components/vaiven.a",
        "Vfc": "components/fc.a",
        "Npz": "components/pinza.a",
        "Lct": "components/contacto-l.a",
        "Nag": "components/girat.a",
        "Lct": "components/linear.a",
        "Ton": "components/temp-l.a",
        "mCA": "components/motorac.a",
        "CTm": "components/contacto-t.a",
        "CCT": "components/conmutador-t.a"
    }

    // CCT

    // Tmp -> Ton
    // Dif -> new format
    let abreviature, firstCoord, secondCoord, lines;
    
    let boxData = line[0].split(`\u{001d}`)
    page_vertical = boxData[0] == "true"
    project_name = boxData[1]
    project_name_size = boxData[2]
    project_author = boxData[3]
    page_height = boxData[4]?parseInt(boxData[4]):1240
    page_width = boxData[5]?parseInt(boxData[5]):1748
    page_margin = boxData[6]?parseInt(boxData[6]):3


    for (let i = 1; i < line.length-1; i++) {
        currLine = line[i].split(`\u{001d}`)
        firstCoord = parseFloat(currLine[0])
        secondCoord = parseFloat(currLine[1])
        rotation = parseInt(currLine[2])
        abreviature = currLine[3]
        currLine.splice(0, 4)
        lines = currLine
    // console.log({abv: abreviature, c1: firstCoord, c2: secondCoord, line: lines})
    let c = await getComponentFromJadeFile(abreviaturesLookup[abreviature])
    c = await addComponent(c)
    c.moveTo([firstCoord,secondCoord])
    console.log(rotation)
    for (let r = 0; r < rotation; r++) {
        c.rotate90Deg()
    }
    j = 0
    let symbolI = 0
    for (let opt of c.options.options) {
        switch (opt.idName) {
            case "txt": 
            opt.value = lines[j]
            break
            case "chk": 
            opt.value = lines[j] === "true"
            break
            case "img": 
            opt.value = StrokeCollectionList[lines[j]].clone().translate(c.symbolOffsets[symbolI])
            symbolI++
            break
        }
        j++
    }
    
    selectComponent(c)
    unselectSelectedComponent()
    held = false;
}
updateCanvas()
convertDiagramToNodes()
document.getElementById('loading-screen').style.display = 'none';
}