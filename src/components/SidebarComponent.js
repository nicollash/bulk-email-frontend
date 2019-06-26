import React from 'react';
import { getBEMClasses } from '../helpers/cssClassesHelper';

import overviewIcon from '../assets/images/002-dashboard.png'
import '../styles/components/sidebarComponent.css';

const sidebarClasses = getBEMClasses(['side-bar']);

class SidebarComponent extends React.Component {
  render() {
    return (
      <div className={sidebarClasses('container')}>
        <div className={sidebarClasses('nav')}>
          <div className={sidebarClasses('nav-item')} >
            <img alt='' className={sidebarClasses('nav-icon')} src={overviewIcon} />
            <span>Overview</span>
          </div>
        </div>
      </div>
    )
  }
};

export default SidebarComponent;
