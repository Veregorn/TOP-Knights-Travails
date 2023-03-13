import ChessBoard from "./chessboard";

// Let's declare an object of class 'ChessBoard'
const myChessBoard = new ChessBoard();

// Let's try 'shortestPath' method
let start = 49;
let end = 37;
console.log(`The shortest path between square ${start} and square ${end} is:`);
console.log(myChessBoard.knightShortestPath(start,end));
start = 12;
end = 63;
console.log(`The shortest path between square ${start} and square ${end} is:`);
console.log(myChessBoard.knightShortestPath(start,end));
start = 0;
end = 1;
console.log(`The shortest path between square ${start} and square ${end} is:`);
console.log(myChessBoard.knightShortestPath(start,end));