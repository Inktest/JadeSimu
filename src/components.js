class Condensador extends Component {
    constructor(position) {
        super(position, "Condensador", new ComponentSymbol([
                new Line([0,0],[0,0.85],1,DEFAULT_COLOR),
                new Line([-1,0.85],[1,0.85],1,DEFAULT_COLOR),
                new Line([-1,1.15],[1,1.15],1,DEFAULT_COLOR),
                new Line([0,1.15],[0,2],1,DEFAULT_COLOR),
                new Text([-1,0.5],20,"",DEFAULT_COLOR,"center")]),
                
                HITBOX_LOWER_SQUARE.clone(),
                new ComponentOptions([
                    new CheckboxOption("Polarizado", false, "pol")
                ])
                )}

                update() {
                    this.symbol.strokes[4].text = this.options.options[0].getValue()?"+":""
                    updateCanvas()
                }
                
                clone() {
                    let newobj = new Condensador(this.position)
                    newobj.name = this.name
                    newobj.symbol = this.symbol.clone()
                    newobj.hitbox = this.hitbox.clone()
                    newobj.options = this.options.clone()
                    return newobj
                }

}



class Piloto extends Component {
    constructor(position) {
        super(position, "Señalización Óptica", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([0,3],[0,4],1,DEFAULT_COLOR),
            new Arc([0,2],1,0,2*Math.PI,1,DEFAULT_COLOR),
            new Line([0.7,1.3],[-0.7,2.7],1,DEFAULT_COLOR),
            new Line([-0.7,1.3],[0.7,2.7],1,DEFAULT_COLOR),

            new Line([1.5,1],[1.75,1],1,DEFAULT_COLOR, true),
            new Line([1.75,1],[1.75,0.75],1,DEFAULT_COLOR, true),
            new Line([1.75,0.75],[2,0.75],1,DEFAULT_COLOR, true),
            new Line([2,0.75],[2,1],1,DEFAULT_COLOR, true),
            new Line([2,1],[2.25,1],1,DEFAULT_COLOR, true),
            new Text([-1.25,2], 17, "-H", DEFAULT_COLOR, "right"),
            new Text([0.25,0.5], 17, "X1", DEFAULT_COLOR, "left"),
            new Text([0.25,3.5], 17, "X2", DEFAULT_COLOR, "left"),
            new Text([2.5,2], 17, "C5", DEFAULT_COLOR, "right")
            ]),
            HITBOX_RESISTOR.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-H", "name"),
                new TextboxOption("Conexión 1", "X1", "con1"),
                new TextboxOption("Conexión 2", "X2", "con2"),
                new CheckboxOption("Pulsante?", false, "pulse"),
                new ImageSelectOption("Color","C5",[
                    ["imgs/colors/C1.png", "C1"],
                    ["imgs/colors/C2.png", "C2"],
                    ["imgs/colors/C3.png", "C3"],
                    ["imgs/colors/C4.png", "C4"],
                    ["imgs/colors/C5.png", "C5"],
                    ["imgs/colors/C6.png", "C6"],
                    ["imgs/colors/C7.png", "C7"],
                    ["imgs/colors/C8.png", "C8"],
                    ["imgs/colors/C9.png", "C9"],
                    
                ])
            ]))}

            update() {
                this.symbol.strokes[10].text = this.options.options[0].getValue()
                this.symbol.strokes[11].text = this.options.options[1].getValue()
                this.symbol.strokes[12].text = this.options.options[2].getValue()
                this.symbol.strokes[13].text = this.options.options[4].getValue()

                this.symbol.strokes[5].hide = this.options.options[3].getValue()
                this.symbol.strokes[6].hide = this.options.options[3].getValue()
                this.symbol.strokes[7].hide = this.options.options[3].getValue()
                this.symbol.strokes[8].hide = this.options.options[3].getValue()
                this.symbol.strokes[9].hide = this.options.options[3].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new Piloto(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class ActuadorLineal extends Component {
    constructor(position) {
        super(position, "Actuador Lineal", new ComponentSymbol([
            //new RectangleArray([0, 0], [9, 4], 1, DEFAULT_COLOR),
            new Line([0, 0], [0, 1.5], 1, DEFAULT_COLOR),
            new Line([0, 2.5], [0,4], 1, DEFAULT_COLOR),
            new Line([0, 0], [9, 0], 1, DEFAULT_COLOR),
            new Line([0, 4], [9, 4], 1, DEFAULT_COLOR),
            new Line([9, 4], [9, 2.5], 1, DEFAULT_COLOR),
            new Line([9, 0], [9, 1.5], 1, DEFAULT_COLOR),

            new Line([1,4], [1,5], 1, DEFAULT_COLOR),
            new Line([8,4], [8,5], 1, DEFAULT_COLOR, true),
        
            new RectangleArray([3,1.5],[11,2.5], 1, DEFAULT_COLOR),
            ACTUADOR_LINEAR_NO_AMORTIGUACION.clone().translate([1, 0]),
        
            new Line([3, 4], [4, 0], 1, DEFAULT_COLOR),
            new Line([5, 4], [4, 0], 1, DEFAULT_COLOR),
            new Line([5, 4], [6, 0], 1, DEFAULT_COLOR),
            new Line([7, 4], [6, 0], 1, DEFAULT_COLOR),
            new Line([7, 4], [8, 0], 1, DEFAULT_COLOR),
            new Line([9, 4], [8, 0], 1, DEFAULT_COLOR),

            new Line([0, 1.5], [0, 2.5], 1, DEFAULT_COLOR),
            new RectangleArray([1,1.5],[-3, 2.5], 1, DEFAULT_COLOR, true),

            NONE_COLLECTION.clone(),
            NONE_COLLECTION.clone(),
            NONE_COLLECTION.clone(),
            
            new Text([4, -2], 17, "a0", DEFAULT_COLOR, "right", 0, true),
            new Text([8, -2], 17, "a1", DEFAULT_COLOR, "left", 0, true),
            new Text([6, -3], 17, "a2", DEFAULT_COLOR, "center", 0, true)
        ]),
        HITBOX_ACTUADOR_LINEAR.clone(),
            new ComponentOptions([
                new TextboxOption("Sensor Cerrado", "a0", "s0"),
                new TextboxOption("Sensor Abierto", "a1", "s1"),
                new TextboxOption("Sensor Medio", "a2", "s2"),
                new CheckboxOption("Doble Efecto", false, "dobleE"),
                new CheckboxOption("Doble Vástago", false, "dobleV"),
                new ImageSelectOption("Amortiguación",ACTUADOR_LINEAR_NO_AMORTIGUACION.clone().translate([1, 0]),ACTUADOR_LINEAR_COLLECTION),
                new ImageSelectOption("Sensor",NONE_COLLECTION.clone(),ACTUADOR_LINEAR_SENSORES_COLLECTION)
            ]))}

            update() {
                
                this.symbol.strokes[7].hide = this.options.options[3].getValue()
                this.symbol.strokes[16].hide = !this.options.options[4].getValue()
                this.symbol.strokes[17].hide = !this.options.options[4].getValue()

                this.symbol.strokes[9] = this.options.options[5].getValue()
                this.symbol.strokes[18] = this.options.options[0].getValue().trim()!=""?this.options.options[6].getValue().clone().translate([4.5, -1]).setColor(DEFAULT_COLOR):NONE_COLLECTION.clone()
                this.symbol.strokes[19] = this.options.options[1].getValue().trim()!=""?this.options.options[6].getValue().clone().translate([8.5, -1]).setColor(DEFAULT_COLOR):NONE_COLLECTION.clone()
                this.symbol.strokes[20] = this.options.options[2].getValue().trim()!=""?this.options.options[6].getValue().clone().translate([6.5, -1.5]).setColor(DEFAULT_COLOR):NONE_COLLECTION.clone()
        
                this.symbol.strokes[10].hide = !this.options.options[3].getValue()
                this.symbol.strokes[11].hide = !this.options.options[3].getValue()
                this.symbol.strokes[12].hide = !this.options.options[3].getValue()
                this.symbol.strokes[13].hide = !this.options.options[3].getValue()
                this.symbol.strokes[14].hide = !this.options.options[3].getValue()
                this.symbol.strokes[15].hide = !this.options.options[3].getValue()

                this.symbol.strokes[21].hide = this.options.options[6].getValue().id != 0
                this.symbol.strokes[22].hide = this.options.options[6].getValue().id != 0
                this.symbol.strokes[23].hide = this.options.options[6].getValue().id != 0
                this.symbol.strokes[21].text = this.options.options[0].getValue()
                this.symbol.strokes[22].text = this.options.options[1].getValue()
                this.symbol.strokes[23].text = this.options.options[2].getValue()

                updateCanvas()
            }

            clone() {
                let newobj = new ActuadorLineal(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class ActuadorGiratorio extends Component {
    constructor(position) {
        super(position, "Actuador Giratorio", new ComponentSymbol([
            //new RectangleArray([0, 0], [9, 4], 1, DEFAULT_COLOR),
            new Line([-2, 3], [2, 3], 1, DEFAULT_COLOR),
            new Arc([0, 3], 2, Math.PI, 0, 1, DEFAULT_COLOR),
            new Line([-1, 3], [-1, 4], 1, DEFAULT_COLOR),
            new Line([1, 3], [1, 4], 1, DEFAULT_COLOR),

            new Line([0.75, 3], [1, 2.5], 1, DEFAULT_COLOR),
            new Line([1.25, 3], [1, 2.5], 1, DEFAULT_COLOR),
            new Line([-0.75, 3], [-1, 2.5], 1, DEFAULT_COLOR),
            new Line([-1.25, 3], [-1, 2.5], 1, DEFAULT_COLOR),


            NONE_COLLECTION.clone(),
            NONE_COLLECTION.clone(),
            NONE_COLLECTION.clone(),
            
            new Text([-3.25, 2], 17, "a0", DEFAULT_COLOR, "right", 0, true),
            new Text([3.25, 2], 17, "a1", DEFAULT_COLOR, "left", 0, true),
            new Text([0, -1], 17, "a2", DEFAULT_COLOR, "left", 0, true)
        ]),
        HITBOX_RELETERMICO.clone(),
            new ComponentOptions([
                new TextboxOption("Sensor Cerrado", "a0", "s0"),
                new TextboxOption("Sensor Abierto", "a1", "s1"),
                new TextboxOption("Sensor Medio", "a2", "s2"),
                new ImageSelectOption("Sensor",NONE_COLLECTION.clone(),ACTUADOR_LINEAR_SENSORES_COLLECTION)
            ]))}

            update() {

                this.symbol.strokes[8] = this.options.options[0].getValue().trim()!=""?this.options.options[3].getValue().clone().translate([-2, 2]).setColor(DEFAULT_COLOR):NONE_COLLECTION.clone()
                this.symbol.strokes[9] = this.options.options[1].getValue().trim()!=""?this.options.options[3].getValue().clone().translate([3, 2]).setColor(DEFAULT_COLOR):NONE_COLLECTION.clone()
                this.symbol.strokes[10] = this.options.options[1].getValue().trim()!=""?this.options.options[3].getValue().clone().translate([0.5, 0]).setColor(DEFAULT_COLOR):NONE_COLLECTION.clone()
                
                this.symbol.strokes[11].hide = this.options.options[3].getValue().id != 0
                this.symbol.strokes[12].hide = this.options.options[3].getValue().id != 0
                this.symbol.strokes[13].hide = this.options.options[3].getValue().id != 0
                this.symbol.strokes[11].text = this.options.options[0].getValue()
                this.symbol.strokes[12].text = this.options.options[1].getValue()
                this.symbol.strokes[13].text = this.options.options[2].getValue()

                updateCanvas()
            }

            clone() {
                let newobj = new ActuadorGiratorio(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class PinzaNeumatica extends Component {
    constructor(position) {
        super(position, "Pinza Neumática", new ComponentSymbol([
            //new RectangleArray([0, 0], [9, 4], 1, DEFAULT_COLOR),
            new RectangleArray([3,0],[9,4], 1, DEFAULT_COLOR),
            new Line([7, 0], [7, 4], 1, DEFAULT_COLOR),
            new Line([7,2],[2,2], 2, DEFAULT_COLOR),

            new Line([9,0],[8.66,4], 1, DEFAULT_COLOR),
            new Line([8.33,0],[8.66,4], 1, DEFAULT_COLOR),
            new Line([8.33,0],[8,4], 1, DEFAULT_COLOR),
            new Line([7.5,0],[8,4], 1, DEFAULT_COLOR),
            new Line([7.5,0],[7,4], 1, DEFAULT_COLOR),
            new Line([7.5,0],[7,4], 1, DEFAULT_COLOR),

            new Line([8,4],[8,5], 1, DEFAULT_COLOR, true),
            new Line([4,4],[4,5], 1, DEFAULT_COLOR),

            new Line([0, 0.5],[2,0.5], 1, DEFAULT_COLOR),
            new Line([0, 3.5],[2,3.5], 1, DEFAULT_COLOR),
            new Line([2, 0.5],[2,3.5], 1, DEFAULT_COLOR),

            new Line([2, 2],[0, 0], 1, DEFAULT_COLOR, true),
            new Line([2, 2],[0, 4], 1, DEFAULT_COLOR, true),

            NONE_COLLECTION.clone(),
            NONE_COLLECTION.clone(),

            
           new Text([5, -1.5], 17, "a0", DEFAULT_COLOR, "right", 0, true),
           new Text([10, -1.5], 17, "a1", DEFAULT_COLOR, "left", 0, true)
        ]),
        HITBOX_ACTUADOR_LINEAR.clone(),
            new ComponentOptions([
                new TextboxOption("Sensor Cerrado", "a0", "s0"),
                new TextboxOption("Sensor Abierto", "a1", "s1"),
                new CheckboxOption("Doble Efecto", false, "dobleE"),
                new CheckboxOption("Pinza Rotativa", false, "rot"),
                new ImageSelectOption("Sensor",NONE_COLLECTION.clone(),ACTUADOR_LINEAR_SENSORES_COLLECTION)
                
            ]))}

            update() {

                this.symbol.strokes[3].hide = !this.options.options[2].getValue()
                this.symbol.strokes[4].hide = !this.options.options[2].getValue()
                this.symbol.strokes[5].hide = !this.options.options[2].getValue()
                this.symbol.strokes[6].hide = !this.options.options[2].getValue()
                this.symbol.strokes[7].hide = !this.options.options[2].getValue()
                this.symbol.strokes[8].hide = !this.options.options[2].getValue()
                this.symbol.strokes[9].hide = this.options.options[2].getValue()

                this.symbol.strokes[11].hide = !this.options.options[3].getValue()
                this.symbol.strokes[12].hide = !this.options.options[3].getValue()
                this.symbol.strokes[13].hide = !this.options.options[3].getValue()
                this.symbol.strokes[14].hide = this.options.options[3].getValue()
                this.symbol.strokes[15].hide = this.options.options[3].getValue()

                this.symbol.strokes[16] = this.options.options[0].getValue().trim()!=""?this.options.options[4].getValue().clone().translate([6, -1]).setColor(DEFAULT_COLOR):NONE_COLLECTION.clone()
                this.symbol.strokes[17] = this.options.options[1].getValue().trim()!=""?this.options.options[4].getValue().clone().translate([10, -1]).setColor(DEFAULT_COLOR):NONE_COLLECTION.clone()
                this.symbol.strokes[18].hide = this.options.options[4].getValue().id != 0
                this.symbol.strokes[19].hide = this.options.options[4].getValue().id != 0
                this.symbol.strokes[18].text = this.options.options[0].getValue()
                this.symbol.strokes[19].text = this.options.options[1].getValue()

                updateCanvas()
            }

            clone() {
                let newobj = new PinzaNeumatica(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}


class Texto extends Component {
    constructor(position) {
        super(position, "Texto", new ComponentSymbol([
            new Text([-1, 1], 17, "Texto", DEFAULT_COLOR, "left")
            ]),
            HITBOX_BOBINA.clone(),
            new ComponentOptions([
                new TextboxOption("Texto", "Texto", "text"),
                new TextboxOption("Tamaño", "17", "size"),
                new TextboxOption("Color", DEFAULT_COLOR, "col"),
            ]))}

            update() {
                this.symbol.strokes[0].text = this.options.options[0].getValue()
                this.symbol.strokes[0].size = isNaN(this.options.options[1].getValue())?17:Number.parseInt(this.options.options[1].getValue())
                let colorT = this.options.options[2].getValue().replace(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/, "").trim()==""?this.options.options[2].getValue():"#000"
                this.options.options[2].setValue(colorT)
                this.symbol.strokes[0].color = colorT
                updateCanvas()
            }

            clone() {
                let newobj = new Texto(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class EightDisplay extends Component {
    constructor(position) {
        super(position, "Display de 7 Segmentos", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([-1,0],[-1,1],1,DEFAULT_COLOR),
            new Line([1,0],[1,1],1,DEFAULT_COLOR),
            new Line([2,0],[2,1],1,DEFAULT_COLOR),

            new Line([0,9],[0,10],1,DEFAULT_COLOR),
            new Line([-1,9],[-1,10],1,DEFAULT_COLOR),
            new Line([1,9],[1,10],1,DEFAULT_COLOR),
            new Line([2,9],[2,10],1,DEFAULT_COLOR),

            new Line([-2, 1], [3,1],1,DEFAULT_COLOR),
            new Line([-2,9],[3,9],1,DEFAULT_COLOR),
            new Line([-2,1],[-2,9],1,DEFAULT_COLOR),
            new Line([3,1],[3,9],1,DEFAULT_COLOR),
            new Line([-0.5, 2], [1.5,2],10,DEFAULT_COLOR),
            new Line([-0.5, 5], [1.5,5],10,DEFAULT_COLOR),
            new Line([-0.5, 8], [1.5,8],10,DEFAULT_COLOR),
            new Line([2, 4.5], [2,2.5],10,DEFAULT_COLOR),
            new Line([2, 5.5], [2,7.5],10,DEFAULT_COLOR),
            new Line([-1, 4.5], [-1,2.5],10,DEFAULT_COLOR),
            new Line([-1, 5.5], [-1,7.5],10,DEFAULT_COLOR),

            new Arc([2.5,8],0.25,0,2*Math.PI, 1, DEFAULT_COLOR),
            new Line([-2, 5], [-4,5],1,DEFAULT_COLOR),

            new Text([-2.75,3.5], 17, "-D", DEFAULT_COLOR, "right"),
            new Text([-0.85,9.5], 17, "a", DEFAULT_COLOR, "left"),
            new Text([0.15,9.5], 17, "b", DEFAULT_COLOR, "left"),
            new Text([1.15,9.5], 17, "c", DEFAULT_COLOR, "left"),
            new Text([2.15,9.5], 17, "d", DEFAULT_COLOR, "left"),,
            new Text([-0.85,0.5], 17, "e", DEFAULT_COLOR, "left"),
            new Text([0.15,0.5], 17, "f", DEFAULT_COLOR, "left"),
            new Text([1.15,0.5], 17, "g", DEFAULT_COLOR, "left"),
            new Text([2.15,0.5], 17, "h", DEFAULT_COLOR, "left"),
            new Text([-2.15,4.5], 17, "GND", DEFAULT_COLOR, "right"),
            ]),
            HITBOX_FUENTE.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-D", "name"),
                new TextboxOption("Conexión 1", "a", "con1"),
                new TextboxOption("Conexión 2", "b", "con2"),
                new TextboxOption("Conexión 3", "c", "con3"),
                new TextboxOption("Conexión 4", "d", "con4"),
                new TextboxOption("Conexión 5", "e", "con5"),
                new TextboxOption("Conexión 6", "f", "con6"),
                new TextboxOption("Conexión 7", "g", "con7"),
                new TextboxOption("Conexión 8", "h", "con8"),
                new TextboxOption("Tierra", "GND", "congnd"),
                new CheckboxOption("4 Input?", false, "8in")
            ]))}

            update() {
                this.symbol.strokes[21].text = this.options.options[0].getValue()

                this.symbol.strokes[22].text = this.options.options[1].getValue()
                this.symbol.strokes[23].text = this.options.options[2].getValue()
                this.symbol.strokes[24].text = this.options.options[3].getValue()
                this.symbol.strokes[25].text = this.options.options[4].getValue()
                this.symbol.strokes[26].text = this.options.options[5].getValue()
                this.symbol.strokes[27].text = this.options.options[6].getValue()
                this.symbol.strokes[28].text = this.options.options[7].getValue()
                this.symbol.strokes[29].text = this.options.options[8].getValue()
                this.symbol.strokes[30].text = this.options.options[9].getValue()

                this.symbol.strokes[0].hide = !this.options.options[10].getValue()
                this.symbol.strokes[1].hide = !this.options.options[10].getValue()
                this.symbol.strokes[2].hide = !this.options.options[10].getValue()
                this.symbol.strokes[3].hide = !this.options.options[10].getValue()
                this.symbol.strokes[19].hide = !this.options.options[10].getValue()
                this.symbol.strokes[26].hide = !this.options.options[10].getValue()
                this.symbol.strokes[27].hide = !this.options.options[10].getValue()
                this.symbol.strokes[28].hide = !this.options.options[10].getValue()
                this.symbol.strokes[29].hide = !this.options.options[10].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new EightDisplay(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class Grafcet extends Component {
    constructor(position) {
        super(position, "Etapa de Grafcet", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([0,3],[0,4],1,DEFAULT_COLOR),
            new Line([1,2],[2,2],1,DEFAULT_COLOR),
            
            new Line([-1, 1], [1,1],1,DEFAULT_COLOR),
            new Line([-1,1],[-1,3],1,DEFAULT_COLOR),
            new Line([1,1],[1,3],1,DEFAULT_COLOR),
            new Line([1,3],[-1,3],1,DEFAULT_COLOR),

            new Line([-0.8, 1.2], [0.8,1.2],1,DEFAULT_COLOR),
            new Line([-0.8,1.2],[-0.8,2.8],1,DEFAULT_COLOR),
            new Line([0.8,1.2],[0.8,2.8],1,DEFAULT_COLOR),
            new Line([0.8,2.8],[-0.8,2.8],1,DEFAULT_COLOR),

            new Text([0,2], 17, "0", DEFAULT_COLOR, "center"),
            new Text([2.5,2], 17, "", DEFAULT_COLOR, "left")
            ]),
            HITBOX_RESISTOR.clone(),
            new ComponentOptions([
                new TextboxOption("Etapa", "0", "stage"),
                new TextboxOption("Función", "", "func")
            ]))}

            update() {
                this.symbol.strokes[11].text = this.options.options[0].getValue()
                this.symbol.strokes[12].text = this.options.options[1].getValue()

                this.symbol.strokes[2].hide = this.options.options[1].getValue().trim() != ""
                this.symbol.strokes[7].hide = this.options.options[0].getValue().startsWith(0)
                this.symbol.strokes[8].hide = this.options.options[0].getValue().startsWith(0)
                this.symbol.strokes[9].hide = this.options.options[0].getValue().startsWith(0)
                this.symbol.strokes[10].hide = this.options.options[0].getValue().startsWith(0)
                updateCanvas()
            }

            clone() {
                let newobj = new Grafcet(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class Arrow extends Component {
    constructor(position) {
        super(position, "Continuación de Linea", new ComponentSymbol([
            new Line([-0.5,0],[0.5,0],1,DEFAULT_COLOR),
            new Line([-0.5,0],[0,1],1,DEFAULT_COLOR),
            new Line([0.5, 0],[0, 1],1,DEFAULT_COLOR),

            new Text([1, 0.5], 17, "X0", DEFAULT_COLOR, "left")
            ]),
            new ComponentHitbox(getHitboxFromCorners([-1,0], [0, 0])),
            new ComponentOptions([
                new TextboxOption("Texto", "X0", "txt"),
            ]))}

            update() {
                this.symbol.strokes[3].text = this.options.options[0].getValue()
                
                updateCanvas()
            }

            clone() {
                let newobj = new Arrow(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class ContactoLógico extends Component {
    constructor(position) {
        super(position, "Contacto", new ComponentSymbol([
            new Line([-2,1],[-.5,1],1,DEFAULT_COLOR),
            new Line([-.5,0],[-.5,2],1,DEFAULT_COLOR),
            new Line([2,1],[.5,1],1,DEFAULT_COLOR),
            new Line([.5,0],[.5,2],1,DEFAULT_COLOR),
            NONE_COLLECTION.clone(),
            //new Arc([0,2],1,0,2*Math.PI,1,DEFAULT_COLOR),

            new Text([0, -1], 17, "S1", DEFAULT_COLOR, "center"),
            ]),
            HITBOX_RESISTOR.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "S1", "name"),
                new ImageSelectOption("Tipo",NONE_COLLECTION.clone(),CONTACTO_COLLECTION)
            ]))}

            update() {
                this.symbol.strokes[4] = this.options.options[1].getValue()
                this.symbol.strokes[5].text = this.options.options[0].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new ContactoLógico(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class BobinaLógica extends Component {
    constructor(position) {
        super(position, "Bobina Lógica", new ComponentSymbol([
            new Line([-2,1],[-1,1],1,DEFAULT_COLOR),
            new Arc([0, 1], 1, Math.PI/2+0.3, 3*Math.PI/2-0.3, 1, DEFAULT_COLOR),
            new Arc([0, 1], 1, 3*Math.PI/2+0.3, Math.PI/2-0.3, 1, DEFAULT_COLOR),
            new Line([1,1],[2,1],1,DEFAULT_COLOR),
            NONE_COLLECTION.clone(),
            //new Arc([0,2],1,0,2*Math.PI,1,DEFAULT_COLOR),

            new Text([0, -1], 17, "Q1", DEFAULT_COLOR, "center"),
            ]),
            HITBOX_RESISTOR.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "Q1", "name"),
                new ImageSelectOption("Tipo",NONE_COLLECTION.clone(),BOBINA_LOGICA_COLLECTION)
            ]))}

            update() {
                this.symbol.strokes[4] = this.options.options[1].getValue()
                this.symbol.strokes[5].text = this.options.options[0].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new BobinaLógica(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class TemporizacionLogica extends Component {
    constructor(position) {
        super(position, "Temporizador", new ComponentSymbol([
            new Line([-1,0],[1,0],1,DEFAULT_COLOR),
            new Line([-1,1],[-2,1],1,DEFAULT_COLOR),
            new Line([1,1],[2,1],1,DEFAULT_COLOR),
            new Line([1,3],[1,0],1,DEFAULT_COLOR),
            new Line([-1,3],[-1,0],1,DEFAULT_COLOR),
            new Line([1,3],[-1,3],1,DEFAULT_COLOR),
            TEMP_TON_COLLECTION.clone(),


            new Text([0, -1], 17, "T1", DEFAULT_COLOR, "center"),
            new Text([1.25, 2.5], 17, "0s", DEFAULT_COLOR, "left"),
            new Text([-1.25, 2.5], 17, "T#1s", DEFAULT_COLOR, "right"),
            new Text([1.25, 0.5], 12, "Q", DEFAULT_COLOR, "left")
            ]),
            HITBOX_BOBINA.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "T1", "name"),
                new TextboxOption("Tiempo", "1", "time"),
                new ImageSelectOption("Tipo",TEMP_TON_COLLECTION.clone(),TEMPORIZADOR_COLLECTION)
            ]))}

            update() {
               this.symbol.strokes[7].text = this.options.options[0].getValue()
               this.symbol.strokes[9].text = "T#" + this.options.options[1].getValue() + "s"
                /* this.symbol.strokes[12].text = this.options.options[1].getValue()

                this.symbol.strokes[7].hide = this.options.options[0].getValue() == 0
                this.symbol.strokes[8].hide = this.options.options[0].getValue() == 0
                this.symbol.strokes[9].hide = this.options.options[0].getValue() == 0
                this.symbol.strokes[10].hide = this.options.options[0].getValue() == 0
                updateCanvas()*/
            }

            clone() {
                let newobj = new TemporizacionLogica(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class GrafcetTransicion extends Component {
    constructor(position) {
        super(position, "Transición de Grafcet", new ComponentSymbol([
            new Line([0,0],[0,2],1,DEFAULT_COLOR),
            new Line([-0.5,1],[0.5,1],1,DEFAULT_COLOR),

            new Text([1,1], 17, "None", DEFAULT_COLOR, "left")
            ]),
            HITBOX_BOBINA.clone(),
            new ComponentOptions([
                new TextboxOption("Transición", "None", "trans")
            ]))}

            update() {
                this.symbol.strokes[2].text = this.options.options[0].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new GrafcetTransicion(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class Vaiven extends Component {
    constructor(position) {
        super(position, "Vaivén", new ComponentSymbol([
            new Line([-2,0],[2,0],1,DEFAULT_COLOR),
            new Line([-2,0.5],[2,0.5],1,DEFAULT_COLOR),
            new Line([-2,0],[-2,0.5],1,DEFAULT_COLOR),
            new Line([2,0],[2,0.5],1,DEFAULT_COLOR),

            new Line([1.8,0.5],[1,3],1,DEFAULT_COLOR),
            new Line([-1.8,0.5],[-1,3],1,DEFAULT_COLOR),
            new Line([1,3],[-1,3],1,DEFAULT_COLOR),

            new Arc([1,3.5], 0.5, 0, 2*Math.PI, 1, DEFAULT_COLOR),
            new Arc([-1,3.5], 0.5, 0, 2*Math.PI, 1, DEFAULT_COLOR),
            ]),
            HITBOX_RELETERMICO.clone(),
            new ComponentOptions([
                new TextboxOption("Marcha Derecha", "KMD", "kmd"),
                new TextboxOption("Marcha Izquierda", "KMI", "kmi"),
            ]))}

            update() {
                updateCanvas()
            }

            clone() {
                let newobj = new Vaiven(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class FC extends Component {
    constructor(position) {
        super(position, "Final de Carrera", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([1,1],[0,1],1,DEFAULT_COLOR),
            new Line([1,1],[1,0],1,DEFAULT_COLOR),
            new Line([0,0],[1,0],1,DEFAULT_COLOR),

            new Line([0,0.5],[0.25,0.5],1,DEFAULT_COLOR),
            new Line([0.25,0.5],[0.75,0.25],1,DEFAULT_COLOR),
            new Line([0.75,0.5],[1,0.5],1,DEFAULT_COLOR),
            new Line([0.5,0.5],[0.5,1.5],1,DEFAULT_COLOR),

            new Arc([0.5, 1.75], 0.25, 0, 2*Math.PI, 1, DEFAULT_COLOR),

            new Text([0.5,-0.5], 17, "FC1", DEFAULT_COLOR, "center"),

            ]),
            HITBOX_ONE.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "FC1", "name"),
            ]))}

            update() {
                this.symbol.strokes[9].text = this.options.options[0].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new FC(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class Fusible extends Component {
    constructor(position) {
        super(position, "Fusible", new ComponentSymbol([
            new Line([0,0],[0,4],1,DEFAULT_COLOR),
            new Line([0.5, 1], [-0.5,1],1,DEFAULT_COLOR),
            new Line([0.5,1],[0.5,3],1,DEFAULT_COLOR),
            new Line([-0.5,1],[-0.5,3],1,DEFAULT_COLOR),
            new Line([0.5,3],[-0.5,3],1,DEFAULT_COLOR),
            new Text([-1.25,2], 17, "-F", DEFAULT_COLOR, "right"),
            new Text([0.25,0.5], 17, "1", DEFAULT_COLOR, "left"),
            new Text([0.25,3.5], 17, "2", DEFAULT_COLOR, "left")
            ]),
            HITBOX_RESISTOR.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-F", "name"),
                new TextboxOption("Conexión 1", "1", "con1"),
                new TextboxOption("Conexión 2", "2", "con2")
            ]))}

            update() {
                this.symbol.strokes[5].text = this.options.options[0].getValue()
                this.symbol.strokes[6].text = this.options.options[1].getValue()
                this.symbol.strokes[7].text = this.options.options[2].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new Fusible(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class WireComponent extends Component {
    constructor(position) {
        super(position, "Cable", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([0,0.2],[0,1.2],1,DEFAULT_COLOR),
            ]),
            new ComponentHitbox(getHitboxFromCorners([-1,0], [0, 0])),
            new ComponentOptions([
                new TextboxOption("Altura", "1", "height"),
                new TextboxOption("Anchura", "0", "width"),
                new CheckboxOption("Doble línea", false, "dl")
            ]))}

            update() {
                this.symbol.strokes[0].end = [
                    parseInt(this.options.options[1].getValue()),
                    parseInt(this.options.options[0].getValue())
                ]

                this.symbol.strokes[1].end = [
                    parseInt(this.options.options[1].getValue()),
                    parseInt(this.options.options[0].getValue())+0.2
                ]

                this.symbol.strokes[1].hide = this.options.options[2].getValue()
                this.hitbox = new ComponentHitbox(getHitboxFromCorners(
                [Math.min(this.symbol.strokes[0].start[0]-1, this.symbol.strokes[0].end[0]),Math.min(this.symbol.strokes[0].start[1], this.symbol.strokes[0].end[1])-1],
                [Math.max(this.symbol.strokes[0].start[0], this.symbol.strokes[0].end[0]),Math.max(this.symbol.strokes[0].start[1], this.symbol.strokes[0].end[1])]
            ))
                updateCanvas()
            }

            clone() {
                let newobj = new WireComponent(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class Transformador extends Component {
    constructor(position) {
        super(position, "Transformador", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([-2,0],[-2,1],1,DEFAULT_COLOR),
            new Line([2,0],[2,1],1,DEFAULT_COLOR),

            new Line([0,3],[0,4],1,DEFAULT_COLOR),
            new Line([-2,3],[-2,4],1,DEFAULT_COLOR),
            new Line([2,3],[2,4],1,DEFAULT_COLOR),

            new Line([-2,1.85],[2,1.85],1,DEFAULT_COLOR),
            new Line([-2,2.15],[2,2.15],1,DEFAULT_COLOR),

            new Arc([-1.5,1],0.5,0,Math.PI, 1,DEFAULT_COLOR),
            new Arc([-0.5,1],0.5,0,Math.PI, 1,DEFAULT_COLOR),
            new Arc([1.5,1],0.5,0,Math.PI, 1,DEFAULT_COLOR),
            new Arc([0.5,1],0.5,0,Math.PI, 1,DEFAULT_COLOR),

            new Arc([-1.5,3],0.5,Math.PI, 0, 1,DEFAULT_COLOR),
            new Arc([-0.5,3],0.5,Math.PI, 0, 1,DEFAULT_COLOR),
            new Arc([1.5,3],0.5,Math.PI, 0, 1,DEFAULT_COLOR),
            new Arc([0.5,3],0.5,Math.PI, 0, 1,DEFAULT_COLOR),
            new Text([-2.25,2], 17, "-T", DEFAULT_COLOR, "right"),
            new Text([-1.75,0.5], 17, "1", DEFAULT_COLOR, "left"),
            new Text([0.25,0.5], 17, "2", DEFAULT_COLOR, "left"),
            new Text([2.25,0.5], 17, "3", DEFAULT_COLOR, "left"),
            new Text([-1.75,3.5], 17, "4", DEFAULT_COLOR, "left"),
            new Text([0.25,3.5], 17, "5", DEFAULT_COLOR, "left"),
            new Text([2.25,3.5], 17, "6", DEFAULT_COLOR, "left")
            ]),
            HITBOX_RELETERMICO.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-T", "name"),
                new TextboxOption("Conexión 1", "1", "con1"),
                new TextboxOption("Conexión 2", "2", "con2"),
                new TextboxOption("Conexión 3", "3", "con3"),
                new TextboxOption("Conexión 4", "4", "con4"),
                new TextboxOption("Conexión 5", "5", "con5"),
                new TextboxOption("Conexión 6", "6", "con6"),
                new CheckboxOption("Monofásico?", false, "mono")
            ]))}

            update() {
                this.symbol.strokes[16].text = this.options.options[0].getValue()
                this.symbol.strokes[17].text = this.options.options[1].getValue()
                this.symbol.strokes[18].text = this.options.options[2].getValue()
                this.symbol.strokes[19].text = this.options.options[7].getValue()?this.options.options[2].getValue():this.options.options[3].getValue()
                this.symbol.strokes[20].text = this.options.options[7].getValue()?this.options.options[3].getValue():this.options.options[4].getValue()
                this.symbol.strokes[21].text = this.options.options[5].getValue()
                this.symbol.strokes[22].text = this.options.options[7].getValue()?this.options.options[4].getValue():this.options.options[5].getValue()

                this.symbol.strokes[0].hide = !this.options.options[7].getValue()
                this.symbol.strokes[3].hide = !this.options.options[7].getValue()
                this.symbol.strokes[18].hide = !this.options.options[7].getValue()
                this.symbol.strokes[21].hide = !this.options.options[7].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new Transformador(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class MotorDC extends Component {
    constructor(position) {
        super(position, "Motor de Corriente Continua", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([0,3],[0,4],1,DEFAULT_COLOR),
            new Arc([0, 2], 1, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([0,1.75],17 , "M" ,DEFAULT_COLOR, "center"),
            
            new Line([-0.65,2.3],[0.6,2.3], 1, DEFAULT_COLOR),
            new Line([-0.65,2.5],[-0.4,2.5], 1, DEFAULT_COLOR),
            new Line([-0.15,2.5],[0.1,2.5], 1, DEFAULT_COLOR),
            new Line([0.35,2.5],[0.6,2.5], 1, DEFAULT_COLOR),

            new Text([-1.25,2], 17, "-M", DEFAULT_COLOR, "right"),
            new Text([0.25,0.5], 17, "A1", DEFAULT_COLOR, "left"),
            new Text([0.25,3.5], 17, "A2", DEFAULT_COLOR, "left")
            ]),
            HITBOX_RESISTOR.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-M", "name"),
                new TextboxOption("Conexión 1", "A1", "con1"),
                new TextboxOption("Conexión 2", "A2", "con2")
            ]))}

            update() {
                this.symbol.strokes[8].text = this.options.options[0].getValue()
                this.symbol.strokes[9].text = this.options.options[1].getValue()
                this.symbol.strokes[10].text = this.options.options[2].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new MotorDC(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class MotorAC extends Component {
    constructor(position) {
        super(position, "Motor de Corriente Alterna", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([2,0],[1,1.25],1,DEFAULT_COLOR),
            new Line([-2,0],[-1,1.25],1,DEFAULT_COLOR),
            new Arc([0,3],2,0,2*Math.PI, 1, DEFAULT_COLOR),
            new Arc([0,3], 2.2, -0.9, -0.1, 1, DEFAULT_COLOR),
            new Line([3,1],[1.9,1.9], 1, DEFAULT_COLOR),
            new Line([3,1],[3,0], 1, DEFAULT_COLOR),
            new Text([0,2], 17, "M", DEFAULT_COLOR, "center"),
            new Text([-0.5,3.5], 17, "3", DEFAULT_COLOR, "center"),

            new Arc([0.5,3.5],0.25,0,Math.PI, 1, DEFAULT_COLOR),
            new Arc([1,3.5],0.25,Math.PI,0, 1, DEFAULT_COLOR),

            new Line([0,6],[0,5],1,DEFAULT_COLOR, true),
            new Line([2,6],[1,4.75],1,DEFAULT_COLOR, true),
            new Line([-2,6],[-1,4.75],1,DEFAULT_COLOR, true),

            new Text([-2.25,3], 17, "-M", DEFAULT_COLOR, "right"),
            new Text([-1.25,0.5], 12, "U1", DEFAULT_COLOR, "left"),
            new Text([0.15,0.5], 12, "V1", DEFAULT_COLOR, "left"),
            new Text([2,0.5], 12, "W1", DEFAULT_COLOR, "left"),
            new Text([3.25,0.5], 12, "PE", DEFAULT_COLOR, "left"),

            new Text([-1.25,5.5], 12, "W2", DEFAULT_COLOR, "left", 0, true),
            new Text([0.15,5.5], 12, "U2", DEFAULT_COLOR, "left", 0, true),
            new Text([2,5.5], 12, "V2", DEFAULT_COLOR, "left", 0, true),
            ]),
            HITBOX_FUENTE.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-M", "name"),
                new TextboxOption("Conexión 1", "U1", "con1"),
                new TextboxOption("Conexión 2", "V1", "con2"),
                new TextboxOption("Conexión 3", "W1", "con3"),
                new TextboxOption("Conexión 4", "W2", "con4"),
                new TextboxOption("Conexión 5", "V2", "con5"),
                new TextboxOption("Conexión 6", "U2", "con6"),
                new TextboxOption("Conexión PE", "PE", "conpe"),
                new CheckboxOption("Monofásico?", false, "mono"),
                new CheckboxOption("YD?", false, "yd")
            ]))}

            update() {
                this.symbol.strokes[14].text = this.options.options[0].getValue()
                this.symbol.strokes[15].text = this.options.options[1].getValue()
                this.symbol.strokes[16].text = this.options.options[2].getValue()
                this.symbol.strokes[17].text = this.options.options[8].getValue()?this.options.options[2].getValue():this.options.options[3].getValue()
                this.symbol.strokes[18].text = this.options.options[7].getValue()

                this.symbol.strokes[19].text = this.options.options[4].getValue()
                this.symbol.strokes[20].text = this.options.options[5].getValue()
                this.symbol.strokes[21].text = this.options.options[8].getValue()?this.options.options[5].getValue():this.options.options[6].getValue()


                this.symbol.strokes[8].text = this.options.options[8].getValue()?1:3
                this.symbol.strokes[0].hide = !this.options.options[8].getValue()
                this.symbol.strokes[16].hide = !this.options.options[8].getValue()
                //this.symbol.strokes[2].

                this.symbol.strokes[11].hide = this.options.options[9].getValue() && !this.options.options[8].getValue()
                this.symbol.strokes[12].hide = this.options.options[9].getValue()
                this.symbol.strokes[13].hide = this.options.options[9].getValue()
                this.symbol.strokes[19].hide = this.options.options[9].getValue()
                this.symbol.strokes[20].hide = this.options.options[9].getValue() && !this.options.options[8].getValue()
                this.symbol.strokes[21].hide = this.options.options[9].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new MotorAC(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}


class ReleTermico extends Component {
    constructor(position) {

        super(position, "Relé Térmico", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([1,0],[1,1],1,DEFAULT_COLOR),
            new Line([-1,0],[-1,1],1,DEFAULT_COLOR),
            new Line([0,3],[0,4],1,DEFAULT_COLOR),
            new Line([1,3],[1,4],1,DEFAULT_COLOR),
            new Line([-1,3],[-1,4],1,DEFAULT_COLOR),
            new Line([2, 1], [-1.66,1],1,DEFAULT_COLOR),
            new Line([2,1],[2,3],1,DEFAULT_COLOR),
            new Line([-1.66,1],[-1.66,3],1,DEFAULT_COLOR),
            new Line([2,3],[-1.66,3],1,DEFAULT_COLOR),

            RELE_TERMICO_ADD.clone(),
            RELE_TERMICO_ADD.clone().translate([-1,0]),
            RELE_TERMICO_ADD.clone().translate([-2,0]),
            
            new Text([-2.25,2], 17, "-F", DEFAULT_COLOR, "right"),
            new Text([-0.75,0.5], 17, "1", DEFAULT_COLOR, "left"),
            new Text([0.25,0.5], 17, "2", DEFAULT_COLOR, "left"),
            new Text([1.25,0.5], 17, "3", DEFAULT_COLOR, "left"),
            new Text([-0.75,3.5], 17, "4", DEFAULT_COLOR, "left"),
            new Text([0.25,3.5], 17, "5", DEFAULT_COLOR, "left"),
            new Text([1.25,3.5], 17, "6", DEFAULT_COLOR, "left"),
            ]),
            HITBOX_RELETERMICO.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-F", "name"),
                new TextboxOption("Conexión 1", "1", "con1"),
                new TextboxOption("Conexión 2", "2", "con2"),
                new TextboxOption("Conexión 3", "3", "con3"),
                new TextboxOption("Conexión 4", "4", "con4"),
                new TextboxOption("Conexión 5", "5", "con5"),
                new TextboxOption("Conexión 6", "6", "con6")
            ]))}

            update() {
                this.symbol.strokes[5].text = this.options.options[0].getValue()
                this.symbol.strokes[6].text = this.options.options[1].getValue()
                this.symbol.strokes[7].text = this.options.options[2].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new ReleTermico(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}


class FuenteAlimentacion extends Component {
    constructor(position) {
        super(position, "Fuente de Alimentación", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR, true),
            new Line([-1,0],[-1,1],1,DEFAULT_COLOR),
            new Line([1,0],[1,1],1,DEFAULT_COLOR),
            new Line([-2,1],[2,1],1,DEFAULT_COLOR),
            new Line([-2,1],[-2,5],1,DEFAULT_COLOR),
            new Line([2,5],[-2,5],1,DEFAULT_COLOR),
            new Line([2,5],[2,1],1,DEFAULT_COLOR),
            new Line([-1,5],[-1,6],1,DEFAULT_COLOR),
            new Line([1,5],[1,6],1,DEFAULT_COLOR),
            new Line([2,1],[-2,5],1,DEFAULT_COLOR),

            new Arc([-0.5,2],0.25,0,Math.PI, 1, DEFAULT_COLOR),
            new Arc([-1,2],0.25,Math.PI,0, 1, DEFAULT_COLOR),
            new Line([0.25,3.5],[1.5,3.5], 1, DEFAULT_COLOR),
            new Line([0.25,4],[0.5,4], 1, DEFAULT_COLOR),
            new Line([0.75,4],[1,4], 1, DEFAULT_COLOR),
            new Line([1.25,4],[1.5,4], 1, DEFAULT_COLOR),
            new Text([-1,4.75], 17, "+", DEFAULT_COLOR, "center"),
            new Text([1,4.75], 17, "-", DEFAULT_COLOR, "center"),

            new Text([-2.25,2], 17, "-V", DEFAULT_COLOR, "right"),
            new Text([-0.75,0.5], 17, "1", DEFAULT_COLOR, "left"),
            new Text([0.25,0.5], 17, "2", DEFAULT_COLOR, "left", 0, true),
            new Text([1.25,0.5], 17, "2", DEFAULT_COLOR, "left"),
            new Text([-0.75,5.5], 17, "3", DEFAULT_COLOR, "left"),
            new Text([1.25,5.5], 17, "4", DEFAULT_COLOR, "left"),
            ]),
            HITBOX_FUENTE.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-V", "name"),
                new TextboxOption("Conexión 1", "1", "con1"),
                new TextboxOption("Conexión 2", "2", "con2"),
                new TextboxOption("Conexión 3", "3", "con3"),
                new TextboxOption("Conexión 4", "4", "con4"),
                new TextboxOption("Conexión 5", "5", "con5"),
                new CheckboxOption("Trifásico?", false, "tri")
            ]))}

            update() {
                this.symbol.strokes[18].text = this.options.options[0].getValue()
                this.symbol.strokes[19].text = this.options.options[1].getValue()
                this.symbol.strokes[20].text = this.options.options[6].getValue()?this.options.options[2].getValue():this.options.options[1].getValue()
                this.symbol.strokes[21].text = this.options.options[6].getValue()?this.options.options[3].getValue():this.options.options[2].getValue()
                this.symbol.strokes[22].text = this.options.options[6].getValue()?this.options.options[4].getValue():this.options.options[3].getValue()
                this.symbol.strokes[23].text = this.options.options[6].getValue()?this.options.options[5].getValue():this.options.options[4].getValue()

                this.symbol.strokes[0].hide = this.options.options[6].getValue()
                this.symbol.strokes[20].hide = this.options.options[6].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new FuenteAlimentacion(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}


class Diodo extends Component {
    constructor(position) {
        super(position, "Diodo", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([-0.5,1], [0.5,1],1,DEFAULT_COLOR),
            new Line([-0.5,1],[0,2],1,DEFAULT_COLOR),
            new Line([0.5,1],[0,2],1,DEFAULT_COLOR),
            new Line([-0.5,2],[0.5,2],1,DEFAULT_COLOR),
            new Line([0,2],[0,3],1,DEFAULT_COLOR),
            NONE_COLLECTION.clone().translate([0,2]),
            new Text([-0.75,1.5], 17, "-D", DEFAULT_COLOR, "right"),
            new Text([0.25,0.5], 17, "1", DEFAULT_COLOR, "left"),
            new Text([0.25,2.76], 17, "2", DEFAULT_COLOR, "left")
            ]),
            HITBOX_BOBINA.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-D", "name"),
                new TextboxOption("Conexión 1", "1", "con1"),
                new TextboxOption("Conexión 2", "2", "con2"),
                new ImageSelectOption("Tipo",  NONE_COLLECTION.clone().translate([0,2]), DIODO_COLLECTION)
            ]))}

            update() {
                this.symbol.strokes[7].text = this.options.options[0].getValue()
                this.symbol.strokes[8].text = this.options.options[1].getValue()
                this.symbol.strokes[9].text = this.options.options[2].getValue()
                this.symbol.strokes[6] = this.options.options[3].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new Diodo(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class Bobina extends Component {
    constructor(position) {
        super(position, "Bobina", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([-1,1], [1,1],1,DEFAULT_COLOR),
            new Line([1,1],[1,2],1,DEFAULT_COLOR),
            new Line([-1,1],[-1,2],1,DEFAULT_COLOR),
            new Line([-1,2],[1,2],1,DEFAULT_COLOR),
            new Line([0,2],[0,3],1,DEFAULT_COLOR),
            NONE_COLLECTION.clone().translate([0,2]),
            new Text([-1.5,1.5], 17, "-Q", DEFAULT_COLOR, "right"),
            new Text([0.25,0.5], 17, "A1", DEFAULT_COLOR, "left"),
            new Text([0.25,2.66], 17, "A2", DEFAULT_COLOR, "left")
            ]),
            HITBOX_BOBINA.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-Q", "name"),
                new TextboxOption("Conexión 1", "A1", "con1"),
                new TextboxOption("Conexión 2", "A2", "con2"),
                new ImageSelectOption("Tipo",  NONE_COLLECTION.clone().translate([0,2]), BOBINA_COLLECTION)
            ]))}

            update() {
                this.symbol.strokes[7].text = this.options.options[0].getValue()
                this.symbol.strokes[8].text = this.options.options[1].getValue()
                this.symbol.strokes[9].text = this.options.options[2].getValue()
                this.symbol.strokes[6] = this.options.options[3].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new Bobina(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class Diferencial extends Component {
    constructor(position) {
        super(position, "Diferencial", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([0, 3], [0,4],1,DEFAULT_COLOR),
            new Line([0,3],[-1,1],1,DEFAULT_COLOR),

            new Line([2,0],[2,1],1,DEFAULT_COLOR),
            new Line([2, 3], [2,4],1,DEFAULT_COLOR),
            new Line([2,3],[1,1],1,DEFAULT_COLOR),

            new Line([1.5,2],[1,2], DEFAULT_COLOR),
            new Line([0.5,2],[0,2], DEFAULT_COLOR),
            new Line([-2,2.5],[-2,1.5], DEFAULT_COLOR),
            new Line([-3.5,2.5],[-3.5,1.5], DEFAULT_COLOR),
            new Line([-1.5,2],[-3.5,2], DEFAULT_COLOR),

            new Line([-2.5, 2.5],[-2.5, 3], 1, DEFAULT_COLOR),
            new Line([-2.5, 3.5],[-2.5, 4], 1, DEFAULT_COLOR),
            new Line([-2.5, 4.5],[-2, 4.5], 1, DEFAULT_COLOR),
            new Line([-1.5, 4.5],[-1, 4.5], 1, DEFAULT_COLOR),

            new Line([-0.5,2],[-1,2], DEFAULT_COLOR),
            new Line([-2,2.5],[-3,2.5], DEFAULT_COLOR),
            new Line([-2,1.5],[-3,1.5], DEFAULT_COLOR),
            new Line([-3,2.5],[-3,1.5], DEFAULT_COLOR),
            new Line([-2.5,2.5],[-2.5,1.5], DEFAULT_COLOR),


            new Arc([-0.5,4.5], 0.5, Math.PI/2, 3*Math.PI/2, 1, DEFAULT_COLOR),
            new Line([-0.495,3.95],[2.505,3.95],1,DEFAULT_COLOR),
            new Line([-0.495,5],[2.505,5],1,DEFAULT_COLOR),
            new Arc([2.5,4.5], 0.5, 3*Math.PI/2, Math.PI/2, 1, DEFAULT_COLOR),
            
            new Line([0,5],[0,6],1,DEFAULT_COLOR),
            new Line([2,5],[2,6],1,DEFAULT_COLOR),

            new Text([-4.25,2], 17, "-F", DEFAULT_COLOR, "right"),
            new Text([0.25,0.5], 17, "1", DEFAULT_COLOR, "left"),
            new Text([0.25,3.5], 17, "2", DEFAULT_COLOR, "left"),
            new Text([2.25,0.5], 17, "3", DEFAULT_COLOR, "left"),
            new Text([2.25,3.5], 17, "4", DEFAULT_COLOR, "left")
            ]),
            HITBOX_RESISTOR.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-K", "name"),
                new TextboxOption("Conexión 1", "1", "con1"),
                new TextboxOption("Conexión 2", "2", "con2"),
            ]))}

            update() {
                this.symbol.strokes[5].text = this.options.options[0].getValue()
                this.symbol.strokes[6].text = this.options.options[1].getValue()
                this.symbol.strokes[7].text = this.options.options[2].getValue()
               
            }

            clone() {
                let newobj = new Diferencial(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class Contactor extends Component {
    constructor(position) {
        super(position, "Contactor", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([0, 3], [0,4],1,DEFAULT_COLOR),
            new Line([0,3],[0.9,0.9],1,DEFAULT_COLOR, true),
            new Line([0,3],[-1,1],1,DEFAULT_COLOR),
            new Line([0,1],[1,1],1,DEFAULT_COLOR, true),
            new Text([-1.25,2], 17, "-K", DEFAULT_COLOR, "right"),
            new Text([0.25,0.5], 17, "13", DEFAULT_COLOR, "left"),
            new Text([0.25,3.5], 17, "14", DEFAULT_COLOR, "left")
            ]),
            HITBOX_RESISTOR.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-K", "name"),
                new TextboxOption("Conexión 1", "13", "con1"),
                new TextboxOption("Conexión 2", "14", "con2"),
                new CheckboxOption("NC?", false, "nc")
            ]))}

            update() {
                this.symbol.strokes[5].text = this.options.options[0].getValue()
                this.symbol.strokes[6].text = this.options.options[1].getValue()
                this.symbol.strokes[7].text = this.options.options[2].getValue()
                this.symbol.strokes[2].hide = this.options.options[3].getValue()
                this.symbol.strokes[3].hide = !this.options.options[3].getValue()
                this.symbol.strokes[4].hide = this.options.options[3].getValue()
            }

            clone() {
                let newobj = new Contactor(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}


class Pulsador extends Component {
    constructor(position) {
        super(position, "Contacto Pulsador", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([0, 3], [0,4],1,DEFAULT_COLOR),
            new Line([0,3],[-1,1],1,DEFAULT_COLOR),
            new Line([0,3],[0.9,0.9],1,DEFAULT_COLOR, true),
            new Line([0,1],[1,1],1,DEFAULT_COLOR, true),

            new Line([0,2],[0.5,2],1,DEFAULT_COLOR, true),
            new Line([-0.5,2],[-1,2], DEFAULT_COLOR),
            new Line([-1.5,2],[-2,2], DEFAULT_COLOR),
            PULSADOR_COLLECTION.clone().translate([-2,2]),
            new Text([-3.25,2], 17, "-S", DEFAULT_COLOR, "right"),
            new Text([0.25,0.5], 17, "13", DEFAULT_COLOR, "left"),
            new Text([0.25,3.5], 17, "14", DEFAULT_COLOR, "left")
            ]),
            HITBOX_BUTTON.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-S", "name"),
                new TextboxOption("Conexión 1", "13", "con1"),
                new TextboxOption("Conexión 2", "14", "con2"),
                new CheckboxOption("NC?", false, "nc"),
                new ImageSelectOption("Tipo",PULSADOR_COLLECTION.clone().translate([-2,2]),ICO_COLLECTION)
            ]))}

            update() {
                this.symbol.strokes[9].text = this.options.options[0].getValue()
                this.symbol.strokes[10].text = this.options.options[1].getValue()
                this.symbol.strokes[11].text = this.options.options[2].getValue()
                this.symbol.strokes[2].hide = !this.options.options[3].getValue()
                this.symbol.strokes[3].hide = this.options.options[3].getValue()
                this.symbol.strokes[4].hide = this.options.options[3].getValue()
                this.symbol.strokes[5].hide = this.options.options[3].getValue()

                this.symbol.strokes[8] = this.options.options[4].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new Pulsador(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class ContactoTemporizado extends Component {
    constructor(position) {
        super(position, "Contacto Temporizado", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([0, 3], [0,4],1,DEFAULT_COLOR),
            new Line([0,3],[-1,1],1,DEFAULT_COLOR),
            new Line([0,3],[0.9,0.9],1,DEFAULT_COLOR, true),
            new Line([0,1],[1,1],1,DEFAULT_COLOR, true),

            new Line([-0.4,2.1],[0.4,2.1],1,DEFAULT_COLOR, true),
            new Line([-0.5,1.9],[0.5,1.9],1,DEFAULT_COLOR, true),
            new Line([-0.4,2.1],[-2.5,2.1], DEFAULT_COLOR),
            new Line([-0.5,1.9],[-2.5,1.9], DEFAULT_COLOR),
            RETARDO_ON_COLLECTION.clone().translate([-2,2]),
            new Text([-3.25,2], 17, "-KT", DEFAULT_COLOR, "right"),
            new Text([0.25,0.5], 17, "13", DEFAULT_COLOR, "left"),
            new Text([0.25,3.5], 17, "14", DEFAULT_COLOR, "left")
            ]),
            HITBOX_BUTTON.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-KT", "name"),
                new TextboxOption("Conexión 1", "13", "con1"),
                new TextboxOption("Conexión 2", "14", "con2"),
                new CheckboxOption("NC?", false, "nc"),
                new ImageSelectOption("Tipo",RETARDO_ON_COLLECTION.clone().translate([-2,2]),CONT_COLLECTION)
            ]))}

            update() {
                this.symbol.strokes[10].text = this.options.options[0].getValue()
                this.symbol.strokes[11].text = this.options.options[1].getValue()
                this.symbol.strokes[12].text = this.options.options[2].getValue()
                this.symbol.strokes[2].hide = !this.options.options[3].getValue()
                this.symbol.strokes[3].hide = this.options.options[3].getValue()
                this.symbol.strokes[4].hide = this.options.options[3].getValue()
                this.symbol.strokes[5].hide = this.options.options[3].getValue()
                this.symbol.strokes[6].hide = this.options.options[3].getValue()

                this.symbol.strokes[9] = this.options.options[4].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new ContactoTemporizado(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class Conmutador extends Component {
    constructor(position) {
        super(position, "Contacto Conmutado", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([-0.8,3.2],[0,1],1,DEFAULT_COLOR),
            new Line([-0.5,3],[-1,3], DEFAULT_COLOR),
            new Line([-1,3],[-1,4], DEFAULT_COLOR),
            new Line([0.5,3],[1,3], DEFAULT_COLOR),
            new Line([1,3],[1,4], DEFAULT_COLOR),
            new Text([-1.5,2], 17, "-K", DEFAULT_COLOR, "right"),
            new Text([0.25,0.5], 17, "11", DEFAULT_COLOR, "left"),
            new Text([-0.75,3.75], 17, "12", DEFAULT_COLOR, "left"),
            new Text([1.25,3.75], 17, "14", DEFAULT_COLOR, "left")
            ]),
            HITBOX_RESISTOR.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-K", "name"),
                new TextboxOption("Conexión 1", "11", "con1"),
                new TextboxOption("Conexión 2", "12", "con2"),
                new TextboxOption("Conexión 3", "14", "con3"),
            ]))}

            update() {
                this.symbol.strokes[6].text = this.options.options[0].getValue()
                this.symbol.strokes[7].text = this.options.options[1].getValue()
                this.symbol.strokes[8].text = this.options.options[2].getValue()
                this.symbol.strokes[9].text = this.options.options[3].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new Conmutador(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class ConmutadorTemporizado extends Component {
    constructor(position) {
        super(position, "Contacto Conmutado Temporizado", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([-0.8,3.2],[0,1],1,DEFAULT_COLOR),
            new Line([-0.5,3],[-1,3], DEFAULT_COLOR),
            new Line([-1,3],[-1,4], DEFAULT_COLOR),
            new Line([0.5,3],[1,3], DEFAULT_COLOR),
            new Line([1,3],[1,4], DEFAULT_COLOR),

            new Line([-0.4,2.1],[-2.5,2.1], DEFAULT_COLOR),
            new Line([-0.3,1.9],[-2.5,1.9], DEFAULT_COLOR),
            RETARDO_ON_COLLECTION.clone().translate([-2,2]),
            new Text([-3.25,2], 17, "-KT", DEFAULT_COLOR, "right"),
            new Text([0.25,0.5], 17, "11", DEFAULT_COLOR, "left"),
            new Text([-0.75,3.75], 17, "12", DEFAULT_COLOR, "left"),
            new Text([1.25,3.75], 17, "14", DEFAULT_COLOR, "left")
            ]),
            HITBOX_BUTTON.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-KT", "name"),
                new TextboxOption("Conexión 1", "11", "con1"),
                new TextboxOption("Conexión 2", "12", "con2"),
                new TextboxOption("Conexión 3", "14", "con3"),
                new ImageSelectOption("Tipo",RETARDO_ON_COLLECTION.clone().translate([-2,2]),CONT_COLLECTION)
            ]))}

            update() {
                this.symbol.strokes[9].text = this.options.options[0].getValue()
                this.symbol.strokes[10].text = this.options.options[1].getValue()
                this.symbol.strokes[11].text = this.options.options[2].getValue()
                this.symbol.strokes[12].text = this.options.options[3].getValue()
                this.symbol.strokes[8] = this.options.options[4].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new ConmutadorTemporizado(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}


class PulsadorConmutado extends Component {
    constructor(position) {
        super(position, "Contacto Pulsador Conmutado", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([-0.8,3.2],[0,1],1,DEFAULT_COLOR),
            new Line([-0.5,3],[-1,3], DEFAULT_COLOR),
            new Line([-1,3],[-1,4], DEFAULT_COLOR),
            new Line([0.5,3],[1,3], DEFAULT_COLOR),
            new Line([1,3],[1,4], DEFAULT_COLOR),

            new Line([-0.5,2],[-1,2], DEFAULT_COLOR),
            new Line([-1.5,2],[-2,2], DEFAULT_COLOR),
            PULSADOR_COLLECTION.clone().translate([-2,2]),
            new Text([-3.25,2], 17, "-S", DEFAULT_COLOR, "right"),
            new Text([0.25,0.5], 17, "11", DEFAULT_COLOR, "left"),
            new Text([-0.75,3.75], 17, "12", DEFAULT_COLOR, "left"),
            new Text([1.25,3.75], 17, "14", DEFAULT_COLOR, "left")
            ]),
            HITBOX_BUTTON.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-S", "name"),
                new TextboxOption("Conexión 1", "11", "con1"),
                new TextboxOption("Conexión 2", "12", "con2"),
                new TextboxOption("Conexión 3", "14", "con3"),
                new ImageSelectOption("Tipo",PULSADOR_COLLECTION.clone().translate([-2,2]),ICO_COLLECTION)
            ]))}

            update() {
                this.symbol.strokes[9].text = this.options.options[0].getValue()
                this.symbol.strokes[10].text = this.options.options[1].getValue()
                this.symbol.strokes[11].text = this.options.options[2].getValue()
                this.symbol.strokes[12].text = this.options.options[3].getValue()
                this.symbol.strokes[8] = this.options.options[4].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new PulsadorConmutado(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class Fuente extends Component {
    constructor(position) {
        super(position, "Alimentación", new ComponentSymbol([
            new Line([0,0],[0,-0.6],1,DEFAULT_COLOR),
            new Arc([0,-1], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([0,-2], 17, "L", DEFAULT_COLOR, "center"),
            new Text([-0.75,-1], 17, "-X", DEFAULT_COLOR, "right"),
            ]),
            HITBOX_UPPER_SQUARE.clone(),
            new ComponentOptions([
                new TextboxOption("Tipo", "L", "type"),
                new TextboxOption("Nombre", "-X", "name"),
            ]))}

            update() {
                this.symbol.strokes[2].text = this.options.options[0].getValue()
                this.symbol.strokes[3].text = this.options.options[1].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new Fuente(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class Tierra extends Component {
    constructor(position) {
        super(position, "Toma de Tierra", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([1,1],[-1,1],1,DEFAULT_COLOR),
            new Line([0.75,1.33],[-0.75,1.33],1,DEFAULT_COLOR),
            new Line([0.5,1.66],[-0.5,1.66],1,DEFAULT_COLOR),
            ]),
            HITBOX_LOWER_SQUARE.clone(),
            new ComponentOptions([

            ]))}

            update() {
               
            }

            clone() {
                let newobj = new Tierra(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class S71215C extends Component {
    constructor(position) {
        super(position, "S7 1200 1215C", new ComponentSymbol([
            new RectangleArray([0,0],[33,27], 1, DEFAULT_COLOR),

            new Line([0.25,0],[0.25,1.5],1,DEFAULT_COLOR),
            new Line([1.25,0],[1.25,1.5],1,DEFAULT_COLOR),
            new Line([1.25,0.25],[2,0.25],1,DEFAULT_COLOR),
            new Line([1.25,0.5],[2,0.5],2,DEFAULT_COLOR),
            new Line([2,0],[2,2],1,DEFAULT_COLOR),

            new Arc([3,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([3,3.5], 12, "L1", DEFAULT_COLOR, "center"),
            //⇩
            new Text([3.5,4.5], 20, "⇩", DEFAULT_COLOR, "center"),
            new Arc([4,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([4,3.5], 12, "N", DEFAULT_COLOR, "center"), // 10
            new Arc([5,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([5,3.75], 20, "⏚", DEFAULT_COLOR, "center"),
            new Arc([6,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([6,3.5], 12, "L+", DEFAULT_COLOR, "center"),
            // ⇑
            new Text([6.5,4.5], 20, "⇧", DEFAULT_COLOR, "center"),
            new Arc([7,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([7,3.5], 12, "M", DEFAULT_COLOR, "center"),
            new Arc([8,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([8,3.5], 12, "1M", DEFAULT_COLOR, "center"),
            new Arc([9,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR), // 20
            new Text([9,3.5], 12, ".0", DEFAULT_COLOR, "center"),
            new Arc([10,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([10,3.5], 12, ".1", DEFAULT_COLOR, "center"),
            new Arc([11,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([11,3.5], 12, ".2", DEFAULT_COLOR, "center"), //25
            new Arc([12,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([12,3.5], 12, ".3", DEFAULT_COLOR, "center"),
            new Arc([13,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([13,3.5], 12, ".4", DEFAULT_COLOR, "center"),
            new Arc([14,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR), // 30
            new Text([14,3.5], 12, ".5", DEFAULT_COLOR, "center"),
            new Arc([15,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([15,3.5], 12, ".6", DEFAULT_COLOR, "center"),
            new Arc([16,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([16,3.5], 12, ".7", DEFAULT_COLOR, "center"),
            new Arc([17,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([17,3.5], 12, ".0", DEFAULT_COLOR, "center"),
            new Arc([18,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([18,3.5], 12, ".1", DEFAULT_COLOR, "center"),
            new Arc([19,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR), // 40
            new Text([19,3.5], 12, ".2", DEFAULT_COLOR, "center"),
            new Arc([20,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([20,3.5], 12, ".3", DEFAULT_COLOR, "center"),
            new Arc([21,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([21,3.5], 12, ".4", DEFAULT_COLOR, "center"),
            new Arc([22,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([22,3.5], 12, ".5", DEFAULT_COLOR, "center"),
            new Arc([24,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([24,3.5], 12, "2M", DEFAULT_COLOR, "center"),
            new Arc([25,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR), // 50
            new Text([25,3.5], 12, ".0", DEFAULT_COLOR, "center"),
            new Arc([26,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([26,3.5], 12, ".1", DEFAULT_COLOR, "center"),
            new Arc([27,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([27,3.5], 12, "3M", DEFAULT_COLOR, "center"),
            new Arc([28,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([28,3.5], 12, ".0", DEFAULT_COLOR, "center"),
            new Arc([29,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([29,3.5], 12, ".1", DEFAULT_COLOR, "center"),

            new Arc([29,25], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR), // 60
            new Text([29,23.5], 12, ".1", DEFAULT_COLOR, "center"),
            new Arc([28,25], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([28,23.5], 12, ".0", DEFAULT_COLOR, "center"),
            new Arc([27,25], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([27,23.5], 12, ".7", DEFAULT_COLOR, "center"),
            new Arc([26,25], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([26,23.5], 12, ".6", DEFAULT_COLOR, "center"),
            new Arc([25,25], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([25,23.5], 12, ".5", DEFAULT_COLOR, "center"),
            new Arc([24,25], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR), // 70
            new Text([24,23.5], 12, "2L", DEFAULT_COLOR, "center"),
            new Arc([23,25], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([23,23.5], 12, ".4", DEFAULT_COLOR, "center"),
            new Arc([22,25], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([22,23.5], 12, ".3", DEFAULT_COLOR, "center"),
            new Arc([21,25], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([21,23.5], 12, ".2", DEFAULT_COLOR, "center"),
            new Arc([20,25], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([20,23.5], 12, ".1", DEFAULT_COLOR, "center"),
            new Arc([19,25], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR), // 80
            new Text([19,23.5], 12, ".0", DEFAULT_COLOR, "center"),
            new Arc([18,25], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Text([18,23.5], 12, "1L", DEFAULT_COLOR, "center"),

            new Text([23.5,22.5], 12, "RELAY OUTPUTS", DEFAULT_COLOR, "center"),

            new Text([4,5.5], 10, "120-240VAC", DEFAULT_COLOR, "center"),
            new Text([6.5,5.5], 10, "24VDC", DEFAULT_COLOR, "center"),
            new Text([14,5.5], 12, "24VDC INPUTS", DEFAULT_COLOR, "center"),
            new Text([25,5.5], 12, "ANALOG", DEFAULT_COLOR, "center"),
            new Text([25,6], 12, "OUTPUTS", DEFAULT_COLOR, "center"),
            new Text([28,5.5], 12, "ANALOG", DEFAULT_COLOR, "center"), // 90
            new Text([28,6], 12, "INPUTS", DEFAULT_COLOR, "center"),
            new Text([8.5,4.5], 12, "DI a", DEFAULT_COLOR, "center"),
            new Text([17,4.5], 12, "DI b", DEFAULT_COLOR, "center"),
            new Text([25,4.5], 12, "AQ", DEFAULT_COLOR, "center"),
            new Text([28,4.5], 12, "AI", DEFAULT_COLOR, "center"),

            new Text([28,13], 18, "CPU 1215C", DEFAULT_COLOR, "left"),
            new Text([28,14], 18, "AC/DC/RLY", DEFAULT_COLOR, "left"),

            new Line([2.5,3.5],[2.5,5],1,DEFAULT_COLOR),
            new Line([4.5,3.5],[4.5,5],1,DEFAULT_COLOR),
            new Line([2.5,5],[4.5,5],1,DEFAULT_COLOR), //100
            new Line([5.5,5],[22.5,5],1,DEFAULT_COLOR),
            new Line([5.5,3.5],[5.5,5],1,DEFAULT_COLOR),
            new Line([7.5,3.5],[7.5,5],1,DEFAULT_COLOR),
            new Line([22.5,3.5],[22.5,5],1,DEFAULT_COLOR),
            new Line([23.5,3.5],[23.5,5],1,DEFAULT_COLOR),
            new Line([26.5,3.5],[26.5,5],1,DEFAULT_COLOR),
            new Line([29.5,3.5],[29.5,5],1,DEFAULT_COLOR),
            new Line([23.5,5],[29.5,5],1,DEFAULT_COLOR),

            new Text([-4,2], 12, "X10", DEFAULT_COLOR, "center").rotate90Deg(),
            new Text([-4,23], 12, "X11", DEFAULT_COLOR, "center").rotate90Deg(), // 110
            new Text([-23.5,17], 12, "X12", DEFAULT_COLOR, "center").rotate90Deg(),
            new Text([-8,30.5], 12, "X50", DEFAULT_COLOR, "right").rotate90Deg(),

            new Line([29.5,23.75],[29.5,22.75],1,DEFAULT_COLOR),
            new Line([23.5,23.75],[23.5,22.75],1,DEFAULT_COLOR),
            new Line([17.5,23.75],[17.5,22.75],1,DEFAULT_COLOR),
            new Line([17.5,22.75],[29.5,22.75],1,DEFAULT_COLOR),

            new Arc([3,2], 1, -3*Math.PI/2, -Math.PI,1,DEFAULT_COLOR),
            new Arc([29,2], 1, 0, -3*Math.PI/2,1,DEFAULT_COLOR),
            new Arc([21.75,2], 1, 0, -3*Math.PI/2,1,DEFAULT_COLOR),
            new Arc([24.25,2], 1, -3*Math.PI/2, -Math.PI,1,DEFAULT_COLOR), // 120
            new Line([3,3],[21.75,3],1,DEFAULT_COLOR),
            new Line([22.75,0],[22.75,2],1,DEFAULT_COLOR),
            new Line([23.2,0],[23.2,2],1,DEFAULT_COLOR),
            new Line([24.25,3],[29,3],1,DEFAULT_COLOR),
            new Line([30,0],[30,2],1,DEFAULT_COLOR),

            new Arc([18,25], 1, -Math.PI, -Math.PI/2,1,DEFAULT_COLOR),
            new Arc([29,25], 1, 3*Math.PI/2, 2*Math.PI,1,DEFAULT_COLOR),
            new Line([29,24],[18,24],1,DEFAULT_COLOR),
            new Line([30,25],[30,27],1,DEFAULT_COLOR),
            new Line([17,25],[17,27],1,DEFAULT_COLOR), // 130

            new RectangleArray([1,9.75],[1.5,10.25],3,DEFAULT_COLOR),
            new RectangleArray([2,9.75],[2.5,10.25],3,DEFAULT_COLOR),
            new RectangleArray([3,9.75],[3.5,10.25],3,DEFAULT_COLOR),
            new Text([-11,1.5], 12, "RUN/STOP", DEFAULT_COLOR, "right").rotate90Deg(),
            new Text([-11,2.5], 12, "ERROR", DEFAULT_COLOR, "right").rotate90Deg(),
            new Text([-11,3.5], 12, "MAINT", DEFAULT_COLOR, "right").rotate90Deg(),

            new RectangleArray([1,18.75],[1.5,19.25],3,DEFAULT_COLOR),
            new RectangleArray([4,18.75],[4.5,19.25],3,DEFAULT_COLOR),
            new Text([2.75,19], 12, "LINK", DEFAULT_COLOR, "center"),
            new RectangleArray([1,19.75],[1.5,20.25],3,DEFAULT_COLOR), // 140
            new RectangleArray([4,19.75],[4.5,20.25],3,DEFAULT_COLOR),
            new Text([2.75,20], 12, "Rx/Tx", DEFAULT_COLOR, "center"),

            new Text([1,23], 12, "X1 P1R", DEFAULT_COLOR, "left"),
            new Text([6.5,23], 12, "X1 P2R", DEFAULT_COLOR, "right"),
            new Text([4,24], 12, "PROFINET (LAN)", DEFAULT_COLOR, "center"),
            new Text([3.75,25], 9, "MAC ADDRESS 00-00-00-00-00-00", DEFAULT_COLOR, "center"),
            new Text([32,18.5], 12, "215-1AG40-0XB0", DEFAULT_COLOR, "right"),

            new RectangleArray([31,9.75],[31.5,10.25],3,DEFAULT_COLOR),
            new RectangleArray([30,9.75],[30.5,10.25],3,DEFAULT_COLOR),
            new RectangleArray([29,9.75],[29.5,10.25],3,DEFAULT_COLOR), // 150
            new RectangleArray([28,9.75],[28.5,10.25],3,DEFAULT_COLOR),
            new RectangleArray([27,9.75],[27.5,10.25],3,DEFAULT_COLOR),
            new RectangleArray([26,9.75],[26.5,10.25],3,DEFAULT_COLOR),
            new RectangleArray([25,9.75],[25.5,10.25],3,DEFAULT_COLOR),
            new RectangleArray([24,9.75],[24.5,10.25],3,DEFAULT_COLOR),
            new RectangleArray([23,9.75],[23.5,10.25],3,DEFAULT_COLOR),
            new RectangleArray([22,9.75],[22.5,10.25],3,DEFAULT_COLOR),
            new RectangleArray([21,9.75],[21.5,10.25],3,DEFAULT_COLOR),
            new RectangleArray([20,9.75],[20.5,10.25],3,DEFAULT_COLOR),
            new RectangleArray([19,9.75],[19.5,10.25],3,DEFAULT_COLOR),
            new RectangleArray([18,9.75],[18.5,10.25],3,DEFAULT_COLOR),

            new RectangleArray([31,16.75],[31.5,17.25],3,DEFAULT_COLOR),
            new RectangleArray([30,16.75],[30.5,17.25],3,DEFAULT_COLOR),
            new RectangleArray([29,16.75],[29.5,17.25],3,DEFAULT_COLOR),
            new RectangleArray([28,16.75],[28.5,17.25],3,DEFAULT_COLOR),
            new RectangleArray([27,16.75],[27.5,17.25],3,DEFAULT_COLOR),
            new RectangleArray([26,16.75],[26.5,17.25],3,DEFAULT_COLOR),
            new RectangleArray([25,16.75],[25.5,17.25],3,DEFAULT_COLOR),
            new RectangleArray([24,16.75],[24.5,17.25],3,DEFAULT_COLOR),
            new RectangleArray([23,16.75],[23.5,17.25],3,DEFAULT_COLOR),
            new RectangleArray([22,16.75],[22.5,17.25],3,DEFAULT_COLOR),
            new RectangleArray([21,16.75],[21.5,17.25],3,DEFAULT_COLOR),
            new RectangleArray([20,16.75],[20.5,17.25],3,DEFAULT_COLOR),
            new RectangleArray([19,16.75],[19.5,17.25],3,DEFAULT_COLOR),
            new RectangleArray([18,16.75],[18.5,17.25],3,DEFAULT_COLOR),

            new RectangleArray([6,7],[15,20],1,DEFAULT_COLOR),
            new RectangleArray([11.5,7],[9.5,6.25],1,DEFAULT_COLOR),

            new Line([15,20],[15,21],2,DEFAULT_COLOR),
            new Line([6,20],[6,21],2,DEFAULT_COLOR),
            new Line([6,21],[7.5,21],2,DEFAULT_COLOR),
            new Line([15,21],[13.5,21],2,DEFAULT_COLOR),
            new Line([7.5,21],[7.5,27],2,DEFAULT_COLOR),
            new Line([13.5,21],[13.5,27],2,DEFAULT_COLOR),

            new Line([32.5,17.5],[32.5,25.5],2,DEFAULT_COLOR),
            new Line([32.5,25.5],[30,25.5],2,DEFAULT_COLOR),
            new Line([17,25.5],[13.5,25.5],2,DEFAULT_COLOR),
            new Line([7.5,25.5],[0.5,25.5],2,DEFAULT_COLOR),
            new Line([0.5,24.5],[0.5,17.5],2,DEFAULT_COLOR),
            new Line([0.5,9.5],[0.5,1.5],2,DEFAULT_COLOR),

            new Text([18.25,11.25], 12, ".0", DEFAULT_COLOR, "center"),
            new Text([18,12.25], 12, "DI a", DEFAULT_COLOR, "left"),
            new Text([19.25,11.25], 12, ".1", DEFAULT_COLOR, "center"),
            new Text([20.25,11.25], 12, ".2", DEFAULT_COLOR, "center"),
            new Text([21.25,11.25], 12, ".3", DEFAULT_COLOR, "center"),
            new Text([22.25,11.25], 12, ".4", DEFAULT_COLOR, "center"),
            new Text([23.25,11.25], 12, ".5", DEFAULT_COLOR, "center"),
            new Text([24.25,11.25], 12, ".6", DEFAULT_COLOR, "center"),
            new Text([25.25,11.25], 12, ".7", DEFAULT_COLOR, "center"),
            new Text([26.25,11.25], 12, ".0", DEFAULT_COLOR, "center"),
            new Text([26,12.25], 12, "DI b", DEFAULT_COLOR, "left"),
            new Text([27.25,11.25], 12, ".1", DEFAULT_COLOR, "center"),
            new Text([28.25,11.25], 12, ".2", DEFAULT_COLOR, "center"),
            new Text([29.25,11.25], 12, ".3", DEFAULT_COLOR, "center"),
            new Text([30.25,11.25], 12, ".4", DEFAULT_COLOR, "center"),
            new Text([31.25,11.25], 12, ".5", DEFAULT_COLOR, "center"),

            new Text([18.25,16.25], 12, ".0", DEFAULT_COLOR, "center"),
            new Text([18,15], 12, "DQ a", DEFAULT_COLOR, "left"),
            new Text([19.25,16.25], 12, ".1", DEFAULT_COLOR, "center"),
            new Text([20.25,16.25], 12, ".2", DEFAULT_COLOR, "center"),
            new Text([21.25,16.25], 12, ".3", DEFAULT_COLOR, "center"),
            new Text([22.25,16.25], 12, ".4", DEFAULT_COLOR, "center"),
            new Text([23.25,16.25], 12, ".5", DEFAULT_COLOR, "center"),
            new Text([24.25,16.25], 12, ".6", DEFAULT_COLOR, "center"),
            new Text([25.25,16.25], 12, ".7", DEFAULT_COLOR, "center"),
            new Text([26.25,16.25], 12, ".0", DEFAULT_COLOR, "center"),
            new Text([26,15], 12, "DQ b", DEFAULT_COLOR, "left"),
            new Text([27.25,16.25], 12, ".1", DEFAULT_COLOR, "center"),

            new Line([32,10.75],[32,11.75],1,DEFAULT_COLOR),
            new Line([25.75,10.75],[25.75,11.75],1,DEFAULT_COLOR),
            new Line([17.75,10.75],[17.75,11.75],1,DEFAULT_COLOR),
            new Line([17.75,11.75],[32,11.75],1,DEFAULT_COLOR),

            new Line([32,16.25],[32,15.25],1,DEFAULT_COLOR),
            new Line([25.75,16.25],[25.75,15.25],1,DEFAULT_COLOR),
            new Line([17.75,16.25],[17.75,15.25],1,DEFAULT_COLOR),
            new Line([17.75,15.25],[32,15.25],1,DEFAULT_COLOR),

            new Line([32,2],[32,9],1,DEFAULT_COLOR),
            new Line([32,9],[31,9],1,DEFAULT_COLOR),
            new Line([32,2],[31,2],1,DEFAULT_COLOR),
            new Line([31,9],[31,2],1,DEFAULT_COLOR),
            new Line([32.5,1.5],[32.5,9.5],2,DEFAULT_COLOR),
            new RectangleArray([0,9.5],[33,10.5],2,DEFAULT_COLOR),
            new Line([32.5,1.5],[30,1.5],2,DEFAULT_COLOR),
            new Line([22.75,1.5],[23.2,1.5],2,DEFAULT_COLOR),
            new RectangleArray([0,16.5],[33,17.5],2,DEFAULT_COLOR),
            new Line([30,9],[30,8],1,DEFAULT_COLOR),
            new Line([28,9],[28,7.5],1,DEFAULT_COLOR),
            new Line([30,9],[28,9],1,DEFAULT_COLOR),
            new Line([28,7.5],[29.5,7.5],1,DEFAULT_COLOR),
            new Line([30,8],[29.5,7.5],1,DEFAULT_COLOR),
            new Text([29.8,8.5], 12, "MC ⇨", DEFAULT_COLOR, "right"),

            new Line([1,27],[0.5,26],2,DEFAULT_COLOR),
            new Line([6,27],[6.5,26],2,DEFAULT_COLOR),
            new Line([0.5,26],[6.5,26],2,DEFAULT_COLOR),

            new Line([0.5,26.15],[2,26.15],1,DEFAULT_COLOR),
            new Line([2.75,26.15],[4.25,26.15],1,DEFAULT_COLOR),
            new Line([5,26.15],[6.5,26.15],1,DEFAULT_COLOR),

            new Line([0,1.5],[1.75,1.5],2,DEFAULT_COLOR),
            ]),
            HITBOX_1200.clone(),
            new ComponentOptions([
                /*new TextboxOption("MAC", "00-00-00-00-00-00", "mac"), // 146
                new CheckboxOption("DC/X/X", false, "dcin"),
                new CheckboxOption("X/X/DC", false, "dcout"),*/
            ]))}

            update() {
                //this.symbol.strokes[146].text = "MAC ADDRESS " + this.options.options[0].getValue()
                updateCanvas()
            }

            clone() {
                let newobj = new S71215C(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

class S7SM1223 extends Component {
    constructor(position) {
        super(position, "S7 1200 SM 1223", new ComponentSymbol([
            new RectangleArray([0,0],[18,27], 1, DEFAULT_COLOR),
            
            new Arc([3,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Arc([5,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Arc([7,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Arc([9,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Arc([11,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Arc([13,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),
            new Arc([15,2], 0.4, 0, 2*Math.PI,1,DEFAULT_COLOR),

            ]),
            HITBOX_RESISTOR.clone(),
            new ComponentOptions([
                new TextboxOption("Temp", "0", "stage"),
            ]))}

            update() {
                updateCanvas()
            }

            clone() {
                let newobj = new S71215C(this.position)
                newobj.name = this.name
                newobj.symbol = this.symbol.clone()
                newobj.hitbox = this.hitbox.clone()
                newobj.options = this.options.clone()
                return newobj
            }
}

