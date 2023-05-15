'use strict';

// Το better-slite3 είναι εντελώς σύγχρονο
import db from 'better-sqlite3'
const sql = new db('model/db/tasks.sqlite', { fileMustExist: true });


export let getAllTasks = (userId) => {
    //Φέρε όλες τις εργασίας από τη βάση
    const stmt = sql.prepare("SELECT * FROM task WHERE user_id = ?");
    let tasks;
    try {
        tasks = stmt.all(userId);
        return tasks;
    } catch (err) {
        throw err;
    }
}

//Προσθήκη μιας νέας εργασίας
export let addTask = (newTask, userId) => {
    //Αυτό το ερώτημα εισάγει μια νέα εγγραφή
    //Η πρώτη και η τελευταία τιμή (το null και το CURRENT_TIMESTAMP) εισάγονται από την SQLite
    //Το null αφήνει την SQLite να διαλέξει τιμή (αύξοντας αριθμός)
    //To CURRENT_TIMESTAMP σημαίνει την τρέχουσα ώρα και ημερομηνία
    const stmt = sql.prepare('INSERT INTO task VALUES (null, ?, ?, CURRENT_TIMESTAMP, ?)');
    let info;

    try {
        info = stmt.run(newTask.task, newTask.status, userId);
        return true;
    }
    catch (err) {
        throw err;
    }
}

//Αλλαγή της κατάστασης μιας εργασίας
export let toggleTask = (taskId, userId) => {
    const stmt_read = sql.prepare('SELECT status FROM task WHERE id=? AND user_id=?');
    const stmt_toggle = sql.prepare('UPDATE task SET status=? WHERE id=? AND user_id=?');
    let info_read, info_toggle;

    try {
        info_read = stmt_read.all(taskId, userId);
        let task_status = info_read[0].status;
        task_status = 1 - task_status;
        info_toggle = stmt_toggle.run(task_status, taskId, userId);
        return true;
    }
    catch (err) {
        throw err;
    }
}

//Αφαίρεση μιας εργασίας
export let removeTask = (taskId, userId) => {
    const stmt = sql.prepare('DELETE FROM task WHERE id=? AND user_id=?');
    let info;

    try {
        info = stmt.run(taskId, userId);
        return true;
    }
    catch (err) {
        throw err;
    }
}
