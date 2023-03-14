// Class that builds a user interface for our App
export default class UIView {
    constructor() {
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
        this.end = document.createElement("div");
        this.end.setAttribute("id","end");
        this.end.classList.add("form-field");
        this.form.appendChild(this.start);
        this.form.appendChild(this.end);

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
        
        // 1st row
        this.headSquare8 = document.createElement("div");
        this.headSquare8.classList.add("head");
        this.headSquare8.textContent = 8;
        this.chessBoard.appendChild(this.headSquare8);
        this.squareA8 = document.createElement("div");
        this.squareA8.setAttribute("id","A8");
        this.squareA8.classList.add("light");
        this.chessBoard.appendChild(this.squareA8);
        this.squareB8 = document.createElement("div");
        this.squareB8.setAttribute("id","B8");
        this.squareB8.classList.add("dark");
        this.chessBoard.appendChild(this.squareB8);
        this.squareC8 = document.createElement("div");
        this.squareC8.setAttribute("id","C8");
        this.squareC8.classList.add("light");
        this.chessBoard.appendChild(this.squareC8);
        this.squareD8 = document.createElement("div");
        this.squareD8.setAttribute("id","D8");
        this.squareD8.classList.add("dark");
        this.chessBoard.appendChild(this.squareD8);
        this.squareE8 = document.createElement("div");
        this.squareE8.setAttribute("id","E8");
        this.squareE8.classList.add("light");
        this.chessBoard.appendChild(this.squareE8);
        this.squareF8 = document.createElement("div");
        this.squareF8.setAttribute("id","F8");
        this.squareF8.classList.add("dark");
        this.chessBoard.appendChild(this.squareF8);
        this.squareG8 = document.createElement("div");
        this.squareG8.setAttribute("id","G8");
        this.squareG8.classList.add("light");
        this.chessBoard.appendChild(this.squareG8);
        this.squareH8 = document.createElement("div");
        this.squareH8.setAttribute("id","H8");
        this.squareH8.classList.add("dark");
        this.chessBoard.appendChild(this.squareH8);

        // 2nd row
        this.headSquare7 = document.createElement("div");
        this.headSquare7.classList.add("head");
        this.headSquare7.textContent = 7;
        this.chessBoard.appendChild(this.headSquare7);
        this.squareA7 = document.createElement("div");
        this.squareA7.setAttribute("id","A7");
        this.squareA7.classList.add("dark");
        this.chessBoard.appendChild(this.squareA7);
        this.squareB7 = document.createElement("div");
        this.squareB7.setAttribute("id","B7");
        this.squareB7.classList.add("light");
        this.chessBoard.appendChild(this.squareB7);
        this.squareC7 = document.createElement("div");
        this.squareC7.setAttribute("id","C7");
        this.squareC7.classList.add("dark");
        this.chessBoard.appendChild(this.squareC7);
        this.squareD7 = document.createElement("div");
        this.squareD7.setAttribute("id","D7");
        this.squareD7.classList.add("light");
        this.chessBoard.appendChild(this.squareD7);
        this.squareE7 = document.createElement("div");
        this.squareE7.setAttribute("id","E7");
        this.squareE7.classList.add("dark");
        this.chessBoard.appendChild(this.squareE7);
        this.squareF7 = document.createElement("div");
        this.squareF7.setAttribute("id","F7");
        this.squareF7.classList.add("light");
        this.chessBoard.appendChild(this.squareF7);
        this.squareG7 = document.createElement("div");
        this.squareG7.setAttribute("id","G7");
        this.squareG7.classList.add("dark");
        this.chessBoard.appendChild(this.squareG7);
        this.squareH7 = document.createElement("div");
        this.squareH7.setAttribute("id","H7");
        this.squareH7.classList.add("light");
        this.chessBoard.appendChild(this.squareH7);

        // 3rd row
        this.headSquare6 = document.createElement("div");
        this.headSquare6.classList.add("head");
        this.headSquare6.textContent = 6;
        this.chessBoard.appendChild(this.headSquare6);
        this.squareA6 = document.createElement("div");
        this.squareA6.setAttribute("id","A6");
        this.squareA6.classList.add("light");
        this.chessBoard.appendChild(this.squareA6);
        this.squareB6 = document.createElement("div");
        this.squareB6.setAttribute("id","B6");
        this.squareB6.classList.add("dark");
        this.chessBoard.appendChild(this.squareB6);
        this.squareC6 = document.createElement("div");
        this.squareC6.setAttribute("id","C6");
        this.squareC6.classList.add("light");
        this.chessBoard.appendChild(this.squareC6);
        this.squareD6 = document.createElement("div");
        this.squareD6.setAttribute("id","D6");
        this.squareD6.classList.add("dark");
        this.chessBoard.appendChild(this.squareD6);
        this.squareE6 = document.createElement("div");
        this.squareE6.setAttribute("id","E6");
        this.squareE6.classList.add("light");
        this.chessBoard.appendChild(this.squareE6);
        this.squareF6 = document.createElement("div");
        this.squareF6.setAttribute("id","F6");
        this.squareF6.classList.add("dark");
        this.chessBoard.appendChild(this.squareF6);
        this.squareG6 = document.createElement("div");
        this.squareG6.setAttribute("id","G6");
        this.squareG6.classList.add("light");
        this.chessBoard.appendChild(this.squareG6);
        this.squareH6 = document.createElement("div");
        this.squareH6.setAttribute("id","H6");
        this.squareH6.classList.add("dark");
        this.chessBoard.appendChild(this.squareH6);
    }
}