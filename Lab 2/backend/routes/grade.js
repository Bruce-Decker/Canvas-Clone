const express = require('express');
const router = express.Router();


const Grade = require('../schema/Grade')
const Assignment = require('../schema/Assignment')

const kafka = require('../kafka/client')


router.get('/getGrades/:CourseId/:email', function(req, res) {
    kafka.make_request('grade', {"method": "get_getGrades", "CourseId": req.params.CourseId, "email": req.params.email}, function(error, result) {
        if (error) {
            console.log(error)
            res.status(400).json({msg: 'profile not found'});
        } else {
            res.send(result)
        }
    })
})

// router.get('/getGrades/:CourseId/:email', function(req, res) {
//     var CourseId = req.params.CourseId
//     var email = req.params.email
//     Grade.find({CourseId: CourseId, email: email}, function(err, docs) {
//         if (err) {
//             res.send(err)
//         } else {
//             res.send(docs)
//         }
//     })
// })



router.post('/submitGrade', function(req, res) {
    kafka.make_request('grade', {"method": "post_submitGrade", "message": req.body}, function(error, result) {
        if (error) {
            console.log(error)
            res.status(400).json({msg: 'profile not found'});
        } else {
            res.send(result)
        }
    })
})

// router.post('/submitGrade', (req, res) => {
    
//     var CourseId = req.body.CourseId
//     var email = req.body.email
//     var item_name = req.body.item_name
//     var earned_points = req.body.earned_points
//     var uuid = email + "-" +  CourseId + "-" +  item_name
//     var full_points, data
//     Assignment.findOne({CourseId: CourseId, assignment_name: item_name}, function(err, assignment_docs) {
//         full_points = assignment_docs.full_points
//         data = {
//             uuid, 
//             email,
//             item_name, 
//             CourseId, 
//             earned_points,
//             full_points
//         }
//         Grade.findOne({uuid: uuid}, function(err, docs) {
//             if (docs) {
//                 Grade.findOneAndUpdate({uuid: uuid}, data, function(err, result) {
//                      if (err) {
//                          res.send("Fail")
//                      } else {
//                          console.log(result)
//                          res.send("Update successfully")
//                       }
//                 })
//             } else {
//                    console.log(data)
//                     Grade.create(data, function(err, newlyCreated) {
//                         if (err) {
//                             console.log("Error Data");
//                              res.send({msg: "False"});
//                         } else {
//                              res.send({msg: "True"});
//                         }
//                    })
    
//             }
    
//         })

//     })

// })
   


module.exports = router;