const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const jwtToken = (user, secret, expiration_time) => {
    const { name, email } = user;
    return jwt.sign({ name, email }, secret, {expiresIn: expiration_time});
};
   

exports.resolvers = {
    Query: {
        getAllUsers: async (root, args, { Auth }) => {
           const allUsers = await Auth.find()
           return allUsers
       }
   },
    Mutation: {


        register: async (root, { name, email, password }, { Auth }) => {
            const user = await Auth.findOne({ email });
            if (user) {
                throw new Error('User already exists')
            }
            
            console.log("name in resolver " + name)
            console.log("email in resolver " + email)
            console.log("password in resolver " + password)
   
            const newUser = await new Auth({
                name,
                email,
                password 
            }).save()
              return {
                  jwtToken: jwtToken(newUser, 'secret', '1hr')
              }
       },

       login: async (root, { email, password}, {Auth}) => {
             const user = await Auth.findOne({email})
             if (!user) {
                throw new Error('User not found')
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            console.log(password)
            console.log(user.password)
            if (!isValidPassword) {
                throw new Error('Invalid password')
            } 
            return { jwtToken: jwtToken(user, 'secret', '1hr') }
       }

    }

}