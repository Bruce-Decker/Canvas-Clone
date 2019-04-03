const express = require('express');
const router = express.Router();
var multer = require('multer')
const kafka = require('../kafka/client')
const Assignment = require('../schema/Assignment')

router.post('/createAssignment', function(req, res) {

    kafka.make_request('assignment', {"method": "post_createAssignment", "message": req.body}, function(error, result) {
        if (error) {
            console.log(error)
            res.status(400).json({msg: 'cannot create assignment'});
        } else {

               if (result.errors) {
                  return res.status(400).json(result.errors);
               } else {
                  res.send(result)
               }
        }
    })
    // var assignment_name = req.body.assignment_name
    // var email  = req.body.email
    // var CourseId = req.body.CourseId
    // var uuid = email + "-" + CourseId + "-" + assignment_name
    // var description = req.body.description
    // var full_points = req.body.full_points
    // var time = req.body.time
    // var data = {
    //     uuid,
    //     assignment_name,
    //     email,
    //     CourseId,
    //     full_points,
    //     description,
    //     time
    // }
    // Assignment.findOne({uuid: uuid}, function(err, docs) {
	// 	if (docs) {
	// 		Assignment.findOneAndUpdate({uuid: uuid}, data, function(err, result) {
	// 			 if (err) {
	// 			 	res.send("Fail")
	// 			 } else {
	// 			 	console.log(result)
	//  				res.send("Update successfully")
	//  			 }
	// 		})
	// 	} else {
			  
    //            Assignment.create(data, function(err, newlyCreated) {
	// 				if (err) {
	// 					console.log("Error Data");
	// 					 res.send({msg: "False"});
	// 				} else {
	// 					 res.send({msg: "True"});
	// 				}
	// 		   })
	// 	}
	// })
})

router.get('/viewAssignment/:CourseId/:assignment_name', function(req, res) {
    
    kafka.make_request('assignment', {"method": "get_viewAssignment", "CourseId": req.params.CourseId, "assignment_name": req.params.assignment_name}, function(error, result) {
        if (error) {
            console.log(error)
            res.status(400).json({msg: 'assignment not found'});
        } else {
            res.send(result)
        }
    })
})

// router.get('/viewAssignment/:CourseId/:assignment_name', function(req, res) {
//      var CourseId = req.params.CourseId
//      var assignment_name = req.params.assignment_name
//      Assignment.find({CourseId: CourseId, assignment_name: assignment_name}, function(err, docs) {
//         if (docs) {
//             res.send(docs)
           
//         } else {
//             res.send({"error": err})
//         }
//     })
// })



router.get('/listAssignments/:id/:faculty_email', function(req, res) {
    
    kafka.make_request('assignment', {"method": "get_listAssignments", "id": req.params.id, "faculty_email": req.params.faculty_email}, function(error, result) {
        if (error) {
            console.log(error)
            res.status(400).json({msg: 'assignments are not found'});
        } else {
            res.send(result)
        }
    })
})

// router.get('/listAssignments/:id/:faculty_email', function(req, res) {
//     var CourseId = req.params.id
//     var faculty_email = req.params.faculty_email
    
  
   
//     Assignment.find({CourseId: CourseId, email: faculty_email}, function(err, result) {
//        if (result) {
//            res.send(result)
          
//        } else {
//            res.send({"error": err})
//        }
//    })
// })


router.get('/listStudentAssignments/:id', function(req, res) {
    
    kafka.make_request('assignment', {"method": "get_listStudentAssignments", "id": req.params.id}, function(error, result) {
        if (error) {
            console.log(error)
            res.status(400).json({msg: 'assignments are not found'});
        } else {
            res.send(result)
        }
    })
})

// router.get('/listStudentAssignments/:id', function(req, res) {
//     var CourseId = req.params.id

//     Assignment.find({CourseId: CourseId}, function(err, result) {
//        if (result) {
//            res.send(result)
          
//        } else {
//            res.send({"error": err})
//        }
//    })
// })

module.exports = router;