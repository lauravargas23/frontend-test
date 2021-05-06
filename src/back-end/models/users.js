const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, lowercase: true },
    displayName: String,
    password: { type: String },
    rol: { type: String, default: 'user' },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
});

UserSchema.pre('save', async function (next) {
    const rounds = 10;
    try {
        if (this.password && this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, rounds);
        }
        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password).then(function (result) {
        if (result == true) {
            return result;
        } else {
            return null;
        }
    }).catch(() => {
        return null;
    });
    return compare;
}

module.exports = mongoose.model('User', UserSchema);