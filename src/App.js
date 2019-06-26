import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import path from './helpers/path';
import './styles/app.css';

import LogInContainer from './layouts/HomePageLayout';
import NewCampaignContainer from './containers/NewCampaignContainer';

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={path('/login')} component={LogInContainer} exact />
          <Route path={path('/create-campaign')} component={NewCampaignContainer} exact />
          <Redirect to="/login" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
