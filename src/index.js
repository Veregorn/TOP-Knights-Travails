// Map that implements a Chess Board
const chessBoard = new Map();

// Function that populates our chessBoard with 'clean' square objects
function initChessBoard() {
    let n = 0;

    for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 8; j += 1) {
            chessBoard.set(n, {xCoord: j, yCoord: i, visited: false, parent: null});
            // 'parent' attribute allows us to follow the path back to the start square when our tree paths is build
            n += 1;
        }
    }   
}

initChessBoard();

// Let's test it
/* for (let i = 0; i < 64; i += 1) {
    console.log(`Square number ${i} is: `);
    console.log(chessBoard.get(i));
} */

// If I only want to extract coord X
// console.log(chessBoard.get(63).xCoord);
// If I only want to extract coord Y
// console.log(chessBoard.get(63).yCoord);

// We need a function that based on coordinates, return true or false y a Knight can move to it
function knightCanMove(startSquareNum, endSquareNum) {
    if ((chessBoard.get(endSquareNum).xCoord === chessBoard.get(startSquareNum).xCoord + 1) && (chessBoard.get(endSquareNum).yCoord === chessBoard.get(startSquareNum).yCoord + 2)) {
        return true;
    }
    if ((chessBoard.get(endSquareNum).xCoord === chessBoard.get(startSquareNum).xCoord + 1) && (chessBoard.get(endSquareNum).yCoord === chessBoard.get(startSquareNum).yCoord - 2)) {
        return true;
    }
    if ((chessBoard.get(endSquareNum).xCoord === chessBoard.get(startSquareNum).xCoord + 2) && (chessBoard.get(endSquareNum).yCoord === chessBoard.get(startSquareNum).yCoord + 1)) {
        return true;
    }
    if ((chessBoard.get(endSquareNum).xCoord === chessBoard.get(startSquareNum).xCoord + 2) && (chessBoard.get(endSquareNum).yCoord === chessBoard.get(startSquareNum).yCoord - 1)) {
        return true;
    }
    if ((chessBoard.get(endSquareNum).xCoord === chessBoard.get(startSquareNum).xCoord - 1) && (chessBoard.get(endSquareNum).yCoord === chessBoard.get(startSquareNum).yCoord + 2)) {
        return true;
    }
    if ((chessBoard.get(endSquareNum).xCoord === chessBoard.get(startSquareNum).xCoord - 1) && (chessBoard.get(endSquareNum).yCoord === chessBoard.get(startSquareNum).yCoord - 2)) {
        return true;
    }
    if ((chessBoard.get(endSquareNum).xCoord === chessBoard.get(startSquareNum).xCoord - 2) && (chessBoard.get(endSquareNum).yCoord === chessBoard.get(startSquareNum).yCoord - 1)) {
        return true;
    }
    if ((chessBoard.get(endSquareNum).xCoord === chessBoard.get(startSquareNum).xCoord - 2) && (chessBoard.get(endSquareNum).yCoord === chessBoard.get(startSquareNum).yCoord + 1)) {
        return true;
    }

    return false; // If isn't a valid knight move
}

// Let's test 'knightCanMove' function
/* let start = 37;
let end = 20;
console.log(`A knight can move from square ${start} to square ${end}?`);
console.log(knightCanMove(start,end));
end = 28;
console.log(`A knight can move from square ${start} to square ${end}?`);
console.log(knightCanMove(start,end));
start = 22;
console.log(`A knight can move from square ${start} to square ${end}?`);
console.log(knightCanMove(start,end)); */

// Now we need to define an adjacency matrix 64x64 where '1' represents that there is an edge from vertex 'i' to vertex 'j'
// '0' represents  that there is no edge
const chessBoardGraph = new Array(64);

for (let i = 0; i < chessBoardGraph.length; i += 1) {
    chessBoardGraph[i] = new Array(64); // Each Array position has another array (2D array is a Matrix)
    for (let j = 0; j < chessBoardGraph[i].length; j += 1) {
        if (i === j) { // A node isn't connected with itself
            chessBoardGraph[i][j] = 0;
        } else if (knightCanMove(i,j)) {
            chessBoardGraph[i][j] = 1;
        } else {
            chessBoardGraph[i][j] = 0;
        }
    }
}

// Let's test some adjacency matrix values
/* start = 0;
end = 17;
console.log(`A knight can move from square ${start} to square ${end}?`);
console.log(chessBoardGraph[start][end]);
end = 9;
console.log(`A knight can move from square ${start} to square ${end}?`);
console.log(chessBoardGraph[start][end]);
start = 19;
console.log(`A knight can move from square ${start} to square ${end}?`);
console.log(chessBoardGraph[start][end]); */

// Function that return an array with all the adjacent nodes of a given one
function adjacentNodes(node) {
    const arr = [];
    for (let i = 0; i < chessBoardGraph[node].length; i += 1) {
        if (chessBoardGraph[node][i] === 1) {
            arr.push(i);
        }
    }
    return arr;
}

// Let's try 'adjacentNodes' function
/* let node = 36;
console.log(`These are the nodes adjacent to the node ${node}: `);
console.log(adjacentNodes(node));
node = 63;
console.log(`These are the nodes adjacent to the node ${node}: `);
console.log(adjacentNodes(node)); */

// Function that given two nodes, return an array with the shortest path between them
function shortestPath(start,end) {
    const path = []; // Array for my shortest path
    const queue = []; // We need a queue for the nodes that need to be visited

    initChessBoard(); // Clean the chess board (all nodes unvisited and no parents)
    
    chessBoard.get(start).visited = true; // Mark current node as visited
    queue.push(start); // Enqueue current node

    while (queue.length > 0) {
        let node = queue.shift(); // Remove the first node in the queue and get it
        
        if (node === end) { // If I have found the goal, put it in my path and return the path
            do {
                path.unshift(node); // Add node to the beginning of path array
                node = chessBoard.get(node).parent; // Update our node to his parent
            } while (node !== start);
            path.unshift(node); // Add the start node to the beginning of path array

            return path; // Finally return the path array
        }

        const adjNodes = adjacentNodes(node); // If I haven't found the goal, declare an array with all its adj nodes

        adjNodes.forEach(element => { // For each one of those nodes
            if (!chessBoard.get(element).visited) { // If I haven't visited it yet
                chessBoard.get(element).visited = true; // Visit it
                chessBoard.get(element).parent = node; // Build the path to its parent
                queue.push(element); // Put it in our queue to continue the search
            }
        });
    }

    return path;
}

// Let's try 'shortestPath' function
let start = 49;
let end = 37;
console.log(`The shortest path between square ${start} and square ${end} is:`);
console.log(shortestPath(start,end));
start = 12;
end = 63;
console.log(`The shortest path between square ${start} and square ${end} is:`);
console.log(shortestPath(start,end));
start = 0;
end = 1;
console.log(`The shortest path between square ${start} and square ${end} is:`);
console.log(shortestPath(start,end));