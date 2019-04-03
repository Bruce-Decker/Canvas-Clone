const Assignment = require('../models/Assignment')


exports.assignmentService = function assignmentService(info, callback) {
  
    switch(info.method) {
        case "post_createAssignment":
            post_createAssignment(info, callback)
            break
        case "get_viewAssignment":
            get_viewAssignment(info, callback)
            break
        case "get_listAssignments":
            get_listAssignments(info, callback)
            break
        case "get_listStudentAssignments":
            get_listStudentAssignments(info, callback)
            break
             
    }
}


function post_createAssignment(info, callback) {
    console.log("info")
    console.log(info)
    var assignment_name = info.message.assignment_name
    var email  = info.message.email
    var CourseId = info.message.CourseId
    var uuid = email + "-" + CourseId + "-" + assignment_name
    var description = info.message.description
    var full_points = info.message.full_points
    var time = info.message.time
    var data = {
        uuid,
        assignment_name,
        email,
        CourseId,
        full_points,
        description,
        time
    }
    Assignment.findOne({uuid: uuid}, function(err, docs) {
		if (docs) {
			Assignment.findOneAndUpdate({uuid: uuid}, data, function(err, result) {
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
			  
               Assignment.create(data, function(err, newlyCreated) {
					if (err) {
						
                         //res.send({msg: "False"});
                         callback(null, {msg: "False"})
					} else {
                         //res.send({msg: "True"});
                         callback(null, {msg: "True"})
					}
			   })
		}
	})
}

function get_viewAssignment(info, callback) {
    var CourseId = info.CourseId
    var assignment_name = info.assignment_name
    Assignment.find({CourseId: CourseId, assignment_name: assignment_name}, function(err, docs) {
       if (docs) {
           
           //res.send(docs)
           callback(null, docs)
          
       } else {
           //res.send({"error": err})
           callback(null, {"error": err})
       }
   })
}

function get_listAssignments(info, callback) {
    var CourseId = info.id
    var faculty_email = info.faculty_email
    Assignment.find({CourseId: CourseId, email: faculty_email}, function(err, result) {
       if (result) {
           //res.send(result)
           callback(null, result)
          
       } else {
           //res.send({"error": err})
           callback(null, {"error": err})
       }
   })

}

function get_listStudentAssignments(info, callback) {
    var CourseId = info.id

    Assignment.find({CourseId: CourseId}, function(err, result) {
       if (result) {
           //res.send(result)
           callback(null, result)
          
       } else {
           //res.send({"error": err})
           callback(null, {"error": err})
       }
   })
}
