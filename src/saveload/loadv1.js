const loadv1 = (lines) => {
    const resultLines = ["v2","false\u001d\u001d35\u001d\u001d1240\u001d1748\u001d3"];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Match lines like: 20Get17 0 or 23Vvn9 DERECHA
        const match = line.match(/^(\d+)([A-Za-z]{3})(\d+)\s?(.*)?$/);
        if (!match) continue;

        const [, x, abbr, y, param1] = match;
        const xPos = x;
        const yPos = y;

        // Component conversion
        if (abbr === "Get" || abbr === "Vvn" || abbr === "txt") {
            const secondParam = lines[++i];
            resultLines.push(`${xPos}\u001d${yPos}\u001d${abbr}\u001d${param1}\u001d${secondParam}`);
        } else if (abbr === "Wre") {

            const points = param1.split(",");
            resultLines.push(`${xPos}\u001d${yPos}\u001dWr2\u001d${parseFloat(yPos) - parseFloat(points[1])}\u001d${parseFloat(xPos) - parseFloat(points[0])}\u001df`);
        } else if (param1) {
            resultLines.push(`${xPos}\u001d${yPos}\u001d${abbr}\u001d${param1}`);
        } else {
            resultLines.push(`${xPos}\u001d${yPos}\u001d${abbr}`);
        }
    }

    loadv2(resultLines.join("\n"));
};
