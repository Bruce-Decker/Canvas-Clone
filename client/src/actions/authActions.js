import { TEST_DISPATH } from './types'


export const registeruser = (userData) => {
    return {
        type: TEST_DISPATH,
        payload: userData
    }
}