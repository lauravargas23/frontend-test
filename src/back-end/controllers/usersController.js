const UsersModel = require('../models/users');
const usersController = {};

usersController.getUsers = async (req, res) => {
    if (req.user.rol == 'admin') {
        const users = await UsersModel.find();
        res.status(200).send(users);
    } else {
        res.status(401).send('Unauthorized');
    }
};

module.exports = usersController;