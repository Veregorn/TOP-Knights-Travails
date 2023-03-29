// Class that represents a Square of a Chess board game
export default class Square {
    
    constructor(xCoord,yCoord,visited = false,parent = null) {
        this._xCoord = xCoord; // From A to H
        this._yCoord = yCoord; // From 1 to 8
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

    // This method sets 'visited' and 'parent' attributes to 'false' and 'null'
    // This is a Square Reset
    clean() {
        this._parent = null;
        this._visited = false;
    }

    // This method resolves arithmetic operations (+-) with coord X letters
    incDecXcoord(num) {
        let numberedLetter = parseInt(this._xCoord,36);

        if (num > 0) {
            for (let i = 0; i < num; i += 1) {
                numberedLetter += 1;
            }
        }

        if (num < 0) {
            for (let i = 0; i > num; i -= 1) {
                numberedLetter -= 1;
            }
        }

        return numberedLetter.toString(36).toUpperCase();
    }
}