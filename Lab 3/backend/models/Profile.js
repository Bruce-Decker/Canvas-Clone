const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
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
       
    },
    about_me: {
        type: String,
       
    },
    city: {
        type: String,
       
    },
    country: {
        type: String,
        
    },
    company: {
        type: String,
       
    },
    school: {
        type: String,
       
    },
    hometown: {
        type: String,
       
    },
    languages: {
        type: String,
       
    },
    gender: {
        type: String,
      
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)