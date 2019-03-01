var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var mysql = require('mysql')
const morgan = require('morgan')
var bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport');
var fs = require('fs')
var axios = require('axios')
const validateLogin = require('./validation/validateLogin')
const validateRegister = require('./validation/validateRegister')
var multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
       cb(null, './uploads/')
    },
    filename: function(req, file, cd) {
        file.originalname = req.body.email + '.jpg'
        cd(null, file.originalname)
    }
})

const pdfStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './PDFs/')
    },
    filename: function(req, file, cd) {
        file.originalname = req.body.email  + req.params.id  + req.body.assignment_name + '.pdf'
        cd(null, file.originalname)
    }
})


var path = require('path')
const keys = require('./config/keys')

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

const pdfUpload = multer({
    storage : pdfStorage
})

app.use(morgan('dev'))
app.use(passport.initialize());
require('./config/passport')(passport);



var pool = mysql.createPool({
    connectionLimit: 500,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'Canvas273',
    multipleStatements: true
  });

var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'Canvas273',
    multipleStatements: true
});

// pool.connect((error) => {
//     if (error) {
//         throw error;
//     }  

//     console.log("Database is connected")
// });



// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }
  

  
 

app.use(express.static("./"));
app.use(express.static("uploads"));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.get('/', function(req, res) {
    res.send('test')
})

app.get('/test', function(req, res) {
    res.send('sdfsdfsdf')
})

app.post('/facultyLogin', function(req, res) {
    const { errors, isValid } = validateLogin(req.body)
    if (!isValid) {
        return res.status(400).json(errors);
    }

   
    var email = req.body.email;
    var password = req.body.password
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   
        connection.query('SELECT * FROM basicUsers where email =?', email, function(err, result) {
        if (err) {
            
            return res.status(404).json(err)
        }
        if (result.length == 0) {
            errors.email = 'User not found'
            return res.status(404).json(errors)
        }

        bcrypt.compare(password, result[0].password)
                .then(isMatch => {
                    if(isMatch) {
                        
                        const payload = { email: result[0].email, name: result[0].name} //Create JWT payload
                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            { expiresIn: 3600 }, 
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                        });
                    } else {
                        
                        return res.status(400).json('Password incorrect')
                    }
            })
        
        })
    })
})

app.post('/login', function(req, res) {
    const { errors, isValid } = validateLogin(req.body)
    if (!isValid) {
        return res.status(400).json(errors);
    }

   
    var email = req.body.email;
    var password = req.body.password
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   
        connection.query('SELECT * FROM basicUsers where email =?', email, function(err, result) {
        if (err) {
            
            return res.status(404).json(err)
        }
        if (result.length == 0) {
            errors.email = 'User not found'
            return res.status(404).json(errors)
        }

        bcrypt.compare(password, result[0].password)
                .then(isMatch => {
                    if(isMatch) {
                        
                        const payload = { email: result[0].email, name: result[0].name} //Create JWT payload
                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            { expiresIn: 3600 }, 
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                        });
                    } else {
                        
                        return res.status(400).json('Password incorrect')
                    }
            })
        
        })
    })
})

app.post('/createBasicUser', function(req,res) {
    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    

     var name = req.body.name;
     var email = req.body.email;
     var password = req.body.password;
     var user = {name: name, email: email, password: password}
     pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    var sql = 'INSERT INTO basicUsers SET ?  ON DUPLICATE KEY UPDATE name = VALUES(name), email = VALUES(email), password = VALUES(password)'
                let query = connection.query(sql, user, (err, result) => {
                if(err) {
                    if(err.errno==1062){  
                        res.send('dubplicated key')
                    }
                    res.send('error')
                
                } else {
                    console.log('added one user');
                    console.log(result)
                    res.json(user)
                    
                }      
            });            
        })
        })
    })
})



app.get('/createUserDB', (req, res) => {
    var sql = 'CREATE DATABASE Canvas273';
    db.query(sql, (error, result) => {
        if (error) {
            throw error
        }
        console.log(result)
        res.send("Created Database Successfully")
    })
})

app.get('/createUserTable', (req, res) => {
    var sql = 'CREATE TABLE basicUsers(name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY(email))'
    db.query(sql, (err, result) => {
         if (err) throw err;
         console.log(result);
         res.send("Created Table Successfully")

    })
})

