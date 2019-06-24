import React from 'react';
import { getBEMClasses } from '../helpers/cssClassesHelper';

import '../styles/components/headerComponent.css';

const headerClasses = getBEMClasses(['header']);

class HeaderComponent extends React.Component {
  render() {
    return(
      <header className={headerClasses('container')}>
        <h1 className={headerClasses('title')}>Header</h1>
      </header>
    )
  }
};

export default HeaderComponent;
