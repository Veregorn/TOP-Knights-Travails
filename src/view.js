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
        this.end = document.createElement("div");
        this.end.setAttribute("id","end");
        this.form.appendChild(this.start);
        this.form.appendChild(this.end);

        this.startLabel = document.createElement("label");
        this.startLabel.setAttribute("for","startPos");
        this.startLabel.textContent = "Start position:";
        this.startInput = document.createElement("input");
        this.startInput.setAttribute("id","startPos");
        this.startInput.setAttribute("name","startPos");
        this.startInput.setAttribute("type","text");
        this.start.appendChild(this.startLabel);
        this.start.appendChild(this.startInput);

        this.endLabel = document.createElement("label");
        this.endLabel.setAttribute("for","endPos");
        this.endLabel.textContent = "End position:";
        this.endInput = document.createElement("input");
        this.endInput.setAttribute("id","endPos");
        this.endInput.setAttribute("name","endPos");
        this.endInput.setAttribute("type","text");
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
    }
}