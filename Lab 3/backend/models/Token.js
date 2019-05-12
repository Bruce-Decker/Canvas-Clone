const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    CourseId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

module.exports = Token = mongoose.model('token', TokenSchema)