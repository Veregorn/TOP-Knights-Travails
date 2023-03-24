// Class that represents a Controller in a MVC architecture
// It manages the logic of our App
export default class Controller {
    constructor(model,view) {
        this._chessBoard = model;
        this._ui = view;
    }

    
}