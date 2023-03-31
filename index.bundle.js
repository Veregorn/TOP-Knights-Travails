"use strict";
(self["webpackChunktop_knights_travails"] = self["webpackChunktop_knights_travails"] || []).push([["index"],{

/***/ "./src/chessboard.js":
/*!***************************!*\
  !*** ./src/chessboard.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChessBoard)
/* harmony export */ });
/* harmony import */ var _square__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./square */ "./src/square.js");


// Class that represents a Chess board game
class ChessBoard {
  constructor() {
    // Define a map that translate square numbers into Square class objects
    this._board = new Map();

    // Fill the board with Square class entities
    let n = 0;
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        // (j + 10).toString(36) converts from 0-9 to A-H
        this._board.set(n, new _square__WEBPACK_IMPORTED_MODULE_0__["default"]((j + 10).toString(36).toUpperCase(), i + 1));
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
    for (const [key, value] of this._board) {
      if (value.stringifiedCoords === coord) {
        return key;
      }
    }
  }
}

/***/ }),

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ KnightsController)
/* harmony export */ });
/* harmony import */ var _chessboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chessboard */ "./src/chessboard.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



// Class that represents a Controller in a MVC architecture
// It manages the logic of our App
class KnightsController {
  constructor() {
    // Handler for the event 'Calc Path'
    _defineProperty(this, "handleCalcPath", (start, end) => {
      // Translate start and end from A1 format to numeric ID format
      const path = this.knightShortestPath(this._chessBoard.getSquareId(start), this._chessBoard.getSquareId(end));
      this.paintPath(path);
    });
    this._chessBoard = new _chessboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this._ui = new _view__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this._ui.displayBoard(this._chessBoard.board);
    // Define an adjacency matrix 64x64 where '1' represents that there is an edge from vertex 'i' to vertex 'j'
    // '0' represents  that there is no edge
    this._knightsAdjMatrix = new Array(64);

    // Fill the Knights Adjacency Matrix
    for (let i = 0; i < this._knightsAdjMatrix.length; i += 1) {
      this._knightsAdjMatrix[i] = new Array(64); // Each Array position has another array (2D array is a Matrix)
      for (let j = 0; j < this._knightsAdjMatrix[i].length; j += 1) {
        if (i === j) {
          // A node isn't connected with itself
          this._knightsAdjMatrix[i][j] = 0;
        } else if (this.isValidKnightMove(i, j)) {
          this._knightsAdjMatrix[i][j] = 1;
        } else {
          this._knightsAdjMatrix[i][j] = 0;
        }
      }
    }

    // Bindings to handle event listeners from the view
    this._ui.bindCalcPath(this.handleCalcPath);
  }

