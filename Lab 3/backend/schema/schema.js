exports.typeDefs = `


   type Auth {
       name: String!,
       email: String!,
       password: String!
   }
   type jwtToken {
    jwtToken: String!
  }

  type Query {
    getAllUsers: [Auth]
  
  }
  
   type Mutation {
    register(name: String!, email: String!, password: String! ): jwtToken
    login(email: String!, password: String! ): jwtToken
  }

`