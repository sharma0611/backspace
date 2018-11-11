import isFunction from 'lodash/isFunction'
import { commitMutation } from 'react-relay'

// Executes a mutation
// and returns its results as a Promise.
export default relayEnv => mutationParams =>
    new Promise((resolve, reject) => {
        commitMutation(relayEnv, {
            ...mutationParams,
            onCompleted: (response, errors) => {
                if (isFunction(mutationParams.onCompleted)) {
                    mutationParams.onCompleted(response, errors)
                }

                if (errors) {
                    const defaultError = {
                        message: 'Oops, something went wrong. Please try again later.'
                    }
                    const fmzError =
                        errors.find(e => 'message' in e) ||
                        errors.find(e => 'debug' in e) ||
                        defaultError

                    reject(fmzError)
                } else {
                    resolve(response)
                }
            },
            onError: err => {
                reject({ message: 'We are experiencing network issues. Please try again later.' })
            }
        })
    })
