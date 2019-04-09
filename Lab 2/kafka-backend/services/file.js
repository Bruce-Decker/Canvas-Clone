const File = require('../models/File')


exports.fileService = function fileService(info, callback) {
    switch(info.method) {
        case "post_createFile":
            post_createFile(info, callback)
            break 
        case "get_listFiles":
            get_listFiles(info, callback) 
            break    
        case "get_getFile":
            get_getFile(info, callback)
            break
    }
}

function post_createFile(info, callback) {
    var item_name = info.message.item_name
    item_name = item_name.replace(/\s/g, '');
    var email = info.message.email
    var CourseId = info.id
    
    var uuid = info.message.email + info.id + item_name

    var file_path = info.file.path
    
    var present_time = new Date()
    var time = present_time.getMonth() + "/" + present_time.getDate() + "/"
    time = time + present_time.getFullYear() + " " + present_time.getHours()
    time = time + ":" + present_time.getMinutes() + ":" + present_time.getSeconds()
    time = time + ":" + present_time.getMilliseconds()


    var data = {
        uuid,
        item_name,
        email,
        CourseId,
        file_path,
        time
    }
    console.log("3rfsdf")
    console.log(data)

    File.findOne({uuid: uuid}, function(err, docs) {
        if (docs) {
            File.findOneAndUpdate({uuid: uuid}, data, function(err, result) {
                 if (err) {
                     //res.send("Fail")
                     callback(null, "fail")
                 } else {
                     //console.log(result)
                     //res.send("Update successfully")
                     callback(null, "Update successfully")
                  }
            })
        } else {
               console.log(data)
                File.create(data, function(err, newlyCreated) {
                    if (err) {
                        //console.log("Error Data");
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

function get_listFiles(info, callback) {
    var CourseId = info.CourseId
    var email = info.email
   
    File.find({CourseId: CourseId, email: email}, function(err, docs) {
        if (err) {
            //res.send({})
            callback(null, {})
        } else {
            //res.send(docs)
            callback(null, docs)
        }
    })

}

function get_getFile(info, callback) {
    var CourseId = info.CourseId
    var item_name = info.item_name
    var email = info.email
    File.find({CourseId: CourseId, item_name: item_name, email: email}, function(err, docs) {
        if (err) {
            //console.log(err)
           // res.send({})
           callback(null, {})
        } else {
            //res.send(docs)
           callback(null, docs)
        }
    })
}