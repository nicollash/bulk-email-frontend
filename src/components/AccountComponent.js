/* eslint-disable react/jsx-no-bind */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react'
import { getBEMClasses } from '../helpers/cssClassesHelper'
import HomePageLayout from '../layouts/HomePageLayout'
import Modal from 'react-modal'

import '../styles/components/accountComponent.css'
import '../styles/base/modal.css'

const accountClasses = getBEMClasses(['account-page'])

class AccountComponent extends React.Component {
  constructor (props) {
    super(props)
    console.log(props.auth);
    this.state = {
      status: 'user_messages',
      editEmail: false,
      editPhone: false,
      editAccount: false,
      editPwd: false,
      username: props.auth.userProfile.username,
      email: props.auth.userProfile.attributes.email,
      phone_number: props.auth.userProfile.attributes.phone_number,
      password: '',
      passwordConfirm: ''
    }
  }

  componentWillMount () {
    Modal.setAppElement('body')
  }

  showUserMessages () {
    this.setState({
      status: 'user_messages'
    })
  }

  showNotHandledBot () {
    this.setState({
      status: 'not_handled_bot'
    })
  }

  editEmail () {
    this.setState({
      editEmail: true,
      editPhone: false,
      editAccount: false,
      editPwd: false
    })
  }

  editPhone () {
    this.setState({
      editEmail: false,
      editPhone: true,
      editAccount: false,
      editPwd: false
    })
  }

  editAccount () {
    this.setState({
      editEmail: false,
      editPhone: false,
      editAccount: true,
      editPwd: false
    })
  }

  editPwd () {
    this.setState({
      editEmail: false,
      editPhone: false,
      editAccount: false,
      editPwd: true
    })
  }

  hideModal () {
    this.setState({
      editEmail: false,
      editPhone: false,
      editAccount: false,
      editPwd: false
    })
  }

  onValueChanged (e) {
    const { value } = e.target

    this.setState({
      [e.target.name]: value
    })
  }

  updateUser () {
    const { updateUser } = this.props
    const { phone_number, email, username, password, passwordConfirm } = this.state

    if ((password === '' && passwordConfirm === '') || (password === passwordConfirm && password !== '')) {
      updateUser({
        phone_number,
        email
      })
    }

    this.hideModal()
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
        <Modal isOpen={this.state.editAccount} className={accountClasses('modal')}>
          <div className={accountClasses('modal-title')}>
            Edit Account
          </div>
          <div className={accountClasses('modal-content')}>
            <div className={accountClasses('modal-row')}>
              <label>Account Name</label>
              <input type='text' name='accountName' value={this.state.accountName} onChange={this.onValueChanged.bind(this)} />
            </div>
          </div>
          <div className={accountClasses('modal-footer')}>
            <div className={accountClasses('modal-button')} onClick={this.updateUser.bind(this)}>Save</div>
            <div className={accountClasses('modal-button')} onClick={this.hideModal.bind(this)}>Cancel</div>
          </div>
        </Modal>
        <Modal isOpen={this.state.editEmail} className={accountClasses('modal')}>
          <div className={accountClasses('modal-title')}>
            Edit Email
          </div>
          <div className={accountClasses('modal-content')}>
            <div className={accountClasses('modal-row')}>
              <label>Email</label>
              <input type='text' name='email' value={this.state.email} onChange={this.onValueChanged.bind(this)} />
            </div>
          </div>
          <div className={accountClasses('modal-footer')}>
            <div className={accountClasses('modal-button')} onClick={this.updateUser.bind(this)}>Save</div>
            <div className={accountClasses('modal-button')} onClick={this.hideModal.bind(this)}>Cancel</div>
          </div>
        </Modal>
        <Modal isOpen={this.state.editPhone} className={accountClasses('modal')}>
          <div className={accountClasses('modal-title')}>
            Edit Phone
          </div>
          <div className={accountClasses('modal-content')}>
            <div className={accountClasses('modal-row')}>
              <label>Phone Number</label>
              <input type='text' name='phone_number' value={this.state.phone_number} onChange={this.onValueChanged.bind(this)} />
            </div>
          </div>
          <div className={accountClasses('modal-footer')}>
            <div className={accountClasses('modal-button')} onClick={this.updateUser.bind(this)}>Save</div>
            <div className={accountClasses('modal-button')} onClick={this.hideModal.bind(this)}>Cancel</div>
          </div>
        </Modal>
        <Modal isOpen={this.state.editPwd} className={accountClasses('modal')}>
          <div className={accountClasses('modal-title')}>
            Change Password
          </div>
          <div className={accountClasses('modal-content')}>
            <div className={accountClasses('modal-row')}>
              <label>New Password</label>
              <input type='text' name='password' value={this.state.password} onChange={this.onValueChanged.bind(this)} />
            </div>
            <div className={accountClasses('modal-row')}>
              <label>Confirm Password</label>
              <input type='text' name='passwordConfirm' value={this.state.passwordConfirm} onChange={this.onValueChanged.bind(this)} />
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
