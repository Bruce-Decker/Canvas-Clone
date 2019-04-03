const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const Auth = require('../models/AuthModel')
var validateRegister = require('../validation/validateRegister')
var validateLogin = require('../validation/validateLogin')


exports.authService = function authService(msg, callback) {
    console.log("Path is ")
    console.log(msg)
    switch(msg.method) {
        case "post_createBasic":
            post_createBasic(msg, callback)
            break
        case 'login':
            login(msg, callback)
            break
      
             
    }
}


function login(msg, callback) {
    const { errors, isValid } = validateLogin(msg.msg);

    if (!isValid) {
      //return res.status(400).json(errors);
       callback(null, {errors: errors})
    }
  
    const email = msg.msg.email;
    const password = msg.msg.password;

    Auth.findOne({ email }).then(user => {

      if (!user) {
        errors.email = 'User not found';
        //return res.status(404).json(errors);
        callback(null, {errors: errors})
      }
      bcrypt.compare(password, user.password)
      .then(isMatch => {

          if(isMatch) {

              const payload = { id: user.id, email: user.email, name: user.name} //Create JWT payload
              console.log(payload)
              jwt.sign(
                  payload, 
                  'secret', 
                  { expiresIn: 3600 }, 
                  (err, token) => {
                  
                    callback(null, {success: true, token: 'Bearer ' + token})
              });
          } else {
              errors.password = 'Password incorrect'
              //return res.status(400).json(errors)
              callback(null, {errors: errors})
          }
      })
})
}


function post_createBasic(msg, callback){
   
    const { errors, isValid } = validateRegister(msg.msg);
    if (!isValid) {
      
       
        callback(null, {errors: errors})
    }

    Auth.findOne({ email: msg.msg.email }).then(user => {
        if (user) {
            console.log("Email already exists")
            errors.email = "Email already exists"
            callback(null, {errors: errors})
        } else {
            const new_user = new Auth({
                name: msg.msg.name,
                email: msg.msg.email,
                password: msg.msg.password
            })

            bcrypt.genSalt(10, (err, salt) => {
                console.log(new_user.password)
                bcrypt.hash(new_user.password, salt, (err, hash) => {
                    if (err) throw err;
                    new_user.password = hash;
                    new_user.save()
                         .then(user => {
                           const payload = { id: user.id, email: user.email, name: user.name}
                           jwt.sign(
                               payload, 
                               'secret', 
                               { expiresIn: 3600 }, 
                               (err, token) => {
                                //  res.json({
                                //      success: true,
                                //      token: 'Bearer ' + token
                                //  })
                                callback(null, {success: true, token: 'Bearer ' + token})
                           });
                         })
                         .catch(err => console.log(err))
                })
            })
        }
   })
}