const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    state: { type: String },
    percent: { type: String, default: '0' },
    comment: { type: String },
});

module.exports = mongoose.model('Task', TaskSchema);