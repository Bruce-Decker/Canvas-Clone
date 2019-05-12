const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AnnoucementSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    CourseId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

module.exports = Annoucement = mongoose.model('annoucement', AnnoucementSchema)