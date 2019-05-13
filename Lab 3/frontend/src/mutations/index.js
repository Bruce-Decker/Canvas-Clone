import {gql } from 'apollo-boost'

export const REGISTER = gql `
mutation($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password){
      jwtToken
    }
  }
`

export const LOGIN = gql `
mutation($email: String!, $password: String!) {
    login(email: $email, password: $password){
      jwtToken
    }
  }
`

export const REGISTER_COURSE = gql `
mutation($email: String!, $CourseId: String!, $faculty_email: String!) {
    registerCourse(email: $email, CourseId: $CourseId, faculty_email: $faculty_email){
      email
    }
  }
`


export const CREATE_COURSE = gql `
mutation($email: String!, $CourseId: String!, $CourseName: String!,
    $CourseDept: String!, $CourseDescription: String, $CourseRoom: String, $CourseCapacity: String, 
    $WaitlistCapacity: String, $CourseTerm: String ) {
    createCourse(email: $email, CourseId: $CourseId, CourseName: $CourseName,
      CourseDept: $CourseDept, CourseDescription: $CourseDescription, 
      CourseRoom: $CourseRoom, CourseCapacity: $CourseCapacity, 
      WaitlistCapacity: $WaitlistCapacity, CourseTerm: $CourseTerm){
      CourseId
    }
  }
`

export const DELETE_CREATED_COURSE = gql `
  mutation($email: String!, $CourseId: String!) {
    deleteCreatedCourse(email: $email, CourseId: $CourseId){
       CourseId
    }
}
`

export const DELETE_REGISTERED_COURSE = gql `
  mutation($email: String!, $CourseId: String!) {
    deleteRegisteredCourse(email: $email, CourseId: $CourseId){
       CourseId
    }
}
`