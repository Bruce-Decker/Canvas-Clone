const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const AuthSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

AuthSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next()
    }
 
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        console.log("this password is " + this.password)
        console.log("this name is " + this.name)
        console.log("this email is " + this.email)
 
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            this.password = hash;
            next()
        })
    })
 })

module.exports = Auth = mongoose.model('auth', AuthSchema)