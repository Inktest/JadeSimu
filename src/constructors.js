class Line {
    constructor(start, end, width, color, hide) {
        this.start = start
        this.end = end
        this.width = width
        this.color = color
        this.hide = !hide
    }

    translate(pos) {
        this.start = [this.start[0]+pos[0], this.start[1]+pos[1]]
        this.end = [this.end[0]+pos[0], this.end[1]+pos[1]]
        return this
    }

    clone() {
        return new Line(this.start, this.end, this.width, this.color, !this.hide)
    }

    draw() {
        if (!this.hide) return
        context.strokeStyle = this.color
    
        context.beginPath()
        context.moveTo(this.start[0]*dotSpace*scale+0.5, this.start[1]*dotSpace*scale+0.5)
        context.lineTo(this.end[0]*dotSpace*scale+0.5, this.end[1]*dotSpace*scale+0.5)
        context.lineWidth = this.width
        context.stroke()
    }

    rotate90Deg() {
        this.start = [this.start[1],-this.start[0]]
        this.end = [this.end[1],-this.end[0]]
        return this;
    }

    rotateTimes(num) {
        for (let i = num; i > 0; i--) {
            this.rotate90Deg()
        }
        return this
    }
}

class Rectangle {
    constructor(corner1, corner2, color, hide) {
        this.corner1 = corner1
        this.corner2 = corner2
        this.color = color
        this.hide = !hide
    }

    translate(pos) {
        this.corner1 = [this.corner1[0]+pos[0], this.corner1[1]+pos[1]]
        this.corner2 = [this.corner2[0]+pos[0], this.corner2[1]+pos[1]]
        return this
    }

    clone() {
        return new Rectangle(this.corner1, this.corner2, this.color, !this.hide)
    }

    draw() {
        if (!this.hide) return
        context.fillStyle = this.color
    
        /*context.beginPath()
        context.moveTo(this.start[0]*dotSpace*scale+0.5, this.start[1]*dotSpace*scale+0.5)
        context.lineTo(this.end[0]*dotSpace*scale+0.5, this.end[1]*dotSpace*scale+0.5)
        context.lineWidth = this.width
        context.stroke()*/

        context.fillRect(
            this.corner1[0]*dotSpace*scale+0.5,
            this.corner1[1]*dotSpace*scale+0.5,
            this.corner2[0]*dotSpace*scale+0.5 - this.corner1[0]*dotSpace*scale+0.5,
            this.corner2[1]*dotSpace*scale+0.5 - this.corner1[1]*dotSpace*scale+0.5
            )
    }

    rotate90Deg() {
        this.corner1 = [this.corner1[1],-this.corner1[0]]
        this.corner2 = [this.corner2[1],-this.corner2[0]]
        return this;
    }

    rotateTimes(num) {
        for (let i = num; i > 0; i--) {
            this.rotate90Deg()
        }
        return this
    }
}

class Arc {
    constructor(center, radius, sAngle, eAngle, width, color, hide) {
        this.center = center
        this.radius = radius
        this.sAngle = sAngle
        this.eAngle = eAngle
        this.width = width
        this.color = color
        this.hide = !hide
    }

    translate(pos) {
        this.center = [this.center[0]+pos[0], this.center[1]+pos[1]]
        return this
    }

    clone() {
        return new Arc(this.center, this.radius, this.sAngle, this.eAngle, this.width, this.color, this.hide)
    }

    draw() {
        if (!this.hide) return
        context.strokeStyle = this.color

        context.beginPath()
        context.arc(this.center[0]*dotSpace*scale,this.center[1]*dotSpace*scale,this.radius*dotSpace*scale, this.sAngle, this.eAngle)
        context.lineWidth = this.width
        context.stroke()
    }

    rotate90Deg() {
        this.center = [this.center[1],-this.center[0]]

        this.sAngle -= Math.PI/2
        this.eAngle -= Math.PI/2

        return this;
    }
}

class Text {
    constructor (position, size, text, color, align, rotation, hide) {

        this.position = position
        this.size = size
        this.text = text
        this.color = color
        this.align = align
        this.rotation = rotation || 0
        this.hide = !hide
        
    }

    translate(pos) {
        this.position = [this.position[0]+pos[0], this.position[1]+pos[1]]
        return this
    }

    clone() {
        return new Text(this.position, this.size, this.text, this.color, this.align, this.rotation, this.hide)
    }

    draw() {
        if (!this.hide) return
        context.fillStyle = this.color
        
        context.save()
        context.translate(this.position[0]*dotSpace*scale, this.position[1]*dotSpace*scale)
        context.rotate(this.rotation)
        context.textBaseline = "middle"
        context.textAlign = this.align
        context.font = `${this.size*scale}px Arial`
        context.fillText(this.text, 0,0)
        context.restore()
    }

    rotate90Deg() {
        this.position = [this.position[1],-this.position[0]]
        this.rotation -= Math.PI/2
        return this
    }

}

class StrokeCollection {
    constructor(strokes, color) {
        this.strokes = strokes
        this.color = color
        this.rotation = 0
    }

    translate(pos) {
        this.strokes.forEach(s => {
            s.translate(pos)
        });
        return this
    }

    clone() {
        let newStrokes = []
        this.strokes.forEach(s => {
            newStrokes.push(s.clone())
        });
       return new StrokeCollection(newStrokes, this.color)
    }

    draw() {
        this.strokes.forEach(s => {
            s.color = this.color
            s.draw()
        });
    }

    rotate90Deg() {
        this.strokes.forEach(s => {
            s.rotate90Deg()
        });
        this.rotation += 1
        this.rotation %= 4
        return this
    }

    rotateTimes(num) {

        for (let i = num; i > 0; i--) {
            this.rotate90Deg()
        }
        return this

    }
}

class Component {
    constructor(position, name, symbol, hitbox, options, rotation) {
        this.position = position
        this.name = name
        this.imageName = this.constructor.name
        this.symbol = symbol
        this.hitbox = hitbox
        this.options = options
        this.options.name = name
        this.rotation = rotation || 0
    }
    rotate90Deg() {
        this.symbol.rotate90Deg()
        this.hitbox.rotate90Deg()
        this.rotation++
        this.rotation %= 4
        return this
    } 
    
    translate(position) {
        this.position = [this.position[0] + position[0], this.position[1] + position[1]]
        return this
    }

    moveTo(position) {
        this.position = position
        return this
    }

    getEffectiveHitbox() {
        return this.hitbox.getEffectiveHitbox(this.position)
    }
}

class ComponentSymbol {
    constructor(strokes) {
        this.strokes = strokes
    }

    setColor(color) {
        this.strokes.forEach(s => {
            s.color = color
        });
    }
    rotate90Deg() {
        this.strokes.forEach(s => {
            s.rotate90Deg()
        });
        return this
    }
    translate(position) {
        this.strokes.forEach(s => {
            s.translate(position)
        });
        return this
    }
    clone() {
        let newStrokes = []
        this.strokes.forEach(s => {
           newStrokes.push(s.clone())
        });
        return new ComponentSymbol(newStrokes)
    }

}

class ComponentHitbox {
    constructor(hitbox) {
        this.hitbox = hitbox
    }

    rotate90Deg() {
        this.hitbox = this.hitbox.map(point => [point[1], -point[0] - 1]);
        return this
    }

    getEffectiveHitbox(pos) {
        return this.hitbox.map(point => [point[0] + pos[0], point[1] + pos[1]]);
    }

    clone() {
        return new ComponentHitbox(this.hitbox)
    }
}
