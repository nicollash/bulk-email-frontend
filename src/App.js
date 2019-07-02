import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import path from './helpers/path';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';

import LogInContainer from'./containers/LogInContainer';
import NewCampaignContainer from './containers/NewCampaignContainer';
import ForgotPasswordContainer from './containers/ForgotPasswordContainer';
import ResetPasswordContainer from './containers/ResetPasswordContainer';
import NewPasswordRequestContainer from './containers/NewPasswordRequestContainer';

class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={path('/login')} component={LogInContainer} exact />
          <Route path={path('/create-campaign')} component={NewCampaignContainer} exact />
          <Route path={path('/forgot-password')} component={ForgotPasswordContainer} exact />
          <Route path={path('/reset-password')} component={ResetPasswordContainer} exact />
          <Route path={path('/request-password')} component={NewPasswordRequestContainer} />
          <Redirect to="/login" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
