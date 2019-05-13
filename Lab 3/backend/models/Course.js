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
      
    },
    CourseDept: {
        type: String,
      
    },
    CourseDescription: {
        type: String,
      
    },
    CourseRoom: {
        type: String,
       
    },
    CourseCapacity: {
        type: String,
      
    },
    WaitlistCapacity: {
        type: String,
       
    },
    CourseTerm: {
        type: String,
       
    }
})

module.exports = Course = mongoose.model('course', CourseSchema)