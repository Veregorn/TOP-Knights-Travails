import ChessBoard from "./chessboard";
import UIView from "./view";

// Class that represents a Controller in a MVC architecture
// It manages the logic of our App
export default class KnightsController {
    constructor() {
        this._chessBoard = new ChessBoard();
        this._ui = new UIView();
        // Define an adjacency matrix 64x64 where '1' represents that there is an edge from vertex 'i' to vertex 'j'
        // '0' represents  that there is no edge
        this._knightsAdjMatrix = new Array(64);

        // Fill the Knights Adjacency Matrix
        for (let i = 0; i < this._knightsAdjMatrix.length; i += 1) {
            this._knightsAdjMatrix[i] = new Array(64); // Each Array position has another array (2D array is a Matrix)
            for (let j = 0; j < this._knightsAdjMatrix[i].length; j += 1) {
                if (i === j) { // A node isn't connected with itself
                    this._knightsAdjMatrix[i][j] = 0;
                } else if (this.isValidKnightMove(i,j)) {
                    this._knightsAdjMatrix[i][j] = 1;
                } else {
                    this._knightsAdjMatrix[i][j] = 0;
                }
            }
        }
    }

    // Return 'true' if a knight can move from start to end squares
    isValidKnightMove(start,end) {
        if ((this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(1)) && (this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord + 2)) {
            return true;
        }
        if ((this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(1)) && (this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord - 2)) {
            return true;
        }
        if ((this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(2)) && (this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord + 1)) {
            return true;
        }
        if ((this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(2)) && (this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord - 1)) {
            return true;
        }
        if ((this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(-1)) && (this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord + 2)) {
            return true;
        }
        if ((this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(-1)) && (this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord - 2)) {
            return true;
        }
        if ((this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(-2)) && (this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord + 1)) {
            return true;
        }
        if ((this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(-2)) && (this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord - 1)) {
            return true;
        }
    
        return false; // If isn't a valid knight move
    }

    // Method that return an array with all the adjacent nodes of a given one
    knightAdjacentNodes(node) {
        const arr = [];
        for (let i = 0; i < this._knightsAdjMatrix[node].length; i += 1) {
            if (this._knightsAdjMatrix[node][i] === 1) {
                arr.push(i);
            }
        }
        return arr;
    }

    // Method that given two nodes, return an array with the shortest path between them
    knightShortestPath(start,end) {
        const path = []; // Array for my shortest path
        const queue = []; // We need a queue for the nodes that need to be visited

        this._chessBoard.resetBoard(); // Clean the chess board (all nodes unvisited and no parents)
        
        this._chessBoard.getSquare(start).visited = true; // Mark current node as visited
        queue.push(start); // Enqueue current node

        while (queue.length > 0) {
            let node = queue.shift(); // Remove the first node in the queue and get it
            
            if (node === end) { // If I have found the goal, put it in my path and return the path
                do {
                    path.unshift(node); // Add node to the beginning of path array
                    node = this._chessBoard.getSquare(node).parent; // Update our node to his parent
                } while (node !== start);
                path.unshift(node); // Add the start node to the beginning of path array

                return path; // Finally return the path array
            }

            const adjNodes = this.knightAdjacentNodes(node); // If I haven't found the goal, declare an array with all its adj nodes

            adjNodes.forEach(element => { // For each one of those nodes
                if (!this._chessBoard.getSquare(element).visited) { // If I haven't visited it yet
                    this._chessBoard.getSquare(element).visited = true; // Visit it
                    this._chessBoard.getSquare(element).parent = node; // Build the path to its parent
                    queue.push(element); // Put it in our queue to continue the search
                }
            });
        }

        return path;
    }
    
    // Method that translate path array from square numbers to coordinates A1..H8
    translatePath(path) {
        const outputArr = [];

        path.forEach(squareNum => {
            // We need to pass from one notation to another
            outputArr.push(this._chessBoard.getSquare(squareNum).xCoord + this._chessBoard.getSquare(squareNum).yCoord.toString());
        });

        return outputArr;
    }

    paintPath(path) {
        this._ui.displayPath(path);
    }
}