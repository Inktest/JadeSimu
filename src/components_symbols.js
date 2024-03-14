const NONE_COLLECTION = new StrokeCollection([],DEFAULT_COLOR)

const PULSADOR_COLLECTION = new StrokeCollection([
    new Line([0,0.5],[-0.5,0.5],1,DEFAULT_COLOR),
    new Line([-0.5,0.5],[-0.5,-0.5],1,DEFAULT_COLOR),
    new Line([-0.5,-0.5],[0,-0.5],1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const SETA_COLLECTION = new StrokeCollection([
    new Line([0,0.5],[0,-0.5],1,DEFAULT_COLOR),
    new Arc([0,0],0.5,Math.PI/2,3*Math.PI/2,1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const FC_COLLECTION = new StrokeCollection([
    new Arc([-0.5,0],0.5,0,2*Math.PI,1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const INTERRUPTOR_COLLECTION = new StrokeCollection([
    new Line([0,-0.5],[-0.5,-0.5],1,DEFAULT_COLOR),
    new Line([-0.5,0.5],[-0.5,-0.5],1,DEFAULT_COLOR),
    new Line([-0.5,0.5],[-1,0.5],1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const SENSOR_COLLECTION = new StrokeCollection([
    new Line([0,0],[-0.5,-0.5],1,DEFAULT_COLOR),
    new Line([-0.5,-0.5],[-1,0],1,DEFAULT_COLOR),
    new Line([-1,0],[-0.5,0.5],1,DEFAULT_COLOR),
    new Line([-0.5,0.5],[0,0],1,DEFAULT_COLOR),

    new Line([-0.33,0.33],[-0.33,-0.33],1,DEFAULT_COLOR),
    new Line([-0.66,0.33],[-0.66,-0.33],1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const TIRADOR_COLLECTION = new StrokeCollection([
    new Line([0,0.5],[-0.5,0.5],1,DEFAULT_COLOR),
    new Line([0,0.5],[0,-0.5],1,DEFAULT_COLOR),
    new Line([-0.5,-0.5],[0,-0.5],1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const LLAVE_COLLECTION = new StrokeCollection([
    new Arc([-0.3,-0.5],0.25,8*Math.PI/3,13*Math.PI/3,1,DEFAULT_COLOR),
    new Line([-0.2,-0.3],[0.1,0.5],1,DEFAULT_COLOR),
    new Line([-0.4,-0.3],[-0.7,0.5],1,DEFAULT_COLOR),
    new Line([0.1,0.5],[-0.7,0.5],1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const GENERAL_COLLECTION = new StrokeCollection([
    new Line([0,0.5],[0,-0.5],1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const PEDAL_COLLECTION = new StrokeCollection([
    new Line([0.33,-0.5],[-0.5,0.5],1,DEFAULT_COLOR),
    new Line([-0.9,0],[-0.5,0.5],1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const VOLANTE_COLLECTION = new StrokeCollection([
    new Arc([-0.5,0],0.5,0,2*Math.PI,1,DEFAULT_COLOR),
    new Line([-0.5,0],[-0.5,-0.5],1,DEFAULT_COLOR),
    new Line([-0.5,0],[-0.1,0.3],1,DEFAULT_COLOR),
    new Line([-0.5,0],[-0.9,0.3],1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const MANIVELA_COLLECTION = new StrokeCollection([
    new Line([0,0.75],[-0.5,0.75],1,DEFAULT_COLOR),
    new Line([0,0.0],[0,0.75],1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const PALANCA_COLLECTION = new StrokeCollection([
    new Line([-0.25,-0.75],[0.25,0.75],1,DEFAULT_COLOR),
    new Arc([0.33,1],0.25,0,2*Math.PI,1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const LEVA_COLLECTION = new StrokeCollection([
    new Arc([-0.5,0],0.5,0,3*Math.PI/2,1,DEFAULT_COLOR),
    new Line([-0.5,0],[-0.5,-0.5], 1, DEFAULT_COLOR),
    new Line([-0.5,0],[0,0], 1, DEFAULT_COLOR)
], DEFAULT_COLOR)

const RETARDO_ON_COLLECTION = new StrokeCollection([
    new Arc([0,0],0.5, Math.PI/2,3*Math.PI/2,1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const RETARDO_OFF_COLLECTION = new StrokeCollection([
    new Arc([-1,0],0.5, 3*Math.PI/2,Math.PI/2,1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const RETARDO_ONOFF_COLLECTION = new StrokeCollection([
    new Arc([0,0],0.5, Math.PI/2,3*Math.PI/2,1,DEFAULT_COLOR),
    new Arc([-1,0],0.5, 3*Math.PI/2,Math.PI/2,1,DEFAULT_COLOR)
], DEFAULT_COLOR)

const RETARDO_ON_BOBINA_COLLECTION = new StrokeCollection([
    new Line([-1,-1],[-0.25,0],1,DEFAULT_COLOR),
    new Line([-1,0],[-0.25,-1],1,DEFAULT_COLOR),
    new Line([-0.25,-1],[-0.25,0],1,DEFAULT_COLOR),
], DEFAULT_COLOR)

const RETARDO_OFF_BOBINA_COLLECTION = new StrokeCollection([
    new Rectangle([-1,-1],[-0.25,0],DEFAULT_COLOR)
], DEFAULT_COLOR)

const RETARDO_ONOFF_BOBINA_COLLECTION = new StrokeCollection([
    new Rectangle([-0.6,-1],[-0.25,0],DEFAULT_COLOR),
    new Line([-0.6,-1],[-1,0],DEFAULT_COLOR),
    new Line([-0.6,0],[-1,-1],DEFAULT_COLOR)
], DEFAULT_COLOR)

const REMANENCIA_BOBINA_COLLECTION = new StrokeCollection([
    new Line([-0.6,-0.9],[-0.33,-0.9],1,DEFAULT_COLOR),
    new Line([-0.6,-0.1],[-0.9,-0.1],1,DEFAULT_COLOR),
    new Line([-0.6,-0.1],[-0.6,-0.9],1,DEFAULT_COLOR),
    new Line([-0.25,-1],[-0.25,0],1,DEFAULT_COLOR),
], DEFAULT_COLOR)

const ENCLAVAMIENTO_BOBINA_COLLECTION = new StrokeCollection([
    new Line([-0.25,-1],[-0.25,0],1,DEFAULT_COLOR),
    new Line([-1,-0.5],[-0.25,0],1,DEFAULT_COLOR),
    new Line([-0.25,-1],[-1,-0.5],1,DEFAULT_COLOR),
], DEFAULT_COLOR)

const INTERMITENTE_BOBINA_COLLECTION = new StrokeCollection([
    new Line([-0.25,-0.25],[-0.45,-0.25],1,DEFAULT_COLOR),
    new Line([-0.8,-0.25],[-1,-0.25],1,DEFAULT_COLOR),
    new Line([-0.8,-0.6],[-0.45,-0.6],1,DEFAULT_COLOR),
    new Line([-0.45,-0.25],[-0.45,-0.6],1,DEFAULT_COLOR),
    new Line([-0.8,-0.6],[-0.8,-0.25],1,DEFAULT_COLOR),
    new Line([-0.25,-1],[-0.25,0],1,DEFAULT_COLOR),
], DEFAULT_COLOR)

const IMPULSO_BOBINA_COLLECTION = new StrokeCollection([
    new Line([-0.25,-0.25],[-0.45,-0.25],1,DEFAULT_COLOR),
    new Line([-0.8,-0.25],[-1,-0.25],1,DEFAULT_COLOR),
    new Line([-0.625,-0.6],[-0.8,-0.25],1,DEFAULT_COLOR),
    new Line([-0.625,-0.6],[-0.45,-0.25],1,DEFAULT_COLOR),
    new Line([-0.25,-1],[-0.25,0],1,DEFAULT_COLOR),
], DEFAULT_COLOR)

const LED_DIODO_COLLECTION = new StrokeCollection([
    new Line([0.75,-0.75],[1.2,-0.35], 1, DEFAULT_COLOR),
    new Line([0.9,-0.35],[1.2,-0.35], 1, DEFAULT_COLOR),
    new Line([1.2,-0.65],[1.2,-0.35], 1, DEFAULT_COLOR),
    new Line([0.55,-0.4],[1,0], 1, DEFAULT_COLOR),
    new Line([0.7,0],[1,0], 1, DEFAULT_COLOR),
    new Line([1,-0.3],[1,0], 1, DEFAULT_COLOR)
])
const FOTO_DIODO_COLLECTION = new StrokeCollection([
    new Line([0.75,-0.75],[1.2,-0.35], 1, DEFAULT_COLOR),
    new Line([0.75,-0.75],[1.05,-0.75], 1, DEFAULT_COLOR),
    new Line([0.75,-0.75],[0.75,-0.45], 1, DEFAULT_COLOR),

    new Line([0.55,-0.4],[1,0], 1, DEFAULT_COLOR),
    new Line([0.55,-0.4],[0.85,-0.4], 1, DEFAULT_COLOR),
    new Line([0.55,-0.4],[0.55,-0.1], 1, DEFAULT_COLOR)
])
const ZENER_DIODO_COLLECTION = new StrokeCollection([
   new Line([0.5,0],[0.5,0.25], 1, DEFAULT_COLOR),
   new Line([-0.5,0],[-0.5,-0.25], 1, DEFAULT_COLOR),
])

const TUNEL_DIODO_COLLECTION = new StrokeCollection([
    new Line([0.5,0],[0.5,-0.25], 1, DEFAULT_COLOR),
    new Line([-0.5,0],[-0.5,-0.25], 1, DEFAULT_COLOR),
 ])
 const VARICAP_DIODO_COLLECTION = new StrokeCollection([
    new Line([0.5,0.25],[-0.5,0.25], 1, DEFAULT_COLOR),
 ])

const SCHOTTKY_DIODO_COLLECTION = new StrokeCollection([
    new Line([0.5,0],[0.5,0.25], 1, DEFAULT_COLOR),
    new Line([0.5,0.25],[0.25,0.25], 1, DEFAULT_COLOR),
    new Line([-0.5,0],[-0.5,-0.25], 1, DEFAULT_COLOR),
    new Line([-0.5,-0.25],[-0.25,-0.25], 1, DEFAULT_COLOR),
 ])

const ICO_COLLECTION = [
    ["imgs/ico/IcoPulsador.png",PULSADOR_COLLECTION.clone().translate([-2,2])],
    ["imgs/ico/IcoSeta.png",SETA_COLLECTION.clone().translate([-2,2])],
    ["imgs/ico/IcoFc.png",FC_COLLECTION.clone().translate([-2,2])],
    ["imgs/ico/IcoInterruptor.png",INTERRUPTOR_COLLECTION.clone().translate([-2,2])],
    ["imgs/ico/IcoSensor.png",SENSOR_COLLECTION.clone().translate([-2,2])],
    ["imgs/ico/IcoTirador.png",TIRADOR_COLLECTION.clone().translate([-2,2])],
    ["imgs/ico/IcoLlave.png",LLAVE_COLLECTION.clone().translate([-2,2])],
    ["imgs/ico/IcoGeneral.png",GENERAL_COLLECTION.clone().translate([-2,2])],
    ["imgs/ico/IcoPedal.png",PEDAL_COLLECTION.clone().translate([-2,2])],
    ["imgs/ico/IcoVolante.png",VOLANTE_COLLECTION.clone().translate([-2,2])],
    ["imgs/ico/IcoManivela.png",MANIVELA_COLLECTION.clone().translate([-2,2])],
    ["imgs/ico/IcoPalanca.png",PALANCA_COLLECTION.clone().translate([-2,2])],
    ["imgs/ico/IcoLeva.png",LEVA_COLLECTION.clone().translate([-2,2])]
]

const CONT_COLLECTION = [
    ["imgs/ico/IcoRetardoOn.png",RETARDO_ON_COLLECTION.clone().translate([-2,2])],
    ["imgs/ico/IcoRetardoOff.png",RETARDO_OFF_COLLECTION.clone().translate([-2,2])],
    ["imgs/ico/IcoRetardoOnOff.png",RETARDO_ONOFF_COLLECTION.clone().translate([-2,2])],
    
]

const BOBINA_COLLECTION = [
    ["", NONE_COLLECTION],
    ["imgs/bobinas/RetardoOn.png",RETARDO_ON_BOBINA_COLLECTION.clone().translate([0,2])],
    ["imgs/bobinas/RetardoOff.png",RETARDO_OFF_BOBINA_COLLECTION.clone().translate([0,2])],
    ["imgs/bobinas/RetardoOnOff.png",RETARDO_ONOFF_BOBINA_COLLECTION.clone().translate([0,2])],
    ["imgs/bobinas/Remanencia.png",REMANENCIA_BOBINA_COLLECTION.clone().translate([0,2])],
    ["imgs/bobinas/Enclavamiento.png",ENCLAVAMIENTO_BOBINA_COLLECTION.clone().translate([0,2])],
    ["imgs/bobinas/Intermitente.png",INTERMITENTE_BOBINA_COLLECTION.clone().translate([0,2])],
    ["imgs/bobinas/Impulso.png",IMPULSO_BOBINA_COLLECTION.clone().translate([0,2])],
]

const DIODO_COLLECTION = [
    ["", NONE_COLLECTION],
    ["imgs/diodo/Led.png",LED_DIODO_COLLECTION.clone().translate([0,2])],
    ["imgs/diodo/Foto.png",FOTO_DIODO_COLLECTION.clone().translate([0,2])],
    ["imgs/diodo/Zener.png",ZENER_DIODO_COLLECTION.clone().translate([0,2])],
    ["imgs/diodo/Schottky.png",SCHOTTKY_DIODO_COLLECTION.clone().translate([0,2])],
    ["imgs/diodo/Tunel.png",TUNEL_DIODO_COLLECTION.clone().translate([0,2])],
    ["imgs/diodo/Varicap.png",VARICAP_DIODO_COLLECTION.clone().translate([0,2])],
]

const RELE_TERMICO_ADD = new StrokeCollection([ new Line([1,1],[1,1.66],1,DEFAULT_COLOR),
new Line([1,1.66],[1.5,1.66],1,DEFAULT_COLOR),
new Line([1.5,1.66],[1.5,2.33],1,DEFAULT_COLOR),
new Line([1.5,2.33],[1,2.33],1,DEFAULT_COLOR),
new Line([1,2.33],[1,3],1,DEFAULT_COLOR),], DEFAULT_COLOR)