import React from 'react';
import { getBEMClasses } from '../helpers/cssClassesHelper';
import LogoIconComponent from './LogoIconComponent'

import '../styles/components/headerComponent.css';

const headerClasses = getBEMClasses(['header']);

class HeaderComponent extends React.Component {

  render() {
    return(
      <header className={headerClasses('container')}>
        <div className={headerClasses('logo')}>
          <div className={headerClasses('logo-container')}>
            <LogoIconComponent />
          </div>
        </div>
        <button className={headerClasses('logout')}>Logout</button>
      </header>
    )
  }
}

export default HeaderComponent;
