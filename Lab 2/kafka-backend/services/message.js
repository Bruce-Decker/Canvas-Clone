const Message = require('../models/Message')


exports.messageService = function messageService(info, callback) {
    console.log("sdfsdf " + info.method)
    switch(info.method) {
        case "post_sendMessage":
            post_sendMessage(info, callback)
            break  
        case "get_getMessages":
            get_getMessages(info, callback)
            break
        case "getExchangedMessages":
            getExchangedMessages(info, callback)
            break
    }
}

function seconds_with_leading_zeros(dt) { 
    return (dt < 10 ? '0' : '') + dt;
}


function post_sendMessage(info, callback) {
    var subject = info.message.subject
    var message = info.message.message
    var sender_email = info.message.sender_email
    var receiver_email = info.message.receiver_email
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
             //res.send({msg: "False"});
             callback(null, {msg: "False"})
        } else {
            // res.send(newlyCreated);
             callback(null, newlyCreated)
        }
   })

}

function get_getMessages(info, callback) {
    var receiver_email = info.receiver_email
    Message.find({receiver_email: receiver_email})
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

function getExchangedMessages(info, callback) {
    var sender_email = info.sender_email
    var receiver_email = info.receiver_email
    var subject = info.subject
    console.log(receiver_email)
    console.log(sender_email)
    console.log(subject)
    Message.find().or([{receiver_email: receiver_email, sender_email:sender_email, subject: subject}, {receiver_email: sender_email, sender_email:receiver_email, subject: subject}])
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