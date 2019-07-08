/* eslint-disable no-undef */
/* eslint-disable no-cond-assign */

import Amplify from 'aws-amplify'

const Auth = Amplify.Auth
Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID || 'us-east-1:fa266d05-be67-4e59-b740-37a7d22f1633',

    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_USER_POOL_ID || 'us-east-1_tmpIXOt9R',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_CLIENT_ID || 'qjeh9n82t686onl2s00gmdfmp',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
  }
})
export function refreshToken() {
  Auth.currentSession()
    .then(data => {
      /*
      localStorage.setItem('user_token', data.accessToken.jwtToken)
      localStorage.setItem('id_token', data.idToken.jwtToken)
      localStorage.setItem('refresh_token', data.refreshToken.token)
      */
      return data
    })
    .catch(err => console.log('err currentSession: ', err))
}

export function createPassword(user, password) {
  return Auth.completeNewPassword(user, password)
}

export function signInUser(username, password) {
  return Auth.signIn(username, password)
}

export function changePasswordWithCode(cognitoUser, data) {
  return new Promise((res, rej) => {
    cognitoUser.confirmPassword(data.pin, data.password, {
      onSuccess: function (result) {
        res({
          code: 'SUCCEEDED',
          cognitoUser: cognitoUser,
          thirdArg: this
        })
      },
      // if failure, reject the promise
      onFailure: function (err) {
        res(err)
      }
    })
  })
}

// if a user forgets a password, we can instantiate the password reset process (requiring an email)
export function forgotPassword(email) {
  // forgot password here
}

// signout the current user
export function signOutUser() {
  return Auth.signOut({ global: true })
    .then(data => console.log(data))
    .catch(err => console.log(err));
}