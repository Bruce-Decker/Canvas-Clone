const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    image_path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    about_me: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    hometown: {
        type: String,
        required: true
    },
    languages: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
})

module.exports = Auth = mongoose.model('profile', ProfileSchema)