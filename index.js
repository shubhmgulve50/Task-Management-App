const express = require("express");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require('uuid');  //generate uniqe ids
const path = require("path")
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//create array for storing data
let Tasks = [{
    id: uuidv4(),
    name: "Task 1",
    description: "This is the first task",
},
{
    id: uuidv4(),
    name: "Task 2",
    description: "This is the second task",
},
{
    id: uuidv4(),
    name: "Task 3",
    description: "This is the Third task",
},
{
    id: uuidv4(),
    name: "Task 4",
    description: "This is the fourth task",
},
{
    id: uuidv4(),
    name: "Task 5",
    description: "This is the Third task",
}]


//index rout for showing All tasks
app.get("/tasks",(req, res)=>{
    res.render("index.ejs",{Tasks});
});

//give the form for creating post
app.get("/tasks/new", (req, res) =>{
    res.render("new.ejs");
});

//store data and create task
app.post("/tasks",(req, res)=>{
    let { name, description} = req.body;
    let id = uuidv4();
    Tasks.push({id, name, description});
    res.redirect("/tasks")
});

//show individual task data
app.get("/tasks/:id",(req, res)=>{
    let { id }= req.params;
    let task = Tasks.find((T) => id === T.id);
    console.log(task)
    res.render("show.ejs", {task});
});

app.patch("/tasks/:id",(req,res) => {
    let {id} = req.params;
    let newDiscription = req.body.description;
    let task = Tasks.find((T) => id === T.id);
    task.description = newDiscription;
    res.redirect("/tasks");
});

app.get("/tasks/:id/edit", (req,res) => {
    let { id } = req.params;
    let task = Tasks.find((T) => id === T.id);
    res.render("edit.ejs", {task});
 });

 app.delete("/tasks/:id",(req, res) =>{
    let { id } = req.params;
    Tasks = Tasks.filter((T) => id !== T.id);
    res.redirect("/tasks");
 })

app.listen(port ,() => {
    console.log(`Server is running on port ${port}`);
})