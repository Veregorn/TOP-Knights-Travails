import Square from "./square";

// Class that represents a Chess board game
export default class ChessBoard {
    
    constructor() {
        // Define a map that translate square numbers into Square class objects
        this.board = new Map();
        // Define an adjacency matrix 64x64 where '1' represents that there is an edge from vertex 'i' to vertex 'j'
        // '0' represents  that there is no edge
        this.knightsAdjMatrix = new Array(64);

        // Fill the board with Square class entities
        let n = 0;

        for (let i = 0; i < 8; i += 1) {
            for (let j = 0; j < 8; j += 1) {
                this.board.set(n, new Square(j,i,false,null));
                n += 1;
            }
        }

        // Fill the Knights Adjacency Matrix
        for (let i = 0; i < this.knightsAdjMatrix.length; i += 1) {
            this.knightsAdjMatrix[i] = new Array(64); // Each Array position has another array (2D array is a Matrix)
            for (let j = 0; j < this.knightsAdjMatrix[i].length; j += 1) {
                if (i === j) { // A node isn't connected with itself
                    this.knightsAdjMatrix[i][j] = 0;
                } else if (this.isValidKnightMove(i,j)) {
                    this.knightsAdjMatrix[i][j] = 1;
                } else {
                    this.knightsAdjMatrix[i][j] = 0;
                }
            }
        }
    }

    // Put all the chess board squares as not visited and without parents
    resetBoard() {
        // eslint-disable-next-line no-restricted-syntax
        for (const square of this.board.values()) {
            square.setVisited(false);
            square.setParent(null);
        }
    }

    // Return a Square class object for the number passed as argument
    getSquare(num) {
        return this.board.get(num);
    }

    // Return 'true' if a knight can move from start to end squares
    isValidKnightMove(start,end) {
        if ((this.getSquare(end).getXCoord() === this.getSquare(start).getXCoord() + 1) && (this.getSquare(end).getYCoord() === this.getSquare(start).getYCoord() + 2)) {
            return true;
        }
        if ((this.getSquare(end).getXCoord() === this.getSquare(start).getXCoord() + 1) && (this.getSquare(end).getYCoord() === this.getSquare(start).getYCoord() - 2)) {
            return true;
        }
        if ((this.getSquare(end).getXCoord() === this.getSquare(start).getXCoord() + 2) && (this.getSquare(end).getYCoord() === this.getSquare(start).getYCoord() + 1)) {
            return true;
        }
        if ((this.getSquare(end).getXCoord() === this.getSquare(start).getXCoord() + 2) && (this.getSquare(end).getYCoord() === this.getSquare(start).getYCoord() - 1)) {
            return true;
        }
        if ((this.getSquare(end).getXCoord() === this.getSquare(start).getXCoord() - 1) && (this.getSquare(end).getYCoord() === this.getSquare(start).getYCoord() + 2)) {
            return true;
        }
        if ((this.getSquare(end).getXCoord() === this.getSquare(start).getXCoord() - 1) && (this.getSquare(end).getYCoord() === this.getSquare(start).getYCoord() - 2)) {
            return true;
        }
        if ((this.getSquare(end).getXCoord() === this.getSquare(start).getXCoord() - 2) && (this.getSquare(end).getYCoord() === this.getSquare(start).getYCoord() + 1)) {
            return true;
        }
        if ((this.getSquare(end).getXCoord() === this.getSquare(start).getXCoord() - 2) && (this.getSquare(end).getYCoord() === this.getSquare(start).getYCoord() - 1)) {
            return true;
        }
    
        return false; // If isn't a valid knight move
    }

    // Method that return an array with all the adjacent nodes of a given one
    knightAdjacentNodes(node) {
        const arr = [];
        for (let i = 0; i < this.knightsAdjMatrix[node].length; i += 1) {
            if (this.knightsAdjMatrix[node][i] === 1) {
                arr.push(i);
            }
        }
        return arr;
    }

    // Method that given two nodes, return an array with the shortest path between them
    knightShortestPath(start,end) {
        const path = []; // Array for my shortest path
        const queue = []; // We need a queue for the nodes that need to be visited

        this.resetBoard(); // Clean the chess board (all nodes unvisited and no parents)
        
        this.getSquare(start).visited = true; // Mark current node as visited
        queue.push(start); // Enqueue current node

        while (queue.length > 0) {
            let node = queue.shift(); // Remove the first node in the queue and get it
            
            if (node === end) { // If I have found the goal, put it in my path and return the path
                do {
                    path.unshift(node); // Add node to the beginning of path array
                    node = this.getSquare(node).getParent(); // Update our node to his parent
                } while (node !== start);
                path.unshift(node); // Add the start node to the beginning of path array

                return path; // Finally return the path array
            }

            const adjNodes = this.knightAdjacentNodes(node); // If I haven't found the goal, declare an array with all its adj nodes

            adjNodes.forEach(element => { // For each one of those nodes
                if (!this.getSquare(element).isVisited()) { // If I haven't visited it yet
                    this.getSquare(element).setVisited(true); // Visit it
                    this.getSquare(element).setParent(node); // Build the path to its parent
                    queue.push(element); // Put it in our queue to continue the search
                }
            });
        }

        return path;
    }
}