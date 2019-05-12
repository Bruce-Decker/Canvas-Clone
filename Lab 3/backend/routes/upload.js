const express = require('express');
const router = express.Router();
var multer = require('multer')

const Upload = require('../schema/Upload')


const passport = require('passport');

const pdfStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/public/pdf_uploads')
    },
    filename: function(req, file, cd) {
        file.originalname = req.body.email  + req.params.id  + req.body.assignment_name + req.body.now + '.pdf'
        cd(null, file.originalname)
    }
})


const pdfUpload = multer({
    storage : pdfStorage
})

function seconds_with_leading_zeros(dt) { 
  return (dt < 10 ? '0' : '') + dt;
}




router.post('/upload/:id', pdfUpload.single('filename'),  (req, res) => {
   
    var assignment_name = req.body.assignment_name
    var email = req.body.email
    var CourseId = req.params.id
    console.log("sdfsdf2323 " + CourseId)
    var uuid = email +  CourseId +  assignment_name + req.body.now
    var file_path = req.file.path
    var present_time = new Date()
    var time = present_time.getMonth() + "/" + present_time.getDate() + "/"
    time = time + present_time.getFullYear() + " " + present_time.getHours()
    var now_seconds = seconds_with_leading_zeros(present_time.getSeconds())
    time = time + ":" + present_time.getMinutes() + ":" + now_seconds
    time = time + ":" + present_time.getMilliseconds()
    var data = {
        uuid,
        assignment_name,
        email,
        CourseId,
        file_path,
        time
    }

    console.log(data)
    Upload.findOne({uuid: uuid}, function(err, docs) {
		if (docs) {
			Upload.findOneAndUpdate({uuid: uuid}, data, function(err, result) {
				 if (err) {
				 	res.send("Fail")
				 } else {
				 	console.log(result)
	 				res.send("Update successfully")
	 			 }
			})
		} else {
				Upload.create(data, function(err, newlyCreated) {
					if (err) {
						console.log("Error Data");
						 res.send({msg: "False"});
					} else {
						 res.send({msg: "True"});
					}
			   })
		}

	})
})




router.get('/upload/:CourseId/:assignment_name/:email', function(req, res) {
    var email = req.params.email
    var CourseId = req.params.CourseId
    var assignment_name = req.params.assignment_name
    var uuid = email + CourseId +  assignment_name
    console.log(uuid)

    Upload.find({email: email, CourseId: CourseId, assignment_name: assignment_name})
     .sort({'time': 'desc'})
     .exec(function(err, docs) {
         if (docs) {
            //  var result = []
            //  result.push(docs)
             res.send(docs)
         } else {
             res.send({})
         }
     });
})

module.exports = router;