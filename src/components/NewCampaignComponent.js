import React from 'react';
import { getBEMClasses } from '../helpers/cssClassesHelper';

import HomePageLayout from '../layouts/HomePageLayout';

import '../styles/components/newCampaignComponent.css';

const newCampaignClasses = getBEMClasses(['new-campaign']);

class NewCampaignComponent extends React.Component {
  render() {
    return (
      <HomePageLayout>
        <div className={newCampaignClasses('container')}>
          <div className={newCampaignClasses('title')}>
            New Campaign
          </div>
          <div className={newCampaignClasses('content')}>
          </div>
        </div>
      </HomePageLayout>
    )
  }
};

export default NewCampaignComponent;
