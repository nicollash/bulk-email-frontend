import { CognitoUserPool } from 'amazon-cognito-identity-js'
import 'amazon-cognito-js'

var AWS = require('aws-sdk/dist/aws-sdk-react-native')

const REGION = 'us-east-1'
const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID || 'us-east-1_tmpIXOt9R'
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || 'qjeh9n82t686onl2s00gmdfmp'

AWS.config.update({
  region: REGION
})

const userData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID
}

export const userPool = new CognitoUserPool(userData)
export const USERPOOL_ID = 'cognito-idp.' + REGION + '.amazonaws.com/' + USER_POOL_ID
export const IDENTITY_POOL_ID = process.env.REACT_APP_IDENTITY_POOL_ID || 'us-east-1:fa266d05-be67-4e59-b740-37a7d22f1633'
