const Course = require('../models/Course')
const Roster = require('../models/Roster')
const Assignment = require('../models/Assignment')
const Announcement = require('../models/Announcement')


exports.courseService = function courseService(info, callback) {
    switch(info.method) {
        case "post_createCourse":
            post_createCourse(info, callback)
            break        
        case "post_deleteCourse":
            post_deleteCourse(info, callback) 
            break
        case "get_createCourse":
            get_createCourse(info, callback)
            break
        case "get_listRegisteredCourses":
            get_listRegisteredCourses(info, callback)
            break
        case "post_searchCoursebyID":
            post_searchCoursebyID(info, callback)
            break
        case "post_searchCoursebyName":
            post_searchCoursebyName(info, callback)
            break
        case "post_searchCoursebyValueGreaterThan":
            post_searchCoursebyValueGreaterThan(info, callback)
            break
        case "post_searchCoursebyValueLessThan":
            post_searchCoursebyValueLessThan(info, callback)
            break
        case "post_searchCoursebyTerm":
            post_searchCoursebyTerm(info, callback)
            break
        case "post_dropCourse":
            post_dropCourse(info, callback)
            break
        case "post_registerCourse":
            post_registerCourse(info, callback)
            break
        case "get_registerCourse":
            get_registerCourse(info, callback)
            break
        case "post_announcement":
            post_announcement(info, callback)
            break
        case "get_announcement":
            get_announcement(info, callback)
            break
        case "get_showRegisterCourseInfo":
            get_showRegisterCourseInfo(info, callback)
            break
        case "get_retriveCourse":
            get_retriveCourse(info, callback)
            break
    }
}

function seconds_with_leading_zeros(dt) { 
    return (dt < 10 ? '0' : '') + dt;
}

function post_createCourse(info, callback) {
    var email = info.message.email;
    var CourseId = info.message.CourseId;
    var uuid = email + CourseId
    var CourseName = info.message.CourseName;
    var CourseDept = info.message.CourseDept;
    var CourseDescription = info.message.CourseDescription;
    var CourseRoom = info.message.CourseRoom;
    var CourseCapacity = info.message.CourseCapacity;
    var WaitlistCapacity = info.message.WaitlistCapacity;
    var CourseTerm = info.message.CourseTerm;
    var courseData = {
        uuid,
        email,
        CourseId,
        CourseName,
        CourseDept,
        CourseDescription,
        CourseRoom,
        CourseCapacity,
        WaitlistCapacity,
        CourseTerm
    }

    Course.findOne({email: email, CourseId: CourseId}, function(err, docs) {
		if (docs) {
			Course.findOneAndUpdate({email: email}, courseData, function(err, result) {
				 if (err) {
                     //res.send("Fail")
                     callback(null, "Fail")
				 } else {
				 	 console.log(result)
                     //res.send("Update successfully")
                     callback(null, result)
	 			 }
			})
		} else {
			   console.log(courseData)
               Course.create(courseData, function(err, newlyCreated) {
					if (err) {
						console.log("Error Data");
                         //res.send({msg: "False"});
                         callback(null, {msg: "False"})
					} else {
                         //res.send({msg: "True"});
                         callback(null, {msg: "False"})
					}
			   })

		}

	})
}

function post_deleteCourse(info, callback) {
    var data = info.message;
    var delete_data = {
        email: data.email,
        CourseId: data.CourseId
    }

    Course.deleteOne({CourseId: delete_data.CourseId, email: delete_data.email})
             .then(result => callback(null, result))
             .catch(err =>  callback(null, err))
}


function  get_createCourse(info, callback) {
    Course.find({email: info.email}, function(err, docs) {
        if (docs.length != 0) {
            //res.send(docs)
            callback(null, docs)
        } else {
            //res.send({"error": err})
           // callback(null, {"error": err})
           callback(null, [{CourseId: null, CourseName: null}])
        }
    })
}

