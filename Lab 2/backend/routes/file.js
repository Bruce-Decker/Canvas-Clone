const express = require('express');
const router = express.Router();
var multer = require('multer')
const passport = require('passport');

const File = require('../schema/File')
const Assignment = require('../schema/Assignment')

const kafka = require('../kafka/client')

const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/public/file_uploads')
    },
    filename: function(req, file, cd) {
        var itemName = req.body.item_name
        itemName = itemName.replace(/\s/g, '');
        file.originalname = req.body.email  + req.body.CourseId + itemName + '.pdf'
        cd(null, file.originalname)
    }
})

const fileUpload = multer({
    storage : fileStorage
})

router.post('/createFile/:id', fileUpload.single('filename'), passport.authenticate('jwt', { session: false }),  function(req, res) {
    kafka.make_request('file', {"method": "post_createFile", "message": req.body, "id": req.params.id, "file": req.file}, function(error, result) {
        if (error) {
            console.log(error)
            res.status(400).json({msg: 'file not found'});
        } else {
            res.send(result)
        }
    })
})


// router.post('/createFile/:id', fileUpload.single('filename'),  (req, res) => {
//     var item_name = req.body.item_name
//     item_name = item_name.replace(/\s/g, '');
//     var email = req.body.email
//     var CourseId = req.params.id
//     console.log(req.params.id)
//     var uuid = req.body.email + req.body.CourseId + item_name

//     var file_path = req.file.path
    
//     var present_time = new Date()
//     var time = present_time.getMonth() + "/" + present_time.getDate() + "/"
//     time = time + present_time.getFullYear() + " " + present_time.getHours()
//     time = time + ":" + present_time.getMinutes() + ":" + present_time.getSeconds()
//     time = time + ":" + present_time.getMilliseconds()


//     var data = {
//         uuid,
//         item_name,
//         email,
//         CourseId,
//         file_path,
//         time
//     }

//     File.findOne({uuid: uuid}, function(err, docs) {
//         if (docs) {
//             File.findOneAndUpdate({uuid: uuid}, data, function(err, result) {
//                  if (err) {
//                      res.send("Fail")
//                  } else {
//                      console.log(result)
//                      res.send("Update successfully")
//                   }
//             })
//         } else {
//                console.log(data)
//                 File.create(data, function(err, newlyCreated) {
//                     if (err) {
//                         console.log("Error Data");
//                          res.send({msg: "False"});
//                     } else {
//                          res.send({msg: "True"});
//                     }
//                })

//         }

//     })
   
// })


router.get('/listFiles/:CourseId/:email', passport.authenticate('jwt', { session: false }), function(req, res) {
    kafka.make_request('file', {"method": "get_listFiles", "CourseId": req.params.CourseId , "email": req.params.email}, function(error, result) {
        if (error) {
            console.log(error)
            res.status(400).json({msg: 'file not found'});
        } else {
            res.send(result)
        }
    })
})

// router.get('/listFiles/:CourseId' , function(req, res) {
//     var CourseId = req.params.CourseId
   
//     File.find({CourseId: CourseId}, function(err, docs) {
//         if (err) {
//             console.log(err)
//             res.send({})
//         } else {
//             res.send(docs)
//         }
//     })
// })


router.get('/getFile/:CourseId/:item_name/:email', passport.authenticate('jwt', { session: false }), function(req, res) {
    kafka.make_request('file', {"method": "get_getFile", "CourseId": req.params.CourseId, "item_name": req.params.item_name, "email": req.params.email}, function(error, result) {
        if (error) {
            console.log(error)
            res.status(400).json({msg: 'file not found'});
        } else {
            res.send(result)
        }
    })
})


// router.get('/getFile/:CourseId/:item_name', function(req, res) {
//     var CourseId = req.params.CourseId
//     var item_name = req.params.item_name
//     File.find({CourseId: CourseId, item_name: item_name}, function(err, docs) {
//         if (err) {
//             console.log(err)
//             res.send({})
//         } else {
//             res.send(docs)
//         }
//     })
// })



module.exports = router;
