/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
// Class that builds a user interface for our App
export default class UIView {
    constructor() {
        // Regular Expression for valid Square syntax
        this.squareRegExp = /[A-H][1-8]/;

        // Create an HTML skeleton
        this.container = this.createElement("div","container");
        document.body.appendChild(this.container);
        this.controls = this.createElement("div","controls");
        this.board = this.createElement("div","board");
        this.container.appendChild(this.controls);
        this.container.appendChild(this.board);

        // Fill 'Controls' side
        this.title = this.createElement("div","title");
        this.form = this.createElement("div","form");
        this.buttons = this.createElement("div","buttons");

        this.controls.appendChild(this.title);
        this.controls.appendChild(this.form);
        this.controls.appendChild(this.buttons);

        this.h1 = this.createElement("h1");
        this.h1.textContent = "Knights Travails";
        this.title.appendChild(this.h1);

        this.start = this.createElement("div","start","form-field");
        this.startSpan = this.createElement("span","startSpan","error");
        this.startSpan.setAttribute("aria-live","polite");
        this.end = this.createElement("div","end","form-field");
        this.endSpan = this.createElement("span","endSpan","error");
        this.endSpan.setAttribute("aria-live","polite");
        this.form.appendChild(this.start);
        this.form.appendChild(this.startSpan);
        this.form.appendChild(this.end);
        this.form.appendChild(this.endSpan);

        this.startLabel = this.createElement("label");
        this.startLabel.setAttribute("for","startPos");
        this.startLabel.textContent = "Start position:";
        this.startInput = this.createElement("input","startPos");
        this.startInput.setAttribute("name","startPos");
        this.startInput.setAttribute("type","text");
        this.startInput.setAttribute("required","true");
        this.startInput.setAttribute("minLength","2");
        this.startInput.setAttribute("maxLength","2");
        this.startInput.setAttribute("size","2");
        this.startInput.setAttribute("placeholder","A1");
        this.start.appendChild(this.startLabel);
        this.start.appendChild(this.startInput);

        this.endLabel = this.createElement("label");
        this.endLabel.setAttribute("for","endPos");
        this.endLabel.textContent = "End position:";
        this.endInput = this.createElement("input","endPos");
        this.endInput.setAttribute("name","endPos");
        this.endInput.setAttribute("type","text");
        this.endInput.setAttribute("required","true");
        this.endInput.setAttribute("minLength","2");
        this.endInput.setAttribute("maxLength","2");
        this.endInput.setAttribute("size","2");
        this.endInput.setAttribute("placeholder","H8");
        this.end.appendChild(this.endLabel);
        this.end.appendChild(this.endInput);

        this.pathButton = this.createElement("button","pathButton");
        this.pathButton.setAttribute("type","button");
        this.pathButton.setAttribute("disabled","true");
        this.pathButton.textContent = "Calc Path";
        this.clearButton = this.createElement("button","clearButton");
        this.clearButton.setAttribute("type","button");
        this.clearButton.textContent = "Clear";
        this.buttons.appendChild(this.pathButton);
        this.buttons.appendChild(this.clearButton);

        // Fill Board side
        this.topBoard = this.createElement("div","topBoard");
        this.bottomBoard = this.createElement("div","bottomBoard");
        this.board.appendChild(this.topBoard);
        this.board.appendChild(this.bottomBoard);

        this.yHeader = this.createElement("div","yHeader");
        this.chessBoard = this.createElement("div","chessBoard");
        this.topBoard.appendChild(this.yHeader);
        this.topBoard.appendChild(this.chessBoard);

        this.xHeader = this.createElement("div","xHeader");
        this.bottomBoard.appendChild(this.xHeader);

        for (let i = 1; i < 9; i += 1) {       
            const head = this.createElement("div",null,"head");
            head.classList.add("square");
            head.textContent = i;
            this.yHeader.appendChild(head);
        }

        // Append an empty 'div' to 'xHeader' div
        const emptyHeadSquare = this.createElement("div",null,"head");
        emptyHeadSquare.classList.add("square");
        this.xHeader.appendChild(emptyHeadSquare);
        
        for (let i = 10; i < 18; i += 1) {       
            const head = this.createElement("div",null,"head");
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
                };

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
                };

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
            element.setAttribute("id",id);
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
            div.setAttribute("name",square.xCoord + square.yCoord.toString());

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
            handler(this.startInput.value,this.endInput.value);
        });
    }
}