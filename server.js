var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var mysql = require('mysql')
var bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport');
var fs = require('fs')
var axios = require('axios')
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

app.use(passport.initialize());
require('./config/passport')(passport);

var pool = mysql.createPool({
    connectionLimit: 500,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'Canvas273'
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

app.post('/login', function(req, res) {
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
            return res.status(404).json('User not found')
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

app.post('/createProfile', upload.single('filename'), passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.post('/upload', upload.single('filename'), (req, res) => {
    console.log(req.body.name)
    console.log(req.file.path)
    
    res.send("fsdfds")
});

  

app.listen(5000, function() {
    console.log('Server is listening on 5000')
})

