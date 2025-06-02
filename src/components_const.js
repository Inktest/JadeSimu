async function getComponentFromJadeFile(file) {
    let component;

    await fetch(file)
        .then((res) => res.text())
        .then((text) => {
            if (!text.startsWith("V2.0c")) return "Not valid";

            let lines = text.split("\n");
            lines = lines.map((line) => line.replace("\r", ""))
            let symbolArray = [];
            let optionsArray = [];
            let functionsToRun = [];
            let inoutArray = []
            let getCompNameFunction = function() {};
            let toggleStateFunction = function() {};
            let componentHitbox;
            let propagationFunction = function() {return []};
            let simuCanClick;
            let simulateFunctions = []
            let voltageFunction= [];
            let symbolOffsets = []
            let simulateFunction = function() {
                for (let func of simulateFunctions) {
                    (func[0])(this,func[1],func[2],func[3])
                }
            }
            let activatedReqsFunctions = []
            let activatedPreFunctions = []
            let activatedActionsFunctions = []

            for (let i = 3; i < lines.length; i++) {
                let line = lines[i].split(" ");
                switch (line[0]) {
                    case "L":
                        symbolArray.push(
                            new Line(
                                [parseFloat(line[1]), parseFloat(line[2])],
                                [parseFloat(line[3]), parseFloat(line[4])],
                                parseFloat(line[5]),
                                DEFAULT_COLOR
                            )
                        );
                        break;

                        case "LH":
                        symbolArray.push(
                            new Line(
                                [parseFloat(line[1]), parseFloat(line[2])],
                                [parseFloat(line[3]), parseFloat(line[4])],
                                parseFloat(line[5]),
                                DEFAULT_COLOR,
                                true
                            )
                        );
                        break;

                    case "R":
                        symbolArray.push(
                            new RectangleArray(
                                [parseFloat(line[1]), parseFloat(line[2])],
                                [parseFloat(line[3]), parseFloat(line[4])],
                                parseFloat(line[5]),
                                DEFAULT_COLOR
                            )
                        )
                    break

                     case "RH":
                        symbolArray.push(
                            new RectangleArray(
                                [parseFloat(line[1]), parseFloat(line[2])],
                                [parseFloat(line[3]), parseFloat(line[4])],
                                parseFloat(line[5]),
                                DEFAULT_COLOR,
                                true
                            )
                        )
                    break

                    case "A":
                        symbolArray.push(
                            new Arc(
                                [parseFloat(line[1]), parseFloat(line[2])],
                                parseFloat(line[3]),
                                parseFloat(line[4]),
                                parseFloat(line[5]),
                                parseFloat(line[6]),
                                DEFAULT_COLOR
                            )
                        )
                    break

                    case "T":
                        symbolArray.push(
                            new Text(
                                [parseFloat(line[1]), parseFloat(line[2])],
                                parseFloat(line[3]),
                                line.slice(6).join(" "),
                                DEFAULT_COLOR,
                                line[5]
                            )
                        );
                        break;

                        case "TH":
                        symbolArray.push(
                            new Text(
                                [parseFloat(line[1]), parseFloat(line[2])],
                                parseFloat(line[3]),
                                line.slice(6).join(" "),
                                DEFAULT_COLOR,
                                line[5],
                                0,
                                true
                            )
                        );
                        break;

                        case "TR":
                        symbolArray.push(
                            new Text(
                                [parseFloat(line[1]), parseFloat(line[2])],
                                parseFloat(line[3]),
                                line.slice(6).join(" "),
                                DEFAULT_COLOR,
                                line[5]
                            ).rotate90Deg()
                        );
                        break;

                    case "S":
                        symbolArray.push(StrokeCollectionList[parseInt(line[1])].clone().translate([parseFloat(line[2]),parseFloat(line[3])]))
                    break

                    case "H":
                        componentHitbox = getHitboxFromCorners(
                            [parseFloat(line[1]), parseFloat(line[2])],
                            [parseFloat(line[3]), parseFloat(line[4])]
                        );
                    break;

                    case "I":
                        inoutArray.push([parseFloat(line[1]), parseFloat(line[2])])
                    break

                    case "IA":
                        propagationFunction = function (entryIndex) {
                            return this.inouts.map((_, idx) => idx).filter(idx => idx !== entryIndex);
                        }
                    break

                    case "IC":
                        propagationFunction = function (entryIndex) {
                            if (this.symbol.strokes[parseInt(line[1])].hide) {
                                return this.inouts.map((_, idx) => idx).filter(idx => idx !== entryIndex);
                            }
                            return [];
                        }
                    break

                    case "ICV":
                        propagationFunction = function (entryIndex) {
                    let lineTypes = []
                    for (let inout of this.inouts) {
                        let key = `${inout[0]+this.position[0]},${inout[1]+this.position[1]}`
                        lineTypes.push((typeof nodeVoltages !== 'undefined' && nodeVoltages[key] !== undefined) ? nodeVoltages[key] : "N")
                    }
                    let check = [... line].splice(1)
                    for (let v of check) {
                        for (let type of lineTypes)
                            if (v == type.voltage)
                                return this.inouts.map((_, idx) => idx).filter(idx => idx !== entryIndex);
                    }
                    return []
                }
                    break


                    case "ICA":
                        propagationFunction = function (entryIndex) {
                            if (this.symbol.strokes[parseInt(line[1])].hide) {
                                return this.inouts.map((_, idx) => idx).filter(idx =>
                                    (idx === parseInt(line[2]) && entryIndex === parseInt(line[3])) ||
                                    (idx === parseInt(line[3]) && entryIndex === parseInt(line[2]))
                                );
                            }
                            return this.inouts.map((_, idx) => idx).filter(idx =>
                                (idx === parseInt(line[2]) && entryIndex === parseInt(line[4])) ||
                                (idx === parseInt(line[4]) && entryIndex === parseInt(line[2]))
                            )
                        }
                    break

                    case "TCH":
                        toggleStateFunction = function() {
                            selectComponent(this)
                            document.getElementById("opt-chk-"+line[2]).checked = !this.symbol.strokes[parseInt(line[1])].hide
                            unselectSelectedComponent()
                        }
                    break

                    case "AS":
                        simuCanClick = true
                        getCompNameFunction = function() {
                            return this.symbol.strokes[parseInt(line[1])].text
                        }
                    break

                    case "AP":
                        getCompNameFunction = function() {
                            return this.symbol.strokes[parseInt(line[1])].text
                        }
                    break

                    case "MRB":
                    simulateFunctions[simulateFunctions.length-1][1].push( function(types) {
                            let key1 = parseInt(line[1])
                            let key2 = parseInt(line[2])
                            if (types[key1].voltage === types[key2].voltage) return false
                            let check = [... line].splice(3)
                            return !(check.indexOf(types[key1].voltage) === -1 || check.indexOf(types[key2].voltage) === -1)
                        })

                    break

                    case "MRBC":
                    simulateFunctions[simulateFunctions.length-1][1].push( function(types, comp) {
                            let key1 = parseInt(line[1])
                            let key2 = parseInt(line[2])
                            selectComponent(comp)
                            if (comp.options.options[parseInt(line[3])].getValue().id != line[4]) 
                                {
                                    
                                    unselectSelectedComponent()
                                    return false

                                }
                                unselectSelectedComponent()
                            if (types[key1].voltage === types[key2].voltage) return false
                            let check = [... line].splice(5)
                            return !(check.indexOf(types[key1].voltage) === -1 || check.indexOf(types[key2].voltage) === -1)
                        })

                    break

                    case "MRBCS":
    simulateFunctions[simulateFunctions.length-1][1].push(function(types, comp) {
        let key1 = parseInt(line[1])
        let key2 = parseInt(line[2])

        // Verifica opción
        selectComponent(comp)
        if (comp.options.options[parseInt(line[3])].getValue().id != line[4]) {
            unselectSelectedComponent()
            return false
        }
        unselectSelectedComponent()

        // Verifica diferencia de voltaje
        if (types[key1].voltage === types[key2].voltage) return false

        // Verifica si los voltajes están dentro de los valores válidos
        let check = [...line].splice(6)
        let valid = !(check.indexOf(types[key1].voltage) === -1 || check.indexOf(types[key2].voltage) === -1)

        if (!valid) return false  // Mantiene el estado actual

        // Actualiza el estado dependiendo si es Set o Reset
        if (line[5] === "S" && !comp.flangeSet) {
            for (let c of components) {
                if (c.getCompName && c.getCompName() == comp.getCompName()) {
                    c.toggleState()
                    c.flangeSet = true
                }
            }
        }
        if (line[5] === "R" && comp.flangeSet) {
            comp.flangeSet = false
            for (let c of components) {
                if (c.getCompName && c.getCompName() == comp.getCompName()) {
                    c.toggleState()
                    c.flangeSet = false
                }
            }
        }

        return false
    })
    break



                    case "MRTIC":
                    simulateFunctions[simulateFunctions.length-1][1].push( function(types, comp) {
                            if (comp.symbol.strokes[parseInt(line[1])].hide) {
                            let key1 = parseInt(line[2])
                            let key2 = parseInt(line[3])
                            let key3 = parseInt(line[4])
                            let key4 = parseInt(line[5])
                            let key5 = parseInt(line[6])
                            let key6 = parseInt(line[7])
                            if ((types[key1].voltage === types[key2].voltage ||
                                types[key1].voltage === types[key3].voltage ||
                                types[key2].voltage === types[key3].voltage) &&
                                (types[key4].voltage === types[key5].voltage ||
                                    types[key4].voltage === types[key6].voltage ||
                                    types[key5].voltage === types[key6].voltage)
                            ) return false
                            let check = [... line].splice(8)
                            if ( !(check.indexOf(types[key1].voltage) === -1 || check.indexOf(types[key2].voltage) === -1 || check.indexOf(types[key3].voltage) === -1) ||
                            !(check.indexOf(types[key4].voltage) === -1 || check.indexOf(types[key5].voltage) === -1 || check.indexOf(types[key6].voltage) === -1)) {
                                comp.getPropagationInouts = function (entryIndex) {

                                    return comp.inouts.map((_, idx) => idx).filter(idx =>
                                        (idx === parseInt(line[2]) && entryIndex === parseInt(line[5])) || (idx === parseInt(line[5]) && entryIndex === parseInt(line[2])) ||
                                        (idx === parseInt(line[3]) && entryIndex === parseInt(line[6])) || (idx === parseInt(line[6]) && entryIndex === parseInt(line[3])) ||
                                        (idx === parseInt(line[4]) && entryIndex === parseInt(line[7])) || (idx === parseInt(line[7]) && entryIndex === parseInt(line[4]))
                                    );

                                }
                            } else {
                                comp.getPropagationInouts = function () {
                                    return []
                                }
                            }
                        }
                        })

                    break

                    case "MRTI":
                    simulateFunctions[simulateFunctions.length-1][1].push( function(types, comp) {
                            let key1 = parseInt(line[1])
                            let key2 = parseInt(line[2])
                            let key3 = parseInt(line[3])
                            let key4 = parseInt(line[4])
                            let key5 = parseInt(line[5])
                            let key6 = parseInt(line[6])
                            if ((types[key1].voltage === types[key2].voltage ||
                                types[key1].voltage === types[key3].voltage ||
                                types[key2].voltage === types[key3].voltage) &&
                                (types[key4].voltage === types[key5].voltage ||
                                    types[key4].voltage === types[key6].voltage ||
                                    types[key5].voltage === types[key6].voltage)
                            ) return false
                            let check = [... line].splice(8)
                            if ( !(check.indexOf(types[key1].voltage) === -1 || check.indexOf(types[key2].voltage) === -1 || check.indexOf(types[key3].voltage) === -1) ||
                            !(check.indexOf(types[key4].voltage) === -1 || check.indexOf(types[key5].voltage) === -1 || check.indexOf(types[key6].voltage) === -1)) {
                                comp.getPropagationInouts = function (entryIndex) {

                                    return comp.inouts.map((_, idx) => idx).filter(idx =>
                                        (idx === key1 && entryIndex === key4) || (idx === key4 && entryIndex === key1) ||
                                        (idx === key2 && entryIndex === key5) || (idx === key5 && entryIndex === key2) ||
                                        (idx === key3 && entryIndex === key6) || (idx === key6 && entryIndex === key3)
                                    );

                                }
                            } else {
                                comp.getPropagationInouts = function () {
                                    return []
                                }
                            }
                        })

                    break

                    

                    case "MRBINC":
                    simulateFunctions[simulateFunctions.length-1][1].push( function(types, comp) {
                            if (!comp.symbol.strokes[parseInt(line[1])].hide) {
                            let key1 = parseInt(line[2])
                            let key2 = parseInt(line[3])
                            let key3 = parseInt(line[4])
                            let key4 = parseInt(line[5])
                            if ((types[key1].voltage === types[key2].voltage) &&
                                (types[key3].voltage === types[key4].voltage)
                            ) return false
                            let check = [... line].splice(6)
                            if ( !(check.indexOf(types[key1].voltage) === -1 || check.indexOf(types[key2].voltage) === -1) ||
                            !(check.indexOf(types[key3].voltage) === -1 || check.indexOf(types[key4].voltage) === -1)) {
                                comp.getPropagationInouts = function (entryIndex) {

                                    return comp.inouts.map((_, idx) => idx).filter(idx =>
                                        (idx === key1 && entryIndex === key3) || (idx === key3 && entryIndex === key1) ||
                                        (idx === key2 && entryIndex === key4) || (idx === key4 && entryIndex === key2)
                                    );

                                }
                            } else {
                                comp.getPropagationInouts = function () {
                                    return []
                                }
                            }
                        }
                        })

                    break

                    case "MAC":
                        simulateFunctions[simulateFunctions.length-1][3].push( function(comp) {
                            comp.symbol.setColor("#"+line[1])
                        })
                    break

                    case "MAFS":
                        simulateFunctions[simulateFunctions.length-1][3].push( function(comp) {
                            let val = comp.options.options[parseInt(line[1])].value
                        for (let i = 3; i < line.length; i++) {
                            if (line[i] === val) {
                                comp.symbol.strokes[parseInt(line[2])].filledColor = "#" + line[i+1]
                            }
                        }
                    })
                    break

                    case "MATF":
                        simulateFunctions[simulateFunctions.length-1][3].push( function(comp) {
                    if (comp.options.options[parseInt(line[1])].value && (Date.now() % 1000) < 1000/parseInt(line[3])) comp.symbol.strokes[parseInt(line[2])].filledColor = ("#" + line[4]);
                        })
                    break

                    case "MPFA":
                        simulateFunctions[simulateFunctions.length-1][2].push( function(comp, isActivated) {
                            comp.symbol.strokes[parseInt(line[1])].filled = isActivated
                            comp.symbol.strokes[parseInt(line[1])].filledColor = "#" + line[2]
                        })
                    break

                    case "M":
                        simulateFunctions.push([function(comp, activatedReqs, activatedPre, activatedActions) {

                            let lineTypes = []
                            for (let inout of comp.inouts) {
                                let key = `${inout[0]+comp.position[0]},${inout[1]+comp.position[1]}`
                                lineTypes.push((typeof nodeVoltages !== 'undefined' && nodeVoltages[key] !== undefined) ? nodeVoltages[key] : "N")
                            }

                            let isActivated;
                            for (let req of activatedReqs) {
                                isActivated |= req(lineTypes, comp) || comp.flangeSet
                            }

                            for (let pre of activatedPre) {
                                pre(comp, isActivated)
                            }

                            if (comp.flange && !isActivated) {
                                comp.flange = false
                                for (let comp2 of components)
                                    if (comp2.getCompName && comp2.getCompName() === comp.getCompName())
                                        comp2.toggleState()
                                }

                                if (isActivated && !comp.flange) {
                                    comp.flange = true
                                    for (let comp2 of components)
                                        if (comp2.getCompName && comp2.getCompName() === comp.getCompName())
                                            comp2.toggleState()
                                    } 

                                    comp.symbol.setColor("#000")
                                    if (isActivated)
                                    for (let action of activatedActions) {
                                        action(comp)
                                    }
                    

                        },[],[],[]])
                    break

                    case "X":
                        opts = line.splice(2).join(" ").split(/[^\\]\\[^\\]/);
                        optionsArray.push(new TextboxOption(opts[0], opts[1], line[1]));
                        break;

                        case "C":
                        opts = line.splice(3).join(" ");
                        optionsArray.push(new CheckboxOption(opts, line[1] === "t", line[2]));
                        break;

                        case "G":
                        opts = line.splice(5).join(" ");
                       getCollection = (str) => {
                            switch (str) {
                                case "Ico": return ICO_COLLECTION
                                case "Bob": return BOBINA_COLLECTION
                                case "Dio": return DIODO_COLLECTION
                                case "Log": return BOBINA_LOGICA_COLLECTION
                                case "AcS": return ACTUADOR_LINEAR_SENSORES_COLLECTION
                                case "Alc": return ACTUADOR_LINEAR_COLLECTION
                                case "Tmp": return TEMPORIZADOR_COLLECTION
                                case "Cnt": return CONT_COLLECTION
                                case "CtC": return CONTACTO_COLLECTION
                            }
                        }
                        symbolOffsets.push([parseFloat(line[2]),parseFloat(line[3])])
                        optionsArray.push(new ImageSelectOption(opts, StrokeCollectionList[parseInt(line[1])].clone().translate([parseFloat(line[2]),parseFloat(line[3])]), getCollection(line[4])));
                        break;

                        case "GS":
                            opts = line.splice(5).join(" ");
                            getCollection = (str) => {
                                switch (str) {
                                    case "Pil": return [
                                        ["imgs/colors/C1.png", "C1"],
                                        ["imgs/colors/C2.png", "C2"],
                                        ["imgs/colors/C3.png", "C3"],
                                        ["imgs/colors/C4.png", "C4"],
                                        ["imgs/colors/C5.png", "C5"],
                                        ["imgs/colors/C6.png", "C6"],
                                        ["imgs/colors/C7.png", "C7"],
                                        ["imgs/colors/C8.png", "C8"],
                                        ["imgs/colors/C9.png", "C9"],
                                        
                                    ]
                                }
                            }
                            optionsArray.push(new ImageSelectOption(opts, line[1], getCollection(line[2])));
                            break;

                    case "UT":
                        functionsToRun.push((comp) => {
                            comp.symbol.strokes[parseFloat(line[1])].text = comp.options.options[parseFloat(line[2])].getValue();
                        });
                        break;
                    
                    case "UTM":
                        functionsToRun.push((comp) => {
                            comp.symbol.strokes[parseFloat(line[1])].text = line[2] + comp.options.options[parseFloat(line[3])].getValue() + line[4];
                        });
                        break;

                        case "UC":
                            functionsToRun.push((comp) => {
                            let colorT = comp.options.options[parseInt(line[1])].getValue().replace(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/, "").trim()==""?comp.options.options[parseInt(line[1])].getValue():"#000"
                            comp.options.options[parseInt(line[1])].setValue(colorT)
                            comp.symbol.strokes[parseInt(line[2])].color = colorT
                            })
                        break;

                        case "UZ":
                            functionsToRun.push((comp) => {
                        comp.symbol.strokes[parseInt(line[1])].size = isNaN(comp.options.options[parseInt(line[2])].getValue())?parseFloat(line[3]):Number.parseInt(comp.options.options[parseInt(line[2])].getValue())
                    });
                        break;

                        case "UTC":
                            functionsToRun.push((comp) => {
                                comp.symbol.strokes[parseInt(line[1])].text = comp.options.options[parseInt(line[2])].getValue()?comp.options.options[parseInt(line[3])].getValue():comp.options.options[parseInt(line[4])].getValue()
                            });
                            break;

                        case "UTCN":
                            functionsToRun.push((comp) => {
                                comp.symbol.strokes[parseInt(line[1])].text = comp.options.options[parseInt(line[2])].getValue()?parseInt(line[3]):parseInt(line[4])
                            });
                            break;
                            

                        case "US":
                            functionsToRun.push((comp) => {
                                comp.symbol.strokes[parseInt(line[1])] = comp.options.options[parseInt(line[2])].getValue();
                            });
                            break;

                        case "USNV":
                            functionsToRun.push((comp) => {
                                comp.symbol.strokes[parseInt(line[1])] = comp.options.options[parseInt(line[2])].getValue().trim()!=""?comp.options.options[parseInt(line[3])].getValue().clone().translate([parseFloat(line[4]), parseFloat(line[5])]).setColor(DEFAULT_COLOR):NONE_COLLECTION.clone()
                        });
                        break;

                        case "USE":
                            functionsToRun.push((comp) => {
                                comp.symbol.strokes[parseInt(line[1])].end = [
                                    parseInt(comp.options.options[parseInt(line[2])].getValue()) + parseFloat(line[4]),
                                    parseInt(comp.options.options[parseInt(line[3])].getValue()) + parseFloat(line[5])
                                ]
                            });
                        break;

                        case "UISE":
                            functionsToRun.push((comp) => {
                                comp.inouts = [comp.symbol.strokes[parseInt(line[1])].start, comp.symbol.strokes[parseInt(line[1])].end]
                            });
                        break;

                        case "UHBSE":
                            functionsToRun.push((comp) => {
                                comp.hitbox = new ComponentHitbox(getHitboxFromCorners(
                                    [Math.min(comp.symbol.strokes[parseInt(line[1])].start[0]-1, comp.symbol.strokes[parseInt(line[1])].end[0]),Math.min(comp.symbol.strokes[parseInt(line[1])].start[1], comp.symbol.strokes[parseInt(line[1])].end[1])-1],
                                    [Math.max(comp.symbol.strokes[parseInt(line[1])].start[0], comp.symbol.strokes[parseInt(line[1])].end[0]),Math.max(comp.symbol.strokes[parseInt(line[1])].start[1], comp.symbol.strokes[parseInt(line[1])].end[1])]
                                ))
                            });
                        break;

                        case "UHYN":
                        functionsToRun.push((comp) => {
                            comp.symbol.strokes[parseFloat(line[1])].hide = comp.options.options[parseFloat(line[2])].getValue() && !comp.options.options[parseFloat(line[3])].getValue();
                        });
                        break;

                        case "UH":
                        functionsToRun.push((comp) => {
                            comp.symbol.strokes[parseFloat(line[1])].hide = comp.options.options[parseFloat(line[2])].getValue();
                        });
                        break;

                        case "UHEZ":
                        functionsToRun.push((comp) => {
                            function isEtapaZero(str) {
                                return str.match(/^([A-Za-z]*)(0)([A-Za-z]*)$/i) != null
                            }

                            comp.symbol.strokes[parseFloat(line[1])].hide = isEtapaZero(comp.options.options[parseInt(line[2])].getValue())
                        });
                        break;

                        case "UHNN":
                        functionsToRun.push((comp) => {
                            comp.symbol.strokes[parseFloat(line[1])].hide = comp.options.options[parseFloat(line[2])].getValue().trim() != "";
                        });
                        break;

                        case "UNH":
                        functionsToRun.push((comp) => {
                            comp.symbol.strokes[parseFloat(line[1])].hide = !comp.options.options[parseFloat(line[2])].getValue();
                        });
                        break;

                        case "VS":
                        voltageFunction[parseInt(line[1])] = function(comp) {
                            return comp.symbol.strokes[parseInt(line[2])].text
                        }
                        break

                        case "VT":
                        voltageFunction[parseInt(line[1])] = function(comp) {
                            return line[2]
                        }
                        break

                        case "VBINC":
                            voltageFunction[parseInt(line[1])] = function (comp) {
                            let types = []
                            for (let inout of comp.inouts) {
                                let key = `${inout[0]+comp.position[0]},${inout[1]+comp.position[1]}`
                                types.push((typeof nodeVoltages !== 'undefined' && nodeVoltages[key] !== undefined) ? nodeVoltages[key] : "N")
                            }

                                let key1 = parseInt(line[3])
                                let key2 = parseInt(line[4])
                                if ((types[key1].voltage === types[key2].voltage) 
                                )  return ""
                                let check = [... line].splice(5) 
                                if (!(check.indexOf(types[key1].voltage) === -1 || check.indexOf(types[key2].voltage) === -1)) {
                                        return line[2]

                                } else {
                                        return types[parseInt(line[1])].voltage

                                }

                        }
                    break

                    case "VINC":
                        voltageFunction[parseInt(line[1])] = function (comp) {
                        let types = []
                        for (let inout of comp.inouts) {
                            let key = `${inout[0]+comp.position[0]},${inout[1]+comp.position[1]}`
                            types.push((typeof nodeVoltages !== 'undefined' && nodeVoltages[key] !== undefined) ? nodeVoltages[key] : "N")
                        }

                            let key1 = parseInt(line[3])
                            let check = [... line].splice(4)
                            console.log("VOLTAGE", types[key1].voltage)
                            if (!(check.indexOf(types[key1].voltage) === -1)) {
                                    return "+"

                            } else {
                                    return types[parseInt(line[1])].voltage

                            }

                    }
                break

                }
            }

            let c = new Component(
                [0, 0],
                lines[1],
                new ComponentSymbol(symbolArray),
                new ComponentHitbox(componentHitbox),
                new ComponentOptions(optionsArray),
                0,
                inoutArray,
                lines[2].replace("\r", "")
            );
            c.getVoltageSupply = voltageFunction
            c.updateFunctions = functionsToRun;
            c.simuCanClick = simuCanClick
            c.toggleState = toggleStateFunction
            c.getCompName = getCompNameFunction
            c.getPropagationInouts = propagationFunction
            c.simulate = simulateFunction
            c.activatedPre = activatedPreFunctions
            c.activatedActions = activatedActionsFunctions
            c.activatedReqs = activatedReqsFunctions
            c.symbolOffsets = symbolOffsets
            c.id = lines[3].replace("\r", "")
            c.update = function () {
                for (let func of this.updateFunctions) {
                    func(this);
                }
                updateCanvas();
            };            
            c.flange = false

            component = c;
        });
    return component;
}
