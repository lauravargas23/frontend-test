const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const tasksController = require('../controllers/tasksController');
const passport = require('passport');

router.post('/users/signup', authController.signUp);
router.post('/users/login', authController.logIn);
router.get('/users', passport.authenticate('jwt', { session: false }), usersController.getUsers);
router.get('/users/tasks', passport.authenticate('jwt', { session: false }), tasksController.getTasks);
router.get('/users/tasksUser', passport.authenticate('jwt', { session: false }), tasksController.getTasksUser);
router.post('/users/task', passport.authenticate('jwt', { session: false }), tasksController.postTask);
router.put('/users/task/:id', passport.authenticate('jwt', { session: false }), tasksController.putTask);
router.delete('/users/task/:id', passport.authenticate('jwt', { session: false }), tasksController.deleteTask);

module.exports = router;