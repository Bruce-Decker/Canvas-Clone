const Token = require('../models/Token')
const Roster = require('../models/Roster')
const uuidv1 = require('uuid/v1');
const shortid = require('shortid');


exports.tokenService = function tokenService(info, callback) {
    switch(info.method) {
        case "post_generateCourseToken":
            post_generateCourseToken(info, callback)
            break  
        case "post_verifyCourseToken":
            post_verifyCourseToken(info, callback)
            break
    }
}


function post_generateCourseToken(info, callback) {
    var uuid = uuidv1()
    var token = shortid.generate()
    var email = info.message.email
    var CourseId = info.CourseId
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
             //res.send({msg: "False"});
             callback(null, {msg: "False"})
        } else {
             //res.send(newlyCreated);
             callback(null, newlyCreated)
        }
   })
}

function post_verifyCourseToken(info, callback) {
    var token = info.message.token
    var CourseId = info.message.CourseId
    var email = info.message.email;
    var faculty_email = info.message.faculty_email
    
    var uuid = email + CourseId
    var status = "open"
    
    var data = {
       uuid,
       email,
       CourseId,
       faculty_email,
       status
    }

    Token.findOne({token: token, CourseId: CourseId}, function(err, docs) {
        if (docs) {
            Roster.create(data, function(err, result) {
                 if (err) {
                     //res.send("Fail")
                     callback(null, "Fail")
                 } else {
                    Token.deleteOne({token: token, CourseId: CourseId})
                        .then(result => console.log(result))
                        .catch(err =>  console.log(err))
                     //res.send("Added to course")
                     callback(null, "Added to course")
                  }
            })
        } else {
               //res.send("didn't find token")
               callback(null, "didn't find token")
               
        }

    })
}