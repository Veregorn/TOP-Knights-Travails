// Create an element with an optional CSS id
function createElementWithId(tag, id) {
    const element = document.createElement(tag);
    if (id) {
      element.setAttribute("id", id);
    }
  
    return element;
}
  
// Create an element with an optional CSS class
function createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    if (className) {
        element.classList.add(className);
    }

    return element;
}

// Create an HTML skeleton
const container = createElementWithId("div","container");
const controls = createElementWithId("div","controls");
const board = createElementWithId("div","board");
container.appendChild(controls);
container.appendChild(board);