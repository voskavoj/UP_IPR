// Κώδικας που θα εκτελείται όταν φορτωθεί η σελίδα:
// Code that will run when the page is loaded:
//
// Γράψτε εδώ τον κώδικά σας
// Write your code here
//

//--------------------------------------------------
// Ο παραπάνω κώδικας θα κάνει χρήση των εξής συναρτήσεων:
// The above code will use the following functions:

let task_list = document.getElementsByClassName("task-list")[0];
const cntTotal = document.getElementsByClassName('total')[0];
const cntLeft = document.getElementsByClassName('left-todo')[0];

getDoneCount();
getTotalCount();
colorEveryOddTask();

// 1. Επιστρέφει το πλήθος των εργασιών που έχουν σημειωθεί ως ολοκληρωμένες
// 1. Returns the count of the tasks that have been marked as done
function getDoneCount() {
    let cnt_total_items = task_list.getElementsByTagName("li").length;
    let cnt_done_items = task_list.getElementsByClassName("done").length;
    let cnt_left_items = cnt_total_items - cnt_done_items;
    cntLeft.innerHTML = cnt_left_items.toString();
}

// 2. Επιστρέφει το πλήθος όλων των εργασιών
// 2. Returns the total count of all the tasks
function getTotalCount() {
    let cnt_total_items = task_list.getElementsByTagName("li").length;
    cntTotal.innerHTML = cnt_total_items.toString();
}

// 3. Χρωματίζει όλες τις άρτιες εργασίες
// 3. Colors every odd task
function colorEveryOddTask() {
    let total_items = task_list.getElementsByTagName("li");
    for (let i = 0; i < total_items.length; i++) {
        if (i % 2 === 0)
        {
            total_items[i].getElementsByTagName("span")[0].style.backgroundColor = "#e6e6e6";
        }
    }
}
