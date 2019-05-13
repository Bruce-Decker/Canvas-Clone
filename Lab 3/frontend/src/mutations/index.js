import {gql } from 'apollo-boost'

export const REGISTER = gql `
mutation($first_name: String!, $last_name: String!, $email: String!, $password: String!) {
    register(first_name: $first_name, last_name: $last_name, email: $email, password: $password){
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

export const CREATE_PROFILE = gql `
   mutation($name: String!, $email: String!, $phone_number: String, $about_me: String, $city: String 
    $country: String, $company: String, $school: String,  $hometown: String, $languages: String, $gender: String) {
        createProfile(name: $name, email: $email, phone_number: $phone_number, about_me: $about_me, city: $city, 
            country: $country, company: $company, school: $school,  hometown: $hometown, languages: $languages, 
            gender: $gender) {
                email
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