app.get('/createProfile', (req, res) => {
        var sql = `CREATE TABLE profile(image_path VARCHAR(255), name VARCHAR(255), email VARCHAR(255), 
                phone_number VARCHAR(255), about_me VARCHAR(255), city VARCHAR(255), country VARCHAR(255), 
                company VARCHAR(255), school VARCHAR(255), hometown VARCHAR(255), languages VARCHAR(255), 
                gender VARCHAR(255), PRIMARY KEY(email))`
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send("Created Table Successfully")

        })
})

app.get('/retrieveUserProfileFromCourse/:Id', (req, res) => {
  
    var Id = req.params.Id;
    var sql = "SELECT * FROM CourseList where CourseId =?"
   
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }  
          connection.query(sql, Id, (err, result) => {
            if (err) {
                throw err
            } else {
              
                var count = result.length
                if (count) {
                    var profile_array = result.map(i => i.email); 
                    var sql2 = `SELECT * FROM profile WHERE email in  ('${profile_array.join("','")}')`
                    connection.query(sql2, (err, results2) => {
                        if (err) {
                            throw err
                        } else {
                        res.send(results2)
                        }
                        
                    }) 
                 } else {
                     res.send([{CourseId: null, CourseName: null}])
                 }
            }

        })
     
 })
})
// passport.authenticate('jwt', { session: false }),
app.post('/createProfile', upload.single('filename'),  (req, res) => {
    var sql = 'INSERT INTO profile SET ?'
    
    var image_path = req.file.path
    
    var name = req.body.name
    var email = req.body.email
    var phone_number = req.body.phone_number
    var about_me = req.body.about_me
    var city = req.body.city
    var country = req.body.country
    var company = req.body.company
    var school = req.body.school
    var hometown = req.body.hometown
    var languages = req.body.languages
    var gender = req.body.gender
    var data = {
        image_path,
        name,
        email,
        phone_number,
        about_me,
        city,
        country,
        company,
        school,
        hometown,
        languages,
        gender
    }
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, data, (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }

          })

          

    })
    
      //return res.status(200).send("Success Login")
})

app.post('/createCourse', passport.authenticate('jwt', { session: false }), function(req, res) {
    var sql = 'INSERT INTO course SET ?'

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
    
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, courseData, (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }

          })
        
    })

})

app.get('/createCourse/:email', function(req, res) {
    var email = req.params.email
    console.log(email)
    var sql = `SELECT * FROM course WHERE email = "${email}"`
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }
          })       
    })
  

})


app.get('/searchCoursebyID', passport.authenticate('jwt', { session: false }), function(req, res) {
    
    console.log(req.body.id)
    var id = req.body.id
    var sql = `SELECT * FROM course WHERE CourseId = ${id} LIMIT 1`

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }
          })       
    })
})

app.get('/searchCoursebyName', passport.authenticate('jwt', { session: false }), function(req, res) {
    
    console.log(req.body.courseName)
   
    var courseName = req.body.courseName
    console.log(courseName)
    var sql = `SELECT * FROM course WHERE CourseName = ?`

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, courseName, (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }
          })       
    })
})

app.get('/searchCoursebyValue', passport.authenticate('jwt', { session: false }), function(req, res) {
    
    console.log(req.body.courseId)
   
    var courseId = req.body.courseId
    
    var sql = `SELECT * FROM course WHERE CourseId > ?`

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, courseId, (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }
          })       
    })
})

app.get('/createCourseListTable', (req, res) => {
    var sql = `CREATE TABLE CourseList(uuid VARCHAR(255), email VARCHAR(255), CourseId VARCHAR(255), status VARCHAR(255), PRIMARY KEY(uuid))`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Created Table Successfully")

    })
})



app.get('/createCourseTable', (req, res) => {
    var sql = `CREATE TABLE course(uuid VARCHAR (255), email VARCHAR(255), CourseId VARCHAR(255), 
        CourseName VARCHAR(255), CourseDept VARCHAR(255), 
        CourseDescription VARCHAR(255),
        CourseRoom VARCHAR(255), CourseCapacity VARCHAR(255), 
        WaitlistCapacity VARCHAR(255), CourseTerm VARCHAR(255), PRIMARY KEY(uuid))`
    db.query(sql, (err, result) => {
         if (err) throw err;
         console.log(result);
         res.send("Created Table Successfully")

    })
})

