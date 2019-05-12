const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    quiz_name: {
        type: String,
        required: true
    },
    question_id: {
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
    question: {
        type: String,
        required: true
    },
    option_one_question: {
        type: String,
        required: true
    },
    option_two_question: {
        type: String,
        required: true
    },
    option_three_question: {
        type: String,
        required: true
    },
    option_four_question: {
        type: String,
        required: true
    },
    right_answer: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

module.exports = Quiz = mongoose.model('quiz', QuizSchema)