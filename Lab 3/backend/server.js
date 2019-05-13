var express = require('express')

var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const { makeExecutableSchema } = require('graphql-tools')
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')


const Auth = require('./models/AuthModel')
const Course = require('./models/Course')
const Roster = require('./models/Roster')
const Profile = require('./models/Profile')

const { typeDefs } = require('./schema/schema')
const { resolvers } = require("./resolvers/resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


//const url = process.env.MONGODB_URI || "mongodb://localhost:27017/Canvas"
const db_url = require('./config/keys').mlab_url
const url = process.env.MONGODB_URI || db_url


const morgan = require('morgan')

const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}



mongoose.connect(url, { 
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30,
    useNewUrlParser : true,
    poolSize: 500

}).then(() => console.log("Mongo Database is alive"))
  .catch(err => console.log(err))
//console.log("port is " + process.env.PORT || 5000)


app.use(cors(corsOptions))
app.use(morgan('dev'))

// app.use(async (req, res, next) => {
//   const token = req.headers['authorization']
//   if (token !== "null") {
//     try {
//       const activeUser = await jwt.verify(token, 'secret')
//       console.log(activeUser)
//     } catch (err) {
//       console.error(err)
//     }
//   }
//   next()
// })


app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}))

app.use('/graphql',
 bodyParser.json(),
 graphqlExpress(({ activeUser }) => ({
    schema,
    context: {
        Auth,
        Course,
        activeUser,
        Roster,
        Profile
    }
}))
)


console.log("port is " +  5000)
const port = process.env.PORT || 5000;





app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app

