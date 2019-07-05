/* eslint-disable no-undef */
/* eslint-disable no-cond-assign */
import {
  // CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
  // CognitoIdentityCredentials,
  // WebIdentityCredentials
} from 'amazon-cognito-identity-js'
import Cookies from 'universal-cookie'
import { toastr } from 'react-redux-toastr'

import Amplify from 'aws-amplify'
import {
  userPool,
  USERPOOL_ID,
  IDENTITY_POOL_ID
} from './aws_profile'

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

var AWS = require('aws-sdk/dist/aws-sdk-react-native')

const attrs = ['email', 'family_name', 'given_name', 'custom:accountName']

function storeInCookie() {
  // Read all data from localstore
  var i = 0; var oJson = {}; var sKey
  for (; sKey = window.localStorage.key(i); i++) {
    oJson[sKey] = window.localStorage.getItem(sKey)
  }

  // Write all localstorage data to cookie
  const cookies = new Cookies()
  var keys = Object.keys(oJson)
  for (i = 0; i < keys.length; i++) {
    cookies.set(keys[i], oJson[keys[i]], { path: '/', domain: '.chatmantics.com' })
  }
}

/* function restoreToLocalstorage() {
  localStorage.clear() //Clear localstorage
  const cookies = new Cookies();
  const cookieData = cookies.getAll() //Read all data from cookie
  const keys = Object.keys(cookieData) //Write all cookie data to localstorage
  for(var i = 0; i < keys.length; i ++ ) {
    localStorage.setItem(keys[i], cookieData[keys[i]]);
  }
} */

export function checkAuth() {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser()

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, result) {
        if (result) {
          buildUserObject(cognitoUser).then(userObj => {
            resolve(userObj)
          }).catch(() => {
            resolve(false)
          })
        }
        if (err) {
          resolve(false)
        }
      })
    } else {
      resolve(false)
    }
  })
}

export function refreshToken() {
  Auth.currentSession()
    .then(data => {
      localStorage.setItem('user_token', data.accessToken.jwtToken)
      localStorage.setItem('id_token', data.idToken.jwtToken)
      localStorage.setItem('refresh_token', data.refreshToken.token)
      return data
    })
    .catch(err => console.log('err currentSession: ', err))
}

export function createPassword(newPasswordChallenge, password) {
  const p = new Promise((res, rej) => {
    Auth.completeNewPassword(newPasswordChallenge, password)
      .then((data) => {
        console.log('created data: ', data)
        res(data)
      })
      .catch(err => {
        toastr.error('Error', err.message)
        rej(err)
      })
  })
  return p
}

export function signInUser(username, password) {
  const p = new Promise((res, rej) => {
    Auth.signIn(username, password)
      .then((user) => {
        if (user.challengeName && user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          return user;
        }
        // if successfully authenticated, build the user object to return to the Redux state to use
        console.log('user: ', user.signInUserSession);
        localStorage.setItem('user_token', user.signInUserSession.accessToken.jwtToken)
        localStorage.setItem('id_token', user.signInUserSession.idToken.jwtToken)
        localStorage.setItem('refresh_token', user.signInUserSession.refreshToken.token)

        const loginsObj = {
          [USERPOOL_ID]: user.signInUserSession.idToken.jwtToken
        }

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IDENTITY_POOL_ID,
          Logins: loginsObj
        })

        // AWS.config.credentials.refresh(function(error){})

        storeInCookie()
        return buildUserObject(user)
      })
      .then((userProfileObject) => {
        // if successfully built the object, return it back to your React app
        res(userProfileObject)
      })
      .catch(err => {
        console.log('signin err: ', err);
        res(err)
      })
  })
  return p
}

// buildUserObject() gets the user attributes from Cognito and creates an object to represent our user
// this will be used by the Redux state so that we can reference the user
function buildUserObject(cognitoUser) {
  const p = new Promise((res, rej) => {
    // call the cognito function `getUserAttributes()`
    cognitoUser.getUserAttributes(function (err, result) {
      if (err) {
        console.log(err)
        rej(err)
      } else {
        // instantiate an empty object
        // DROR
        let userProfileObject = {}
        // loop through the userAttributes and append to `userProfileObject` as attributes
        for (let i = 0; i < result.length; i++) {
          // custom Cognito attributes will be prefixed with `custom:`, so we must strip away that from the string
          if (result[i].getName().indexOf('custom:') >= 0) {
            let name = result[i].getName().slice(7, result[i].getName().length)
            userProfileObject[name] = result[i].getValue()
          } else {
            // normal Cognito attributes will not be prefixed with `custom:` so we can use use the string immediately
            userProfileObject[result[i].getName()] = result[i].getValue()
          }
        }
        userProfileObject['signInUserSession'] = cognitoUser.signInUserSession
        // and now our user profile object is complete and we resolve the promise to move on to the next step
        res(userProfileObject)
      }
    })
  })
  return p
}

