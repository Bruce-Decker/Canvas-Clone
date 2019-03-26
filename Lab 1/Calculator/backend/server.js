var express = require('express')
var bodyParser = require('body-parser')
const morgan = require('morgan')
var cors = require('cors')


var app = express()
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.get('/', function(req, res) {
    res.send('test')
})

app.post('/calculate', (req, res) => {
    var input = req.body.input;
    var result;
    try {
        result = eval(input)
        console.log("The input is " + input + "." + " The result is " + result)
        res.send(result.toString())
    } catch {
        res.send("error")
    }
  
    
})



app.listen(5000, function() {
    console.log('Server is listening on 5000')
})
