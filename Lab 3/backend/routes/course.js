const express = require('express');
const router = express.Router();
const Course = require('../schema/Course')
const Roster = require('../schema/Roster')
const Announcement = require('../schema/Announcement')

const passport = require('passport');

router.post('/createCourse', function(req, res) {
    var email = req.body.email;
    var CourseId = req.body.CourseId;
    var uuid = email + CourseId
    var CourseName = req.body.CourseName;
    var CourseDept = req.body.CourseDept;
    var CourseDescription = req.body.CourseDescription;
    var CourseRoom = req.body.CourseRoom;
    var CourseCapacity = req.body.CourseCapacity;
    var WaitlistCapacity = req.body.WaitlistCapacity;
    var CourseTerm = req.body.CourseTerm;
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
				 	res.send("Fail")
				 } else {
				 	console.log(result)
	 				res.send("Update successfully")
	 			 }
			})
		} else {
			   console.log(courseData)
               Course.create(courseData, function(err, newlyCreated) {
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




router.post('/deleteCourse', function(req, res) {
    var data = req.body;
    var delete_data = {
        email: data.email,
        CourseId: data.CourseId
    }

    Course.deleteOne({CourseId: delete_data.CourseId, email: delete_data.email})
             .then(result => res.send(result))
             .catch(err =>  res.send(err))
})



router.get('/createCourse/:email', function(req, res) {
    Course.find({email: req.params.email}, function(err, docs) {
        if (docs) {
            res.send(docs)
        } else {
            res.send({"error": err})
        }
    })
})




router.get('/listRegisteredCourses/:email', function(req, res) {
    console.log(req.params.email)
    email = req.params.email
    Roster.find({email: email}, function(err, docs) {
        if (err) {
            res.send({"error": err})
        } else {
            res.send(docs)
        }
    })
     
})




router.post('/searchCoursebyID', function(req, res) {
    var id = req.body.id
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
    
                           res.send(all_course_info)   
              });
    

            

        } else {
            res.send({"error": err})
        }
    })
})




router.post('/searchCoursebyName', function(req, res) {
    var courseName = req.body.courseName
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
    
                           res.send(all_course_info)   
              });
    

            

        } else {
            res.send({"error": err})
        }
    })
})




router.post('/searchCoursebyValueGreaterThan', function(req, res) {
    var CourseId = req.body.CourseId
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
    
                           res.send(all_course_info)   
              });
    

            

        } else {
            res.send({"error": err})
        }
    })
})




router.post('/searchCoursebyValueLessThan', function(req, res) {
    var CourseId = req.body.CourseId
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
    
                           res.send(all_course_info)   
              });
    

            

        } else {
            res.send({"error": err})
        }
    })
})


router.post('/searchCoursebyTerm', function(req, res) {
    var CourseTerm = req.body.CourseTerm
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
    
                           res.send(all_course_info)   
              });
    

            

        } else {
            res.send({"error": err})
        }
    })
})



router.post('/dropCourse', function(req, res) {
    var id = req.body.CourseId
    var email = req.body.email
    
    Roster.deleteOne({CourseId: id, email: email})
     .then(result => res.send(result))
     .catch(err =>  res.send(err))
})




router.post('/registerCourse', function(req, res) {
    var email = req.body.email
    var CourseId = req.body.CourseId
    var status = req.body.status
    var faculty_email = req.body.faculty_email
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
				 	res.send("Fail")
				 } else {
				 	console.log(result)
	 				res.send("Update successfully")
	 			 }
			})
		} else {
			   console.log(data)
               Roster.create(data, function(err, newlyCreated) {
					if (err) {
						console.log(err);
						 res.send({msg: "False"});
					} else {
						 res.send({msg: "True"});
					}
			   })

		}

	})
})




router.get('/registerCourse/:email', function(req, res) {
    var email 
    var result = []
    var finalResult = []
    
    
    if (req.params.email) {
        email = req.params.email
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
                    res.send([{CourseId: null, CourseName: null}])
                } else {
                    res.send(finalResult)
                }
                
               })
          } else {
              res.send([{CourseId: null, CourseName: null}])
          }
         
	})
})


router.post('/announcement', function(req, res) {
    var title
    if (req.body.title) {
        title = req.body.title
    } else {
        title = "No Subject"
    }
    var email = req.body.email
    var CourseId = req.body.CourseId
    console.log(CourseId)
    var comment = req.body.comment
    var present_time = new Date()

    var time = present_time.getHours() + ":" + present_time.getMinutes() + ":" + present_time.getSeconds()
    time = time + " " + present_time.getMonth() + "/" + present_time.getDate() + "/" + present_time.getFullYear()
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
            res.send({msg: "False"})
        } else {
            res.send(newlyCreated)
        }
    })
})





router.get('/announcement/:id', function(req, res) {
    var id = req.params.id
    console.log(id)
    Announcement.find({CourseId: id}, function(err, result) {
        if (result) {
            res.send(result)
        } else {
            res.send({"error": err})
        }
    })

})



router.get('/showRegisterCourseInfo3/:email', function(req, res) {
    var email = req.params.email
    var all_course_info = []
    var finalResult = []
    Course.find({}, function(err, all_listed_courses) {
		if (all_listed_courses) {
        //     var count = docs.length
          
        //    res.send(docs)
        //console.log(results)
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
                            res.send(finalResult)
                            }
                        })               
          });

     
        
		} else {
		    res.send({msg: "no result"})
		}
    })
})




router.get('/retriveCourse/:CourseId/:faculty_email', function(req, res) {
    var CourseId = req.params.CourseId
    var faculty_email = req.params.faculty_email
    Course.findOne({CourseId: CourseId, email: faculty_email}, function(err, docs) {
		if (docs) {	 
	 	     res.send(docs)

		} else {
			 res.send({})
		}
	})
})



module.exports = router;