const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    assignment_name: {
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
    description: {
        type: String,
        required: true
    },
    full_points: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

module.exports = Assignment = mongoose.model('assignment', AssignmentSchema)