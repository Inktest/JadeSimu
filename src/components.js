class Condensador extends Component {
    constructor(position) {
        super(position, "Carga Capacitiva", new ComponentSymbol([
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
                this.symbol.strokes[19].hide = this.options.options[10].getValue()
                this.symbol.strokes[26].hide = this.options.options[10].getValue()
                this.symbol.strokes[27].hide = this.options.options[10].getValue()
                this.symbol.strokes[28].hide = this.options.options[10].getValue()
                this.symbol.strokes[29].hide = this.options.options[10].getValue()
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
            new Text([2.5,2], 17, "None", DEFAULT_COLOR, "left")
            ]),
            HITBOX_RESISTOR.clone(),
            new ComponentOptions([
                new TextboxOption("Etapa", "0", "stage"),
                new TextboxOption("Función", "None", "func")
            ]))}

            update() {
                this.symbol.strokes[11].text = this.options.options[0].getValue()
                this.symbol.strokes[12].text = this.options.options[1].getValue()

                this.symbol.strokes[7].hide = this.options.options[0].getValue() == 0
                this.symbol.strokes[8].hide = this.options.options[0].getValue() == 0
                this.symbol.strokes[9].hide = this.options.options[0].getValue() == 0
                this.symbol.strokes[10].hide = this.options.options[0].getValue() == 0
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

class TemporizacionLogica extends Component {
    constructor(position) {
        super(position, "Temporizador", new ComponentSymbol([
            new Line([-1,0],[1,0],1,DEFAULT_COLOR),
            new Line([1,3],[1,0],1,DEFAULT_COLOR),
            new Line([-1,3],[-1,0],1,DEFAULT_COLOR),
            new Line([1,3],[-1,3],1,DEFAULT_COLOR),


            new Text([0, -1], 17, "T1", DEFAULT_COLOR, "center"),
            new Text([0, 2], 17, "0s", DEFAULT_COLOR, "center")
            ]),
            HITBOX_BOBINA.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "T1", "name"),            ]))}

            update() {
               this.symbol.strokes[4].text = this.options.options[0].getValue()
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
                this.symbol.strokes[18].hide = this.options.options[7].getValue()
                this.symbol.strokes[21].hide = this.options.options[7].getValue()
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
        super(position, "Fusible", new ComponentSymbol([
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
                this.symbol.strokes[16].hide = this.options.options[8].getValue()
                //this.symbol.strokes[2].

                this.symbol.strokes[11].hide = this.options.options[9].getValue() && !this.options.options[8].getValue()
                this.symbol.strokes[12].hide = this.options.options[9].getValue()
                this.symbol.strokes[13].hide = this.options.options[9].getValue()
                this.symbol.strokes[19].hide = !this.options.options[9].getValue()
                this.symbol.strokes[20].hide = !this.options.options[9].getValue() || this.options.options[8].getValue()
                this.symbol.strokes[21].hide = !this.options.options[9].getValue()
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
                this.symbol.strokes[20].hide = !this.options.options[6].getValue()
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
        super(position, "Fusible", new ComponentSymbol([
            new Line([0,0],[0,1],1,DEFAULT_COLOR),
            new Line([-1,1], [1,1],1,DEFAULT_COLOR),
            new Line([1,1],[1,2],1,DEFAULT_COLOR),
            new Line([-1,1],[-1,2],1,DEFAULT_COLOR),
            new Line([-1,2],[1,2],1,DEFAULT_COLOR),
            new Line([0,2],[0,3],1,DEFAULT_COLOR),
            NONE_COLLECTION.clone().translate([0,2]),
            new Text([-1.5,1.5], 17, "-K", DEFAULT_COLOR, "right"),
            new Text([0.25,0.5], 17, "A1", DEFAULT_COLOR, "left"),
            new Text([0.25,2.66], 17, "A2", DEFAULT_COLOR, "left")
            ]),
            HITBOX_BOBINA.clone(),
            new ComponentOptions([
                new TextboxOption("Nombre", "-K", "name"),
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