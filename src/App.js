import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr'

import AuthenticatedRoute from './containers/AuthenticatedRouteContainer'
import UnAuthenticatedRoute from './containers/UnAuthenticatedRouteContainer'
import asyncComponent from './AsyncComponent'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const LogInContainer = asyncComponent(() => import('./containers/LogInContainer').then(module => module.default))
const NewCampaignContainer = asyncComponent(() => import('./containers/NewCampaignContainer').then(module => module.default))
const ForgotPasswordContainer = asyncComponent(() => import('./containers/ForgotPasswordContainer').then(module => module.default))
const ResetPasswordContainer = asyncComponent(() => import('./containers/ResetPasswordContainer').then(module => module.default))
const NewPasswordRequestContainer = asyncComponent(() => import('./containers/NewPasswordRequestContainer').then(module => module.default))

class App extends Component {
  
  render() {
    return (
      <React.Fragment>
        <Switch>
          <UnAuthenticatedRoute path={'/login'} component={LogInContainer} exact />
          <AuthenticatedRoute path={'/create-campaign'} component={NewCampaignContainer} exact />
          <UnAuthenticatedRoute path={'/forgot-password'} component={ForgotPasswordContainer} exact />
          <UnAuthenticatedRoute path={'/reset-password'} component={ResetPasswordContainer} exact />
          <UnAuthenticatedRoute path={'/request-password'} component={NewPasswordRequestContainer} />
          <Redirect to="/create-campaign" />
        </Switch>
        <ReduxToastr
          timeOut={3000}
          newestOnTop
          preventDuplicates
          position='top-right'
          transitionIn='bounceIn'
          transitionOut='bounceOut'
          closeOnToastrClick />
      </React.Fragment>
    );
  }
}

export default App;
