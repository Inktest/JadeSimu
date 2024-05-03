class NodeEtapa {
    constructor(etapa, transiciones, activated) {
        this.etapa = etapa
        this.transiciones = transiciones
        this.activated = activated | false 
        this.prevTransiciones = []
    }

    activate() {

        if (!this.activated) {
            activeOutputs[this.etapa.options.options[1].value]++
        }

        this.activated = true
        this.etapa.symbol.setColor("#0f0")
        updateCanvas()
    }

    deactivate() {

        if (this.activated) {
            activeOutputs[this.etapa.options.options[1].value]--
            if (temporizadores[this.etapa.options.options[1].value] !== undefined)
                activatedTrans[this.etapa.options.options[1].value] = 0
        }

        this.activated = false
        this.etapa.symbol.setColor(DEFAULT_COLOR)
        updateCanvas()
    }
}

class NodeTransicion {
    constructor(transicion, etapas, prevEtapas) {
        this.transicion = transicion
        this.etapas = etapas
        this.prevEtapas = prevEtapas
    }
}

var activatedTrans = {}
var activeOutputs = {}
var etapasList = []

stepEtapas = []

async function step() {
    if (!simuActivated) return
    let willStep = false
for (let i = 0; i < etapasList.length; i++) {
    if (etapasList[i].activated) {
        for (let j = 0; j < etapasList[i].transiciones.length; j++) {

            let prevActivated = true

            for (let k = 0; k < etapasList[i].transiciones[j].prevEtapas.length; k++) {
                prevActivated &= etapasList[i].transiciones[j].prevEtapas[k].activated
            }

            if (!prevActivated) continue;

            if (evaluateTransExpression(etapasList[i].transiciones[j].transicion.options.options[0].value) == 1) {
                //etapasList[i].deactivate()

                willStep = true

                for (let k = 0; k < etapasList[i].transiciones[j].prevEtapas.length; k++) {
            etapasList[i].transiciones[j].prevEtapas[k].deactivate()
                }

                for (let k = 0; k < etapasList[i].transiciones[j].etapas.length; k++) {
                    etapasList[i].transiciones[j].etapas[k].activate()
                    if (stepEtapas.includes(etapasList[i].transiciones[j].etapas[k])) {
                        stepEtapas = []
                        etapasDone = true
                        return;
                    }
                    stepEtapas.push(etapasList[i].transiciones[j].etapas[k])
                }
            }
        }
    }
}
convertDiagramToNodes()
if (willStep) step()
stepEtapas = []
etapasDone = true
}

function evaluateTransExpression(exp) {
    exp = exp.replace(/[_¬]/, '!')
    exp = exp.replace(/[\+]/, '||')
    exp = exp.replace(/[\*·]/, '&&')
    //exp = exp.replaceAll(/[]/, '^')
    exp = exp.replace(/[a-zA-Z0-9-]+\d*/g, function(match) {
        let matchesVaivenes = false
        if (!isNaN(match))
            return match
        for (var i in activatedFC) {
            matchesVaivenes |= match == activatedFC[i].options.options[0].value
        }
        return activatedTrans[match] || matchesVaivenes || 0
    });

    return eval(exp)
}

var etapasDone = false

