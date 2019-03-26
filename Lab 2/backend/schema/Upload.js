const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UploadSchema = new Schema({
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
    file_path: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

module.exports = Upload = mongoose.model('upload', UploadSchema)