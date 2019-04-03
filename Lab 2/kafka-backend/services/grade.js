const Grade = require('../models/Grade')
const Assignment = require('../models/Assignment')

exports.gradeService = function gradeService(info, callback) {
    switch(info.method) {
        case "get_getGrades":
            get_getGrades(info, callback)
            break  
        case "post_submitGrade":
            post_submitGrade(info, callback)      
            break

    }
}


function get_getGrades(info, callback) {
    var CourseId = info.CourseId
    var email = info.email
    Grade.find({CourseId: CourseId, email: email}, function(err, docs) {
        if (err) {
            //res.send(err)
            callback(null, err)
        } else {
            //res.send(docs)
            callback(null, docs)
        }
    })
}

function post_submitGrade(info, callback) {
    var CourseId = info.message.CourseId
    var email = info.message.email
    var item_name = info.message.item_name
    var earned_points = info.message.earned_points
    var uuid = email + "-" +  CourseId + "-" +  item_name
    var full_points, data
    Assignment.findOne({CourseId: CourseId, assignment_name: item_name}, function(err, assignment_docs) {
        full_points = assignment_docs.full_points
        data = {
            uuid, 
            email,
            item_name, 
            CourseId, 
            earned_points,
            full_points
        }
        Grade.findOne({uuid: uuid}, function(err, docs) {
            if (docs) {
                Grade.findOneAndUpdate({uuid: uuid}, data, function(err, result) {
                     if (err) {
                         //res.send("Fail")
                         callback(null, "Fail")
                     } else {
                         console.log(result)
                         //res.send("Update successfully")
                         callback(null, "Update successfully")
                      }
                })
            } else {
                   console.log(data)
                    Grade.create(data, function(err, newlyCreated) {
                        if (err) {
                            console.log("Error Data");
                             //res.send({msg: "False"});
                             callback(null, {msg: "False"})
                        } else {
                             //res.send({msg: "True"});
                             callback(null, {msg: "True"})
                        }
                   })
    
            }
    
        })

    })
}


