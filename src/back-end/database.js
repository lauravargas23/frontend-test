const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const mongo = mongoose.connection

mongo.on('error', () => { console.log('mongo: Error') })
mongo.on('connected', () => { console.log('mongo: Connected') })
mongo.on('disconnected', () => { console.log('mongo: Disconnected') })

module.exports = mongoose;