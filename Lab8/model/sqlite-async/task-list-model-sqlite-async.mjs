'use strict';
// Το sqlite-async χρησιμοποιεί το ίδιο API όπως και το sqlite3, αλλά με promises
import { Database } from 'sqlite-async';
import bcrypt from 'bcrypt'

let sql;
try {
    sql = await Database.open('model/db/tasks.sqlite')
} catch (error) {
    throw Error('Δεν ήταν δυνατό να ανοίξει η βάση δεδομένων.' + error);
}

export let getAllTasks = async (userId) => {
    try {
        //Φέρε όλες τις εργασίας από τη βάση
        const stmt = await sql.prepare("SELECT * FROM task WHERE user_id = ?");
        const tasks = await stmt.all(userId);
        return tasks;
    } catch (err) {
        res.send(err);
    }
}

// Στην πραγματικότητα δε χρειάζεται
export let getTask = async (taskId, userId) => {
    //Φέρε μόνο μια εγγραφή (LIMIT) που να έχει id ίσο με taskId
    const stmt = await sql.prepare("SELECT * FROM task WHERE id = ? AND user_id = ? LIMIT 0, 1");
    try {
        const task = await stmt.all(taskId, userId);
        return task;
    } catch (err) {
        res.send(err);
    }
}

//Προσθήκη μιας νέας εργασίας
export let addTask = async (newTask, userId) => {
    //TODO
}

//Αλλαγή της κατάστασης μιας εργασίας
export let toggleTask = async (taskId, userId) => {
    //TODO
}

//Αφαίρεση μιας εργασίας
export let removeTask = async (taskId, userId) => {
    //TODO
}
