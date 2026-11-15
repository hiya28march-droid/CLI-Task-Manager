const fs = require('fs');

const command = process.argv[2];
const taskId = Number(process.argv[3]);
const taskName = command === 'add' ? process.argv[3] : process.argv[4];

const data = fs.readFileSync('tasks.json', 'utf-8');

let tasks = JSON.parse(data);



//add a new task
if (command === 'add') {
    if(!taskName){
        console.log("Task name is required!");
        return;
    }
    else{
       
    let newId = 1;

if (tasks.length > 0) {
    newId = Math.max(...tasks.map(function(task) {
        return task.id;
    })) + 1;
    
}
    tasks.push({
        id: newId,
        title: taskName
    });

    fs.writeFileSync('tasks.json', JSON.stringify(tasks));
}
}

//list all tasks
if (command === 'list') {
    tasks.forEach(function(task) {
        console.log(task.id, task.title);
    });
}

//update a task

if (command === 'update') {
    if(!taskId || !taskName){
        console.log("Task ID and name are required!");
        return;
    }
    else{
    let found = false;
    tasks.forEach(function(task) {
       
        
        if (task.id === taskId) {
            task.title = taskName;
            found = true;
        }
    });
    if (!found) {
        console.log("Task not found!");
    }

    fs.writeFileSync('tasks.json', JSON.stringify(tasks));
}
}

//delete a task
if (command === 'delete') {
    if(!taskId){
        console.log("Task ID is required!");
        return;
    }
    else{
    let found = false;
    tasks = tasks.filter(function(task) {
        if(task.id === taskId){
            found = true;
            return false;
        }
        return true;

    });
    if (!found) {
        console.log("Task not found!");
    }

    fs.writeFileSync('tasks.json', JSON.stringify(tasks));
}
}

if (
    command !== 'add' &&
    command !== 'list' &&
    command !== 'update' &&
    command !== 'delete'
) {
    console.log("Invalid command!");
    console.log("Available commands: add, list, update, delete");
}