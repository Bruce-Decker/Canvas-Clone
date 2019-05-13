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

type Profile {
   name: String!,
   email: String!,
   phone_number: String,
   about_me: String,
   city: String,
   country: String,
   school: String,
   hometown: String,
   languages: String,
   gender: String
   company: String
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
    getProfile(email: String!): Profile
  
  }
  
   type Mutation {
    register(first_name: String!, last_name: String!, email: String!, password: String! ): jwtToken

    login(email: String!, password: String! ): jwtToken

    registerCourse(email: String!, faculty_email: String!, CourseId: String!): Roster

    createCourse(email: String!, CourseId: String!, CourseName: String!,
        CourseDept: String!, CourseDescription: String, CourseRoom: String, 
        CourseCapacity: String, WaitlistCapacity: String, CourseTerm: String ): Course

    deleteCreatedCourse(email: String!, CourseId: String!): Course
    deleteRegisteredCourse(email: String!, CourseId: String!): Course

    createProfile(name: String!, email: String!, phone_number: String, about_me: String, city: String 
      country: String, company: String, school: String,  hometown: String, languages: String, gender: String): Profile
  }

  

`