// when users sign up, they need to verify their account
// verification requires their unique identifier (in this case, their email) and the verification PIN
export function verifyUserAccount(username, pin) {
  const p = new Promise((res, rej) => {
    // we create an object to hold our userData that will be used to create our `cognitoUser` object
    // we cannot just use `userPool` to instantiate a `cognitoUser` object, as no user has been signed in yet
    const userData = {
      Username: username,
      Pool: userPool
    }
    // create the `cognitoUser` object
    const cognitoUser = new CognitoUser(userData)
    // call the `confirmRegistration()` function of `cognitoUser` and pass in the verification PIN
    cognitoUser.confirmRegistration(pin, true, function (err, result) {
      if (err) {
        console.log(err)
        res(err)
        return
      }
      // if successful, we signout to refresh the cognitoUser (they will have to login again)
      // actually this is not mandatory either, but during testing I discovered that login does not immediately work after verification due to un-refreshed authentication
      // logging in again will get those authentication tokens
      if (result === 'SUCCESS') {
        cognitoUser.signOut()
        res(result)
      } else {
        // if otherwise failure, we reject the promise
        rej('Could not verify account')
      }
    })
  })
  return p
}

export function requestPhoneVerificationCode() {
  return new Promise((resolve, reject) => {
    console.log('======= request started =================')
    const cognitoUser = userPool.getCurrentUser()
    console.log('======= current User =================', cognitoUser)
    cognitoUser.getSession(function (err, result) {
      console.log('======== session -result ============', result)
      console.log('======== session -err ============', result)
      if (result) {
        cognitoUser.getAttributeVerificationCode('phone_number', {
          onSuccess: function (result) {
            console.log('======== yes ============')
            resolve(true)
          },
          onFailure: function (err) {
            console.log('======== no ============')
            console.log(err)
            reject(err)
          }
        })
      }
    })
  })
}

export function verifyPhoneNumber(pin) {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser()
    cognitoUser.getSession(function (err, result) {
      if (result) {
        cognitoUser.verifyAttribute('phone_number', pin, {
          onSuccess: function (result) {
            resolve('SUCCESS')
          },
          onFailure: function (err) {
            console.log('--- phone verification error ---', err)
            resolve(err)
          }
        })
      }
    })
  })
}

// if we want to update the info of our user, we must pass in their unique identifier (email) and an object representing the user info
export function updateUserInfo(email, editedInfo) {
  console.log(editedInfo)
  const p = new Promise((res, rej) => {
    // we create an array for our attributes that we want to update, and push all `CognitoUserAttribute` objects into it
    const attributeList = []
    // loop through the `attrs` array to create our `CognitoUserAttribute` objects
    for (let a = 0; a < attrs.length; a++) {
      if (editedInfo[attrs[a]]) {
        console.log(editedInfo[attrs[a]])
        // using the attr[position] to get our key name, we can find the value via editedInfo[attr[position]]
        let attribute = {
          Name: attrs[a],
          Value: editedInfo[attrs[a]]
        }
        // convert into `CognitoUserAttribute` object
        let x = new CognitoUserAttribute(attribute)
        // add it to the `attributeList` array
        attributeList.push(x)
      }
    }
    console.log(attributeList)
    // instantiate the `cognitoUser` from our userPool (we can do this because the user is already signed in if they are attempting to change their attributes)
    const cognitoUser = userPool.getCurrentUser()
    // get the latest cognito session so that we can `updateAttributes()`
    cognitoUser.getSession(function (err, result) {
      if (result) {
        // if we successfully got the latest session, we can `updateAttributes()` from 'cognitoUser', passing in the `attributeList` array
        cognitoUser.updateAttributes(attributeList, function (err, result) {
          // reject promise if the update attempt failed
          if (err) {
            console.log(err)
            rej(err)
            return
          }
          // we user `setTimeout()` to give AWS some time to update the user properties
          setTimeout(() => {
            // then we get the latest user attributes
            cognitoUser.getUserAttributes(function (err, result) {
              // reject promise if failed
              if (err) {
                console.log(err)
                rej(err)
                return
              }
              // if success, then `buildUserObject()` again and resolve the promise with `userProfileObject`
              buildUserObject(cognitoUser)
                .then((userProfileObject) => {
                  res(userProfileObject)
                })
            })
          }, 500)
        })
      }
    })
  })
  return p
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
    // we create the `userData` object to create a `cognitoUser`
    const userData = {
      Username: email,
      Pool: userPool
    }
    // we must create a new `cognitoUser` instead of using `userPool` since no user is currently logged in
    const cognitoUser = new CognitoUser(userData)

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
        res(err)
      },
      // Optional automatic callback that passes in `data` object from `forgotPassword()` and resolve the same was as `onSuccess`
      // `inputVerificationCode()` handles behind the scenes of `forgotPassword()`, but we don't actually use it. Its here if needed in the future.
      inputVerificationCode: function (data) {
        res({
          code: 'SUCCESS',
          cognitoUser: cognitoUser,
          thirdArg: this,
          details: data
        })
      }
    })
  })
}

