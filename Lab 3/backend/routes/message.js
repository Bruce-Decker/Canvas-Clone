const express = require('express');
const router = express.Router();
const Message = require('../schema/Message')


const passport = require('passport');

function seconds_with_leading_zeros(dt) { 
  return (dt < 10 ? '0' : '') + dt;
}



router.post('/sendMessage', function(req, res) {
    var subject = req.body.subject
    var message = req.body.message
    var sender_email = req.body.sender_email
    var receiver_email = req.body.receiver_email
    var present_time = new Date()
    var time = present_time.getMonth() + "/" + present_time.getDate() + "/"
    time = time + present_time.getFullYear() + " " + present_time.getHours()
    var now_seconds = seconds_with_leading_zeros(present_time.getSeconds())
    time = time + ":" + present_time.getMinutes() + ":" + now_seconds
    time = time + ":" + present_time.getMilliseconds()
    var data = {
        sender_email,
        receiver_email,
        subject,
        message,
        time
    }

    Message.create(data, function(err, newlyCreated) {
        if (err) {
            console.log("Error Data");
             res.send({msg: "False"});
        } else {
             res.send(newlyCreated);
        }
   })

})




router.get('/getMessages/:receiver_email', function(req, res) {

    var receiver_email = req.params.receiver_email
    console.log(receiver_email)
    Message.find({receiver_email: receiver_email})
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



router.get('/getExchangedMessages/:receiver_email/:sender_email/:subject', function(req, res) {
    
    var sender_email = req.params.sender_email
    var receiver_email = req.params.receiver_email
    var subject = req.params.subject
    console.log(receiver_email)
    console.log(sender_email)
    console.log(subject)
    Message.find().or([{receiver_email: receiver_email, sender_email:sender_email, subject: subject}, {receiver_email: sender_email, sender_email:receiver_email, subject: subject}])
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