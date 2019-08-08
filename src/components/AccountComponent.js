/* eslint-disable react/jsx-no-bind */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react'
import { getBEMClasses } from '../helpers/cssClassesHelper'
import HomePageLayout from '../layouts/HomePageLayout'
import Modal from 'react-modal'
import ReactLoading from 'react-loading'

import '../styles/components/accountComponent.css'
import '../styles/base/modal.css'

const accountClasses = getBEMClasses(['account-page'])

class AccountComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: props.auth.userProfile.username,
      email: props.auth.userProfile.attributes.email,
      phone_number: props.auth.userProfile.attributes.phone_number,
      editPwd: false,
      currentPassword: '',
      password: '',
      passwordConfirm: ''
    }
  }

  componentDidMount () {
    Modal.setAppElement('body')
  }

  componentWillReceiveProps (newProps) {
    const { auth } = this.props;

    if (this.state.editPwd && auth.isLoading && !newProps.auth.isLoading) {
      this.hideModal()
    }
  }

  updateUser () {
    const { setNewPassword } = this.props
    const { currentPassword, password, passwordConfirm } = this.state

    if (password === passwordConfirm && password !== '' && currentPassword !== '') {
      setNewPassword({
        currentPassword,
        newPassword: password
      })
    }
  }

  editPwd () {
    this.setState({
      editPwd: true
    })
  }

  hideModal () {
    this.setState({
      editPwd: false
    })
  }

  onValueChanged (e) {
    const { value } = e.target

    this.setState({
      [e.target.name]: value
    })
  }

  render () {
    const { auth } = this.props

    const modalClass = auth.isLoading ? accountClasses('modal') + ' ' + accountClasses('modal-overlay') : accountClasses('modal')

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
                  <label className={accountClasses('block-row-title')}>Password</label> <span className={accountClasses('block-row-content')}>: ********</span>  [<span className='span-link' onClick={this.editPwd.bind(this)}>Change</span>]
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.editPwd} className={modalClass}>
          { auth.isLoading &&
            <div className={ accountClasses('modal-loading') }>
                <ReactLoading type='spin' color='#ffc600' margin='auto' height={ 50 } width={ 50 } />
            </div>
          }
          <div className={accountClasses('modal-title')}>
            Change Password
          </div>
          <div className={accountClasses('modal-content')}>
            <div className={accountClasses('modal-row')}>
              <label>Current Password</label>
              <input type='password' name='currentPassword' value={this.state.currentPassword} onChange={this.onValueChanged.bind(this)} />
            </div>
            <div className={accountClasses('modal-row')}>
              <label>New Password</label>
              <input type='password' name='password' value={this.state.password} onChange={this.onValueChanged.bind(this)} />
            </div>
            <div className={accountClasses('modal-row')}>
              <label>Confirm Password</label>
              <input type='password' name='passwordConfirm' value={this.state.passwordConfirm} onChange={this.onValueChanged.bind(this)} />
            </div>
          </div>
          <div className={accountClasses('modal-footer')}>
            <div className={accountClasses('modal-button')} onClick={this.updateUser.bind(this)}>Save</div>
            <div className={accountClasses('modal-button')} onClick={this.hideModal.bind(this)}>Cancel</div>
          </div>
        </Modal>
      </HomePageLayout>
    )
  };
};

export default AccountComponent
