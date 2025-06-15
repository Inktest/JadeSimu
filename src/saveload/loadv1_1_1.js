const loadv1_1_1 = (line) => {

    let finalText = []

    const StrokeCollectionListv1_1_1 = [NONE_COLLECTION, BOBINA_SET_COLLECTION, BOBINA_RESET_COLLECTION, CONTACTO_NC_COLLECTION, CONTACTO_FS_COLLECTION, LED_DIODO_COLLECTION, FOTO_DIODO_COLLECTION, ZENER_DIODO_COLLECTION, SCHOTTKY_DIODO_COLLECTION, TUNEL_DIODO_COLLECTION, VARICAP_DIODO_COLLECTION, PULSADOR_COLLECTION, SETA_COLLECTION, FC_COLLECTION, INTERRUPTOR_COLLECTION, SENSOR_COLLECTION, TIRADOR_COLLECTION, LLAVE_COLLECTION, GENERAL_COLLECTION, PEDAL_COLLECTION, VOLANTE_COLLECTION, MANIVELA_COLLECTION, PALANCA_COLLECTION, LEVA_COLLECTION, RETARDO_ON_COLLECTION, RETARDO_OFF_COLLECTION, RETARDO_ONOFF_COLLECTION, RETARDO_ON_BOBINA_COLLECTION, RETARDO_OFF_BOBINA_COLLECTION, RETARDO_ONOFF_BOBINA_COLLECTION, REMANENCIA_BOBINA_COLLECTION, ENCLAVAMIENTO_BOBINA_COLLECTION, INTERMITENTE_BOBINA_COLLECTION, TEMP_TON_COLLECTION, IMPULSO_BOBINA_COLLECTION, RELE_TERMICO_ADD, ACTUADOR_LINEAR_NO_AMORTIGUACION, ACTUADOR_LINEAR_AMORTIGUACION, ACTUADOR_SENSOR_FC]

    let abreviature, firstCoord, secondCoord, lines;
    
    let boxData = line[0].split(`\u{001d}`)
    page_vertical = boxData[0] == "true"
    project_name = boxData[1]
    project_name_size = boxData[2]
    project_author = boxData[3]
    page_height = boxData[4]?parseInt(boxData[4]):1240
    page_width = boxData[5]?parseInt(boxData[5]):1748
    page_margin = boxData[6]?parseInt(boxData[6]):3

    finalText.push(line[0])


    for (let i = 1; i < line.length-1; i++) {
        currLine = line[i].split(`\u{001d}`)
        firstCoord = parseFloat(currLine[0])
        secondCoord = parseFloat(currLine[1])
        abreviature = currLine[2]
        currLine.splice(0, 3)
        lines = currLine
    console.log({abv: abreviature, c1: firstCoord, c2: secondCoord, line: lines})
    finalText.push(firstCoord + `\u{001d}` + secondCoord + `\u{001d}0\u{001d}` + abreviature + `\u{001d}` + lines.join(`\u{001d}`))
    

}
finalText.push("")

loadv2(finalText)

}
