import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import SidebarContainer from '../containers/SidebarContainer';

import { getBEMClasses } from '../helpers/cssClassesHelper';
import '../styles/homePageLayout.css';

const homePageLayoutClasses = getBEMClasses('main-layout');

class HomePageLayout extends React.Component {
  render() {
    return (
      <React.Fragment>

        <div className={homePageLayoutClasses('container')}>

          <div className={homePageLayoutClasses('header')}>
            <HeaderContainer />
          </div>

          <div className={homePageLayoutClasses('side-bar')}>
            <SidebarContainer />
          </div>

          <div className={homePageLayoutClasses('body')}>
            { this.props.children }
          </div>

          <div className={homePageLayoutClasses('footer')}>
            <div className={homePageLayoutClasses('footer-row')}>

            </div>
          </div>

        </div>
        
      </React.Fragment>
    );
  }
}

export default HomePageLayout;
