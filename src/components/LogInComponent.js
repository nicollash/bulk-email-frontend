import React from 'react';
import { getBEMClasses } from '../helpers/cssClassesHelper';

import HomePageLayout from '../layouts/HomePageLayout';

import '../styles/components/loginComponent.css';

const loginClasses = getBEMClasses(['login']);

class LogInComponent extends React.Component {

  render() {
    return (
      <HomePageLayout>
        <div className={loginClasses('container')}>
          <div className={loginClasses('form')}>
          </div>
        </div>
      </HomePageLayout>
    )
  }
};

export default LogInComponent;