// reset the verification PIN for verifying a new user
export function resetVerificationPIN(email) {
  const p = new Promise((res, rej) => {
    // create the `userData` object for instantiating a new `cognitoUser` object
    const userData = {
      Username: email,
      Pool: userPool
    }
    // create the `cognitoUser` object
    const cognitoUser = new CognitoUser(userData)
    // and call the `resendConfirmationCode()` of `cognitoUser`
    cognitoUser.resendConfirmationCode(function (err, result) {
      // reject promise if confirmation code failed
      if (err) {
        console.log(err)
        rej(err)
      }
      // resolve if successfull
      res()
    })
  })
  return p
}

// for automatic signin of a user (so they don't have to login each time)
export function retrieveUserFromLocalStorage() {
  const p = new Promise((res, rej) => {
    // grab the `cognitoUser` object from `userPool`
    // this is possible without login because we had already logged in before (whereas verifyPIN and resetPassword have not)
    const cognitoUser = userPool.getCurrentUser()
    console.log('Getting cognitoUser from local storage...')

    if (cognitoUser != null) {
      // get the latest session from `cognitoUser`
      cognitoUser.getSession(function (err, session) {
        // if failed to get session, reject the promise
        if (err) {
          rej(err)
        }
        // check that the session is valid
        console.log('session validity: ' + session.isValid())
        console.log(session)
        // save to localStorage the jwtToken from the `session`
        localStorage.setItem('user_token', session.getAccessToken().getJwtToken())
        // Edge case, AWS Cognito does not allow for the Logins attr to be dynamically generated. So we must create the loginsObj beforehand
        const loginsObj = {
          // our loginsObj will just use the jwtToken to verify our user
          [USERPOOL_ID]: session.getIdToken().getJwtToken()
        }

        // create a new `CognitoIdentityCredentials` object to set our credentials
        // we are logging into a AWS federated identity pool

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IDENTITY_POOL_ID, // your identity pool id here
          Logins: loginsObj
        })
        // refresh the credentials so we can use it in our app
        AWS.config.credentials.refresh(function () {
          console.log(AWS.config.credentials)
          // resolve the promise by again building the user object to be used in our React-Redux app
          res(buildUserObject(cognitoUser))
        })
      })
    } else {
      // if failure, reject the promise
      rej('Failed to retrieve user from localStorage')
    }
  })
  return p
}

// signout the current user
export function signOutUser() {
  const p = new Promise((res, rej) => {
    // since the user is already logged in, we can instantiate `cognitoUser` with `userPool`
    const cognitoUser = userPool.getCurrentUser()
    cognitoUser.signOut()
  })
  return p
}

// login to cognito using Facebook instead of an AWS email/password login flow
// requires first logging in with Facebook and passing in the result of the login function to `registerFacebookLoginWithCognito()`
export function registerFacebookLoginWithCognito(response) {
  console.log('registerFacebookLoginWithCognito')
  console.log(response)
  // Check if the user logged in successfully.
  if (response.authResponse) {
    console.log('You are now logged in.')
    // Add the Facebook access token to the Cognito credentials login map
    // we pass in the accessToken from the fb response into our `CognitoIdentityCredentials`
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      // we are logging into an AWS federated identify pool, for facebook login
      IdentityPoolId: IDENTITY_POOL_ID,
      Logins: {
        'graph.facebook.com': response.authResponse.accessToken
      }
    })

    // AWS Cognito Sync to sync Facebook
    // aka refreshing the credentials to use thorughout our app
    AWS.config.credentials.get(function () {
      // const client = new AWS.CognitoSyncManager();
      console.log(AWS.config.credentials)
    })
  } else {
    console.log('There was a problem logging you in.')
  }
}
