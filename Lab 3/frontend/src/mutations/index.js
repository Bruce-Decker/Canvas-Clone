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