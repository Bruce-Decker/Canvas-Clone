const express = require('express');
const router = express.Router();
const Token = require('../schema/Token')
const Roster = require('../schema/Roster')

const uuidv1 = require('uuid/v1');
const shortid = require('shortid');
const passport = require('passport');





router.post('/generateCourseToken/:CourseId', function(req, res) {
  
    var uuid = uuidv1()
    var token = shortid.generate()
    var email = req.body.email
    var CourseId = req.params.CourseId
    var present_time = new Date()
    var time = present_time.getMonth() + "/" + present_time.getDate() + "/"
    time = time + present_time.getFullYear() + " " + present_time.getHours()
    time = time + ":" + present_time.getMinutes() + ":" + present_time.getSeconds()
    time = time + ":" + present_time.getMilliseconds()
    
    var data = {
        uuid,
        email,
        CourseId,
        token,
        time
    }

    Token.create(data, function(err, newlyCreated) {
        if (err) {
            console.log("Error Data");
             res.send({msg: "False"});
        } else {
             res.send(newlyCreated);
        }
   })
 })



 router.post('/verifyCourseToken', function(req, res) {
    var token = req.body.token
    var CourseId = req.body.CourseId
    var email = req.body.email;
    
    var uuid = email + CourseId
    var status = "open"
    
    var data = {
       uuid,
       email,
       CourseId,
       status
    }

    Token.findOne({token: token, CourseId: CourseId}, function(err, docs) {
        if (docs) {
            Roster.create(data, function(err, result) {
                 if (err) {
                     res.send("Fail")
                 } else {
                    Token.deleteOne({token: token, CourseId: CourseId})
                        .then(result => res.send(result))
                        .catch(err =>  res.send(err))
                     res.send("Added to course")
                  }
            })
        } else {
               res.send("didn't find token")
               
        }

    })
 })


module.exports = router;
