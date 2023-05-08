// Express.js
import express from 'express'
// Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars'
const app = express()
const router = express.Router();
const port = process.env.PORT || '3000';

// Δηλώνουμε πως ο φάκελος "public" θα περιέχει τα στατικά αρχεία, π.χ. το http://127.0.0.1:3000/style.css θα επιστρέψει, το αρχείο /public/style.css
// Specify that the "public" folder will contain the static files, e.g. http://127.0.0.1:3000/style.css will return, the file /public/style.css
app.use(express.static('public'))

// Χρήση της Handlebars σαν template engine. Σημ.: η engine πρέπει να έχει ίδιο όνομα με το extname, για να αναγνωριστεί το extname (το κάνουμε αυτό για να έχουμε αρχεία με κατάληξη .hbs / το default είναι .handlebars)
// Use Handlebars as a template engine. Note: the engine must have the same name as the extname, in order for the extname to be recognized (we do this to have files ending in .hbs / the default is .handlebars)
app.engine('hbs', engine({ extname: 'hbs' }));

// Ορίζουμε πως η 'hbs' θα είναι η μηχανή template (δηλ. θα ενεργοποιείται με την res.render()) 
// Set 'hbs' to be the template engine (i.e. activated with res.render())
app.set('view engine', 'hbs');

// ---------------------------------------------
// Model - το μοντέλο δεδομένων μας είναι αποθηκευμένο στη RAM. 
// Model - our data model is stored in RAM.
let tasks = [
    { "id": 1, "task": "Stuff", "status": 0, "created_at": "2023-05-07 09:08:10" },
    { "id": 2, "task": "More stuff", "status": 0, "created_at": "2023-05-10 23:50:40" },
    { "id": 3, "task": "Still more stuff", "status": 1, "created_at": "2023-05-10 23:50:40" },
    { "id": 4, "task": "Stuff, except crossed", "status": 1, "created_at": "2023-05-10 23:50:40" },
    { "id": 5, "task": "Ohh, different stuff!", "status": 1, "created_at": "2023-05-10 23:50:50" }
]

let getAllTasks = function (callback) {
    callback(null, tasks);
};

// ---------------------------------------------
// Controller - όλη η λογική που χρειάζεται να υλοποιεί ο εξυπηρετητής
// Controller - the business logic that the server needs to implement

// Θα πρέπει να επιστρέφει ένα task ανάλογα με το id του
// Should return a task based on its id
let getTaskById = function (taskId, callback) {
    // "task" is now a dummy object. Should be replaced with a the real task (with id=taskId) from the data model 
    let task = { "id": taskId, "task": "Να βρω σφάλματα", "status": 1, "created_at": "2023-05-07 09:08:10" };
    callback(null, task);
};

// Απαντάει σε αίτημα για όλα τα tasks
// Answers a request for all tasks
let listAllTasks = function (req, res) {
    getAllTasks(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        // console.log('res', tasks);
        res.send(tasks); // sends the object to the client
    });
};

// Απαντάει σε αίτημα για συγκεκριμένο task
// Answers a request for a specific task
let listSingleTask = function (req, res) {
    // read the value of the taskId parameter from the request url
    getTaskById(req.params.taskId, function (err, task) {
        if (err) {
            res.send(err);
        }
        // console.log('res', task);
        res.send(task); // sends the object to the client
    });
}

// Δημιουργεί την σελίδα που φορτώνεται την 1η φόρτωση της ιστοσελίδας στον φυλλομετρητή 
// Creates the page that is shown with the first user request, in the browser
let listAllTasksRender = function (req, res) {
    getAllTasks(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        // console.log('tasks', tasks);
        // στέλνει το object "tasks" στο template "tasks"
        // sends the "tasks" object to the "tasks" template
        res.render('tasks', { tasks: tasks }); 
    });
}

let toggleTask = function (req, res)
{
    let task_id = req.query["taskid"];
    let [index, task] = search_task_by_id(task_id);

    if (task)
    {
        task.status = 1 - task.status;
        tasks[index] = task;
    }

    return res.redirect('/');
}

let addTask = function (req, res)
{
    let task_text = req.query["taskName"];
    if (task_text)
    {
        tasks.push({ "id": get_available_id(), "task": task_text, "status": 0, "created_at": get_task_timestamp()});
    }

    return res.redirect('/');
}

let deleteTask = function (req, res)
{
    let task_id = req.query["taskid"];
    let [index, task] = search_task_by_id(task_id);

    if (task)
    {
        tasks.splice(index, 1);
    }

    return res.redirect('/');
}

function search_task_by_id(id)
{
    let i = 0;
    for (const t of tasks)
    {
        if (t.id == id)
            return [i, t];
        i++;
    }
    return [null, null];
}

function get_available_id()
{
    let task_ids = [0];
    for (const t of tasks)
        task_ids.push(t.id);
    return Math.max(...task_ids) + 1;
}

function get_task_timestamp()
{
    let date = new Date();
    return date.toLocaleString("gr-GR");
}

// Χρησιμοποίησε το αντικείμενο δρομολόγησης `router` 
// load the router 'routeρ'
app.use(router); 

// Όρισε δύο διαδρομές
// Define two routes
router.route('/api/tasks').get(listAllTasks);
router.route('/').get(listAllTasksRender);
router.route('/toggle').get(toggleTask);
router.route('/delete').get(deleteTask);
router.route('/add').get(addTask);


// Επίσης έτσι: 
// Could also be done like this:
// app.route('/api/tasks').get(listAllTasks);
// app.route('/').get(listAllTasksRender);


const server = app.listen(port, () => { console.log(`http://127.0.0.1:${port}`) });

