// Class that represents a Square of a Chess board game
export default class Square {
    
    constructor(xCoord,yCoord,visited,parent) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.visited = visited; // Used to avoid infinite loops in a graph
        this.parent = parent; // The breadcrumb to follow that path in 'shortestPath' method
    }

    getXCoord() {
        return this.xCoord;
    }

    getYCoord() {
        return this.yCoord;
    }

    isVisited() {
        return this.visited;
    }

    getParent() {
        return this.parent;
    }

    setVisited(bool) {
        this.visited = bool;
    }

    setParent(parent) {
        this.parent = parent;
    }
}