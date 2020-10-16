//import set from "mongoose";


const express = require('express');
const path= require('path');

const mongoose= require('mongoose');

const config= require('./config/database');
const users=require('./routes/users');
const dotenv = require('dotenv');
const TodoTask= require("./models/crud");
const wins= require('winston');

//dotenv.config();

mongoose.set('useFindAndModify', false);

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(config.database,{useNewUrlParser:true});

mongoose.connection.on('connected',()=>{
    console.log("Connected to Databse "+config.database);

    server.listen(port,()=>{
        console.log("Server started listening on port "+port);
    });
});
mongoose.connection.on('error',(err)=>{
    console.log("Connection Error"+err);
});



const server=express();
const port=9000;

server.use("/static",express.static("public"));

server.use(express.urlencoded({ extended: true }));

server.set("view engine","ejs");

//server.use('/users',users);
server.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
    });
});


server.post('/',async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });


    try {
        //if( TodoTask.documentExistsOrNotDemo.find({"content": req.body.content }).count() === 0)
            await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

server.route("/edit/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
        res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
}).post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});


server.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);res.redirect("/");
    });
});
