const TasksModel = require('../models/tasks');
const tasksController = {};

tasksController.getTasks = async (req, res) => {
    if (req.user.rol == 'admin') {
        const tasks = await TasksModel.find();
        res.status(200).send(tasks);
    } else {
        res.status(401).send('Unauthorized');
    }
};

tasksController.postTask = async (req, res) => {
    if (req.user.rol == 'admin') {
        const task = new TasksModel({
            description: req.body.description,
            user: req.body.user,
            state: req.body.state,
            percent: req.body.percent,
            comment: req.body.comment,
        });
        await task.save();
        res.status(200).send('Task saved');
    } else {
        res.status(401).send('Unauthorized');
    }
};

tasksController.getTask = async (req, res) => {
    if (req.user.rol == 'admin') {
        const taskId = req.params.id;
        const task = await TasksModel.findById(taskId);
        res.status(200).send(task);
    } else {
        res.status(401).send('Unauthorized');
    }
};

tasksController.putTask = async (req, res) => {
    const taskId = req.params.id;
    const task = {
        description: req.body.description,
        user: req.body.user,
        state: req.body.state,
        percent: req.body.percent,
        comment: req.body.comment,
    };
    await TasksModel.findByIdAndUpdate(taskId, { $set: task }, { new: true });
    res.status(200).send('Task updated');
};

tasksController.deleteTask = async (req, res) => {
    if (req.user.rol == 'admin') {
        const taskId = req.params.id;
        await TasksModel.findByIdAndRemove(taskId);
        res.status(200).send('Task deleted');
    } else {
        res.status(401).send('Unauthorized');
    }
};

tasksController.getTasksUser = async (req, res) => {
    if (req.user.rol == 'user') {
        const tasks = await TasksModel.find({ 'user': req.user._id });
        res.status(200).send(tasks);
    } else {
        res.status(401).send('Unauthorized');
    }
};

module.exports = tasksController;