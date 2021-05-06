const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/users');
const config = require('../config');

passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const exist = await UserModel.findOne({ email });
        if (exist != null) {
            return done('The user exist', null);
        } else {
            const user = await UserModel.create({ email, password });
            return done(null, user);
        }
    } catch (e) {
        return done(`Can't create the user`);
    }
}));

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return done('User not found', false, { message: 'User not found' });
        }
        const validate = await user.isValidPassword(password);
        if (validate == null) {
            return done('Wrong password', false, { message: 'Wrong password' });
        }
        return done(null, user, { message: 'Login successfull' });
    } catch (e) {
        return done(`Can't login`);
    }
}));

passport.use(new JWTStrategy({
    secretOrKey: config.SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (e) {
        done(`Can't create the token`);
    }
}));