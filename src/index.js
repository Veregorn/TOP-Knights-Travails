import "./styles.css";
import KnightsController from "./controller";

// Let's declare an object of class 'ChessBoard'
const myKnightsController = new KnightsController();

// Let's try 'shortestPath' method
let start = 49;
let end = 37;
const path = myKnightsController.translatePath(myKnightsController.knightShortestPath(start,end));
myKnightsController.paintPath(path);
start = 12;
end = 63;
console.log(`The shortest path between square ${start} and square ${end} is:`);
console.log(myKnightsController.translatePath(myKnightsController.knightShortestPath(start,end)));
start = 0;
end = 1;
console.log(`The shortest path between square ${start} and square ${end} is:`);
console.log(myKnightsController.translatePath(myKnightsController.knightShortestPath(start,end)));