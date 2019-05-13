exports.typeDefs = `

type Course {
  
  email: String!,
  CourseId: String!,
  CourseName: String!,
  CourseDept: String,
  CourseDescription: String,
  CourseRoom: String,
  CourseCapacity: String,
  WaitlistCapacity: String,
  CourseTerm: String
}

type Roster {
  uuid: String,
  email: String!,
  CourseId: String!,
  faculty_email: String!,
  status: String!
}

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
    getActiveUser: Auth,
    showCreatedCourses(email: String!): [Course]
    showRegisteredCourses(email: String!): [Course]
    showUnregisteredCourses(email: String!): [Course]
  
  }
  
   type Mutation {
    register(name: String!, email: String!, password: String! ): jwtToken

    login(email: String!, password: String! ): jwtToken

    registerCourse(email: String!, faculty_email: String!, CourseId: String!): Roster

    createCourse(email: String!, CourseId: String!, CourseName: String!,
        CourseDept: String!, CourseDescription: String, CourseRoom: String, 
        CourseCapacity: String, WaitlistCapacity: String, CourseTerm: String ): Course

    deleteCreatedCourse(email: String!, CourseId: String!): Course
    deleteRegisteredCourse(email: String!, CourseId: String!): Course
  }

  

`