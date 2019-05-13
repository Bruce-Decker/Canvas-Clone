import {gql } from 'apollo-boost'
export const GET_ALl_USERS = gql`
query {
    getAllUsers {
        name
        email
        password
    }
}
`

export const GET_CREATED_COURSES = gql`
   query($email: String!) {
    showCreatedCourses(email: $email) {
        CourseDept
        CourseId
        email
        CourseName
        CourseTerm
     }
   }
`

export const GET_REGISTERED_COURSES = gql`
   query($email: String!) {
    showRegisteredCourses(email: $email) {
        CourseDept
        CourseId
        email
        CourseName
        CourseTerm
     }
   }
`

export const GET_UNREGISTERED_COURSES = gql`
   query($email: String!) {
    showUnregisteredCourses(email: $email) {
        CourseDept
        CourseId
        email
        CourseName
        CourseTerm
     }
   }
`

export const GET_PROFILE = gql`
   query($email: String!) {
    getProfile(email: $email) {
      name
      email
      phone_number
      about_me
      city
      country
      school
      hometown
      languages
      gender   
      company
    
     }
   }
`