function get_listRegisteredCourses(info, callback) {
  
    email = info.email
    Roster.find({email: email}, function(err, docs) {
        if (err) {
            //res.send({"error": err})
            callback(null, {"error": err})
        } else {
            //res.send(docs)
            callback(null, docs)
        }
    })
}

function post_searchCoursebyID(info, callback) {
    var id = info.message.id
    var all_course_info = []
    var finalResult = []
    Course.find({CourseId: id}, function(err, all_listed_courses) {
        if (all_listed_courses) {
            //res.send(docs)
           

            Roster.aggregate([
                // {$match:
                //     {'email': email } },
                {
                    $group: {
                        _id: '$CourseId',  //$region is the column name in collection
    
                        count: {$sum: 1}
                    }
                }          
            ], function(err, course_count) {
             
               if (err) {
                   console.log(err)
               }
              //res.send(course_count)
             console.log(course_count)
                           
                       all_listed_courses.forEach(function(element) {
                                //console.log()
                                //console.log(element2.CourseId)
                                var data = {
                                    faculty_email: element.email,
                                    CourseName: element.CourseName,
                                    CourseId: element.CourseId,
                                    CourseDescription: element.CourseDescription,
                                    CourseRoom: element.CourseRoom,
                                    CourseTerm: element.CourseTerm,
                                    count: 0,
                                    CourseCapacity: element.CourseCapacity,
                                    WaitlistCapacity: element.WaitlistCapacity,
                                    status: "open"
    
                                }
                                
                                course_count.forEach(function(element2) {
                                    
                                    if (element2._id == element.CourseId) {
                                         
                                        data.count = element2.count
                                        if (data.count >= element.CourseCapacity && data.count < (element.CourseCapacity + element.WaitlistCapacity)) {
                                            data.status = "waitlist"
                                        } 
                                        if (data.count > (element.CourseCapacity + element.WaitlistCapacity)) {
                                            data.status = "closed"
                                        }
                                    }
                                })
                                //console.log(data)
                                all_course_info.push(data)
                            })
    
                           //res.send(all_course_info)   
                           callback(null, all_course_info)
              });
    

            

        } else {
            //res.send({"error": err})
            callback(null, {"error": err})
        }
    })
}

function post_searchCoursebyName(info, callback) {
    var courseName = info.message.courseName
    var all_course_info = []
    var finalResult = []
    Course.find({CourseName: courseName}, function(err, all_listed_courses) {
        if (all_listed_courses) {
            //res.send(docs)
           

            Roster.aggregate([
                // {$match:
                //     {'email': email } },
                {
                    $group: {
                        _id: '$CourseId',  //$region is the column name in collection
    
                        count: {$sum: 1}
                    }
                }          
            ], function(err, course_count) {
             
               if (err) {
                   console.log(err)
               }
              //res.send(course_count)
             console.log(course_count)
                           
                       all_listed_courses.forEach(function(element) {
                                //console.log()
                                //console.log(element2.CourseId)
                                var data = {
                                    faculty_email: element.email,
                                    CourseName: element.CourseName,
                                    CourseId: element.CourseId,
                                    CourseDescription: element.CourseDescription,
                                    CourseRoom: element.CourseRoom,
                                    CourseTerm: element.CourseTerm,
                                    count: 0,
                                    CourseCapacity: element.CourseCapacity,
                                    WaitlistCapacity: element.WaitlistCapacity,
                                    status: "open"
    
                                }
                                
                                course_count.forEach(function(element2) {
                                    
                                    if (element2._id == element.CourseId) {
                                         
                                        data.count = element2.count
                                        if (data.count >= element.CourseCapacity && data.count < (element.CourseCapacity + element.WaitlistCapacity)) {
                                            data.status = "waitlist"
                                        } 
                                        if (data.count > (element.CourseCapacity + element.WaitlistCapacity)) {
                                            data.status = "closed"
                                        }
                                    }
                                })
                                //console.log(data)
                                all_course_info.push(data)
                            })
    
                           //res.send(all_course_info)  
                           callback(null, all_course_info) 
              });
    

            

        } else {
            //res.send({"error": err})
            callback(null, {"error": err})
        }
    })
}