  // Return 'true' if a knight can move from start to end squares
  isValidKnightMove(start, end) {
    if (this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(1) && this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord + 2) {
      return true;
    }
    if (this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(1) && this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord - 2) {
      return true;
    }
    if (this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(2) && this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord + 1) {
      return true;
    }
    if (this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(2) && this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord - 1) {
      return true;
    }
    if (this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(-1) && this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord + 2) {
      return true;
    }
    if (this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(-1) && this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord - 2) {
      return true;
    }
    if (this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(-2) && this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord + 1) {
      return true;
    }
    if (this._chessBoard.getSquare(end).xCoord === this._chessBoard.getSquare(start).incDecXcoord(-2) && this._chessBoard.getSquare(end).yCoord === this._chessBoard.getSquare(start).yCoord - 1) {
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
  knightShortestPath(start, end) {
    const path = []; // Array for my shortest path
    const queue = []; // We need a queue for the nodes that need to be visited

    this._chessBoard.resetBoard(); // Clean the chess board (all nodes unvisited and no parents)

    this._chessBoard.getSquare(start).visited = true; // Mark current node as visited
    queue.push(start); // Enqueue current node

    while (queue.length > 0) {
      let node = queue.shift(); // Remove the first node in the queue and get it

      if (node === end) {
        // If I have found the goal, put it in my path and return the path
        do {
          path.unshift(node); // Add node to the beginning of path array
          node = this._chessBoard.getSquare(node).parent; // Update our node to his parent
        } while (node !== start);
        path.unshift(node); // Add the start node to the beginning of path array

        return path; // Finally return the path array
      }

      const adjNodes = this.knightAdjacentNodes(node); // If I haven't found the goal, declare an array with all its adj nodes

      adjNodes.forEach(element => {
        // For each one of those nodes
        if (!this._chessBoard.getSquare(element).visited) {
          // If I haven't visited it yet
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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ "./src/controller.js");



// Let's declare an object of class 'ChessBoard'
const myKnightsController = new _controller__WEBPACK_IMPORTED_MODULE_1__["default"]();

/***/ }),

/***/ "./src/square.js":
/*!***********************!*\
  !*** ./src/square.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Square)
/* harmony export */ });
// Class that represents a Square of a Chess board game
class Square {
  constructor(xCoord, yCoord) {
    let visited = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    this._xCoord = xCoord; // From A to H
    this._yCoord = yCoord; // From 1 to 8
    this._visited = visited; // Used to avoid infinite loops in a graph
    this._parent = parent; // The breadcrumb to follow that path in 'shortestPath' method
  }

  get xCoord() {
    return this._xCoord;
  }
  get numericXcoord() {
    return parseInt(this._xCoord, 36) - 9;
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
  get stringifiedCoords() {
    return this.xCoord + this.yCoord.toString();
  }

  // This method sets 'visited' and 'parent' attributes to 'false' and 'null'
  // This is a Square Reset
  clean() {
    this._parent = null;
    this._visited = false;
  }

  // This method resolves arithmetic operations (+-) with coord X letters
  incDecXcoord(num) {
    let numberedLetter = parseInt(this._xCoord, 36);
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

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UIView)
/* harmony export */ });
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
// Class that builds a user interface for our App
class UIView {
  constructor() {
    // Regular Expression for valid Square syntax
    this.squareRegExp = /[A-H][1-8]/;

    // Create an HTML skeleton
    this.container = this.createElement("div", "container");
    document.body.appendChild(this.container);
    this.controls = this.createElement("div", "controls");
    this.board = this.createElement("div", "board");
    this.container.appendChild(this.controls);
    this.container.appendChild(this.board);

    // Fill 'Controls' side
    this.title = this.createElement("div", "title");
    this.form = this.createElement("div", "form");
    this.buttons = this.createElement("div", "buttons");
    this.controls.appendChild(this.title);
    this.controls.appendChild(this.form);
    this.controls.appendChild(this.buttons);
    this.h1 = this.createElement("h1");
    this.h1.textContent = "Knights Travails";
    this.title.appendChild(this.h1);
    this.start = this.createElement("div", "start", "form-field");
    this.startSpan = this.createElement("span", "startSpan", "error");
    this.startSpan.setAttribute("aria-live", "polite");
    this.end = this.createElement("div", "end", "form-field");
    this.endSpan = this.createElement("span", "endSpan", "error");
    this.endSpan.setAttribute("aria-live", "polite");
    this.form.appendChild(this.start);
    this.form.appendChild(this.startSpan);
    this.form.appendChild(this.end);
    this.form.appendChild(this.endSpan);
    this.startLabel = this.createElement("label");
    this.startLabel.setAttribute("for", "startPos");
    this.startLabel.textContent = "Start position:";
    this.startInput = this.createElement("input", "startPos");
    this.startInput.setAttribute("name", "startPos");
    this.startInput.setAttribute("type", "text");
    this.startInput.setAttribute("required", "true");
    this.startInput.setAttribute("minLength", "2");
    this.startInput.setAttribute("maxLength", "2");
    this.startInput.setAttribute("size", "2");
    this.startInput.setAttribute("placeholder", "A1");
    this.start.appendChild(this.startLabel);
    this.start.appendChild(this.startInput);
    this.endLabel = this.createElement("label");
    this.endLabel.setAttribute("for", "endPos");
    this.endLabel.textContent = "End position:";
    this.endInput = this.createElement("input", "endPos");
    this.endInput.setAttribute("name", "endPos");
    this.endInput.setAttribute("type", "text");
    this.endInput.setAttribute("required", "true");
    this.endInput.setAttribute("minLength", "2");
    this.endInput.setAttribute("maxLength", "2");
    this.endInput.setAttribute("size", "2");
    this.endInput.setAttribute("placeholder", "H8");
    this.end.appendChild(this.endLabel);
    this.end.appendChild(this.endInput);
    this.pathButton = this.createElement("button", "pathButton");
    this.pathButton.setAttribute("type", "button");
    this.pathButton.setAttribute("disabled", "true");
    this.pathButton.textContent = "Calc Path";
    this.clearButton = this.createElement("button", "clearButton");
    this.clearButton.setAttribute("type", "button");
    this.clearButton.textContent = "Clear";
    this.buttons.appendChild(this.pathButton);
    this.buttons.appendChild(this.clearButton);

    // Fill Board side
    this.topBoard = this.createElement("div", "topBoard");
    this.bottomBoard = this.createElement("div", "bottomBoard");
    this.board.appendChild(this.topBoard);
    this.board.appendChild(this.bottomBoard);
    this.yHeader = this.createElement("div", "yHeader");
    this.chessBoard = this.createElement("div", "chessBoard");
    this.topBoard.appendChild(this.yHeader);
    this.topBoard.appendChild(this.chessBoard);
    this.xHeader = this.createElement("div", "xHeader");
    this.bottomBoard.appendChild(this.xHeader);
    for (let i = 1; i < 9; i += 1) {
      const head = this.createElement("div", null, "head");
      head.classList.add("square");
      head.textContent = i;
      this.yHeader.appendChild(head);
    }

    // Append an empty 'div' to 'xHeader' div
    const emptyHeadSquare = this.createElement("div", null, "head");
    emptyHeadSquare.classList.add("square");
    this.xHeader.appendChild(emptyHeadSquare);
    for (let i = 10; i < 18; i += 1) {
      const head = this.createElement("div", null, "head");
      head.classList.add("square");
      head.textContent = i.toString(36).toUpperCase();
      this.xHeader.appendChild(head);
    }

    // Declare Event Listeners for inputs and buttons
    this.startInput.addEventListener("keyup", () => {
      // When user leaves the input, we check if the field is valid
      if (this.startInput.validity.valid && this.checkPattern(this.startInput)) {
        // In case there is an error message visible and the field is valid yet, remove the error message
        this.startSpan.textContent = "";
        this.startInput.classList.remove("invalid");

        // Now we need to place the knight
        const square = document.getElementsByName(this.startInput.value);
        this.clearSquares();
        square[0].innerHTML = "&#9822;";

        // If endInput is valid too, then we need to enable 'Calc Path' button
        if (this.endInput.validity.valid && this.checkPattern(this.endInput)) {
          this.pathButton.removeAttribute("disabled");
        }
        ;
      } else {
        this.showError(this.startInput);
      }
    });
    this.endInput.addEventListener("keyup", () => {
      // When user leaves the input, we check if the field is valid
      if (this.endInput.validity.valid && this.checkPattern(this.endInput)) {
        // In case there is an error message visible and the field is valid yet, remove the error message
        this.endSpan.textContent = "";
        this.endInput.classList.remove("invalid");

        // If startInput is valid too, then we need to enable 'Calc Path' button
        if (this.startInput.validity.valid && this.checkPattern(this.startInput)) {
          this.pathButton.removeAttribute("disabled");
        }
        ;
      } else {
        this.showError(this.endInput);
      }
    });

    // When user press 'Clear' button, the board resets to its original state and the same for inputs
    this.clearButton.addEventListener("click", () => {
      this.clearSquares();
      this.startInput.value = "";
      this.endInput.value = "";
      this.startSpan.textContent = "";
      this.endSpan.textContent = "";
    });
  }

  // Create an element with optional ids and class
  createElement(tag, id, className) {
    const element = document.createElement(tag);
    if (id) {
      element.setAttribute("id", id);
    }
    if (className) {
      element.classList.add(className);
    }
    return element;
  }
  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }
  displayBoard(board) {
    for (const [num, square] of board) {
      const div = this.createElement("div", num.toString(), "square");
      div.setAttribute("name", square.xCoord + square.yCoord.toString());

      // Add a class 'light' ot 'dark' if you want the square painted green
      // or white. modulus operator helps with that
      if ((square.numericXcoord + square.yCoord) % 2 === 0) {
        div.classList.add("dark");
      } else {
        div.classList.add("light");
      }

      // Now append the element to element 'chessBoard'
      this.chessBoard.appendChild(div);
    }
  }
  checkPattern(input) {
    return this.squareRegExp.test(input.value);
  }
  showError(e) {
    // Let's return a bool with the status of the inputs to be used when 'Calc Path' button is pressed
    let validInputs = true;
    if (e === this.startInput) {
      this.startInput.classList.add("invalid");
      if (this.startInput.validity.valueMissing) {
        this.startSpan.textContent = "You need to enter an start square for the Knight";
      } else if (!this.checkPattern(this.startInput)) {
        this.startSpan.textContent = "Entered value needs to be a valid Chess Board Square";
      }
      validInputs = false;
    }
    if (e === this.endInput) {
      this.endInput.classList.add("invalid");
      if (this.endInput.validity.valueMissing) {
        this.endSpan.textContent = "You need to enter an end square for the Knight";
      } else if (!this.checkPattern(this.endInput)) {
        this.endSpan.textContent = "Entered value needs to be a valid Chess Board Square";
      }
      validInputs = false;
    }
    return validInputs;
  }

  // eslint-disable-next-line class-methods-use-this
  clearSquares() {
    const darkSquares = document.querySelectorAll(".dark");
    for (let i = 0; i < darkSquares.length; i += 1) {
      darkSquares[i].textContent = "";
      darkSquares[i].classList.remove("final");
    }
    const lightSquares = document.querySelectorAll(".light");
    for (let i = 0; i < lightSquares.length; i += 1) {
      lightSquares[i].textContent = "";
      lightSquares[i].classList.remove("final");
    }
  }

  // Called when button 'Calc Path' is pressed. Receives an array with the squares the knights
  // have to move between
  // eslint-disable-next-line class-methods-use-this
  displayPath(path) {
    // We place a black knight on start square
    const firstDomElement = document.getElementById(path[0]);
    firstDomElement.innerHTML = "&#9822;";
    for (let i = 1; i < path.length - 1; i += 1) {
      const domElement = document.getElementById(path[i]);
      domElement.textContent = i;
    }

    // We place a red knight on end square
    const lastDomElement = document.getElementById(path[path.length - 1]);
    lastDomElement.innerHTML = path.length - 1;
    lastDomElement.classList.add("final");
  }

  // We need an Event Listener for 'Calc Path' button
  bindCalcPath(handler) {
    this.pathButton.addEventListener("click", () => {
      // This handler needs to be a method in the controller
      // See Controller constructor
      handler(this.startInput.value, this.endInput.value);
    });
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Pacifico&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/* MY OWN STYLES FROM HERE */\n\n*, *:before, *:after {\n    box-sizing: border-box;\n}\n\nbody {\n    color: #F2E9E1;\n    font-family: 'Roboto', sans-serif;\n    font-size: 18px;\n}\n\n#container {\n    height: 100vh; /* Full screen */\n    width: 100vw;\n    display: flex;\n    background-color: #1C140D;\n}\n\n#controls {\n    width: 45%;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-around;\n    align-items: center;\n}\n\nh1 {\n    font-size: 4em;\n    font-family: 'Pacifico', cursive;\n}\n\n#form {\n    font-size: 2em;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    height: 20%;\n    width: 70%;\n    align-items: center;\n}\n\n.form-field {\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n    justify-content: space-around;\n}\n\nlabel {\n    display: flex;\n    align-items: center;\n}\n\ninput[type=text] {\n    padding: 10px;\n    margin-left: 20px;\n    background-color: #1C140D;\n    color: #F2E9E1;\n    border: 0;\n    border-top: 2px solid #CBE86B;\n    border-bottom: 2px solid #CBE86B;\n    font-size: 0.7em;\n}\n\ninput[type=text]:focus {\n    outline: none;\n}\n\n.error {\n    color: #ff0000;\n    font-size: 14px;\n}\n\ninput[type=text]:invalid, .invalid {\n    border-top: 2px solid #ff0000 !important;\n    border-bottom: 2px solid #ff0000 !important;\n}\n\n#buttons {\n    display: flex;\n    justify-content: space-between;\n    width: 50%;\n}\n\nbutton {\n    background-color: #CBE86B;\n    padding: 0.7em 1.5em;\n    font-size: 1em;\n    border: 3px solid #CBE86B;\n    border-radius: 10px;\n    cursor: pointer;\n}\n\nbutton:hover {\n    opacity: 0.8;\n}\n\n#pathButton:disabled {\n    opacity: 0.5;\n    color: #1C140D;\n}\n\n#board {\n    width: 55%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}\n\n#topBoard {\n    display: flex;\n}\n\n#yHeader {\n    display: flex;\n    flex-direction: column-reverse;\n}\n\n#chessBoard {\n    width: 640px;\n    height: 640px;\n    background-color: #F2E9E1;\n    color: #1C140D;\n    display: flex;\n    flex-wrap: wrap-reverse;\n}\n\n#chessBoard > div {\n    display: flex;\n    font-size: 60px;\n}\n\n#bottomBoard {\n    display: flex;\n}\n\n#xHeader {\n    display: flex;\n}\n\n.head {\n    background-color: #1C140D;\n    color: #F2E9E1;\n}\n\n.square {\n    width: 80px;\n    height: 80px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.dark {\n    background-color: #CBE86B;\n}\n\n.final {\n    color: #ff0000;\n}", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;;;CAGC;;AAED;;;;;;;;;;;;;CAaC,SAAS;CACT,UAAU;CACV,SAAS;CACT,eAAe;CACf,aAAa;CACb,wBAAwB;AACzB;AACA,gDAAgD;AAChD;;CAEC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,gBAAgB;AACjB;AACA;CACC,YAAY;AACb;AACA;;CAEC,WAAW;CACX,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,iBAAiB;AAClB;;AAEA,4BAA4B;;AAI5B;IACI,sBAAsB;AAC1B;;AAEA;IACI,cAAc;IACd,iCAAiC;IACjC,eAAe;AACnB;;AAEA;IACI,aAAa,EAAE,gBAAgB;IAC/B,YAAY;IACZ,aAAa;IACb,yBAAyB;AAC7B;;AAEA;IACI,UAAU;IACV,aAAa;IACb,sBAAsB;IACtB,6BAA6B;IAC7B,mBAAmB;AACvB;;AAEA;IACI,cAAc;IACd,gCAAgC;AACpC;;AAEA;IACI,cAAc;IACd,aAAa;IACb,sBAAsB;IACtB,8BAA8B;IAC9B,WAAW;IACX,UAAU;IACV,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,WAAW;IACX,6BAA6B;AACjC;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,iBAAiB;IACjB,yBAAyB;IACzB,cAAc;IACd,SAAS;IACT,6BAA6B;IAC7B,gCAAgC;IAChC,gBAAgB;AACpB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,cAAc;IACd,eAAe;AACnB;;AAEA;IACI,wCAAwC;IACxC,2CAA2C;AAC/C;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,UAAU;AACd;;AAEA;IACI,yBAAyB;IACzB,oBAAoB;IACpB,cAAc;IACd,yBAAyB;IACzB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,YAAY;IACZ,cAAc;AAClB;;AAEA;IACI,UAAU;IACV,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;AAC3B;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,8BAA8B;AAClC;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,yBAAyB;IACzB,cAAc;IACd,aAAa;IACb,uBAAuB;AAC3B;;AAEA;IACI,aAAa;IACb,eAAe;AACnB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,yBAAyB;IACzB,cAAc;AAClB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,uBAAuB;AAC3B;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,cAAc;AAClB","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/* MY OWN STYLES FROM HERE */\n@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\n\n*, *:before, *:after {\n    box-sizing: border-box;\n}\n\nbody {\n    color: #F2E9E1;\n    font-family: 'Roboto', sans-serif;\n    font-size: 18px;\n}\n\n#container {\n    height: 100vh; /* Full screen */\n    width: 100vw;\n    display: flex;\n    background-color: #1C140D;\n}\n\n#controls {\n    width: 45%;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-around;\n    align-items: center;\n}\n\nh1 {\n    font-size: 4em;\n    font-family: 'Pacifico', cursive;\n}\n\n#form {\n    font-size: 2em;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    height: 20%;\n    width: 70%;\n    align-items: center;\n}\n\n.form-field {\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n    justify-content: space-around;\n}\n\nlabel {\n    display: flex;\n    align-items: center;\n}\n\ninput[type=text] {\n    padding: 10px;\n    margin-left: 20px;\n    background-color: #1C140D;\n    color: #F2E9E1;\n    border: 0;\n    border-top: 2px solid #CBE86B;\n    border-bottom: 2px solid #CBE86B;\n    font-size: 0.7em;\n}\n\ninput[type=text]:focus {\n    outline: none;\n}\n\n.error {\n    color: #ff0000;\n    font-size: 14px;\n}\n\ninput[type=text]:invalid, .invalid {\n    border-top: 2px solid #ff0000 !important;\n    border-bottom: 2px solid #ff0000 !important;\n}\n\n#buttons {\n    display: flex;\n    justify-content: space-between;\n    width: 50%;\n}\n\nbutton {\n    background-color: #CBE86B;\n    padding: 0.7em 1.5em;\n    font-size: 1em;\n    border: 3px solid #CBE86B;\n    border-radius: 10px;\n    cursor: pointer;\n}\n\nbutton:hover {\n    opacity: 0.8;\n}\n\n#pathButton:disabled {\n    opacity: 0.5;\n    color: #1C140D;\n}\n\n#board {\n    width: 55%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}\n\n#topBoard {\n    display: flex;\n}\n\n#yHeader {\n    display: flex;\n    flex-direction: column-reverse;\n}\n\n#chessBoard {\n    width: 640px;\n    height: 640px;\n    background-color: #F2E9E1;\n    color: #1C140D;\n    display: flex;\n    flex-wrap: wrap-reverse;\n}\n\n#chessBoard > div {\n    display: flex;\n    font-size: 60px;\n}\n\n#bottomBoard {\n    display: flex;\n}\n\n#xHeader {\n    display: flex;\n}\n\n.head {\n    background-color: #1C140D;\n    color: #F2E9E1;\n}\n\n.square {\n    width: 80px;\n    height: 80px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.dark {\n    background-color: #CBE86B;\n}\n\n.final {\n    color: #ff0000;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLWtuaWdodHMtdHJhdmFpbHMvLi9zcmMvY2hlc3Nib2FyZC5qcyIsIndlYnBhY2s6Ly90b3Ata25pZ2h0cy10cmF2YWlscy8uL3NyYy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvcC1rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvcC1rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL3NxdWFyZS5qcyIsIndlYnBhY2s6Ly90b3Ata25pZ2h0cy10cmF2YWlscy8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL3RvcC1rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vdG9wLWtuaWdodHMtdHJhdmFpbHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvcC1rbmlnaHRzLXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9wLWtuaWdodHMtdHJhdmFpbHMvLi9zcmMvc3R5bGVzLmNzcz80NGIyIiwid2VicGFjazovL3RvcC1rbmlnaHRzLXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RvcC1rbmlnaHRzLXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90b3Ata25pZ2h0cy10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b3Ata25pZ2h0cy10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90b3Ata25pZ2h0cy10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RvcC1rbmlnaHRzLXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi9zcXVhcmVcIjtcblxuLy8gQ2xhc3MgdGhhdCByZXByZXNlbnRzIGEgQ2hlc3MgYm9hcmQgZ2FtZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hlc3NCb2FyZCB7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIERlZmluZSBhIG1hcCB0aGF0IHRyYW5zbGF0ZSBzcXVhcmUgbnVtYmVycyBpbnRvIFNxdWFyZSBjbGFzcyBvYmplY3RzXG4gICAgICAgIHRoaXMuX2JvYXJkID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIC8vIEZpbGwgdGhlIGJvYXJkIHdpdGggU3F1YXJlIGNsYXNzIGVudGl0aWVzXG4gICAgICAgIGxldCBuID0gMDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICAvLyAoaiArIDEwKS50b1N0cmluZygzNikgY29udmVydHMgZnJvbSAwLTkgdG8gQS1IXG4gICAgICAgICAgICAgICAgdGhpcy5fYm9hcmQuc2V0KG4sIG5ldyBTcXVhcmUoKGogKyAxMCkudG9TdHJpbmcoMzYpLnRvVXBwZXJDYXNlKCksaSArIDEpKTtcbiAgICAgICAgICAgICAgICBuICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgYm9hcmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib2FyZDtcbiAgICB9XG5cbiAgICAvLyBQdXQgYWxsIHRoZSBjaGVzcyBib2FyZCBzcXVhcmVzIGFzIG5vdCB2aXNpdGVkIGFuZCB3aXRob3V0IHBhcmVudHNcbiAgICByZXNldEJvYXJkKCkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgICAgZm9yIChjb25zdCBzcXVhcmUgb2YgdGhpcy5fYm9hcmQudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGVhbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGEgU3F1YXJlIGNsYXNzIG9iamVjdCBmb3IgdGhlIG51bWJlciBwYXNzZWQgYXMgYXJndW1lbnRcbiAgICBnZXRTcXVhcmUobnVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib2FyZC5nZXQobnVtKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gTWFwIGtleSBmcm9tIGEga25vd24gdmFsdWVcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgICBnZXRTcXVhcmVJZChjb29yZCkge1xuXG4gICAgICAgIC8vIEl0ZXJhdGUgdGhlIE1hcCB1bnRpbCBmaW5kIGNvb3JkXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgICBmb3IgKGNvbnN0IFtrZXksdmFsdWVdIG9mIHRoaXMuX2JvYXJkKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUuc3RyaW5naWZpZWRDb29yZHMgPT09IGNvb3JkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufSIsImltcG9ydCBDaGVzc0JvYXJkIGZyb20gXCIuL2NoZXNzYm9hcmRcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4vdmlld1wiO1xuXG4vLyBDbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBDb250cm9sbGVyIGluIGEgTVZDIGFyY2hpdGVjdHVyZVxuLy8gSXQgbWFuYWdlcyB0aGUgbG9naWMgb2Ygb3VyIEFwcFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS25pZ2h0c0NvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jaGVzc0JvYXJkID0gbmV3IENoZXNzQm9hcmQoKTtcbiAgICAgICAgdGhpcy5fdWkgPSBuZXcgVUlWaWV3KCk7XG4gICAgICAgIHRoaXMuX3VpLmRpc3BsYXlCb2FyZCh0aGlzLl9jaGVzc0JvYXJkLmJvYXJkKTtcbiAgICAgICAgLy8gRGVmaW5lIGFuIGFkamFjZW5jeSBtYXRyaXggNjR4NjQgd2hlcmUgJzEnIHJlcHJlc2VudHMgdGhhdCB0aGVyZSBpcyBhbiBlZGdlIGZyb20gdmVydGV4ICdpJyB0byB2ZXJ0ZXggJ2onXG4gICAgICAgIC8vICcwJyByZXByZXNlbnRzICB0aGF0IHRoZXJlIGlzIG5vIGVkZ2VcbiAgICAgICAgdGhpcy5fa25pZ2h0c0Fkak1hdHJpeCA9IG5ldyBBcnJheSg2NCk7XG5cbiAgICAgICAgLy8gRmlsbCB0aGUgS25pZ2h0cyBBZGphY2VuY3kgTWF0cml4XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fa25pZ2h0c0Fkak1hdHJpeC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5fa25pZ2h0c0Fkak1hdHJpeFtpXSA9IG5ldyBBcnJheSg2NCk7IC8vIEVhY2ggQXJyYXkgcG9zaXRpb24gaGFzIGFub3RoZXIgYXJyYXkgKDJEIGFycmF5IGlzIGEgTWF0cml4KVxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9rbmlnaHRzQWRqTWF0cml4W2ldLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IGopIHsgLy8gQSBub2RlIGlzbid0IGNvbm5lY3RlZCB3aXRoIGl0c2VsZlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rbmlnaHRzQWRqTWF0cml4W2ldW2pdID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNWYWxpZEtuaWdodE1vdmUoaSxqKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rbmlnaHRzQWRqTWF0cml4W2ldW2pdID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rbmlnaHRzQWRqTWF0cml4W2ldW2pdID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCaW5kaW5ncyB0byBoYW5kbGUgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIHZpZXdcbiAgICAgICAgdGhpcy5fdWkuYmluZENhbGNQYXRoKHRoaXMuaGFuZGxlQ2FsY1BhdGgpO1xuICAgIH1cblxuICAgIC8vIFJldHVybiAndHJ1ZScgaWYgYSBrbmlnaHQgY2FuIG1vdmUgZnJvbSBzdGFydCB0byBlbmQgc3F1YXJlc1xuICAgIGlzVmFsaWRLbmlnaHRNb3ZlKHN0YXJ0LGVuZCkge1xuICAgICAgICBpZiAoKHRoaXMuX2NoZXNzQm9hcmQuZ2V0U3F1YXJlKGVuZCkueENvb3JkID09PSB0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShzdGFydCkuaW5jRGVjWGNvb3JkKDEpKSAmJiAodGhpcy5fY2hlc3NCb2FyZC5nZXRTcXVhcmUoZW5kKS55Q29vcmQgPT09IHRoaXMuX2NoZXNzQm9hcmQuZ2V0U3F1YXJlKHN0YXJ0KS55Q29vcmQgKyAyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShlbmQpLnhDb29yZCA9PT0gdGhpcy5fY2hlc3NCb2FyZC5nZXRTcXVhcmUoc3RhcnQpLmluY0RlY1hjb29yZCgxKSkgJiYgKHRoaXMuX2NoZXNzQm9hcmQuZ2V0U3F1YXJlKGVuZCkueUNvb3JkID09PSB0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShzdGFydCkueUNvb3JkIC0gMikpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodGhpcy5fY2hlc3NCb2FyZC5nZXRTcXVhcmUoZW5kKS54Q29vcmQgPT09IHRoaXMuX2NoZXNzQm9hcmQuZ2V0U3F1YXJlKHN0YXJ0KS5pbmNEZWNYY29vcmQoMikpICYmICh0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShlbmQpLnlDb29yZCA9PT0gdGhpcy5fY2hlc3NCb2FyZC5nZXRTcXVhcmUoc3RhcnQpLnlDb29yZCArIDEpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHRoaXMuX2NoZXNzQm9hcmQuZ2V0U3F1YXJlKGVuZCkueENvb3JkID09PSB0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShzdGFydCkuaW5jRGVjWGNvb3JkKDIpKSAmJiAodGhpcy5fY2hlc3NCb2FyZC5nZXRTcXVhcmUoZW5kKS55Q29vcmQgPT09IHRoaXMuX2NoZXNzQm9hcmQuZ2V0U3F1YXJlKHN0YXJ0KS55Q29vcmQgLSAxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShlbmQpLnhDb29yZCA9PT0gdGhpcy5fY2hlc3NCb2FyZC5nZXRTcXVhcmUoc3RhcnQpLmluY0RlY1hjb29yZCgtMSkpICYmICh0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShlbmQpLnlDb29yZCA9PT0gdGhpcy5fY2hlc3NCb2FyZC5nZXRTcXVhcmUoc3RhcnQpLnlDb29yZCArIDIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHRoaXMuX2NoZXNzQm9hcmQuZ2V0U3F1YXJlKGVuZCkueENvb3JkID09PSB0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShzdGFydCkuaW5jRGVjWGNvb3JkKC0xKSkgJiYgKHRoaXMuX2NoZXNzQm9hcmQuZ2V0U3F1YXJlKGVuZCkueUNvb3JkID09PSB0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShzdGFydCkueUNvb3JkIC0gMikpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodGhpcy5fY2hlc3NCb2FyZC5nZXRTcXVhcmUoZW5kKS54Q29vcmQgPT09IHRoaXMuX2NoZXNzQm9hcmQuZ2V0U3F1YXJlKHN0YXJ0KS5pbmNEZWNYY29vcmQoLTIpKSAmJiAodGhpcy5fY2hlc3NCb2FyZC5nZXRTcXVhcmUoZW5kKS55Q29vcmQgPT09IHRoaXMuX2NoZXNzQm9hcmQuZ2V0U3F1YXJlKHN0YXJ0KS55Q29vcmQgKyAxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShlbmQpLnhDb29yZCA9PT0gdGhpcy5fY2hlc3NCb2FyZC5nZXRTcXVhcmUoc3RhcnQpLmluY0RlY1hjb29yZCgtMikpICYmICh0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShlbmQpLnlDb29yZCA9PT0gdGhpcy5fY2hlc3NCb2FyZC5nZXRTcXVhcmUoc3RhcnQpLnlDb29yZCAtIDEpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIElmIGlzbid0IGEgdmFsaWQga25pZ2h0IG1vdmVcbiAgICB9XG5cbiAgICAvLyBNZXRob2QgdGhhdCByZXR1cm4gYW4gYXJyYXkgd2l0aCBhbGwgdGhlIGFkamFjZW50IG5vZGVzIG9mIGEgZ2l2ZW4gb25lXG4gICAga25pZ2h0QWRqYWNlbnROb2Rlcyhub2RlKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2tuaWdodHNBZGpNYXRyaXhbbm9kZV0ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9rbmlnaHRzQWRqTWF0cml4W25vZGVdW2ldID09PSAxKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICAvLyBNZXRob2QgdGhhdCBnaXZlbiB0d28gbm9kZXMsIHJldHVybiBhbiBhcnJheSB3aXRoIHRoZSBzaG9ydGVzdCBwYXRoIGJldHdlZW4gdGhlbVxuICAgIGtuaWdodFNob3J0ZXN0UGF0aChzdGFydCxlbmQpIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IFtdOyAvLyBBcnJheSBmb3IgbXkgc2hvcnRlc3QgcGF0aFxuICAgICAgICBjb25zdCBxdWV1ZSA9IFtdOyAvLyBXZSBuZWVkIGEgcXVldWUgZm9yIHRoZSBub2RlcyB0aGF0IG5lZWQgdG8gYmUgdmlzaXRlZFxuXG4gICAgICAgIHRoaXMuX2NoZXNzQm9hcmQucmVzZXRCb2FyZCgpOyAvLyBDbGVhbiB0aGUgY2hlc3MgYm9hcmQgKGFsbCBub2RlcyB1bnZpc2l0ZWQgYW5kIG5vIHBhcmVudHMpXG4gICAgICAgIFxuICAgICAgICB0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShzdGFydCkudmlzaXRlZCA9IHRydWU7IC8vIE1hcmsgY3VycmVudCBub2RlIGFzIHZpc2l0ZWRcbiAgICAgICAgcXVldWUucHVzaChzdGFydCk7IC8vIEVucXVldWUgY3VycmVudCBub2RlXG5cbiAgICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gcXVldWUuc2hpZnQoKTsgLy8gUmVtb3ZlIHRoZSBmaXJzdCBub2RlIGluIHRoZSBxdWV1ZSBhbmQgZ2V0IGl0XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChub2RlID09PSBlbmQpIHsgLy8gSWYgSSBoYXZlIGZvdW5kIHRoZSBnb2FsLCBwdXQgaXQgaW4gbXkgcGF0aCBhbmQgcmV0dXJuIHRoZSBwYXRoXG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBwYXRoLnVuc2hpZnQobm9kZSk7IC8vIEFkZCBub2RlIHRvIHRoZSBiZWdpbm5pbmcgb2YgcGF0aCBhcnJheVxuICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5fY2hlc3NCb2FyZC5nZXRTcXVhcmUobm9kZSkucGFyZW50OyAvLyBVcGRhdGUgb3VyIG5vZGUgdG8gaGlzIHBhcmVudFxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKG5vZGUgIT09IHN0YXJ0KTtcbiAgICAgICAgICAgICAgICBwYXRoLnVuc2hpZnQobm9kZSk7IC8vIEFkZCB0aGUgc3RhcnQgbm9kZSB0byB0aGUgYmVnaW5uaW5nIG9mIHBhdGggYXJyYXlcblxuICAgICAgICAgICAgICAgIHJldHVybiBwYXRoOyAvLyBGaW5hbGx5IHJldHVybiB0aGUgcGF0aCBhcnJheVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBhZGpOb2RlcyA9IHRoaXMua25pZ2h0QWRqYWNlbnROb2Rlcyhub2RlKTsgLy8gSWYgSSBoYXZlbid0IGZvdW5kIHRoZSBnb2FsLCBkZWNsYXJlIGFuIGFycmF5IHdpdGggYWxsIGl0cyBhZGogbm9kZXNcblxuICAgICAgICAgICAgYWRqTm9kZXMuZm9yRWFjaChlbGVtZW50ID0+IHsgLy8gRm9yIGVhY2ggb25lIG9mIHRob3NlIG5vZGVzXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShlbGVtZW50KS52aXNpdGVkKSB7IC8vIElmIEkgaGF2ZW4ndCB2aXNpdGVkIGl0IHlldFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShlbGVtZW50KS52aXNpdGVkID0gdHJ1ZTsgLy8gVmlzaXQgaXRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hlc3NCb2FyZC5nZXRTcXVhcmUoZWxlbWVudCkucGFyZW50ID0gbm9kZTsgLy8gQnVpbGQgdGhlIHBhdGggdG8gaXRzIHBhcmVudFxuICAgICAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKGVsZW1lbnQpOyAvLyBQdXQgaXQgaW4gb3VyIHF1ZXVlIHRvIGNvbnRpbnVlIHRoZSBzZWFyY2hcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICBcbiAgICAvLyBNZXRob2QgdGhhdCB0cmFuc2xhdGUgcGF0aCBhcnJheSBmcm9tIHNxdWFyZSBudW1iZXJzIHRvIGNvb3JkaW5hdGVzIEExLi5IOFxuICAgIHRyYW5zbGF0ZVBhdGgocGF0aCkge1xuICAgICAgICBjb25zdCBvdXRwdXRBcnIgPSBbXTtcblxuICAgICAgICBwYXRoLmZvckVhY2goc3F1YXJlTnVtID0+IHtcbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gcGFzcyBmcm9tIG9uZSBub3RhdGlvbiB0byBhbm90aGVyXG4gICAgICAgICAgICBvdXRwdXRBcnIucHVzaCh0aGlzLl9jaGVzc0JvYXJkLmdldFNxdWFyZShzcXVhcmVOdW0pLnhDb29yZCArIHRoaXMuX2NoZXNzQm9hcmQuZ2V0U3F1YXJlKHNxdWFyZU51bSkueUNvb3JkLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb3V0cHV0QXJyO1xuICAgIH1cblxuICAgIHBhaW50UGF0aChwYXRoKSB7XG4gICAgICAgIHRoaXMuX3VpLmRpc3BsYXlQYXRoKHBhdGgpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZXIgZm9yIHRoZSBldmVudCAnQ2FsYyBQYXRoJ1xuICAgIGhhbmRsZUNhbGNQYXRoID0gKHN0YXJ0LGVuZCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgLy8gVHJhbnNsYXRlIHN0YXJ0IGFuZCBlbmQgZnJvbSBBMSBmb3JtYXQgdG8gbnVtZXJpYyBJRCBmb3JtYXRcbiAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMua25pZ2h0U2hvcnRlc3RQYXRoKHRoaXMuX2NoZXNzQm9hcmQuZ2V0U3F1YXJlSWQoc3RhcnQpLHRoaXMuX2NoZXNzQm9hcmQuZ2V0U3F1YXJlSWQoZW5kKSk7XG4gICAgICAgIHRoaXMucGFpbnRQYXRoKHBhdGgpO1xuXG4gICAgfVxufSIsImltcG9ydCBcIi4vc3R5bGVzLmNzc1wiO1xuaW1wb3J0IEtuaWdodHNDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcblxuLy8gTGV0J3MgZGVjbGFyZSBhbiBvYmplY3Qgb2YgY2xhc3MgJ0NoZXNzQm9hcmQnXG5jb25zdCBteUtuaWdodHNDb250cm9sbGVyID0gbmV3IEtuaWdodHNDb250cm9sbGVyKCk7IiwiLy8gQ2xhc3MgdGhhdCByZXByZXNlbnRzIGEgU3F1YXJlIG9mIGEgQ2hlc3MgYm9hcmQgZ2FtZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3F1YXJlIHtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcih4Q29vcmQseUNvb3JkLHZpc2l0ZWQgPSBmYWxzZSxwYXJlbnQgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3hDb29yZCA9IHhDb29yZDsgLy8gRnJvbSBBIHRvIEhcbiAgICAgICAgdGhpcy5feUNvb3JkID0geUNvb3JkOyAvLyBGcm9tIDEgdG8gOFxuICAgICAgICB0aGlzLl92aXNpdGVkID0gdmlzaXRlZDsgLy8gVXNlZCB0byBhdm9pZCBpbmZpbml0ZSBsb29wcyBpbiBhIGdyYXBoXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDsgLy8gVGhlIGJyZWFkY3J1bWIgdG8gZm9sbG93IHRoYXQgcGF0aCBpbiAnc2hvcnRlc3RQYXRoJyBtZXRob2RcbiAgICB9XG5cbiAgICBnZXQgeENvb3JkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feENvb3JkO1xuICAgIH1cblxuICAgIGdldCBudW1lcmljWGNvb3JkKCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5feENvb3JkLDM2KSAtIDk7XG4gICAgfVxuXG4gICAgZ2V0IHlDb29yZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3lDb29yZDtcbiAgICB9XG5cbiAgICBnZXQgdmlzaXRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2l0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IHZpc2l0ZWQoYm9vbCkge1xuICAgICAgICB0aGlzLl92aXNpdGVkID0gYm9vbDtcbiAgICB9XG5cbiAgICBnZXQgcGFyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICAgIH1cblxuICAgIHNldCBwYXJlbnQocGFyZW50KSB7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB9XG5cbiAgICBnZXQgc3RyaW5naWZpZWRDb29yZHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnhDb29yZCArIHRoaXMueUNvb3JkLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBtZXRob2Qgc2V0cyAndmlzaXRlZCcgYW5kICdwYXJlbnQnIGF0dHJpYnV0ZXMgdG8gJ2ZhbHNlJyBhbmQgJ251bGwnXG4gICAgLy8gVGhpcyBpcyBhIFNxdWFyZSBSZXNldFxuICAgIGNsZWFuKCkge1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl92aXNpdGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBtZXRob2QgcmVzb2x2ZXMgYXJpdGhtZXRpYyBvcGVyYXRpb25zICgrLSkgd2l0aCBjb29yZCBYIGxldHRlcnNcbiAgICBpbmNEZWNYY29vcmQobnVtKSB7XG4gICAgICAgIGxldCBudW1iZXJlZExldHRlciA9IHBhcnNlSW50KHRoaXMuX3hDb29yZCwzNik7XG5cbiAgICAgICAgaWYgKG51bSA+IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBudW1iZXJlZExldHRlciArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG51bSA8IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpID4gbnVtOyBpIC09IDEpIHtcbiAgICAgICAgICAgICAgICBudW1iZXJlZExldHRlciAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bWJlcmVkTGV0dGVyLnRvU3RyaW5nKDM2KS50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuLy8gQ2xhc3MgdGhhdCBidWlsZHMgYSB1c2VyIGludGVyZmFjZSBmb3Igb3VyIEFwcFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gUmVndWxhciBFeHByZXNzaW9uIGZvciB2YWxpZCBTcXVhcmUgc3ludGF4XG4gICAgICAgIHRoaXMuc3F1YXJlUmVnRXhwID0gL1tBLUhdWzEtOF0vO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhbiBIVE1MIHNrZWxldG9uXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJjb250YWluZXJcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgICAgICB0aGlzLmNvbnRyb2xzID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJjb250cm9sc1wiKTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IHRoaXMuY3JlYXRlRWxlbWVudChcImRpdlwiLFwiYm9hcmRcIik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY29udHJvbHMpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmJvYXJkKTtcblxuICAgICAgICAvLyBGaWxsICdDb250cm9scycgc2lkZVxuICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJ0aXRsZVwiKTtcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJmb3JtXCIpO1xuICAgICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJ1dHRvbnNcIik7XG5cbiAgICAgICAgdGhpcy5jb250cm9scy5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICAgICAgdGhpcy5jb250cm9scy5hcHBlbmRDaGlsZCh0aGlzLmZvcm0pO1xuICAgICAgICB0aGlzLmNvbnRyb2xzLmFwcGVuZENoaWxkKHRoaXMuYnV0dG9ucyk7XG5cbiAgICAgICAgdGhpcy5oMSA9IHRoaXMuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICB0aGlzLmgxLnRleHRDb250ZW50ID0gXCJLbmlnaHRzIFRyYXZhaWxzXCI7XG4gICAgICAgIHRoaXMudGl0bGUuYXBwZW5kQ2hpbGQodGhpcy5oMSk7XG5cbiAgICAgICAgdGhpcy5zdGFydCA9IHRoaXMuY3JlYXRlRWxlbWVudChcImRpdlwiLFwic3RhcnRcIixcImZvcm0tZmllbGRcIik7XG4gICAgICAgIHRoaXMuc3RhcnRTcGFuID0gdGhpcy5jcmVhdGVFbGVtZW50KFwic3BhblwiLFwic3RhcnRTcGFuXCIsXCJlcnJvclwiKTtcbiAgICAgICAgdGhpcy5zdGFydFNwYW4uc2V0QXR0cmlidXRlKFwiYXJpYS1saXZlXCIsXCJwb2xpdGVcIik7XG4gICAgICAgIHRoaXMuZW5kID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJlbmRcIixcImZvcm0tZmllbGRcIik7XG4gICAgICAgIHRoaXMuZW5kU3BhbiA9IHRoaXMuY3JlYXRlRWxlbWVudChcInNwYW5cIixcImVuZFNwYW5cIixcImVycm9yXCIpO1xuICAgICAgICB0aGlzLmVuZFNwYW4uc2V0QXR0cmlidXRlKFwiYXJpYS1saXZlXCIsXCJwb2xpdGVcIik7XG4gICAgICAgIHRoaXMuZm9ybS5hcHBlbmRDaGlsZCh0aGlzLnN0YXJ0KTtcbiAgICAgICAgdGhpcy5mb3JtLmFwcGVuZENoaWxkKHRoaXMuc3RhcnRTcGFuKTtcbiAgICAgICAgdGhpcy5mb3JtLmFwcGVuZENoaWxkKHRoaXMuZW5kKTtcbiAgICAgICAgdGhpcy5mb3JtLmFwcGVuZENoaWxkKHRoaXMuZW5kU3Bhbik7XG5cbiAgICAgICAgdGhpcy5zdGFydExhYmVsID0gdGhpcy5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIHRoaXMuc3RhcnRMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIixcInN0YXJ0UG9zXCIpO1xuICAgICAgICB0aGlzLnN0YXJ0TGFiZWwudGV4dENvbnRlbnQgPSBcIlN0YXJ0IHBvc2l0aW9uOlwiO1xuICAgICAgICB0aGlzLnN0YXJ0SW5wdXQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLFwic3RhcnRQb3NcIik7XG4gICAgICAgIHRoaXMuc3RhcnRJbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsXCJzdGFydFBvc1wiKTtcbiAgICAgICAgdGhpcy5zdGFydElucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIixcInRleHRcIik7XG4gICAgICAgIHRoaXMuc3RhcnRJbnB1dC5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLFwidHJ1ZVwiKTtcbiAgICAgICAgdGhpcy5zdGFydElucHV0LnNldEF0dHJpYnV0ZShcIm1pbkxlbmd0aFwiLFwiMlwiKTtcbiAgICAgICAgdGhpcy5zdGFydElucHV0LnNldEF0dHJpYnV0ZShcIm1heExlbmd0aFwiLFwiMlwiKTtcbiAgICAgICAgdGhpcy5zdGFydElucHV0LnNldEF0dHJpYnV0ZShcInNpemVcIixcIjJcIik7XG4gICAgICAgIHRoaXMuc3RhcnRJbnB1dC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLFwiQTFcIik7XG4gICAgICAgIHRoaXMuc3RhcnQuYXBwZW5kQ2hpbGQodGhpcy5zdGFydExhYmVsKTtcbiAgICAgICAgdGhpcy5zdGFydC5hcHBlbmRDaGlsZCh0aGlzLnN0YXJ0SW5wdXQpO1xuXG4gICAgICAgIHRoaXMuZW5kTGFiZWwgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgdGhpcy5lbmRMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIixcImVuZFBvc1wiKTtcbiAgICAgICAgdGhpcy5lbmRMYWJlbC50ZXh0Q29udGVudCA9IFwiRW5kIHBvc2l0aW9uOlwiO1xuICAgICAgICB0aGlzLmVuZElucHV0ID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIixcImVuZFBvc1wiKTtcbiAgICAgICAgdGhpcy5lbmRJbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsXCJlbmRQb3NcIik7XG4gICAgICAgIHRoaXMuZW5kSW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLFwidGV4dFwiKTtcbiAgICAgICAgdGhpcy5lbmRJbnB1dC5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLFwidHJ1ZVwiKTtcbiAgICAgICAgdGhpcy5lbmRJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtaW5MZW5ndGhcIixcIjJcIik7XG4gICAgICAgIHRoaXMuZW5kSW5wdXQuc2V0QXR0cmlidXRlKFwibWF4TGVuZ3RoXCIsXCIyXCIpO1xuICAgICAgICB0aGlzLmVuZElucHV0LnNldEF0dHJpYnV0ZShcInNpemVcIixcIjJcIik7XG4gICAgICAgIHRoaXMuZW5kSW5wdXQuc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIixcIkg4XCIpO1xuICAgICAgICB0aGlzLmVuZC5hcHBlbmRDaGlsZCh0aGlzLmVuZExhYmVsKTtcbiAgICAgICAgdGhpcy5lbmQuYXBwZW5kQ2hpbGQodGhpcy5lbmRJbnB1dCk7XG5cbiAgICAgICAgdGhpcy5wYXRoQnV0dG9uID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsXCJwYXRoQnV0dG9uXCIpO1xuICAgICAgICB0aGlzLnBhdGhCdXR0b24uc2V0QXR0cmlidXRlKFwidHlwZVwiLFwiYnV0dG9uXCIpO1xuICAgICAgICB0aGlzLnBhdGhCdXR0b24uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIixcInRydWVcIik7XG4gICAgICAgIHRoaXMucGF0aEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQ2FsYyBQYXRoXCI7XG4gICAgICAgIHRoaXMuY2xlYXJCdXR0b24gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIixcImNsZWFyQnV0dG9uXCIpO1xuICAgICAgICB0aGlzLmNsZWFyQnV0dG9uLnNldEF0dHJpYnV0ZShcInR5cGVcIixcImJ1dHRvblwiKTtcbiAgICAgICAgdGhpcy5jbGVhckJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQ2xlYXJcIjtcbiAgICAgICAgdGhpcy5idXR0b25zLmFwcGVuZENoaWxkKHRoaXMucGF0aEJ1dHRvbik7XG4gICAgICAgIHRoaXMuYnV0dG9ucy5hcHBlbmRDaGlsZCh0aGlzLmNsZWFyQnV0dG9uKTtcblxuICAgICAgICAvLyBGaWxsIEJvYXJkIHNpZGVcbiAgICAgICAgdGhpcy50b3BCb2FyZCA9IHRoaXMuY3JlYXRlRWxlbWVudChcImRpdlwiLFwidG9wQm9hcmRcIik7XG4gICAgICAgIHRoaXMuYm90dG9tQm9hcmQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcImJvdHRvbUJvYXJkXCIpO1xuICAgICAgICB0aGlzLmJvYXJkLmFwcGVuZENoaWxkKHRoaXMudG9wQm9hcmQpO1xuICAgICAgICB0aGlzLmJvYXJkLmFwcGVuZENoaWxkKHRoaXMuYm90dG9tQm9hcmQpO1xuXG4gICAgICAgIHRoaXMueUhlYWRlciA9IHRoaXMuY3JlYXRlRWxlbWVudChcImRpdlwiLFwieUhlYWRlclwiKTtcbiAgICAgICAgdGhpcy5jaGVzc0JvYXJkID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsXCJjaGVzc0JvYXJkXCIpO1xuICAgICAgICB0aGlzLnRvcEJvYXJkLmFwcGVuZENoaWxkKHRoaXMueUhlYWRlcik7XG4gICAgICAgIHRoaXMudG9wQm9hcmQuYXBwZW5kQ2hpbGQodGhpcy5jaGVzc0JvYXJkKTtcblxuICAgICAgICB0aGlzLnhIZWFkZXIgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIixcInhIZWFkZXJcIik7XG4gICAgICAgIHRoaXMuYm90dG9tQm9hcmQuYXBwZW5kQ2hpbGQodGhpcy54SGVhZGVyKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDk7IGkgKz0gMSkgeyAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGhlYWQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIixudWxsLFwiaGVhZFwiKTtcbiAgICAgICAgICAgIGhlYWQuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICAgICAgICAgIGhlYWQudGV4dENvbnRlbnQgPSBpO1xuICAgICAgICAgICAgdGhpcy55SGVhZGVyLmFwcGVuZENoaWxkKGhlYWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXBwZW5kIGFuIGVtcHR5ICdkaXYnIHRvICd4SGVhZGVyJyBkaXZcbiAgICAgICAgY29uc3QgZW1wdHlIZWFkU3F1YXJlID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsbnVsbCxcImhlYWRcIik7XG4gICAgICAgIGVtcHR5SGVhZFNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgICB0aGlzLnhIZWFkZXIuYXBwZW5kQ2hpbGQoZW1wdHlIZWFkU3F1YXJlKTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAxMDsgaSA8IDE4OyBpICs9IDEpIHsgICAgICAgXG4gICAgICAgICAgICBjb25zdCBoZWFkID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsbnVsbCxcImhlYWRcIik7XG4gICAgICAgICAgICBoZWFkLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICAgICAgICBoZWFkLnRleHRDb250ZW50ID0gaS50b1N0cmluZygzNikudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIHRoaXMueEhlYWRlci5hcHBlbmRDaGlsZChoZWFkKTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICAvLyBEZWNsYXJlIEV2ZW50IExpc3RlbmVycyBmb3IgaW5wdXRzIGFuZCBidXR0b25zXG4gICAgICAgIHRoaXMuc3RhcnRJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBXaGVuIHVzZXIgbGVhdmVzIHRoZSBpbnB1dCwgd2UgY2hlY2sgaWYgdGhlIGZpZWxkIGlzIHZhbGlkXG4gICAgICAgICAgICBpZiAodGhpcy5zdGFydElucHV0LnZhbGlkaXR5LnZhbGlkICYmIHRoaXMuY2hlY2tQYXR0ZXJuKHRoaXMuc3RhcnRJbnB1dCkpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBJbiBjYXNlIHRoZXJlIGlzIGFuIGVycm9yIG1lc3NhZ2UgdmlzaWJsZSBhbmQgdGhlIGZpZWxkIGlzIHZhbGlkIHlldCwgcmVtb3ZlIHRoZSBlcnJvciBtZXNzYWdlXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNwYW4udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZFwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBOb3cgd2UgbmVlZCB0byBwbGFjZSB0aGUga25pZ2h0XG4gICAgICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUodGhpcy5zdGFydElucHV0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyU3F1YXJlcygpO1xuICAgICAgICAgICAgICAgIHNxdWFyZVswXS5pbm5lckhUTUwgPSBcIiYjOTgyMjtcIjtcblxuICAgICAgICAgICAgICAgIC8vIElmIGVuZElucHV0IGlzIHZhbGlkIHRvbywgdGhlbiB3ZSBuZWVkIHRvIGVuYWJsZSAnQ2FsYyBQYXRoJyBidXR0b25cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmRJbnB1dC52YWxpZGl0eS52YWxpZCAmJiB0aGlzLmNoZWNrUGF0dGVybih0aGlzLmVuZElucHV0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdGhCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvcih0aGlzLnN0YXJ0SW5wdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZW5kSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gV2hlbiB1c2VyIGxlYXZlcyB0aGUgaW5wdXQsIHdlIGNoZWNrIGlmIHRoZSBmaWVsZCBpcyB2YWxpZFxuICAgICAgICAgICAgaWYgKHRoaXMuZW5kSW5wdXQudmFsaWRpdHkudmFsaWQgJiYgdGhpcy5jaGVja1BhdHRlcm4odGhpcy5lbmRJbnB1dCkpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBJbiBjYXNlIHRoZXJlIGlzIGFuIGVycm9yIG1lc3NhZ2UgdmlzaWJsZSBhbmQgdGhlIGZpZWxkIGlzIHZhbGlkIHlldCwgcmVtb3ZlIHRoZSBlcnJvciBtZXNzYWdlXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRTcGFuLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZElucHV0LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpO1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgc3RhcnRJbnB1dCBpcyB2YWxpZCB0b28sIHRoZW4gd2UgbmVlZCB0byBlbmFibGUgJ0NhbGMgUGF0aCcgYnV0dG9uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnRJbnB1dC52YWxpZGl0eS52YWxpZCAmJiB0aGlzLmNoZWNrUGF0dGVybih0aGlzLnN0YXJ0SW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0aEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKHRoaXMuZW5kSW5wdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFdoZW4gdXNlciBwcmVzcyAnQ2xlYXInIGJ1dHRvbiwgdGhlIGJvYXJkIHJlc2V0cyB0byBpdHMgb3JpZ2luYWwgc3RhdGUgYW5kIHRoZSBzYW1lIGZvciBpbnB1dHNcbiAgICAgICAgdGhpcy5jbGVhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGVhclNxdWFyZXMoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICB0aGlzLmVuZElucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTcGFuLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMuZW5kU3Bhbi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBhbiBlbGVtZW50IHdpdGggb3B0aW9uYWwgaWRzIGFuZCBjbGFzc1xuICAgIGNyZWF0ZUVsZW1lbnQodGFnLCBpZCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIixpZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0RWxlbWVudChzZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZGlzcGxheUJvYXJkKGJvYXJkKSB7XG4gICAgICAgIGZvciAoY29uc3QgW251bSwgc3F1YXJlXSBvZiBib2FyZCkge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bS50b1N0cmluZygpLCBcInNxdWFyZVwiKTtcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsc3F1YXJlLnhDb29yZCArIHNxdWFyZS55Q29vcmQudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBhIGNsYXNzICdsaWdodCcgb3QgJ2RhcmsnIGlmIHlvdSB3YW50IHRoZSBzcXVhcmUgcGFpbnRlZCBncmVlblxuICAgICAgICAgICAgLy8gb3Igd2hpdGUuIG1vZHVsdXMgb3BlcmF0b3IgaGVscHMgd2l0aCB0aGF0XG4gICAgICAgICAgICBpZiAoKHNxdWFyZS5udW1lcmljWGNvb3JkICsgc3F1YXJlLnlDb29yZCkgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJkYXJrXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcImxpZ2h0XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBOb3cgYXBwZW5kIHRoZSBlbGVtZW50IHRvIGVsZW1lbnQgJ2NoZXNzQm9hcmQnXG4gICAgICAgICAgICB0aGlzLmNoZXNzQm9hcmQuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrUGF0dGVybihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcXVhcmVSZWdFeHAudGVzdChpbnB1dC52YWx1ZSk7XG4gICAgfVxuXG4gICAgc2hvd0Vycm9yKGUpIHtcbiAgICAgICAgLy8gTGV0J3MgcmV0dXJuIGEgYm9vbCB3aXRoIHRoZSBzdGF0dXMgb2YgdGhlIGlucHV0cyB0byBiZSB1c2VkIHdoZW4gJ0NhbGMgUGF0aCcgYnV0dG9uIGlzIHByZXNzZWRcbiAgICAgICAgbGV0IHZhbGlkSW5wdXRzID0gdHJ1ZTtcblxuICAgICAgICBpZiAoZSA9PT0gdGhpcy5zdGFydElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0SW5wdXQuY2xhc3NMaXN0LmFkZChcImludmFsaWRcIik7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGFydElucHV0LnZhbGlkaXR5LnZhbHVlTWlzc2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTcGFuLnRleHRDb250ZW50ID0gXCJZb3UgbmVlZCB0byBlbnRlciBhbiBzdGFydCBzcXVhcmUgZm9yIHRoZSBLbmlnaHRcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuY2hlY2tQYXR0ZXJuKHRoaXMuc3RhcnRJbnB1dCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U3Bhbi50ZXh0Q29udGVudCA9IFwiRW50ZXJlZCB2YWx1ZSBuZWVkcyB0byBiZSBhIHZhbGlkIENoZXNzIEJvYXJkIFNxdWFyZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsaWRJbnB1dHMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGUgPT09IHRoaXMuZW5kSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuZW5kSW5wdXQuY2xhc3NMaXN0LmFkZChcImludmFsaWRcIik7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmRJbnB1dC52YWxpZGl0eS52YWx1ZU1pc3NpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZFNwYW4udGV4dENvbnRlbnQgPSBcIllvdSBuZWVkIHRvIGVudGVyIGFuIGVuZCBzcXVhcmUgZm9yIHRoZSBLbmlnaHRcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuY2hlY2tQYXR0ZXJuKHRoaXMuZW5kSW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRTcGFuLnRleHRDb250ZW50ID0gXCJFbnRlcmVkIHZhbHVlIG5lZWRzIHRvIGJlIGEgdmFsaWQgQ2hlc3MgQm9hcmQgU3F1YXJlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWxpZElucHV0cyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbGlkSW5wdXRzO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgY2xlYXJTcXVhcmVzKCkge1xuICAgICAgICBjb25zdCBkYXJrU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGFya1wiKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXJrU3F1YXJlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZGFya1NxdWFyZXNbaV0udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgZGFya1NxdWFyZXNbaV0uY2xhc3NMaXN0LnJlbW92ZShcImZpbmFsXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGlnaHRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5saWdodFwiKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaWdodFNxdWFyZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGxpZ2h0U3F1YXJlc1tpXS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICBsaWdodFNxdWFyZXNbaV0uY2xhc3NMaXN0LnJlbW92ZShcImZpbmFsXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2FsbGVkIHdoZW4gYnV0dG9uICdDYWxjIFBhdGgnIGlzIHByZXNzZWQuIFJlY2VpdmVzIGFuIGFycmF5IHdpdGggdGhlIHNxdWFyZXMgdGhlIGtuaWdodHNcbiAgICAvLyBoYXZlIHRvIG1vdmUgYmV0d2VlblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgZGlzcGxheVBhdGgocGF0aCkge1xuICAgICAgICAvLyBXZSBwbGFjZSBhIGJsYWNrIGtuaWdodCBvbiBzdGFydCBzcXVhcmVcbiAgICAgICAgY29uc3QgZmlyc3REb21FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGF0aFswXSk7XG4gICAgICAgIGZpcnN0RG9tRWxlbWVudC5pbm5lckhUTUwgPSBcIiYjOTgyMjtcIjtcblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBhdGgubGVuZ3RoIC0gMTsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBkb21FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGF0aFtpXSk7XG4gICAgICAgICAgICBkb21FbGVtZW50LnRleHRDb250ZW50ID0gaTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIHBsYWNlIGEgcmVkIGtuaWdodCBvbiBlbmQgc3F1YXJlXG4gICAgICAgIGNvbnN0IGxhc3REb21FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGF0aFtwYXRoLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgbGFzdERvbUVsZW1lbnQuaW5uZXJIVE1MID0gcGF0aC5sZW5ndGggLSAxO1xuICAgICAgICBsYXN0RG9tRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZmluYWxcIik7XG4gICAgfVxuXG4gICAgLy8gV2UgbmVlZCBhbiBFdmVudCBMaXN0ZW5lciBmb3IgJ0NhbGMgUGF0aCcgYnV0dG9uXG4gICAgYmluZENhbGNQYXRoKGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5wYXRoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBUaGlzIGhhbmRsZXIgbmVlZHMgdG8gYmUgYSBtZXRob2QgaW4gdGhlIGNvbnRyb2xsZXJcbiAgICAgICAgICAgIC8vIFNlZSBDb250cm9sbGVyIGNvbnN0cnVjdG9yXG4gICAgICAgICAgICBoYW5kbGVyKHRoaXMuc3RhcnRJbnB1dC52YWx1ZSx0aGlzLmVuZElucHV0LnZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UGFjaWZpY28mZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XFxuXFxuLyogTVkgT1dOIFNUWUxFUyBGUk9NIEhFUkUgKi9cXG5cXG4qLCAqOmJlZm9yZSwgKjphZnRlciB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBjb2xvcjogI0YyRTlFMTtcXG4gICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXNpemU6IDE4cHg7XFxufVxcblxcbiNjb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDEwMHZoOyAvKiBGdWxsIHNjcmVlbiAqL1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxQzE0MEQ7XFxufVxcblxcbiNjb250cm9scyB7XFxuICAgIHdpZHRoOiA0NSU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5oMSB7XFxuICAgIGZvbnQtc2l6ZTogNGVtO1xcbiAgICBmb250LWZhbWlseTogJ1BhY2lmaWNvJywgY3Vyc2l2ZTtcXG59XFxuXFxuI2Zvcm0ge1xcbiAgICBmb250LXNpemU6IDJlbTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBoZWlnaHQ6IDIwJTtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmZvcm0tZmllbGQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxufVxcblxcbmxhYmVsIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuaW5wdXRbdHlwZT10ZXh0XSB7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMUMxNDBEO1xcbiAgICBjb2xvcjogI0YyRTlFMTtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgI0NCRTg2QjtcXG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNDQkU4NkI7XFxuICAgIGZvbnQtc2l6ZTogMC43ZW07XFxufVxcblxcbmlucHV0W3R5cGU9dGV4dF06Zm9jdXMge1xcbiAgICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG4uZXJyb3Ige1xcbiAgICBjb2xvcjogI2ZmMDAwMDtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbn1cXG5cXG5pbnB1dFt0eXBlPXRleHRdOmludmFsaWQsIC5pbnZhbGlkIHtcXG4gICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkICNmZjAwMDAgIWltcG9ydGFudDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNmZjAwMDAgIWltcG9ydGFudDtcXG59XFxuXFxuI2J1dHRvbnMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIHdpZHRoOiA1MCU7XFxufVxcblxcbmJ1dHRvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNDQkU4NkI7XFxuICAgIHBhZGRpbmc6IDAuN2VtIDEuNWVtO1xcbiAgICBmb250LXNpemU6IDFlbTtcXG4gICAgYm9yZGVyOiAzcHggc29saWQgI0NCRTg2QjtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5idXR0b246aG92ZXIge1xcbiAgICBvcGFjaXR5OiAwLjg7XFxufVxcblxcbiNwYXRoQnV0dG9uOmRpc2FibGVkIHtcXG4gICAgb3BhY2l0eTogMC41O1xcbiAgICBjb2xvcjogIzFDMTQwRDtcXG59XFxuXFxuI2JvYXJkIHtcXG4gICAgd2lkdGg6IDU1JTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbiN0b3BCb2FyZCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbiN5SGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlO1xcbn1cXG5cXG4jY2hlc3NCb2FyZCB7XFxuICAgIHdpZHRoOiA2NDBweDtcXG4gICAgaGVpZ2h0OiA2NDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0YyRTlFMTtcXG4gICAgY29sb3I6ICMxQzE0MEQ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtd3JhcDogd3JhcC1yZXZlcnNlO1xcbn1cXG5cXG4jY2hlc3NCb2FyZCA+IGRpdiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZvbnQtc2l6ZTogNjBweDtcXG59XFxuXFxuI2JvdHRvbUJvYXJkIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuI3hIZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uaGVhZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxQzE0MEQ7XFxuICAgIGNvbG9yOiAjRjJFOUUxO1xcbn1cXG5cXG4uc3F1YXJlIHtcXG4gICAgd2lkdGg6IDgwcHg7XFxuICAgIGhlaWdodDogODBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5kYXJrIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0NCRTg2QjtcXG59XFxuXFxuLmZpbmFsIHtcXG4gICAgY29sb3I6ICNmZjAwMDA7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEI7O0FBRUEsNEJBQTRCOztBQUk1QjtJQUNJLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxpQ0FBaUM7SUFDakMsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWEsRUFBRSxnQkFBZ0I7SUFDL0IsWUFBWTtJQUNaLGFBQWE7SUFDYix5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qiw2QkFBNkI7SUFDN0IsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksY0FBYztJQUNkLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLGNBQWM7SUFDZCxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLDhCQUE4QjtJQUM5QixXQUFXO0lBQ1gsVUFBVTtJQUNWLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsV0FBVztJQUNYLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsaUJBQWlCO0lBQ2pCLHlCQUF5QjtJQUN6QixjQUFjO0lBQ2QsU0FBUztJQUNULDZCQUE2QjtJQUM3QixnQ0FBZ0M7SUFDaEMsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxlQUFlO0FBQ25COztBQUVBO0lBQ0ksd0NBQXdDO0lBQ3hDLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4QkFBOEI7SUFDOUIsVUFBVTtBQUNkOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLG9CQUFvQjtJQUNwQixjQUFjO0lBQ2QseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksVUFBVTtJQUNWLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYix5QkFBeUI7SUFDekIsY0FBYztJQUNkLGFBQWE7SUFDYix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksY0FBYztBQUNsQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVxcblxcbi8qIE1ZIE9XTiBTVFlMRVMgRlJPTSBIRVJFICovXFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UGFjaWZpY28mZGlzcGxheT1zd2FwJyk7XFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvJmRpc3BsYXk9c3dhcCcpO1xcblxcbiosICo6YmVmb3JlLCAqOmFmdGVyIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGNvbG9yOiAjRjJFOUUxO1xcbiAgICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG59XFxuXFxuI2NvbnRhaW5lciB7XFxuICAgIGhlaWdodDogMTAwdmg7IC8qIEZ1bGwgc2NyZWVuICovXFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzFDMTQwRDtcXG59XFxuXFxuI2NvbnRyb2xzIHtcXG4gICAgd2lkdGg6IDQ1JTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmgxIHtcXG4gICAgZm9udC1zaXplOiA0ZW07XFxuICAgIGZvbnQtZmFtaWx5OiAnUGFjaWZpY28nLCBjdXJzaXZlO1xcbn1cXG5cXG4jZm9ybSB7XFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGhlaWdodDogMjAlO1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uZm9ybS1maWVsZCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG59XFxuXFxubGFiZWwge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5pbnB1dFt0eXBlPXRleHRdIHtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxQzE0MEQ7XFxuICAgIGNvbG9yOiAjRjJFOUUxO1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCAjQ0JFODZCO1xcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI0NCRTg2QjtcXG4gICAgZm9udC1zaXplOiAwLjdlbTtcXG59XFxuXFxuaW5wdXRbdHlwZT10ZXh0XTpmb2N1cyB7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbi5lcnJvciB7XFxuICAgIGNvbG9yOiAjZmYwMDAwO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxufVxcblxcbmlucHV0W3R5cGU9dGV4dF06aW52YWxpZCwgLmludmFsaWQge1xcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgI2ZmMDAwMCAhaW1wb3J0YW50O1xcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2ZmMDAwMCAhaW1wb3J0YW50O1xcbn1cXG5cXG4jYnV0dG9ucyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgd2lkdGg6IDUwJTtcXG59XFxuXFxuYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0NCRTg2QjtcXG4gICAgcGFkZGluZzogMC43ZW0gMS41ZW07XFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcbiAgICBib3JkZXI6IDNweCBzb2xpZCAjQ0JFODZCO1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDAuODtcXG59XFxuXFxuI3BhdGhCdXR0b246ZGlzYWJsZWQge1xcbiAgICBvcGFjaXR5OiAwLjU7XFxuICAgIGNvbG9yOiAjMUMxNDBEO1xcbn1cXG5cXG4jYm9hcmQge1xcbiAgICB3aWR0aDogNTUlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuI3RvcEJvYXJkIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuI3lIZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XFxufVxcblxcbiNjaGVzc0JvYXJkIHtcXG4gICAgd2lkdGg6IDY0MHB4O1xcbiAgICBoZWlnaHQ6IDY0MHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjJFOUUxO1xcbiAgICBjb2xvcjogIzFDMTQwRDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC13cmFwOiB3cmFwLXJldmVyc2U7XFxufVxcblxcbiNjaGVzc0JvYXJkID4gZGl2IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZm9udC1zaXplOiA2MHB4O1xcbn1cXG5cXG4jYm90dG9tQm9hcmQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4jeEhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5oZWFkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzFDMTQwRDtcXG4gICAgY29sb3I6ICNGMkU5RTE7XFxufVxcblxcbi5zcXVhcmUge1xcbiAgICB3aWR0aDogODBweDtcXG4gICAgaGVpZ2h0OiA4MHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmRhcmsge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQ0JFODZCO1xcbn1cXG5cXG4uZmluYWwge1xcbiAgICBjb2xvcjogI2ZmMDAwMDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiU3F1YXJlIiwiQ2hlc3NCb2FyZCIsImNvbnN0cnVjdG9yIiwiX2JvYXJkIiwiTWFwIiwibiIsImkiLCJqIiwic2V0IiwidG9TdHJpbmciLCJ0b1VwcGVyQ2FzZSIsImJvYXJkIiwicmVzZXRCb2FyZCIsInNxdWFyZSIsInZhbHVlcyIsImNsZWFuIiwiZ2V0U3F1YXJlIiwibnVtIiwiZ2V0IiwiZ2V0U3F1YXJlSWQiLCJjb29yZCIsImtleSIsInZhbHVlIiwic3RyaW5naWZpZWRDb29yZHMiLCJVSVZpZXciLCJLbmlnaHRzQ29udHJvbGxlciIsIl9kZWZpbmVQcm9wZXJ0eSIsInN0YXJ0IiwiZW5kIiwicGF0aCIsImtuaWdodFNob3J0ZXN0UGF0aCIsIl9jaGVzc0JvYXJkIiwicGFpbnRQYXRoIiwiX3VpIiwiZGlzcGxheUJvYXJkIiwiX2tuaWdodHNBZGpNYXRyaXgiLCJBcnJheSIsImxlbmd0aCIsImlzVmFsaWRLbmlnaHRNb3ZlIiwiYmluZENhbGNQYXRoIiwiaGFuZGxlQ2FsY1BhdGgiLCJ4Q29vcmQiLCJpbmNEZWNYY29vcmQiLCJ5Q29vcmQiLCJrbmlnaHRBZGphY2VudE5vZGVzIiwibm9kZSIsImFyciIsInB1c2giLCJxdWV1ZSIsInZpc2l0ZWQiLCJzaGlmdCIsInVuc2hpZnQiLCJwYXJlbnQiLCJhZGpOb2RlcyIsImZvckVhY2giLCJlbGVtZW50IiwidHJhbnNsYXRlUGF0aCIsIm91dHB1dEFyciIsInNxdWFyZU51bSIsImRpc3BsYXlQYXRoIiwibXlLbmlnaHRzQ29udHJvbGxlciIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsIl94Q29vcmQiLCJfeUNvb3JkIiwiX3Zpc2l0ZWQiLCJfcGFyZW50IiwibnVtZXJpY1hjb29yZCIsInBhcnNlSW50IiwiYm9vbCIsIm51bWJlcmVkTGV0dGVyIiwic3F1YXJlUmVnRXhwIiwiY29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImRvY3VtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiY29udHJvbHMiLCJ0aXRsZSIsImZvcm0iLCJidXR0b25zIiwiaDEiLCJ0ZXh0Q29udGVudCIsInN0YXJ0U3BhbiIsInNldEF0dHJpYnV0ZSIsImVuZFNwYW4iLCJzdGFydExhYmVsIiwic3RhcnRJbnB1dCIsImVuZExhYmVsIiwiZW5kSW5wdXQiLCJwYXRoQnV0dG9uIiwiY2xlYXJCdXR0b24iLCJ0b3BCb2FyZCIsImJvdHRvbUJvYXJkIiwieUhlYWRlciIsImNoZXNzQm9hcmQiLCJ4SGVhZGVyIiwiaGVhZCIsImNsYXNzTGlzdCIsImFkZCIsImVtcHR5SGVhZFNxdWFyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ2YWxpZGl0eSIsInZhbGlkIiwiY2hlY2tQYXR0ZXJuIiwicmVtb3ZlIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJjbGVhclNxdWFyZXMiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzaG93RXJyb3IiLCJ0YWciLCJpZCIsImNsYXNzTmFtZSIsImdldEVsZW1lbnQiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3IiLCJkaXYiLCJpbnB1dCIsInRlc3QiLCJlIiwidmFsaWRJbnB1dHMiLCJ2YWx1ZU1pc3NpbmciLCJkYXJrU3F1YXJlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsaWdodFNxdWFyZXMiLCJmaXJzdERvbUVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImRvbUVsZW1lbnQiLCJsYXN0RG9tRWxlbWVudCIsImhhbmRsZXIiXSwic291cmNlUm9vdCI6IiJ9