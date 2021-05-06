const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

const authController = {};

authController.signUp = async (req, res, next) => {
    passport.authenticate('signup', async (err, user) => {
        try {
            if (err != null) {
                res.status(403).send(err);
                return next(err);
            } else {
                return res.status(200).send({
                    message: 'Signup successful',
                    user: user,
                });
            }
        }
        catch (e) {
            res.status(500).send(`Can't connect with the server`);
            return next(e);
        }
    })(req, res, next);
}

authController.logIn = async (req, res, next) => {
    passport.authenticate('login', async (err, user) => {
        try {
            if (err || !user) {
                const error = new Error(err);
                res.status(403).send(err);
                return next(error);
            }
            req.login(user, { session: false }, async (err) => {
                if (err) return next(err);
                const expiresIn = 24 * 60 * 60;
                const body = { _id: user._id, email: user.email, rol: user.rol };
                const token = jwt.sign({ user: body }, config.SECRET_KEY, { expiresIn: expiresIn });
                return res.status(200).send({ token, expiresIn });
            })
        }
        catch (e) {
            res.status(500).send(`Can't connect with the server`);
            return next(e);
        }
    })(req, res, next);
}

authController.profile = async (req, res, next) => {
    res.status(200).send({
        user: req.user,
        token: req.headers.authorization.split(" ")[1],
    });
}

module.exports = authController;