function convertDiagramToNodes() {

    if (!etapasDone)
        etapasList = []

    etapaNodes = {}
    transNodes = {}
    linePoints = {}

    transLinks = []
    if (!simuActivated) {
        activatedTrans = {}
        activeOutputs = {}
    }

    for (let i = 0; i < wires.length; i++) {
        if (linePoints[`${wires[i].start[0]},${wires[i].start[1]}`] == null) linePoints[`${wires[i].start[0]},${wires[i].start[1]}`] = []
        linePoints[`${wires[i].start[0]},${wires[i].start[1]}`].push(`${wires[i].end[0]},${wires[i].end[1]}`)

        if (linePoints[`${wires[i].end[0]},${wires[i].end[1]}`] == null) linePoints[`${wires[i].end[0]},${wires[i].end[1]}`] = []
        linePoints[`${wires[i].end[0]},${wires[i].end[1]}`].push(`${wires[i].start[0]},${wires[i].start[1]}`)
    }

    etapasComponents = []

    for (let i = 0; i < components.length; i++) {
        if (components[i].name == "Etapa de Grafcet") {
            etapasComponents.push(components[i])
            if (!simuActivated) {
                activeOutputs[components[i].options.options[1].value] = 0
            }
        }
        if (components[i].name == "Transición de Grafcet") {
            let node = new NodeTransicion(components[i], [], [])
            transNodes[`${components[i].position[0]},${components[i].position[1]}`] = node

            //activatedTrans[components[i].options.options[0].value] = 0
            if (!simuActivated)
            Array.from(new Set(components[i].options.options[0].value.match(/[a-zA-Z0-9-]+\d*/g))).forEach(variable => {
                activatedTrans[variable] = 0;
            });

    }
    }

    for (var e in etapasComponents) {
        let node = new NodeEtapa(etapasComponents[e],[])
            etapaNodes[`${etapasComponents[e].position[0]},${etapasComponents[e].position[1]}`] = node
            if(!etapasDone)
            etapasList.push(node)

            let transBelow = transNodes[`${etapasComponents[e].position[0]},${etapasComponents[e].position[1]+4}`]
            if (transBelow) {
            node.transiciones.push(transBelow)

            
            let etapaBelow = etapaNodes[`${transBelow.transicion.position[0]},${transBelow.transicion.position[1]+2}`]
            if (etapaBelow) {
                node.etapas.push(etapaBelow)
                etapaBelow.prevTransiciones.push(node)
            }
        }

        if (transBelow)
            transBelow.prevEtapas.push(node)
        
        if (!simuActivated) continue
        
            if (etapasComponents[e].options.options[0].value == "0" && !etapasDone) {
            node.activate()
        }
    }

    etapasDone = true

    for (var e in etapaNodes) {
        let node = etapaNodes[e]
        let etapa = node.etapa

        wiresToCheck = linePoints[`${etapa.position[0]},${etapa.position[1]+4}`]
        if (wiresToCheck == null) wiresToCheck = []

        wiresChecked = [`${etapa.position[0]},${etapa.position[1]+4}`]

        let shouldBeY = false

        let transBelow = transNodes[`${etapa.position[0]},${etapa.position[1]+4}`]
        if (transBelow) {
            node.transiciones.push(transBelow)
            transBelow.prevEtapas.push(node)
            shouldBeY |= transBelow.prevEtapas > 1
        }

        while (wiresToCheck.length > 0) {
            let followingWires = linePoints[wiresToCheck[0]]
            wiresChecked.push(wiresToCheck[0])
            if (followingWires) {
                for (var w in followingWires) {
                    if (!wiresChecked.includes(followingWires[w])) {
                        wiresToCheck.push(followingWires[w])
                    }
                }
            }
            if (transNodes[wiresToCheck[0]]) {
                node.transiciones.push(transNodes[wiresToCheck[0]])
                transNodes[wiresToCheck[0]].prevEtapas.push(node)
                shouldBeY |= transNodes[wiresToCheck[0]].prevEtapas.length > 1
            }

            wiresToCheck.shift()

        }

        if (!shouldBeY) continue

        for (var w in wiresChecked) {
            if (!linePoints[wiresChecked[w]][0]) continue
            let coord1 = wiresChecked[w].split(",")
            let coord2 = linePoints[wiresChecked[w]][0].split(",")
            coord1[1] = Number.parseInt(coord1[1]) + 0.1
            coord2[1] = Number.parseInt(coord2[1]) + 0.1
            let line = new Line(coord1, coord2, 1, DEFAULT_COLOR)
            line.draw()
        }

    }

    for (var t in transNodes) {
        let node = transNodes[t]
        let trans = node.transicion

        wiresToCheck = linePoints[`${trans.position[0]},${trans.position[1]+2}`]
        if (wiresToCheck == null) wiresToCheck = []

        wiresChecked = [`${trans.position[0]},${trans.position[1]+2}`]

        let etapaBelow = etapaNodes[`${trans.position[0]},${trans.position[1]+2}`]
        if (etapaBelow) {
            node.etapas.push(etapaBelow)
            etapaBelow.prevTransiciones.push(node)
        }

        while (wiresToCheck.length > 0) {
            let followingWires = linePoints[wiresToCheck[0]]
            wiresChecked.push(wiresToCheck[0])
            if (followingWires) {
                for (var w in followingWires) {
                    if (!wiresChecked.includes(followingWires[w])) {
                        wiresToCheck.push(followingWires[w])
                    }
                }
            }
            if (etapaNodes[wiresToCheck[0]]) {
                node.etapas.push(etapaNodes[wiresToCheck[0]])
                etapaNodes[wiresToCheck[0]].prevTransiciones.push(node)
            }

            wiresToCheck.shift()

        }

        if (node.etapas.length > 1) {
            for (var w in wiresChecked) {
                if (!wiresChecked[w] || !linePoints[wiresChecked[w]][0]) continue
                let coord1 = wiresChecked[w].split(",")
                let coord2 = linePoints[wiresChecked[w]][0].split(",")
                coord1[1] = Number.parseInt(coord1[1]) + 0.1
                coord2[1] = Number.parseInt(coord2[1]) + 0.1
                let line = new Line(coord1, coord2, 1, DEFAULT_COLOR)
                line.draw()
            }
        }

    }
    
}

var activatedFC = []

function checkFCActivated() {
    activatedFC = []

for (var i in vaivenesDerecha) {
    let checks = vaivenesDerecha[i].hitbox.hitbox
    for (var j in checks) {

        let position = [Number.parseInt(vaivenesDerecha[i].position[0])+Number.parseInt(checks[j][0]), Number.parseInt(vaivenesDerecha[i].position[1])+Number.parseInt(checks[j][1]) - 1]
        if (fcPositions[position]) {
            activatedFC.push(fcPositions[position])
        }
    }
    
}
}

function translateVaiven(vaiven, dir) {
    if (!simuActivated) return
vaiven.translate([dir/16, 0])

checkFCActivated()

step()
}

setInterval(async () => {
    if (!simuActivated) return
    for (var i in activeOutputs) {
        if (activeOutputs[i] > 0) {
            if (temporizadores[i] !== undefined) {
                if (!activatedTrans[i]) activatedTrans[i] = 0
                activatedTrans[i] += 0.034
                temporizadores[i].symbol.strokes[5].text = Math.round(100*activatedTrans[i])/100 + "s"
                step()
                if (!activeOutputs[i])
                temporizadores[i].symbol.strokes[5].text = "0s"
            }
            if (vaivenesIzquierda[i])
            translateVaiven(vaivenesIzquierda[i], -1)
            if (vaivenesDerecha[i])
            translateVaiven(vaivenesDerecha[i], 1)
        updateCanvas()
        }

    }
  }, 34);