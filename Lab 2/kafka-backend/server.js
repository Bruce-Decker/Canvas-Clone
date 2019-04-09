var connection =  new require('./kafka/Connection');

var mongoose = require('mongoose');
const db_url = require('./config/keys').mlab_url
const url = process.env.MONGODB_URI || db_url

mongoose.connect(url, { 
    useNewUrlParser : true,
    poolSize: 500
}).then(() => console.log("Mongo Database is alive"))
  .catch(err => console.log(err))



//Services
var profile = require('./services/profile')
var auth = require('./services/authentication')
var assignment = require('./services/assignment')
var course = require('./services/course')
var file = require('./services/file')
var grade = require('./services/grade')
var inbox = require('./services/message')
var quiz = require('./services/quiz')
var token = require('./services/token')
var upload = require('./services/upload')


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        console.log("Object.keys(grade)")
        console.log(Object.keys(grade))
        console.log("Object.keys(message)")
        console.log(Object.keys(inbox))
        switch (topic_name) {
           
               
            case 'profile':
                profile.profileService(data.data, function(err, res) {
                    response(data, res, producer)
                    return
                })
                break

            case 'auth':
                auth.authService(data.data, function(err, res) {
                    response(data, res, producer)
                    return
                })
                break
            case 'assignment':
                assignment.assignmentService(data.data, function(err, res) {
                    response(data, res, producer)
                    return
                })
                break
            case 'course':
                course.courseService(data.data, function(err, res) {
                    response(data, res, producer)
                    return
                })
                break
            case 'file':
                file.fileService(data.data, function(err, res) {
                    response(data, res, producer)
                    return
                })
                break

            case 'upload':
                 upload.uploadService(data.data, function(err, res) {
                    response(data, res, producer)
                    return
                })
                break
            case 'grade':
                grade.gradeService(data.data, function(err, res) {
                    response(data, res, producer)
                    return
                })
                break

            case 'message':
                inbox.messageService(data.data, function(err, res) {
                    response(data, res, producer)
                    return
                })
                break
            case 'quiz':
                quiz.quizService(data.data, function(err, res) {
                    response(data, res, producer)
                    return
                })
                break
            case 'token':
                token.tokenService(data.data, function(err, res) {
                    response(data, res, producer)
                    return
                })
                break
        }
        
        
    });
}

function response(data, res, producer) {
    console.log('after handle', res);
    var payloads = [
        { topic: data.replyTo,
            messages:JSON.stringify({
                correlationId:data.correlationId,
                data : res
            }),
            partition : 0
        }
    ];
    producer.send(payloads, function(err, data){
        console.log('producer send', data);
    });
    return;
}

handleTopicRequest("profile", profile)
handleTopicRequest("auth", auth)
handleTopicRequest("assignment", assignment)
handleTopicRequest("course", course)
handleTopicRequest("file", file)
handleTopicRequest("grade", grade)
handleTopicRequest("message", inbox)
handleTopicRequest("quiz", quiz)
handleTopicRequest("token", token)
handleTopicRequest("upload", upload)

