const task = require("../models/task");

exports.getTask = (req, res) =>{ 
    if(req.session.uuid){
        task.model.findAll({
            where:{ account_uuid: req.session.uuid
            }
        }).then(tasks =>{
            req.session.tasks = tasks;
            if(tasks){
                res.render("home",{username: req.session.username,uuid: req.session.uuid, tasks:req.session.tasks,loggedIn:req.session.loggedIn});
            }
        })
    }else{
        res.redirect("/");
    }
}

exports.makeTask = (req, res) =>{
    if(req.session.uuid){
        res.render("createTask",{username: req.session.username,uuid: req.session.uuid, tasks:req.session.tasks,loggedIn:req.session.loggedIn});
    }else{
        res.redirect("/");
    }
}

exports.createTask = async (req, res) => {

    if(req.session.uuid){
        let result = await task.model.create({
            account_uuid: req.session.uuid, 
            task_name: req.query.task,
            description: req.query.desc,
            status: "pending"
        })
        if(!result){
            res.render("/createTask",{username: req.session.username,uuid: req.session.uuid, tasks:req.session.tasks,loggedIn:req.session.loggedIn});
        }else{
            res.redirect("/task");
        }
    }else{
        res.redirect("/");
    }
}

