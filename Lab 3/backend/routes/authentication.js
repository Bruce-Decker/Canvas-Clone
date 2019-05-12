const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const Auth = require('../schema/AuthModel')
const passport = require('passport');

var validateRegister = require('../validation/validateRegister')
var validateLogin = require('../validation/validateLogin')







router.post('/createBasicUser', function(req,res) {
    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
     
    Auth.findOne({ email: req.body.email }).then(user => {
         if (user) {
             errors.email = "Email already exists"
             return res.status(400).json(errors);
         } else {
             const new_user = new Auth({
                 name: req.body.name,
                 email: req.body.email,
                 password: req.body.password
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
                                  res.json({
                                      success: true,
                                      token: 'Bearer ' + token
                                  })
                            });
                          })
                          .catch(err => console.log(err))
                 })
             })
         }
    })
})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;

    Auth.findOne({ email }).then(user => {

      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      console.log(user.password)
      console.log(password)


      bcrypt.compare(password, user.password)
      .then(isMatch => {
          console.log(password)
          console.log(isMatch)
          if(isMatch) {
              //res.json({msg: 'Sucess'})
              //User matched
              const payload = { id: user.id, email: user.email, name: user.name} //Create JWT payload
              console.log(payload)
              jwt.sign(
                  payload, 
                  'secret', 
                  { expiresIn: 3600 }, 
                  (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    })
              });
          } else {
              errors.password = 'Password incorrect'
              return res.status(400).json(errors)
          }
      })
})
});

module.exports = router;


