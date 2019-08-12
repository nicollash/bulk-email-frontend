import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const UnAuthenticatedRoute = (props, context) => {
  const { auth, path, component } = props

  if (auth.isAuthenticated) {
    return (
        <Redirect to='/home' />
    )
  } else {
    return (
        <Route path={ path } component={ component } />
    )
  }
}

export default UnAuthenticatedRoute
