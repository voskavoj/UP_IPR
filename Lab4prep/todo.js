// DOCUMENT
const btnClear = document.querySelector('#clear-button');
const btnNew = document.querySelector('#submit-button');
const inpNewItem = document.querySelector('#new-item');
const lstTodoList = document.querySelector('#todo-list');

// GLOBALS
let todo_items = [];

// EVENT LISTENERS
btnNew.addEventListener("click", add_new_todo_item);
btnClear.addEventListener("click", remove_all_items);

// CLASSES
class TodoListItem {
    constructor(active, text)
    {
        this.unchecked = active;
        this.text = text;

        this.id = Date.now().toString();
        this.node = this.create_node();
    }

    create_node() {
        let node = document.createElement("li");
        if (this.unchecked)
            node.setAttribute('class', `todo-item`);
        else
            node.setAttribute('class', `todo-item-checked`);

        // node.setAttribute('data-key', this.id);
        node.innerHTML = TodoListItem.get_inner_html(this.id, this.text)

        return node;
    }

    create_buttons_event_listeners()
    {
        document.getElementById(this.id + "-btn-check").addEventListener("click", make_todo_list_item_checked);
        document.getElementById(this.id + "-btn-remove").addEventListener("click", make_todo_list_item_removed);
    }

    make_removed()
    {
        this.node.remove();
        remove_todo_list_item_from_list(this);
        console.log("Item removed");
    }

    make_checked()
    {
        if (this.unchecked)
        {
            this.unchecked = false;
            this.node.setAttribute("class", "todo-item-checked")
            console.log("Item checked");
        }
        else
        {
            this.unchecked = true;
            this.node.setAttribute("class", "todo-item")
            console.log("Item unchecked");
        }
    }

    static get_inner_html(id, text)
    {
        return `
    <span>${text}</span>
    <button id="${id}-btn-check" class="btn-check-todo"><span title="Check" class="material-icons"> done </span></button>
    <button id="${id}-btn-remove" class="btn-remove-todo"><span title="Delete" class="material-icons"> close </span></button>
  `;
    }
}

// FUNCTIONS
function add_new_todo_item()
{
    // get input text
    const input_text = inpNewItem.value.trim();
    console.log(input_text); // debug

    // save new item
    const new_todo_item = new TodoListItem(true, input_text);
    todo_items.push(new_todo_item);

    // render new item in html
    lstTodoList.append(new_todo_item.node);
    new_todo_item.create_buttons_event_listeners()
    console.log(todo_items) // debug
}

function make_todo_list_item_checked()
{
    let id = this.id.split("-", 1)[0];
    console.log(id) // debug

    let todo_item = todo_items.find(item => item.id === id);
    if (todo_item)
        todo_item.make_checked();
    else
        console.log("Item id " + id + " not found")
}

function make_todo_list_item_removed()
{
    let id = this.id.split("-", 1)[0];
    console.log(id) // debug

    let todo_item = todo_items.find(item => item.id === id);
    if (todo_item)
        todo_item.make_removed();
    else
        console.log("Item id " + id + " not found")
}

function remove_todo_list_item_from_list(item)
{
    const index = todo_items.indexOf(item);
    if (index > -1)
    {
        todo_items.splice(index, 1);
    }
}

function remove_all_items()
{
    while (todo_items.length > 0)
        todo_items[0].make_removed();
    console.log("All items deleted"); // debug
}
