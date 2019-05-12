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

