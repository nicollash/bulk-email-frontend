import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import LogInContainer from '../containers/LogInContainer'

const AuthenticatedRoute = (props, context) => {
  const { auth, path, component } = props

  if (auth.isAuthenticated) {
    return (
        <Route path={ path } component={ component } />
    )
  } else {
    if (component !== LogInContainer) {
      return (
          <Redirect to='/login' />
      )
    } else {
      return (
          <Route path={ path } component={ component } />
      )
    }
  }
}

export default AuthenticatedRoute
