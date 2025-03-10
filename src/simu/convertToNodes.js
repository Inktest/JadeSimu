let nodeVoltages = {}; // Store node voltages instead of componentsAsNodes

// Function to convert components to nodes, mapping inouts to keys
function convertComponentsToNodes() {
    nodeVoltages = {}
    for (let comp of components) {
        let i = 0;
        for (let inout of comp.inouts) {
            let key = `${inout[0] + comp.position[0]},${inout[1] + comp.position[1]}`;

            // Initialize voltage for each node
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
    // Reset the color of all components
    for (let comp of components) {
        comp.symbol.setColor("#000");
    }
    for (let [key, _] of Object.entries(nodeVoltages)) {
        nodeVoltages[key].voltage = 0
    }

    let visited = new Set();

    function decideCompColor(comp, line) {
        switch (line) {
            case "L": case "L1": comp.symbol.setColor("#a00");break
            case "L2": comp.symbol.setColor("#d00");break
            case "L3": comp.symbol.setColor("#700");break
            case "N": comp.symbol.setColor("#00f");break
        }
    }

    // Helper function to traverse the node connections
    function traverse(nodeKey, entryComp = null, entryIndex = null, voltage = 0) {
        if (visited.has(nodeKey)) return; // Avoid visiting the same node multiple times
        visited.add(nodeKey);

        let node = nodeVoltages[nodeKey];
        if (!node) return;

        for (let [id, comp] of node.components) {
            // Set the voltage of the component
            nodeVoltages[nodeKey].voltage = voltage; 

            // Trigger the component update (highlighting based on voltage)
            if (comp.name === "Alimentación") {
                let currentLineType = comp.symbol.strokes[2].text; // "L" or "N"
                if (currentLineType == "PE") currentLineType = "N"
                console.log(currentLineType, voltage)
                if ((currentLineType != 0 && voltage != 0) && (currentLineType != voltage)) {
                    stopSimulation()
                    alert("Corto!")
                    break
                }
                decideCompColor(comp, currentLineType)
                if (currentLineType.startsWith("L")) {
                    // If it's a Line, color it with red and propagate voltage as "L"
                    propagateComponent(comp, id, voltage, currentLineType); // Pass "L" as the line type
                } else if (currentLineType === "N") {
                    // If it's Neutral, color it with blue and propagate voltage as "N"
                    propagateComponent(comp, id, voltage, "N"); // Pass "N" as the line type
                }
            } else {
                // Default propagation for other components based on voltage
                decideCompColor(comp, voltage)
                propagateComponent(comp, id, voltage);
            }
        }
    }

    // Helper function for propagating voltage state
    function propagateComponent(comp, id, voltage, type) {
        let propagateTo = comp.getPropagationInouts(id);
        for (let outIndex of propagateTo) {
            let nextKey = `${comp.inouts[outIndex][0] + comp.position[0]},${comp.inouts[outIndex][1] + comp.position[1]}`;
            // Propagate voltage to connected node
            let newVoltage = voltage; // Here you can change the logic of voltage propagation if needed
            traverse(nextKey, comp, outIndex, newVoltage); // Pass voltage to the next node
        }
    }

    // Trigger the traversal starting from the "Alimentación" component
    for (let comp of components) {
        if (comp.name === "Alimentación") {
            let startKey = `${comp.inouts[0][0] + comp.position[0]},${comp.inouts[0][1] + comp.position[1]}`;
            traverse(startKey, null, null, comp.symbol.strokes[2].text); // Start traversal with default voltage
        }
    }

    for (let comp of components) {
        if (comp.simulate) comp.simulate()
    }

    // Finalize the update after traversing all nodes
    updateCanvas();
}