function post_searchCoursebyValueGreaterThan(info, callback) {
    var CourseId = info.message.CourseId
    var all_course_info = []
    var finalResult = []
    Course.find({CourseId: {$gt: CourseId}}, function(err, all_listed_courses) {
        if (all_listed_courses) {
            //res.send(docs)
           

            Roster.aggregate([
                // {$match:
                //     {'email': email } },
                {
                    $group: {
                        _id: '$CourseId',  //$region is the column name in collection
    
                        count: {$sum: 1}
                    }
                }          
            ], function(err, course_count) {
             
               if (err) {
                   console.log(err)
               }
              //res.send(course_count)
             console.log(course_count)
                           
                       all_listed_courses.forEach(function(element) {
                                //console.log()
                                //console.log(element2.CourseId)
                                var data = {
                                    faculty_email: element.email,
                                    CourseName: element.CourseName,
                                    CourseId: element.CourseId,
                                    CourseDescription: element.CourseDescription,
                                    CourseRoom: element.CourseRoom,
                                    CourseTerm: element.CourseTerm,
                                    count: 0,
                                    CourseCapacity: element.CourseCapacity,
                                    WaitlistCapacity: element.WaitlistCapacity,
                                    status: "open"
    
                                }
                                
                                course_count.forEach(function(element2) {
                                    
                                    if (element2._id == element.CourseId) {
                                         
                                        data.count = element2.count
                                        if (data.count >= element.CourseCapacity && data.count < (element.CourseCapacity + element.WaitlistCapacity)) {
                                            data.status = "waitlist"
                                        } 
                                        if (data.count > (element.CourseCapacity + element.WaitlistCapacity)) {
                                            data.status = "closed"
                                        }
                                    }
                                })
                                //console.log(data)
                                all_course_info.push(data)
                            })
    
                           //res.send(all_course_info)  
                           callback(null, all_course_info) 
              });
        } else {
            //res.send({"error": err})
            callback(null, {"error": err})
        }
    })

}


function post_searchCoursebyValueLessThan(info, callback) {
    var CourseId = info.message.CourseId
    var all_course_info = []
    var finalResult = []
    Course.find({CourseId: {$lt: CourseId}}, function(err, all_listed_courses) {
        if (all_listed_courses) {
            //res.send(docs)
           

            Roster.aggregate([
                // {$match:
                //     {'email': email } },
                {
                    $group: {
                        _id: '$CourseId',  //$region is the column name in collection
    
                        count: {$sum: 1}
                    }
                }          
            ], function(err, course_count) {
             
               if (err) {
                   console.log(err)
               }
              //res.send(course_count)
             console.log(course_count)
                           
                       all_listed_courses.forEach(function(element) {
                                //console.log()
                                //console.log(element2.CourseId)
                                var data = {
                                    faculty_email: element.email,
                                    CourseName: element.CourseName,
                                    CourseId: element.CourseId,
                                    CourseDescription: element.CourseDescription,
                                    CourseRoom: element.CourseRoom,
                                    CourseTerm: element.CourseTerm,
                                    count: 0,
                                    CourseCapacity: element.CourseCapacity,
                                    WaitlistCapacity: element.WaitlistCapacity,
                                    status: "open"
    
                                }
                                
                                course_count.forEach(function(element2) {
                                    
                                    if (element2._id == element.CourseId) {
                                         
                                        data.count = element2.count
                                        if (data.count >= element.CourseCapacity && data.count < (element.CourseCapacity + element.WaitlistCapacity)) {
                                            data.status = "waitlist"
                                        } 
                                        if (data.count > (element.CourseCapacity + element.WaitlistCapacity)) {
                                            data.status = "closed"
                                        }
                                    }
                                })
                                //console.log(data)
                                all_course_info.push(data)
                            })
    
                           //res.send(all_course_info)  
                           callback(null, all_course_info) 
              });
    

            

        } else {
            //res.send({"error": err})
            callback(null, {"error": err})
        }
    })
}


