import React from 'react';
import { getBEMClasses } from '../helpers/cssClassesHelper';

import '../styles/components/sidebarComponent.css';

const sidebarClasses = getBEMClasses(['side-bar']);

class SidebarComponent extends React.Component {
  render() {
    return (
      <div className={sidebarClasses('container')}>
        Side bar
      </div>
    )
  }
};

export default SidebarComponent;
