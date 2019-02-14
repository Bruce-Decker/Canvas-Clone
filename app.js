var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var mysql = require('mysql')
var bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport');
var fs = require('fs')
var axios = require('axios')
const keys = require('./config/keys')


app.use(passport.initialize());
require('./config/passport')(passport);

var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'Canvas273'
  });

db.connect((error) => {
    if (error) {
        throw error;
    }  

    console.log("Database is connected")
});

app.use(express.static("./"));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.get('/', function(req, res) {
    res.send('test')
})

app.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password
    db.query('SELECT * FROM basicUsers where email =?', email, function(err, result) {
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

app.post('/createBasicUser', function(req,res) {
     var name = req.body.name;
     var email = req.body.email;
     var password = req.body.password;
     var user = {name: name, email: email, password: password}

     bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            var sql = 'INSERT INTO basicUsers SET ?  ON DUPLICATE KEY UPDATE name = VALUES(name), email = VALUES(email), password = VALUES(password)'
        let query = db.query(sql, user, (err, result) => {
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

app.post('/createProfile',passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).send("Success Login")
})

app.listen(3000, function() {
    console.log('Server is listening on 3000')
})