function post_searchCoursebyTerm(info, callback) {
    var CourseTerm = info.message.CourseTerm
    CoursTerm = CourseTerm.replace(/['"]+/g, '')
    console.log(CourseTerm)
    var all_course_info = []
    var finalResult = []
    Course.find({CourseTerm: CourseTerm}, function(err, all_listed_courses) {
        if (all_listed_courses) {
            //res.send(docs)
            console.log("sdfsdf")
           

            Roster.aggregate([
                // {$match:
                //     {'email': email } },
                {
                    $group: {
                        _id: '$CourseId',  //$region is the column name in collection
    
                        count: {$sum: 1}
                    }
                }          
            ], function(err, course_count) {
             
               if (err) {
                   console.log(err)
               }
              //res.send(course_count)
             console.log(course_count)
                           
                       all_listed_courses.forEach(function(element) {
                                //console.log()
                                //console.log(element2.CourseId)
                                var data = {
                                    faculty_email: element.email,
                                    CourseName: element.CourseName,
                                    CourseId: element.CourseId,
                                    CourseDescription: element.CourseDescription,
                                    CourseRoom: element.CourseRoom,
                                    CourseTerm: element.CourseTerm,
                                    count: 0,
                                    CourseCapacity: element.CourseCapacity,
                                    WaitlistCapacity: element.WaitlistCapacity,
                                    status: "open"
    
                                }
                                
                                course_count.forEach(function(element2) {
                                    
                                    if (element2._id == element.CourseId) {
                                         
                                        data.count = element2.count
                                        if (data.count >= element.CourseCapacity && data.count < (element.CourseCapacity + element.WaitlistCapacity)) {
                                            data.status = "waitlist"
                                        } 
                                        if (data.count > (element.CourseCapacity + element.WaitlistCapacity)) {
                                            data.status = "closed"
                                        }
                                    }
                                })
                                //console.log(data)
                                all_course_info.push(data)
                            })
    
                           //res.send(all_course_info)   
                           callback(null, all_course_info)
              });
    

            

        } else {
            //res.send({"error": err})
            callback(null, {"error": err})
        }
    })
}

function post_dropCourse(info, callback) {
    var id = info.message.CourseId
    var email = info.message.email
    
    Roster.deleteOne({CourseId: id, email: email})
     .then(result => callback(null, result))
     .catch(err =>  callback(null, err))
}

function post_registerCourse(info, callback) {
    var email = info.message.email
    var CourseId = info.message.CourseId
    var status = info.message.status
    var faculty_email = info.message.faculty_email
    var uuid = email.toString() + CourseId.toString()
    var data = {
        email,
        faculty_email,
        CourseId,
        status,
        uuid
    }
    Roster.findOne({uuid: uuid}, function(err, docs) {
		if (docs) {
			Roster.findOneAndUpdate({uuid: uuid}, data, function(err, result) {
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
			   console.log(data)
               Roster.create(data, function(err, newlyCreated) {
					if (err) {
						console.log(err);
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

function get_registerCourse(info, callback) {
   
    var result = []
    var finalResult = []
    
    
    if (info.email) {
        email = info.email
    } else {
        email = "doesn't exist"
    }

    Roster.find({email: email, status: "open"}, function(err, registered_list) {
		if (registered_list) {
               Course.find({}, function(err2, all_courses) {

                   var already_registered_id = []
                   for (var i = 0; i < registered_list.length; i++) {
                      
                        already_registered_id.push(registered_list[i].CourseId)
                   }
                   for (var i = 0; i <  all_courses.length; i++) {

                    if (already_registered_id.includes(all_courses[i].CourseId)) {
                        console.log(all_courses[i])
                        finalResult.push(all_courses[i])
                    }
             
                }
                if ( finalResult === undefined || finalResult.length == 0) {
                    // array empty or does not exist
                    //res.send([{CourseId: null, CourseName: null}])
                    callback(null, [{CourseId: null, CourseName: null}])
                } else {
                    //res.send(finalResult)
                    callback(null, finalResult)
                }
                
               })
          } else {
              //res.send([{CourseId: null, CourseName: null}])
              callback(null, [{CourseId: null, CourseName: null}])
          }
         
	})
}

function post_announcement(info, callback) {
    var title
    if (info.message.title) {
        title = info.message.title
    } else {
        title = "No Subject"
    }
    var email = info.message.email
    var CourseId = info.message.CourseId
    console.log(CourseId)
    var comment = info.message.comment
    var present_time = new Date()
    var time = present_time.getMonth() + "/" + present_time.getDate() + "/"
    time = time + present_time.getFullYear() + " " + present_time.getHours()
    var now_seconds = seconds_with_leading_zeros(present_time.getSeconds())
    time = time + ":" + present_time.getMinutes() + ":" + now_seconds
    time = time + ":" + present_time.getMilliseconds()
    var uuid = email + " " + time
    console.log(time)
    console.log(uuid)
    var data = {
        uuid,
        title,
        email,
        CourseId,
        comment,
        time
    }

    Announcement.create(data, function(err, newlyCreated) {
        if (err) {
            //res.send({msg: "False"})
            callback(null, {msg: "False"})
        } else {
            //res.send(newlyCreated)
            callback(null, newlyCreated)
        }
    })
}


function get_announcement(info, callback) {
    var id = info.id
    console.log(id)
    Announcement.find({CourseId: id})
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

        })

}

function get_showRegisterCourseInfo(info, callback) {
    var email = info.email
    var all_course_info = []
    var finalResult = []
    Course.find({}, function(err, all_listed_courses) {
		if (all_listed_courses) {

        Roster.aggregate([
            // {$match:
            //     {'email': email } },
            {
                $group: {
                    _id: '$CourseId',  //$region is the column name in collection

                    count: {$sum: 1}
                }
            }          
        ], function(err, course_count) {
         
           if (err) {
               console.log(err)
           }
          //res.send(course_count)
         console.log(course_count)
                       
                   all_listed_courses.forEach(function(element) {
                            //console.log()
                            //console.log(element2.CourseId)
                            var data = {
                                faculty_email: element.email,
                                CourseName: element.CourseName,
                                CourseId: element.CourseId,
                                count: 0,
                                CourseCapacity: element.CourseCapacity,
                                WaitlistCapacity: element.WaitlistCapacity,
                                status: "open"

                            }
                            
                            course_count.forEach(function(element2) {
                                
                                if (element2._id == element.CourseId) {
                                     
                                    data.count = element2.count
                                    if (data.count >= element.CourseCapacity && data.count < (element.CourseCapacity + element.WaitlistCapacity)) {
                                        data.status = "waitlist"
                                    } 
                                    if (data.count > (element.CourseCapacity + element.WaitlistCapacity)) {
                                        data.status = "closed"
                                    }
                                }
                            })
                            //console.log(data)
                            all_course_info.push(data)
                        })

                        Roster.find({email: email}, function(err, registered_list) {
                            if (err) {
                                console.log(err)
                            } else {
                                //console.log(registered_list)
                                var already_registered_id = []
                                for (var i = 0; i < registered_list.length; i++) {
                                   
                                    already_registered_id.push(registered_list[i].CourseId)
                               }
                               for (var i = 0; i <  all_course_info.length; i++) {

                                if (!already_registered_id.includes(all_course_info[i].CourseId)) {
                                   
                                    finalResult.push(all_course_info[i])
                                }
                         
                            }
                            //res.send(finalResult)
                            callback(null, finalResult)
                            }
                        })               
          });

     
        
		} else {
            //res.send({msg: "no result"})
            callback(null, {msg: "no result"})
		}
    })
}

function get_retriveCourse(info, callback) {
    var CourseId = info.CourseId
    var faculty_email = info.faculty_email
    Course.findOne({CourseId: CourseId, email: faculty_email}, function(err, docs) {
		if (docs) {	 
              //res.send(docs)
              callback(null, docs)

		} else {
             //res.send({})
             callback(null, {})
		}
	})
}