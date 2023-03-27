// DOCUMENT
const inpNewItem = document.querySelector('#item');
const lstTodoList = document.getElementsByClassName('task-list')[0];
const cntTotal = document.getElementsByClassName('total')[0];
const cntLeft = document.getElementsByClassName('left-todo')[0];

// GLOBALS
let todo_items = [];
let task_list = document.getElementsByClassName("task-list")[0];

// EVENT LISTENERS
// listen for enter key on input field
inpNewItem.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && inpNewItem.value !== "") {
        add_new_todo_item();
        inpNewItem.value = "";
        // todo to separate function
    }
});

// PAGE FUNCTIONS
function on_page_load()
{
    on_page_change();
}
function on_page_change()
{
    update_statistics();
    update_task_time_remaining();
    style_every_odd_task();
}
on_page_load(); // init

// CLASSES
class TodoListItem {
    constructor(active, text)
    {
        this.unchecked = active;
        this.text = text;

        this.id = Date.now().toString();
        this.timestamp = Date.now();
        this.node = this.create_node();
    }

    create_node() {
        let node = document.createElement("li");
        if (this.unchecked)
            node.setAttribute('class', `todo-item`);
        else
            node.setAttribute('class', `done`);

        // node.setAttribute('data-key', this.id);
        node.innerHTML = TodoListItem.get_inner_html(this.id, this.text, this.timestamp)

        return node;
    }

    create_event_listeners()
    {
        document.getElementById(this.id + "-line").addEventListener("click", make_todo_list_item_checked);
        document.getElementById(this.id + "-line").addEventListener("dblclick", make_todo_list_item_removed);
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
            this.node.setAttribute("class", "done")
            console.log("Item checked");
        }
        else
        {
            this.unchecked = true;
            this.node.setAttribute("class", "todo-item")
            console.log("Item unchecked");
        }
    }

    set_time_passed()
    {
        let time_passed = Date.now() - this.timestamp;
        let days_remaining = Math.floor(time_passed / 1000 / 86400);
        if (days_remaining < 1)
            time_passed = "Today";
        else if (days_remaining === 1)
            time_passed = "Yesterday";
        else
            time_passed = days_remaining.toString() + " days ago";

        document.getElementById(this.id + "-time-passed").innerHTML = time_passed;
    }

    static get_inner_html(id, text, timestamp)
    {
        let date = new Date(timestamp);
        date = date.toLocaleDateString("en-GB", {day: 'numeric', year: 'numeric', month: 'long'});
        return `
    <div class="todo-item-time-info"><p></p>${date} <p id="${id}-time-passed"></p></div>
    <span id="${id}-line">${text}</span>
        `;
    }
}

// FUNCTIONS
function add_new_todo_item() {
    // get input text
    const input_text = inpNewItem.value.trim();
    console.log(input_text); // debug

    // check for empty input
    if (input_text === "")
    {
        console.log("Empty inputs are not allowed!");
        return;
    }

    // clear input field
    inpNewItem.value = "";

    // save new item
    const new_todo_item = new TodoListItem(true, input_text);
    todo_items.push(new_todo_item);

    // render new item in html
    lstTodoList.append(new_todo_item.node);
    new_todo_item.create_event_listeners();
    new_todo_item.set_time_passed();
    console.log(todo_items) // debug
    on_page_change();
}

function make_todo_list_item_checked()
{
    let id = this.id.split("-", 1)[0];
    console.log(id) // debug

    let todo_item = todo_items.find(item => item.id === id);
    if (todo_item)
        todo_item.make_checked();
    else
        console.log("Item id " + id + " not found");
    on_page_change();
}

function make_todo_list_item_removed()
{
    let id = this.id.split("-", 1)[0];
    console.log(id) // debug

    let todo_item = todo_items.find(item => item.id === id);
    if (todo_item)
        todo_item.make_removed();
    else
        console.log("Item id " + id + " not found");
    on_page_change();
}

function remove_todo_list_item_from_list(item)
{
    const index = todo_items.indexOf(item);
    if (index > -1)
    {
        todo_items.splice(index, 1);
    }
}

// updates task statistics
function update_statistics()
{
    let cnt_total_items = task_list.getElementsByTagName("li").length;
    let cnt_done_items = task_list.getElementsByClassName("done").length;
    let cnt_left_items = cnt_total_items - cnt_done_items;
    cntTotal.innerHTML = cnt_total_items.toString();
    cntLeft.innerHTML = cnt_left_items.toString();
}

// updates time remaining of all tasks
function update_task_time_remaining()
{
    for (let i = 0; i < todo_items.length; i++)
    {
        todo_items[i].set_time_passed();
    }
}

// adds grey background to every odd task
function style_every_odd_task() {
    let total_items = task_list.getElementsByTagName("li");
    for (let i = 0; i < total_items.length; i++)
    {
        let item_text = total_items[i].getElementsByTagName("span")[0];
        if (i % 2 === 0) // set background
            item_text.style.backgroundColor = "#e6e6e6";
        else // unset background
            item_text.style.backgroundColor = null;
    }
}
