const Upload = require('../models/Upload')


exports.uploadService = function uploadService(info, callback) {
    switch(info.method) {
        case "post_upload":
            post_upload(info, callback)
            break  
        case "get_upload":
            get_upload(info, callback)
            break
    }
}


function seconds_with_leading_zeros(dt) { 
    return (dt < 10 ? '0' : '') + dt;
}

function post_upload(info, callback) {
    var assignment_name = info.message.assignment_name
    var email = info.message.email
    var CourseId = info.id
    var uuid = email +  CourseId +  assignment_name + info.message.now
    
    var present_time = new Date()
    var time = present_time.getMonth() + "/" + present_time.getDate() + "/"
    time = time + present_time.getFullYear() + " " + seconds_with_leading_zeros(present_time.getHours())
    var now_seconds = seconds_with_leading_zeros(present_time.getSeconds())
    time = time + ":" + present_time.getMinutes() + ":" + now_seconds
    time = time + ":" + present_time.getMilliseconds()
    
    console.log("test\ info")
    console.log(info)
    //var file_path = info.file.path
    var file_path = "../frontend/public/pdf_uploads/" + uuid + '.pdf'
    
    var data = {
        uuid,
        assignment_name,
        email,
        CourseId,
        file_path,
        time
    }
    console.log("rwr3e")
    console.log(data)
    Upload.findOne({uuid: uuid}, function(err, docs) {
		if (docs) {
			Upload.findOneAndUpdate({uuid: uuid}, data, function(err, result) {
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
				Upload.create(data, function(err, newlyCreated) {
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
}

function get_upload(info, callback) {
    var email = info.email
    var CourseId = info.CourseId
    var assignment_name = info.assignment_name
    var uuid = email + CourseId +  assignment_name
    console.log(uuid)

    Upload.find({email: email, CourseId: CourseId, assignment_name: assignment_name})
     .sort({'time': 'desc'})
     .exec(function(err, docs) {
         if (docs) {
            //  var result = []
            //  result.push(docs)
             //res.send(docs)
             callback(null, docs)
         } else {
             //res.send({})
             callback(null, {})
         }
     });
}