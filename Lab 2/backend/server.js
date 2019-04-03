var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var kafka = require('./kafka/client')

//const url = process.env.MONGODB_URI || "mongodb://localhost:27017/Canvas"
const db_url = require('./config/keys').mlab_url
const url = process.env.MONGODB_URI || db_url

var passport = require('passport')

const morgan = require('morgan')
var multer = require('multer')
const cors = require('cors')

const Auth = require('./schema/AuthModel')
const authRouter = require('./routes/authentication')
const profileRouter = require('./routes/profile')
const courseRouter = require('./routes/course')
const assignmentRouter = require('./routes/assignment')
const uploadRouter = require('./routes/upload')
const quizRouter = require('./routes/quiz')
const gradeRouter = require('./routes/grade')
const fileRouter = require('./routes/file')
const tokenRouter = require('./routes/token')
const messageRouter = require('./routes/message')



app.use(cors())
app.use(morgan('dev'))
app.use(passport.initialize());
require('./config/passport')(passport);

mongoose.connect(url, { useNewUrlParser : true })
     .then(() => console.log("Mongo Database is alive"))
     .catch(err => console.log(err))
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use(passport.initialize());

app.use('/', authRouter)
app.use('/profile', profileRouter)
app.use('/course', courseRouter)
app.use('/assignment', assignmentRouter)
app.use('/fileUpload', uploadRouter)
app.use('/quiz', quizRouter)
app.use('/grade', gradeRouter)
app.use('/file', fileRouter)
app.use('/token', tokenRouter)
app.use('/message', messageRouter)

app.post('/test', function(req, res) {
    res.send("test")
})


app.listen(port, () => console.log(`Server running on port ${port}`));

