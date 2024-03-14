const NODE_NEUTRAL = 0
const NODE_LIVE = 1
const NODE_RESISTANCE = 2
const NODE_AUTO = 3
const NODE_SHORT = 4

class Node {
    constructor(connections) {
        this.connections = connections
    }

    addStateToConnections(state) {
        for (let i = 0; i < this.connections.length; i++) {
            this.connections[i].addState(state)
        }
    }

}

class NodeConnection {
    constructor(state) {
        this.state = state
    }

    addState(state) {
        if (state === NODE_LIVE && this.state === NODE_NEUTRAL || state === NODE_NEUTRAL && this.state == NODE_LIVE) this.state = NODE_SHORT
        if (this.state === NODE_AUTO) this.state = state
        if (this.state === NODE_NEUTRAL && state === NODE_RESISTANCE) this.state = state

        return this
    }

}

class ResistiveNode extends Node {
    constructor(connections) {
        super(connections)
    }

    updateConnections() {
        for (let i = 0; i < this.connections.length; i++) {
            this.addStateToConnections((this.connections[i].state === NODE_LIVE)?NODE_RESISTANCE:this.connections[i].state)
        }
    }

}

class SwitchNode extends Node {
    constructor(connections, allow) {
        this.allow = allow
        super(connections)
    }

    updateConnections() {
        for (let i = 0; i < this.connections.length; i++) {
            this.addStateToConnections(this.allow?this.connections[i].state:NODE_AUTO)
        }
    }

}