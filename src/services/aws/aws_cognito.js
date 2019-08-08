/* eslint-disable no-undef */
/* eslint-disable no-cond-assign */

import Amplify, { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from './aws_profile';

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID || 'us-east-1:fa266d05-be67-4e59-b740-37a7d22f1633',
    // REQUIRED - Amazon Cognito Region
    region: process.env.REACT_APP_REGION || 'us-east-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_USER_POOL_ID || 'us-east-1_tmpIXOt9R',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_CLIENT_ID || 'qjeh9n82t686onl2s00gmdfmp',
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
  },
  Analytics: {
    // OPTIONAL - disable Analytics if true
    disabled: false
  },
  Storage: {
    bucket: process.env.REACT_APP_S3_BUCKET || 'chatmantics-dev-csv', //REQUIRED -  Amazon S3 bucket
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID || 'us-east-1:fa266d05-be67-4e59-b740-37a7d22f1633',
  }
})

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
  return new Promise((res, rej) => {
    // create `userData`
    const userData = {
      Username: email,
      Pool: userPool
    }

    // create cognitoUser
    const cognitoUser = new CognitoUser(userData);

    // call the `forgotPassword()` function of `cognitoUser`
    cognitoUser.forgotPassword({
      // we are resolving the `cognitoUser` in our promise because the React component will use it to call `cognitoUser.confirmPassword()`
      // thats also why we pass in the `forgotPassword` `this` to be used in the React component

      // if successful, then we can resolve the promise with cognitoUser and the `this` declaration from the React component that calls `forgotPassword()`
      // but we may also resolve the promise with the third function `inputVerificationCode()` which handles behind the scenes of `forgotPassword()`
      onSuccess: function (result) {
        res({
          code: 'SUCCEEDED',
          cognitoUser: cognitoUser,
          thirdArg: this
        })
      },
      // if failure, reject the promise
      onFailure: function (err) {
        res(err);
      },
      // Optional automatic callback that passes in `data` object from `forgotPassword()` and resolve the same was as `onSuccess`
      // `inputVerificationCode()` handles behind the scenes of `forgotPassword()`, but we don't actually use it. Its here if needed in the future.
      inputVerificationCode: function (data) {
        res({
          code: 'SUCCESS',
          cognitoUser: cognitoUser,
          thirdArg: this,
          details: data
        });
      }
    });
  });
}

// signout the current user
export function signOutUser() {
  return Auth.signOut({ global: true })
}