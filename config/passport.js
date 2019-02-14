const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mysql = require('mysql')
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


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

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            db.query('SELECT * FROM basicUsers where email =?', jwt_payload.email, function(err, result) {
                if(result) {
                    return done(null, result[0])
                }

                return done(null, false)

            })
            
            
        
        })
    )
}