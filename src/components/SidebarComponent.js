import React from 'react';
import { getBEMClasses } from '../helpers/cssClassesHelper';

import {signOutUser} from '../services/aws/aws_cognito';

import overviewIcon from '../assets/images/002-dashboard.png';
import signoutIcon from '../assets/images/logout.png';
import plusIcon from '../assets/images/plus.png';
import '../styles/components/sidebarComponent.css';

const sidebarClasses = getBEMClasses(['side-bar']);

class SidebarComponent extends React.Component {

  goOverview = () => {
    const { history } = this.props;
    history.push('./overview');
  }

  goNewCampaign = () => {
    const { history } = this.props;
    history.push('./create-campaign');
  }
  
  signout = () => {
    signOutUser();
  }

  render() {
    return (
      <div className={sidebarClasses('container')}>
        <div className={sidebarClasses('nav')}>
          <div className={sidebarClasses('nav-item')} onClick={this.goNewCampaign}>
            <img alt='' className={sidebarClasses('nav-icon')} src={plusIcon} />
            <span>New</span>
          </div>
          <div className={sidebarClasses('nav-item')} onClick={this.goOverview}>
            <img alt='' className={sidebarClasses('nav-icon')} src={overviewIcon} />
            <span>Overview</span>
          </div>
        </div>
        <div className={sidebarClasses('nav-bottom')} >
          <div className={sidebarClasses('nav-item')} onClick={this.signout} >
            <img alt='' className={sidebarClasses('nav-icon')} src={signoutIcon} />
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    )
  }
}

export default SidebarComponent;
