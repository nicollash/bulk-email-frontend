import React from 'react';
import { getBEMClasses } from '../helpers/cssClassesHelper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import HomePageLayout from '../layouts/HomePageLayout';

import '../styles/components/overviewComponent.css';

const overviewClasses = getBEMClasses(['overview']);

class OverviewComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render() {
    
    return (
      <HomePageLayout>
        <div className={overviewClasses('container')} >
          <AppBar position="static" className={overviewClasses('title')}>
            <Toolbar>
              Campaign Overview
            </Toolbar>
          </AppBar>
        </div>
      </HomePageLayout>
    );
  }
}

export default OverviewComponent;