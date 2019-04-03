const express = require('express');
const router = express.Router();
var multer = require('multer')
var validateProfile = require('../validation/validateProfile')
const Profile = require('../schema/Profile')
const Roster = require('../schema/Roster')
const kafka = require('../kafka/client')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
       cb(null, '../frontend/public/user_images')
    },
    filename: function(req, file, cd) {
        file.originalname = req.body.email + '.jpg'
        cd(null, file.originalname)
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
  
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


router.post('/createProfile', upload.single('filename'), function(req,res) {
    const { errors, isValid } = validateProfile(req.body)
    console.log(errors)
    if (!isValid) {
        console.log(errors)
        return res.status(400).json(errors);
    }
   

    kafka.make_request('profile', {"method": "post_viewProfile", "msg": req.body}, function(error, result) {
        if (error) {
            console.log(error)
            res.status(400).json({msg: 'profile not found'});
        } else {
            res.send(result)
        }
    })

   

})




// router.post('/createProfile', upload.single('filename'), function(req,res) {
//     const { errors, isValid } = validateProfile(req.body)
//     console.log(errors)
//     if (!isValid) {
//         console.log(errors)
//         return res.status(400).json(errors);
//     }
   
//     var image_path = "user_images/" + req.body.email + '.jpg'
//     var email = req.body.email
//     var name = req.body.name
   
//     var phone_number = req.body.phone_number
//     var about_me = req.body.about_me
//     var city = req.body.city
//     var country = req.body.country
//     var company = req.body.company
//     var school = req.body.school
//     var hometown = req.body.hometown
//     var languages = req.body.languages
//     var gender = req.body.gender
//     var data = {
//         image_path,
//         name,
//         email,
//         phone_number,
//         about_me,
//         city,
//         country,
//         company,
//         school,
//         hometown,
//         languages,
//         gender
//     }

//     Profile.findOne({email: email}, function(err, docs) {
// 		if (docs) {
// 			Profile.findOneAndUpdate({email: email}, data, function(err, result) {
// 				 if (err) {
// 				 	res.send("Fail")
// 				 } else {
// 				 	console.log(result)
// 	 				res.send(data)
// 	 			 }
// 			})
// 		} else {
// 			   console.log(data)
// 				Profile.create(data, function(err, newlyCreated) {
// 					if (err) {
// 						console.log("Error Data");
// 						 res.send({msg: "False"});
// 					} else {
// 						 res.send(newlyCreated);
// 					}
// 			   })

// 		}

// 	})

// })

router.get('/viewProfile/:email', function(req, res) {
    
    kafka.make_request('profile', {"method": "get_viewProfile", "email": req.params.email}, function(error, result) {
        if (error) {
            console.log(error)
            res.status(400).json({msg: 'profile not found'});
        } else {
            res.send(result)
        }
    })
})

// router.get('/viewProfile/:email', function(req, res) {
//     Profile.find({email: req.params.email}, function(err, docs) {
//         if (docs) {
//             res.send(docs)
//         } else {
//             res.send({"error": err})
//         }
//     })

// })


router.get('/retrieveUserProfileFromCourse/:Id/:faculty_email', function(req, res) {
    
    kafka.make_request('profile', {"method": "get_profileFromCourse", "Id": req.params.Id, "faculty_email": req.params.faculty_email}, function(error, result) {
        if (error) {
            console.log(error)
            res.status(400).json({msg: 'profile not found'});
        } else {
            res.send(result)
        }
    })
})

// router.get('/retrieveUserProfileFromCourse/:Id/:faculty_email', (req, res) => {
//     var Id = req.params.Id;
//     var faculty_email = req.params.faculty_email
//     console.log(faculty_email)
//     Roster.find({CourseId: Id, faculty_email: faculty_email}, function(err, docs) {
//         if (err) {
//             throw err
//         } else {
//             var profile_array = docs.map(i => i.email); 
//             var new_array = []
//             profile_array.forEach(function(element) {
//                 console.log(element)
//                 new_array.push(element)
//             })

//             Profile.find({email: {$in : new_array}}, function(err, profiles) {
//                 res.send(profiles)
//             })

           
//         }
//     })

// })



module.exports = router;