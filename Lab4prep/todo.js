//btnClear points to the #clear-button element in the DOM
const btnClear = document.querySelector('#clear-button');
const btnNew = document.querySelector('#submit-button');
const inpNewItem = document.querySelector('#new-item');
const lstTodoList = document.querySelector('#todo-list');

let todoItems = [];

//Adding and event listener: btnClear will react on the click event
//When the btnClear is clicked, then the callback function
//(the 2nd argument of the event listener) will be called. 

btnNew.addEventListener("click", function() {
    const input_text = inpNewItem.value.trim();
    console.log(input_text);
    addTodo(input_text);
});
btnClear.addEventListener("click", function() {
    console.log("All items deleted");
});

// FUNCTIONS


function renderTodo(todo) {
    // Select the first element with a class of `js-todo-list`
    const list = lstTodoList;

    // Use the ternary operator to check if `todo.checked` is true
    // if so, assign 'done' to `isChecked`. Otherwise, assign an empty string
    const isChecked = todo.checked ? 'done': '';
    // Create an `li` element and assign it to `node`
    const node = document.createElement("li");
    // Set the class attribute
    node.setAttribute('class', `todo-item ${isChecked}`);
    // Set the data-key attribute to the id of the todo
    node.setAttribute('data-key', todo.id);
    // Set the contents of the `li` element created above
    node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

    // Append the element to the DOM as the last child of
    // the element referenced by the `list` variable
    list.append(node);
}

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoItems.push(todo);
    renderTodo(todo);
}
