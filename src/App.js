import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import path from './helpers/path';
import './styles/app.css';

import LogInContainer from'./layouts/HomePageLayout';

class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={path('/login')} component={LogInContainer} exact />
          <Redirect to="/login" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
