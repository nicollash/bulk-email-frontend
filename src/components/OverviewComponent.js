import React from 'react';
import { getBEMClasses } from '../helpers/cssClassesHelper';
import DatePicker from './common/DatePicker';

import HomePageLayout from '../layouts/HomePageLayout';

import '../styles/components/overviewComponent.css';

const overviewClasses = getBEMClasses([ 'overview' ]);

class OverviewComponent extends React.Component {

  state = {
    loansFollowup: '',
    autoInsuranceFollowup: '',
    channel: 'SMS',
    bot: 'campaign4000',
    fileName: 'Test.csv',
    submittedMsgCount: 100000,
    processedMsgCount: 99000,
    progress: '99%'
  }

  render() {
    const { 
      loansFollowup, 
      autoInsuranceFollowup, 
      channel, 
      bot, 
      fileName, 
      submittedMsgCount, 
      processedMsgCount, 
      progress
    } = this.state;
    return (
        <HomePageLayout>
            <div className={ overviewClasses('container') } >
                <div className={ overviewClasses('title') } >
            Campaigns
                </div>
                <div className={ overviewClasses('content') } >
                    <div className={ overviewClasses('title--inner') } >
              Loans Followup
                    </div>
                    <div className={ overviewClasses('followup') } >{loansFollowup}</div>

                    <div className={ overviewClasses('title--inner') } >
              Auto Insurance Followup
                    </div>
                    <div className={ overviewClasses('followup') } >{autoInsuranceFollowup}</div>

                    <div className={ overviewClasses('daily-info') } >
                        <div className={ overviewClasses('info-section') } >
                            <div className={ overviewClasses('info-column') } >
                                <label>Student Load Help</label>
                                <label>Channel - {channel}</label>
                                <label>Bot = {bot}</label>
                            </div>
                            <div className={ overviewClasses('info-column') } >
                                <label>FileName: {fileName}</label>
                                <label>Messages Submitted - {submittedMsgCount}</label>
                                <label>Messages Processed - {processedMsgCount}</label>
                                <label>Progress - {progress}</label>
                            </div>
                        </div>
                        <DatePicker></DatePicker>
                    </div>
                </div>
            </div>
        </HomePageLayout>
    );
  }
}

export default OverviewComponent;