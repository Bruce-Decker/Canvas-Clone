const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RosterSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    CourseId: {
        type: String,
        required: true
    },
    faculty_email: {
        type: String,
        required: true
    }
})

module.exports = Roster = mongoose.model('roster', RosterSchema)