app.post('/dropCourse', function(req, res) {
    var data = req.body;
    var delete_data = {
        email: data.email,
        CourseId: data.CourseId
    }
    
    var sql = "DELETE FROM CourseList WHERE email  = ? AND CourseId = ?"
    console.log(sql)
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, [delete_data.email, delete_data.CourseId], (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }

          })
        
    })


})


app.post('/registerCourse',  function(req, res) {
    var sql = 'INSERT INTO CourseList SET ?'
    
    var email = req.body.email;
    var CourseId = req.body.CourseId;
    var status = req.body.status;
    var uuid = email.toString() + CourseId.toString()
   
    var courseData = {
        uuid,
        email,
        status,
        CourseId
    }
    
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, courseData, (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }

          })
        
    })

})

app.get('/registerCourse/:email', function(req, res) {
    var email 
    
     if (req.params.email) {
         email = req.params.email
     } else {
         email = "doesn't exist"
     }
    
   
    console.log(email)
    var sql = `SELECT courseId FROM CourseList WHERE email = ?`
    
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, email, (err, results) => {
              if (err) {
                  throw err
              } else {
                  var count = results.length;
                  if (count) {
                    var course_array = results.map(i => i.courseId); 
                    var sql2 = `SELECT * FROM course WHERE courseId in  ('${course_array.join("','")}')`
                    connection.query(sql2, (err, results2) => {
                        if (err) {
                            throw err
                        } else {
                        res.send(results2)
                        }
                        
                    }) 
                 } else {
                     res.send([{CourseId: null, CourseName: null}])
                 }
              
              }
          })       
    })

})

app.post('/announcement', function(req, res) {
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
    var time = present_time.getMonth() + "/" + present_time.getDate() + "/"
    time = time + present_time.getFullYear() + " " + present_time.getHours()
    time = time + ":" + present_time.getMinutes() + ":" + present_time.getSeconds()
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
    var sql = 'INSERT INTO Announcement SET ?'
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, data, (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }

          })
        
    })


})

app.get('/announcement/:id', function(req, res) {
    console.log(req.params.id)
    id = req.params.id
    var sql = `SELECT * FROM Announcement WHERE CourseId="${id}"`
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }
          })       
    })
    
})


app.get('/createAnnouncementTable', (req, res) => {
    var sql = `CREATE TABLE Announcement(uuid VARCHAR (255), title VARCHAR(255), email VARCHAR(255), CourseId VARCHAR(255), 
        comment VARCHAR(255), time VARCHAR(255), PRIMARY KEY(uuid))`
    db.query(sql, (err, result) => {
         if (err) throw err;
         console.log(result);
         res.send("Created Table Successfully")

    })
})

app.get('/showRegisterCourseInfo', function(req,res) {
    var CourseId = req.params.id;
    //var sql = `SELECT COUNT(*) as count FROM CourseList WHERE CourseId =?`
    var sql = `SELECT * FROM course`
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }  

          connection.query(sql, (err, results) => {
            if (err) {
                throw err
            } else {
                var count = results.length;
                if (count) {
                    var course_capacity_array = results.map(result => result.CourseCapacity)
                    var waitlist_capacity_array = results.map(result => result.WaitlistCapacity)
                    var courseId_array = results.map(result => result.CourseId)
                   console.log(results)
                    var sql2 = `SELECT CourseId, COUNT(*) as count FROM CourseList GROUP BY CourseId ORDER BY count`
                     connection.query(sql2, (err, results2) => {
                        if (err) {
                            throw err
                        } else {
                        console.log()
                        console.log(results2)
                        results3 = []
                        results.forEach(function(element) {
                            //console.log()
                            //console.log(element2.CourseId)
                            var data = {
                                CourseName: element.CourseName,
                                CourseId: element.CourseId,
                                count: 0,
                                CourseCapacity: element.CourseCapacity,
                                WaitlistCapacity: element.WaitlistCapacity,
                                status: "open"

                            }
                            
                            results2.forEach(function(element2) {
                                if (element2.CourseId == element.CourseId) {
                                     
                                    data.count = element2.count
                                    if (data.count >= element.CourseCapacity && data.count < (element.CourseCapacity + element.WaitlistCapacity)) {
                                        data.status = "waitlist"
                                    } 
                                    if (data.count > (element.CourseCapacity + element.WaitlistCapacity)) {
                                        data.status = "closed"
                                    }
                                }
                            })
                            results3.push(data)
                        })
                        res.send(results3)
                        }
                        
                    }) 
                 } else {
                     res.send([{CourseId: null, CourseName: null, count: 0, CourseCapacity: null, WaitlistCapacity: null, status: "open"}])
                 }

                }
                 
            })

            })
      
    })

