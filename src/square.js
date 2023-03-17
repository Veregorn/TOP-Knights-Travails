// Class that represents a Square of a Chess board game
export default class Square {
    
    constructor(xCoord,yCoord,visited = false,parent = null) {
        this._xCoord = xCoord;
        this._yCoord = yCoord;
        this._visited = visited; // Used to avoid infinite loops in a graph
        this._parent = parent; // The breadcrumb to follow that path in 'shortestPath' method
    }

    get xCoord() {
        return this._xCoord;
    }

    get yCoord() {
        return this._yCoord;
    }

    get visited() {
        return this._visited;
    }

    set visited(bool) {
        this._visited = bool;
    }

    get parent() {
        return this._parent;
    }

    set parent(parent) {
        this._parent = parent;
    }
}