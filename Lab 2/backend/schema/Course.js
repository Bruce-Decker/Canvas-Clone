const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    CourseId: {
        type: String,
        required: true
    },
    CourseName: {
        type: String,
        required: true
    },
    CourseDept: {
        type: String,
        required: true
    },
    CourseDescription: {
        type: String,
        required: true
    },
    CourseRoom: {
        type: String,
        required: true
    },
    CourseCapacity: {
        type: String,
        required: true
    },
    WaitlistCapacity: {
        type: String,
        required: true
    },
    CourseTerm: {
        type: String,
        required: true
    }
})

module.exports = Course = mongoose.model('course', CourseSchema)