// Class that builds a user interface for our App
export default class UIView {
    constructor() {
        // Regular Expression for valid Square syntax
        this.squareRegExp = /[A-H][1-8]/;

        // Create an HTML skeleton
        this.container = document.createElement("div");
        this.container.setAttribute("id", "container");
        document.body.appendChild(this.container);
        this.controls = document.createElement("div");
        this.controls.setAttribute("id","controls");
        this.board = document.createElement("div");
        this.board.setAttribute("id","board");
        this.container.appendChild(this.controls);
        this.container.appendChild(this.board);

        // Fill 'Controls' side
        this.title = document.createElement("div");
        this.title.setAttribute("id","title");
        this.form = document.createElement("div");
        this.form.setAttribute("id","form");
        this.buttons = document.createElement("div");
        this.buttons.setAttribute("id","buttons");

        this.controls.appendChild(this.title);
        this.controls.appendChild(this.form);
        this.controls.appendChild(this.buttons);

        this.h1 = document.createElement("h1");
        this.h1.textContent = "Knights Travails";
        this.title.appendChild(this.h1);

        this.start = document.createElement("div");
        this.start.setAttribute("id","start");
        this.start.classList.add("form-field");
        this.startSpan = document.createElement("span");
        this.startSpan.classList.add("error");
        this.startSpan.setAttribute("id","startSpan");
        this.startSpan.setAttribute("aria-live","polite");
        this.end = document.createElement("div");
        this.end.setAttribute("id","end");
        this.end.classList.add("form-field");
        this.endSpan = document.createElement("span");
        this.endSpan.classList.add("error");
        this.endSpan.setAttribute("id","endSpan");
        this.endSpan.setAttribute("aria-live","polite");
        this.form.appendChild(this.start);
        this.form.appendChild(this.startSpan);
        this.form.appendChild(this.end);
        this.form.appendChild(this.endSpan);

        this.startLabel = document.createElement("label");
        this.startLabel.setAttribute("for","startPos");
        this.startLabel.textContent = "Start position:";
        this.startInput = document.createElement("input");
        this.startInput.setAttribute("id","startPos");
        this.startInput.setAttribute("name","startPos");
        this.startInput.setAttribute("type","text");
        this.startInput.setAttribute("required","true");
        this.startInput.setAttribute("minLength","2");
        this.startInput.setAttribute("maxLength","2");
        this.startInput.setAttribute("size","2");
        this.startInput.setAttribute("placeholder","A1");
        this.start.appendChild(this.startLabel);
        this.start.appendChild(this.startInput);

        this.endLabel = document.createElement("label");
        this.endLabel.setAttribute("for","endPos");
        this.endLabel.textContent = "End position:";
        this.endInput = document.createElement("input");
        this.endInput.setAttribute("id","endPos");
        this.endInput.setAttribute("name","endPos");
        this.endInput.setAttribute("type","text");
        this.endInput.setAttribute("required","true");
        this.endInput.setAttribute("minLength","2");
        this.endInput.setAttribute("maxLength","2");
        this.endInput.setAttribute("size","2");
        this.endInput.setAttribute("placeholder","H8");
        this.end.appendChild(this.endLabel);
        this.end.appendChild(this.endInput);

        this.pathButton = document.createElement("button");
        this.pathButton.setAttribute("id","pathButton");
        this.pathButton.setAttribute("type","button");
        this.pathButton.textContent = "Calc Path";
        this.clearButton = document.createElement("button");
        this.clearButton.setAttribute("id","clearButton");
        this.clearButton.setAttribute("type","button");
        this.clearButton.textContent = "Clear";
        this.buttons.appendChild(this.pathButton);
        this.buttons.appendChild(this.clearButton);

        // Fill Board side
        this.chessBoard = document.createElement("div");
        this.chessBoard.setAttribute("id","chessBoard");
        this.board.appendChild(this.chessBoard);
        
        // 8th row
        this.headSquare8 = document.createElement("div");
        this.headSquare8.classList.add("head");
        this.headSquare8.textContent = 8;
        this.chessBoard.appendChild(this.headSquare8);
        this.squareA8 = document.createElement("div");
        this.squareA8.setAttribute("id","A8");
        this.squareA8.classList.add("light");
        this.squareA8.classList.add("square");
        this.chessBoard.appendChild(this.squareA8);
        this.squareB8 = document.createElement("div");
        this.squareB8.setAttribute("id","B8");
        this.squareB8.classList.add("dark");
        this.squareB8.classList.add("square");
        this.chessBoard.appendChild(this.squareB8);
        this.squareC8 = document.createElement("div");
        this.squareC8.setAttribute("id","C8");
        this.squareC8.classList.add("light");
        this.squareC8.classList.add("square");
        this.chessBoard.appendChild(this.squareC8);
        this.squareD8 = document.createElement("div");
        this.squareD8.setAttribute("id","D8");
        this.squareD8.classList.add("dark");
        this.squareD8.classList.add("square");
        this.chessBoard.appendChild(this.squareD8);
        this.squareE8 = document.createElement("div");
        this.squareE8.setAttribute("id","E8");
        this.squareE8.classList.add("light");
        this.squareE8.classList.add("square");
        this.chessBoard.appendChild(this.squareE8);
        this.squareF8 = document.createElement("div");
        this.squareF8.setAttribute("id","F8");
        this.squareF8.classList.add("dark");
        this.squareF8.classList.add("square");
        this.chessBoard.appendChild(this.squareF8);
        this.squareG8 = document.createElement("div");
        this.squareG8.setAttribute("id","G8");
        this.squareG8.classList.add("light");
        this.squareG8.classList.add("square");
        this.chessBoard.appendChild(this.squareG8);
        this.squareH8 = document.createElement("div");
        this.squareH8.setAttribute("id","H8");
        this.squareH8.classList.add("dark");
        this.squareH8.classList.add("square");
        this.chessBoard.appendChild(this.squareH8);

        // 7th row
        this.headSquare7 = document.createElement("div");
        this.headSquare7.classList.add("head");
        this.headSquare7.textContent = 7;
        this.chessBoard.appendChild(this.headSquare7);
        this.squareA7 = document.createElement("div");
        this.squareA7.setAttribute("id","A7");
        this.squareA7.classList.add("dark");
        this.squareA7.classList.add("square");
        this.chessBoard.appendChild(this.squareA7);
        this.squareB7 = document.createElement("div");
        this.squareB7.setAttribute("id","B7");
        this.squareB7.classList.add("light");
        this.squareB7.classList.add("square");
        this.chessBoard.appendChild(this.squareB7);
        this.squareC7 = document.createElement("div");
        this.squareC7.setAttribute("id","C7");
        this.squareC7.classList.add("dark");
        this.squareC7.classList.add("square");
        this.chessBoard.appendChild(this.squareC7);
        this.squareD7 = document.createElement("div");
        this.squareD7.setAttribute("id","D7");
        this.squareD7.classList.add("light");
        this.squareD7.classList.add("square");
        this.chessBoard.appendChild(this.squareD7);
        this.squareE7 = document.createElement("div");
        this.squareE7.setAttribute("id","E7");
        this.squareE7.classList.add("dark");
        this.squareE7.classList.add("square");
        this.chessBoard.appendChild(this.squareE7);
        this.squareF7 = document.createElement("div");
        this.squareF7.setAttribute("id","F7");
        this.squareF7.classList.add("light");
        this.squareF7.classList.add("square");
        this.chessBoard.appendChild(this.squareF7);
        this.squareG7 = document.createElement("div");
        this.squareG7.setAttribute("id","G7");
        this.squareG7.classList.add("dark");
        this.squareG7.classList.add("square");
        this.chessBoard.appendChild(this.squareG7);
        this.squareH7 = document.createElement("div");
        this.squareH7.setAttribute("id","H7");
        this.squareH7.classList.add("light");
        this.squareH7.classList.add("square");
        this.chessBoard.appendChild(this.squareH7);

        // 6th row
        this.headSquare6 = document.createElement("div");
        this.headSquare6.classList.add("head");
        this.headSquare6.textContent = 6;
        this.chessBoard.appendChild(this.headSquare6);
        this.squareA6 = document.createElement("div");
        this.squareA6.setAttribute("id","A6");
        this.squareA6.classList.add("light");
        this.squareA6.classList.add("square");
        this.chessBoard.appendChild(this.squareA6);
        this.squareB6 = document.createElement("div");
        this.squareB6.setAttribute("id","B6");
        this.squareB6.classList.add("dark");
        this.squareB6.classList.add("square");
        this.chessBoard.appendChild(this.squareB6);
        this.squareC6 = document.createElement("div");
        this.squareC6.setAttribute("id","C6");
        this.squareC6.classList.add("light");
        this.squareC6.classList.add("square");
        this.chessBoard.appendChild(this.squareC6);
        this.squareD6 = document.createElement("div");
        this.squareD6.setAttribute("id","D6");
        this.squareD6.classList.add("dark");
        this.squareD6.classList.add("square");
        this.chessBoard.appendChild(this.squareD6);
        this.squareE6 = document.createElement("div");
        this.squareE6.setAttribute("id","E6");
        this.squareE6.classList.add("light");
        this.squareE6.classList.add("square");
        this.chessBoard.appendChild(this.squareE6);
        this.squareF6 = document.createElement("div");
        this.squareF6.setAttribute("id","F6");
        this.squareF6.classList.add("dark");
        this.squareF6.classList.add("square");
        this.chessBoard.appendChild(this.squareF6);
        this.squareG6 = document.createElement("div");
        this.squareG6.setAttribute("id","G6");
        this.squareG6.classList.add("light");
        this.squareG6.classList.add("square");
        this.chessBoard.appendChild(this.squareG6);
        this.squareH6 = document.createElement("div");
        this.squareH6.setAttribute("id","H6");
        this.squareH6.classList.add("dark");
        this.squareH6.classList.add("square");
        this.chessBoard.appendChild(this.squareH6);

        // 5th row
        this.headSquare5 = document.createElement("div");
        this.headSquare5.classList.add("head");
        this.headSquare5.textContent = 5;
        this.chessBoard.appendChild(this.headSquare5);
        this.squareA5 = document.createElement("div");
        this.squareA5.setAttribute("id","A5");
        this.squareA5.classList.add("dark");
        this.squareA5.classList.add("square");
        this.chessBoard.appendChild(this.squareA5);
        this.squareB5 = document.createElement("div");
        this.squareB5.setAttribute("id","B5");
        this.squareB5.classList.add("light");
        this.squareB5.classList.add("square");
        this.chessBoard.appendChild(this.squareB5);
        this.squareC5 = document.createElement("div");
        this.squareC5.setAttribute("id","C5");
        this.squareC5.classList.add("dark");
        this.squareC5.classList.add("square");
        this.chessBoard.appendChild(this.squareC5);
        this.squareD5 = document.createElement("div");
        this.squareD5.setAttribute("id","D5");
        this.squareD5.classList.add("light");
        this.squareD5.classList.add("square");
        this.chessBoard.appendChild(this.squareD5);
        this.squareE5 = document.createElement("div");
        this.squareE5.setAttribute("id","E5");
        this.squareE5.classList.add("dark");
        this.squareE5.classList.add("square");
        this.chessBoard.appendChild(this.squareE5);
        this.squareF5 = document.createElement("div");
        this.squareF5.setAttribute("id","F5");
        this.squareF5.classList.add("light");
        this.squareF5.classList.add("square");
        this.chessBoard.appendChild(this.squareF5);
        this.squareG5 = document.createElement("div");
        this.squareG5.setAttribute("id","G5");
        this.squareG5.classList.add("dark");
        this.squareG5.classList.add("square");
        this.chessBoard.appendChild(this.squareG5);
        this.squareH5 = document.createElement("div");
        this.squareH5.setAttribute("id","H5");
        this.squareH5.classList.add("light");
        this.squareH5.classList.add("square");
        this.chessBoard.appendChild(this.squareH5);

        // 4th row
        this.headSquare4 = document.createElement("div");
        this.headSquare4.classList.add("head");
        this.headSquare4.textContent = 4;
        this.chessBoard.appendChild(this.headSquare4);
        this.squareA4 = document.createElement("div");
        this.squareA4.setAttribute("id","A4");
        this.squareA4.classList.add("light");
        this.squareA4.classList.add("square");
        this.chessBoard.appendChild(this.squareA4);
        this.squareB4 = document.createElement("div");
        this.squareB4.setAttribute("id","B4");
        this.squareB4.classList.add("dark");
        this.squareB4.classList.add("square");
        this.chessBoard.appendChild(this.squareB4);
        this.squareC4 = document.createElement("div");
        this.squareC4.setAttribute("id","C4");
        this.squareC4.classList.add("light");
        this.squareC4.classList.add("square");
        this.chessBoard.appendChild(this.squareC4);
        this.squareD4 = document.createElement("div");
        this.squareD4.setAttribute("id","D4");
        this.squareD4.classList.add("dark");
        this.squareD4.classList.add("square");
        this.chessBoard.appendChild(this.squareD4);
        this.squareE4 = document.createElement("div");
        this.squareE4.setAttribute("id","E4");
        this.squareE4.classList.add("light");
        this.squareE4.classList.add("square");
        this.chessBoard.appendChild(this.squareE4);
        this.squareF4 = document.createElement("div");
        this.squareF4.setAttribute("id","F4");
        this.squareF4.classList.add("dark");
        this.squareF4.classList.add("square");
        this.chessBoard.appendChild(this.squareF4);
        this.squareG4 = document.createElement("div");
        this.squareG4.setAttribute("id","G4");
        this.squareG4.classList.add("light");
        this.squareG4.classList.add("square");
        this.chessBoard.appendChild(this.squareG4);
        this.squareH4 = document.createElement("div");
        this.squareH4.setAttribute("id","H4");
        this.squareH4.classList.add("dark");
        this.squareH4.classList.add("square");
        this.chessBoard.appendChild(this.squareH4);

        // 3rd row
        this.headSquare3 = document.createElement("div");
        this.headSquare3.classList.add("head");
        this.headSquare3.textContent = 3;
        this.chessBoard.appendChild(this.headSquare3);
        this.squareA3 = document.createElement("div");
        this.squareA3.setAttribute("id","A3");
        this.squareA3.classList.add("dark");
        this.squareA3.classList.add("square");
        this.chessBoard.appendChild(this.squareA3);
        this.squareB3 = document.createElement("div");
        this.squareB3.setAttribute("id","B3");
        this.squareB3.classList.add("light");
        this.squareB3.classList.add("square");
        this.chessBoard.appendChild(this.squareB3);
        this.squareC3 = document.createElement("div");
        this.squareC3.setAttribute("id","C3");
        this.squareC3.classList.add("dark");
        this.squareC3.classList.add("square");
        this.chessBoard.appendChild(this.squareC3);
        this.squareD3 = document.createElement("div");
        this.squareD3.setAttribute("id","D3");
        this.squareD3.classList.add("light");
        this.squareD3.classList.add("square");
        this.chessBoard.appendChild(this.squareD3);
        this.squareE3 = document.createElement("div");
        this.squareE3.setAttribute("id","E3");
        this.squareE3.classList.add("dark");
        this.squareE3.classList.add("square");
        this.chessBoard.appendChild(this.squareE3);
        this.squareF3 = document.createElement("div");
        this.squareF3.setAttribute("id","F3");
        this.squareF3.classList.add("light");
        this.squareF3.classList.add("square");
        this.chessBoard.appendChild(this.squareF3);
        this.squareG3 = document.createElement("div");
        this.squareG3.setAttribute("id","G3");
        this.squareG3.classList.add("dark");
        this.squareG3.classList.add("square");
        this.chessBoard.appendChild(this.squareG3);
        this.squareH3 = document.createElement("div");
        this.squareH3.setAttribute("id","H3");
        this.squareH3.classList.add("light");
        this.squareH3.classList.add("square");
        this.chessBoard.appendChild(this.squareH3);

        // 2nd row
        this.headSquare2 = document.createElement("div");
        this.headSquare2.classList.add("head");
        this.headSquare2.textContent = 2;
        this.chessBoard.appendChild(this.headSquare2);
        this.squareA2 = document.createElement("div");
        this.squareA2.setAttribute("id","A2");
        this.squareA2.classList.add("light");
        this.squareA2.classList.add("square");
        this.chessBoard.appendChild(this.squareA2);
        this.squareB2 = document.createElement("div");
        this.squareB2.setAttribute("id","B2");
        this.squareB2.classList.add("dark");
        this.squareB2.classList.add("square");
        this.chessBoard.appendChild(this.squareB2);
        this.squareC2 = document.createElement("div");
        this.squareC2.setAttribute("id","C2");
        this.squareC2.classList.add("light");
        this.squareC2.classList.add("square");
        this.chessBoard.appendChild(this.squareC2);
        this.squareD2 = document.createElement("div");
        this.squareD2.setAttribute("id","D2");
        this.squareD2.classList.add("dark");
        this.squareD2.classList.add("square");
        this.chessBoard.appendChild(this.squareD2);
        this.squareE2 = document.createElement("div");
        this.squareE2.setAttribute("id","E2");
        this.squareE2.classList.add("light");
        this.squareE2.classList.add("square");
        this.chessBoard.appendChild(this.squareE2);
        this.squareF2 = document.createElement("div");
        this.squareF2.setAttribute("id","F2");
        this.squareF2.classList.add("dark");
        this.squareF2.classList.add("square");
        this.chessBoard.appendChild(this.squareF2);
        this.squareG2 = document.createElement("div");
        this.squareG2.setAttribute("id","G2");
        this.squareG2.classList.add("light");
        this.squareG2.classList.add("square");
        this.chessBoard.appendChild(this.squareG2);
        this.squareH2 = document.createElement("div");
        this.squareH2.setAttribute("id","H2");
        this.squareH2.classList.add("dark");
        this.squareH2.classList.add("square");
        this.chessBoard.appendChild(this.squareH2);

        // 1st row
        this.headSquare1 = document.createElement("div");
        this.headSquare1.classList.add("head");
        this.headSquare1.textContent = 1;
        this.chessBoard.appendChild(this.headSquare1);
        this.squareA1 = document.createElement("div");
        this.squareA1.setAttribute("id","A1");
        this.squareA1.classList.add("dark");
        this.squareA1.classList.add("square");
        this.chessBoard.appendChild(this.squareA1);
        this.squareB1 = document.createElement("div");
        this.squareB1.setAttribute("id","B1");
        this.squareB1.classList.add("light");
        this.squareB1.classList.add("square");
        this.chessBoard.appendChild(this.squareB1);
        this.squareC1 = document.createElement("div");
        this.squareC1.setAttribute("id","C1");
        this.squareC1.classList.add("dark");
        this.squareC1.classList.add("square");
        this.chessBoard.appendChild(this.squareC1);
        this.squareD1 = document.createElement("div");
        this.squareD1.setAttribute("id","D1");
        this.squareD1.classList.add("light");
        this.squareD1.classList.add("square");
        this.chessBoard.appendChild(this.squareD1);
        this.squareE1 = document.createElement("div");
        this.squareE1.setAttribute("id","E1");
        this.squareE1.classList.add("dark");
        this.squareE1.classList.add("square");
        this.chessBoard.appendChild(this.squareE1);
        this.squareF1 = document.createElement("div");
        this.squareF1.setAttribute("id","F1");
        this.squareF1.classList.add("light");
        this.squareF1.classList.add("square");
        this.chessBoard.appendChild(this.squareF1);
        this.squareG1 = document.createElement("div");
        this.squareG1.setAttribute("id","G1");
        this.squareG1.classList.add("dark");
        this.squareG1.classList.add("square");
        this.chessBoard.appendChild(this.squareG1);
        this.squareH1 = document.createElement("div");
        this.squareH1.setAttribute("id","H1");
        this.squareH1.classList.add("light");
        this.squareH1.classList.add("square");
        this.chessBoard.appendChild(this.squareH1);

        // Header letters row
        this.headSquare = document.createElement("div");
        this.headSquare.classList.add("head");
        this.chessBoard.appendChild(this.headSquare);
        this.headSquareA = document.createElement("div");
        this.headSquareA.classList.add("head");
        this.headSquareA.textContent = "A";
        this.chessBoard.appendChild(this.headSquareA);
        this.headSquareB = document.createElement("div");
        this.headSquareB.classList.add("head");
        this.headSquareB.textContent = "B";
        this.chessBoard.appendChild(this.headSquareB);
        this.headSquareC = document.createElement("div");
        this.headSquareC.classList.add("head");
        this.headSquareC.textContent = "C";
        this.chessBoard.appendChild(this.headSquareC);
        this.headSquareD = document.createElement("div");
        this.headSquareD.classList.add("head");
        this.headSquareD.textContent = "D";
        this.chessBoard.appendChild(this.headSquareD);
        this.headSquareE = document.createElement("div");
        this.headSquareE.classList.add("head");
        this.headSquareE.textContent = "E";
        this.chessBoard.appendChild(this.headSquareE);
        this.headSquareF = document.createElement("div");
        this.headSquareF.classList.add("head");
        this.headSquareF.textContent = "F";
        this.chessBoard.appendChild(this.headSquareF);
        this.headSquareG = document.createElement("div");
        this.headSquareG.classList.add("head");
        this.headSquareG.textContent = "G";
        this.chessBoard.appendChild(this.headSquareG);
        this.headSquareH = document.createElement("div");
        this.headSquareH.classList.add("head");
        this.headSquareH.textContent = "H";
        this.chessBoard.appendChild(this.headSquareH);

        // Declare Event Listeners for inputs and buttons
        this.startInput.addEventListener("keyup", () => {
            // When user leaves the input, we check if the field is valid
            if (this.startInput.validity.valid && this.checkPattern(this.startInput)) {
                // In case there is an error message visible and the field is valid yet, remove the error message
                this.startSpan.textContent = "";
                this.startInput.classList.remove("invalid");
                // Now we need to place the knight
                const square = document.getElementById(this.startInput.value);
                this.clearSquares();
                square.innerHTML = "&#9822;";
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

    checkPattern(input) {
        return this.squareRegExp.test(input.value);
    }

    showError(e) {
        if (e === this.startInput) {
            this.startInput.classList.add("invalid");
            if (this.startInput.validity.valueMissing) {
                this.startSpan.textContent = "You need to enter an start square for the Knight";
            } else if (!this.checkPattern(this.startInput)) {
                this.startSpan.textContent = "Entered value needs to be a valid Chess Board Square";
            }
        }
        if (e === this.endInput) {
            this.endInput.classList.add("invalid");
            if (this.endInput.validity.valueMissing) {
                this.endSpan.textContent = "You need to enter an end square for the Knight";
            } else if (!this.checkPattern(this.endInput)) {
                this.endSpan.textContent = "Entered value needs to be a valid Chess Board Square";
            }
        }
    }

    // eslint-disable-next-line class-methods-use-this
    clearSquares() {
        const squares = document.querySelectorAll(".square");
        for (let i = 0; i < squares.length; i += 1) {
            squares[i].textContent = "";
        }
    }
}