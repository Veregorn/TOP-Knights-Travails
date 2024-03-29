import Square from "./square";

// Class that represents a Chess board game
export default class ChessBoard {
    
    constructor() {
        // Define a map that translate square numbers into Square class objects
        this._board = new Map();

        // Fill the board with Square class entities
        let n = 0;

        for (let i = 0; i < 8; i += 1) {
            for (let j = 0; j < 8; j += 1) {
                // (j + 10).toString(36) converts from 0-9 to A-H
                this._board.set(n, new Square((j + 10).toString(36).toUpperCase(),i + 1));
                n += 1;
            }
        }
    }

    get board() {
        return this._board;
    }

    // Put all the chess board squares as not visited and without parents
    resetBoard() {
        // eslint-disable-next-line no-restricted-syntax
        for (const square of this._board.values()) {
            square.clean();
        }
    }

    // Return a Square class object for the number passed as argument
    getSquare(num) {
        return this._board.get(num);
    }

    // Return Map key from a known value
    // eslint-disable-next-line consistent-return
    getSquareId(coord) {

        // Iterate the Map until find coord
        // eslint-disable-next-line no-restricted-syntax
        for (const [key,value] of this._board) {
            if (value.stringifiedCoords === coord) {
                return key;
            }
        }

    }
}