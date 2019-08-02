/* eslint-disable react/jsx-no-bind */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react'
import { getBEMClasses } from '../helpers/cssClassesHelper'
import HomePageLayout from '../layouts/HomePageLayout'

import '../styles/components/accountComponent.css'

const accountClasses = getBEMClasses(['account-page'])

class AccountComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: props.auth.userProfile.username,
      email: props.auth.userProfile.attributes.email,
      phone_number: props.auth.userProfile.attributes.phone_number
    }
  }

  render () {
    const { auth } = this.props

    return (
      <HomePageLayout>
        <div className={accountClasses('container')}>
          <div className={accountClasses('title')}>
            Account
          </div>
          <div className={accountClasses('content')}>
            <div className={accountClasses('content-block')}>
              <div className={accountClasses('block-title')}>
                Settings
              </div>
              <div className={accountClasses('block-content')}>
                <div className={accountClasses('block-row')}>
                  <label className={accountClasses('block-row-title--longer')}>Account Name</label><span className={accountClasses('block-row-content')}>: { auth.userProfile.username}</span>
                </div>
                <div className={accountClasses('block-row')}>
                  <label className={accountClasses('block-row-title--longer')}>Account Status</label><span className={accountClasses('block-row-content')}>: Active</span>
                </div>
                <div className={accountClasses('block-row')}>
                  <label className={accountClasses('block-row-title--longer')}>Approved Channels</label><span className={accountClasses('block-row-content')}>: SMS, VOICE</span>
                </div>
              </div>
            </div>
            <div className={accountClasses('content-block')}>
              <div className={accountClasses('block-title')}>
                About You
              </div>
              <div className={accountClasses('block-content')}>
                <div className={accountClasses('block-row')}>
                  <label className={accountClasses('block-row-title')}>Email</label> <span className={accountClasses('block-row-content')}>: { auth.userProfile.attributes.email }</span> 
                </div>
                <div className={accountClasses('block-row')}>
                  <label className={accountClasses('block-row-title')}>Phone</label> <span className={accountClasses('block-row-content')}>: { auth.userProfile.attributes.phone_number }</span> 
                </div>
                <div className={accountClasses('block-row')}>
                  <label className={accountClasses('block-row-title')}>Password</label> <span className={accountClasses('block-row-content')}>: ********</span> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomePageLayout>
    )
  };
};

export default AccountComponent