app.get('/listRegisteredCourses/:email', function(req, res) {
    console.log(req.params.email)
    email = req.params.email
    var sql = `SELECT * FROM CourseList WHERE email="${email}"`
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }
          })       
    })
     
})

app.get('/createAssignmentsTable', (req, res) => {
    var sql = `CREATE TABLE Assignments(uuid VARCHAR (255), assignment_name VARCHAR(255), email VARCHAR(255), CourseId VARCHAR(255), 
        description VARCHAR(255), time VARCHAR(255), PRIMARY KEY(uuid))`
    db.query(sql, (err, result) => {
         if (err) throw err;
         console.log(result);
         res.send("Created Table Successfully")

    })
})

app.post('/createAssignment', function(req, res) {
    var assignment_name = req.body.assignment_name
    var email  = req.body.email
    var CourseId = req.body.CourseId
    var uuid = email + "-" + CourseId + "-" + assignment_name
    var description = req.body.description
    var present_time = new Date()
    var time = present_time.getMonth() + "/" + present_time.getDate() + "/"
    time = time + present_time.getFullYear() + " " + present_time.getHours()
    time = time + ":" + present_time.getMinutes() + ":" + present_time.getSeconds()
    time = time + ":" + present_time.getMilliseconds()
    var data = {
        uuid,
        assignment_name,
        email,
        CourseId,
        description,
        time
    }
    var sql = 'INSERT INTO Assignments SET ?'
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, data, (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }

          })
        
    })

})

app.get('/listAssignments/:id', function(req, res) {
      var id = req.params.id;
      var sql = `SELECT * FROM Assignments WHERE CourseId="${id}" ORDER BY time DESC`
      pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }
          })       
    })
    
 
})

app.get('/createUploadsTable', (req, res) => {
    var sql = `CREATE TABLE Uploads(uuid VARCHAR (255), assignment_name VARCHAR(255), email VARCHAR(255), CourseId VARCHAR(255), 
         file_path VARCHAR(255), time VARCHAR(255), PRIMARY KEY(uuid))`
    db.query(sql, (err, result) => {
         if (err) throw err;
         console.log(result);
         res.send("Created Table Successfully")

    })
})


// passport.authenticate('jwt', { session: false }),
app.post('/upload/:id', pdfUpload.single('filename'),  (req, res) => {
    var sql = 'REPLACE INTO Uploads SET ?'
    var sql2 = 'ON DUPLICATE KEY UPDATE'
    var assignment_name = req.body.assignment_name
    var email = req.body.email
    var CourseId = req.params.id
    var uuid = email +  CourseId +  assignment_name

    var file_path = req.file.path
    
    var present_time = new Date()
    var time = present_time.getMonth() + "/" + present_time.getDate() + "/"
    time = time + present_time.getFullYear() + " " + present_time.getHours()
    time = time + ":" + present_time.getMinutes() + ":" + present_time.getSeconds()
    time = time + ":" + present_time.getMilliseconds()


    var data = {
        uuid,
        assignment_name,
        email,
        CourseId,
        file_path,
        time
    }

    console.log("data " + data)
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, data, (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }

          })

          

    })
    
      //return res.status(200).send("Success Login")
})

app.get('/upload/:CourseId/:assignment_name/:email', function(req, res) {
    
    var email = req.params.email
    var CourseId = req.params.CourseId
    var assignment_name = req.params.assignment_name
    var uuid = email + CourseId +  assignment_name
    var sql = `SELECT * FROM Uploads WHERE uuid="${uuid}" LIMIT 1`
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }   

          connection.query(sql, (err, result) => {
              if (err) {
                  throw err
              } else {
                  res.send(result)
              }

          })

          

    })
})


// app.post('/postComment/:userID', passport.authenticate('jwt', { session: false }), function(req, res) {

// })
  

app.listen(5000, function() {
    console.log('Server is listening on 5000')
})

