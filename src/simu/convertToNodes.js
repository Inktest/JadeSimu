let nodeVoltages = {}; // Store node voltages instead of componentsAsNodes
let backboneWires = [];

// Function to convert components to nodes, mapping inouts to keys
function convertComponentsToNodes() {
    backboneWires = [];
    nodeVoltages = {};
    let continuaciones = [];

    for (let comp of components) {
        if (comp.name === "Continuación de Linea") {
            continuaciones.push(comp);
            continue;
        }
    }

    let groupedByName = {};

    for (let cont of continuaciones) {
        const name = cont.options.options[0].value;
        if (!groupedByName[name]) groupedByName[name] = [];
        groupedByName[name].push(cont);
    }

    for (const name in groupedByName) {
        for (let i = 1; i < groupedByName[name].length; i++) {
            let w = new WireComponent(groupedByName[name][0].position);
            w.options.options[0].setValue("" + (groupedByName[name][i].position[1] - groupedByName[name][0].position[1]));
            w.options.options[1].setValue("" + (groupedByName[name][i].position[0] - groupedByName[name][0].position[0]));
            w.inouts = [[0, 0], [
                groupedByName[name][i].position[0] - groupedByName[name][0].position[0],
                groupedByName[name][i].position[1] - groupedByName[name][0].position[1]
            ]];
            backboneWires.push(w.clone());
        }
    }

    let componentAndBackbones = [...components, ...backboneWires];

    for (let comp of componentAndBackbones) {
        comp._visited = false;
        let i = 0;
        for (let inout of comp.inouts) {
            let key = `${inout[0] + comp.position[0]},${inout[1] + comp.position[1]}`;
            if (!nodeVoltages[key]) {
                nodeVoltages[key] = { voltage: 0, components: [] };
            }
            nodeVoltages[key].components.push([i, comp]);
            i++;
        }
    }
}

// Function to run through the nodes and propagate the voltage state
function runThroughNodes() {
    // Reset component visuals and voltages
    for (let comp of components) comp.symbol.setColor("#000");
    for (let key in nodeVoltages) nodeVoltages[key].voltage = 0;

    let visitedNodes = new Set();

    function decideCompColor(comp, line) {
        switch (line) {
            case "L":
            case "L1": comp.symbol.setColor("#a00"); break;
            case "L2": comp.symbol.setColor("#d00"); break;
            case "L3": comp.symbol.setColor("#700"); break;
            case "PE": comp.symbol.setColor("#0d0"); break;
            case "N": comp.symbol.setColor("#00f"); break;
            case "+": comp.symbol.setColor("#c0c"); break;
            case "-": comp.symbol.setColor("#aaa"); break;
        }
    }

    function traverse(nodeKey, voltage) {
        if (visitedNodes.has(nodeKey)) return;
        visitedNodes.add(nodeKey);

        const node = nodeVoltages[nodeKey];
        if (!node) return;

        // If voltage is already set, but different, conflict
        if (node.voltage && voltage && node.voltage !== voltage) {
            stopSimulation();
            console.log(node.voltage)
            console.log(voltage)
            alert("Corto!");
            return;
        }

        node.voltage = voltage;

        for (let [index, comp] of node.components) {
            decideCompColor(comp, voltage);

            let propagateTo = comp.getPropagationInouts?.(index) || [];

            for (let outIndex of propagateTo) {
                let outInout = comp.inouts[outIndex];
                let outKey = `${outInout[0] + comp.position[0]},${outInout[1] + comp.position[1]}`;
                traverse(outKey, voltage);
            }
        }
    }

    function propagateAllVoltageSupplies() {
        let somethingChanged = false;

        for (let comp of components) {
            if (!comp.getVoltageSupply || comp.getVoltageSupply.length === 0) continue;

            for (let i = 0; i < comp.inouts.length; i++) {
                const getV = comp.getVoltageSupply[i];
                if (typeof getV !== "function") continue;

                let voltage = getV(comp);
                let key = `${comp.inouts[i][0] + comp.position[0]},${comp.inouts[i][1] + comp.position[1]}`;
                let node = nodeVoltages[key];

                if (node && node.voltage !== voltage) {
                    traverse(key, voltage);
                    somethingChanged = true;
                }
            }
        }

        return somethingChanged;
    }

    // Iteratively propagate voltages until stable
    let iterationLimit = 10;
    while (iterationLimit-- > 0) {
        visitedNodes.clear();
        let changed = propagateAllVoltageSupplies();
        if (!changed) break;
    }

    // Second pass: simulate all components
    for (let comp of components) {
        if (typeof comp.simulate === "function") {
            comp.simulate(nodeVoltages);
        }
    }

    updateCanvas();
}
