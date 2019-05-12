const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const GradeSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    item_name: {
        type: String,
        required: true
    },
    CourseId: {
        type: String,
        required: true
    },
    earned_points:{
        type: String,
        required: true
    },
    full_points: {
        type: String,
        required: true
    }
})

module.exports = Grade = mongoose.model('grade', GradeSchema)