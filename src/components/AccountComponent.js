/* eslint-disable react/jsx-no-bind */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react'
import { getBEMClasses } from '../helpers/cssClassesHelper'
import HomePageLayout from '../layouts/HomePageLayout'
import Modal from '@material-ui/core/Modal';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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

  componentWillReceiveProps (newProps) {
    const { auth } = this.props;

    if (this.state.editPwd && auth.isLoading && !newProps.auth.isLoading) {
      this.handleClose()
    }
  }

  updateUser = () => {
    const { setNewPassword } = this.props
    const { currentPassword, password, passwordConfirm } = this.state
    
    if (password === passwordConfirm && password !== '' && currentPassword !== '') {
      setNewPassword({
        currentPassword,
        newPassword: password
      })
    }
  }

  onValueChanged = (name, e) => {
    const { value } = e.target

    this.setState({
      [name]: value
    })
  }

  editPwd = () => {
    this.setState({
      editPwd: true
    });
  };

  handleClose = () => {
    this.setState({
      editPwd: false
    });
  };

  render () {
    const { auth } = this.props

    const modalClass = auth.isLoading ? accountClasses('modal-container') + ' ' + accountClasses('modal-overlay') : accountClasses('modal-container')

    return (
      <HomePageLayout>
        <div className={accountClasses('container')}>
          <AppBar position="static" className={accountClasses('title')}>
            <Toolbar>
              Account
            </Toolbar>
          </AppBar>
          <Paper className={accountClasses('content')}>
            <Toolbar className={accountClasses('card-title')}>
              Settings
            </Toolbar>
            <Card className={accountClasses('card-content')}>
              <CardContent>
                <div className={accountClasses('card-item')}>
                  Account : <span className='span-value'>{ auth.userProfile.username }</span>
                </div>
                <div className={accountClasses('card-item')}>
                  Account Status : <span className='span-value'>Active</span>
                </div>
                <div className={accountClasses('card-item')}>
                  Approved Channels : <span className='span-value'>SMS, VOICE</span>
                </div>
              </CardContent>
            </Card>
            <Toolbar className={accountClasses('card-title')}>
              About You
            </Toolbar>
            <Card className={accountClasses('card-content')}>
              <CardContent>
                <div className={accountClasses('card-item')}>
                  Email : <span className='span-value'>{ auth.userProfile.attributes.email }</span>
                </div>
                <div className={accountClasses('card-item')}>
                  Phone : <span className='span-value'>{ auth.userProfile.attributes.phone_number }</span>
                </div>
                <div className={accountClasses('card-item')}>
                  Password : <span className='span-value'>********</span> [<span className='span-link' onClick={this.editPwd}>Change</span>]
                </div>
              </CardContent>
            </Card>
          </Paper>
        </div>
        <Modal
          open={this.state.editPwd}
          onClose={this.handleClose}
        >
          <div className={modalClass}>
            { auth.isLoading &&
              <CircularProgress className={ accountClasses('modal-loading') } />
            }
            <AppBar position="static" className={accountClasses('modal-title')}>
              <Toolbar>
                Password Change
              </Toolbar>
            </AppBar>
            <Paper>
              <TextField
                className={accountClasses('input-field')}
                label="Current Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={ this.state.currentPassword }
                onChange={ this.onValueChanged.bind(this, 'currentPassword') }
              />
              <TextField
                className={accountClasses('input-field')}
                label="New Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={ this.state.password }
                onChange={ this.onValueChanged.bind(this, 'password') }
              />
              <TextField
                className={accountClasses('input-field')}
                label="Confirm Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={ this.state.passwordConfirm }
                onChange={ this.onValueChanged.bind(this, 'passwordConfirm') }
              />
            </Paper>
            <AppBar position="static" className={accountClasses('modal-footer')}>
              <Toolbar>
                <Button variant="outlined" color="secondary" onClick={ this.updateUser }>
                  Save
                </Button>
                <Button variant="outlined" color="primary" onClick={ this.handleClose }>
                  Cancel
                </Button>
              </Toolbar>
            </AppBar>
          </div>
        </Modal>
      </HomePageLayout>
    )
  };
};

export default AccountComponent
