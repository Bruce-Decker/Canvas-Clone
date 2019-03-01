var express = require('express')
var bodyParser = require('body-parser')
const morgan = require('morgan')
var app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.get('/', function(req, res) {
    res.send('test')
})

app.post('/calculate', function(req, res) {
    var num1 = parseFloat(req.body.num1);
    var num2 = parseFloat(req.body.num2);
    var symbol = req.body.symbol;
    console.log(symbol)
    
    var result
    if (symbol == "+") {
       result = num1 + num2
    } else if (symbol == "-") {
        result = num1 - num2
    } else if (symbol == "*") {
        result = num1 * num2
    } else if (symbol == "/") {
        result = num1 / num2
    } else {
        result = "undefined"
    }
    res.send(result.toString())
    
})

app.listen(5000, function() {
    console.log('Server is listening on 5000')
})
