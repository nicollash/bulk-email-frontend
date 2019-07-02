/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React from 'react'
import { getBEMClasses } from '../helpers/cssClassesHelper'
import { Form, FormGroup, Input } from 'reactstrap'
import Button from '@material-ui/core/Button'
import LogoComponent from './LogoComponent'
import { toastr } from 'react-redux-toastr'

import '../styles/components/forgotPasswordComponent.css'

const baseClasses = getBEMClasses(['base'])
const forgotPasswordClasses = getBEMClasses(['forgot-password'])

class NewPasswordRequestComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pin: '',
      password: '',
      confirmPassword: ''
    }
  }

  componentDidUpdate () {
    const { auth, history, initAuthPwdState } = this.props

    if (auth.passwordChanged) {
      toastr.success('Success', 'Password has been successfully reset!')
      initAuthPwdState()
      history.push('/login')
    }

    if (auth.passwordChangedFailed) {
      toastr.error('Error', 'An error occured in changing your password!')
      initAuthPwdState()
    }
  }

  handleChange (attr, evt) {
    this.setState({
      [attr]: evt.target.value
    })
  }

  createNewPassword () {
    const { password } = this.state
    const { auth, createNewPassword } = this.props

    createNewPassword({ newPasswordChallenge: auth.newPasswordChallenge, password })
  }

  render () {
    const { password, confirmPassword } = this.state

    return (
      <div className={forgotPasswordClasses('wrapper')}>
        <div className={forgotPasswordClasses('container')}>
          <LogoComponent />
          <Form>
            <FormGroup className={forgotPasswordClasses('form-group')}>
              <Input
                type='Password'
                name='new-password'
                className={forgotPasswordClasses('form-input')}
                placeholder='Password'
                value={password}
                onChange={this.handleChange.bind(this, 'password')}
              />
              <span className={forgotPasswordClasses('input-icon')}><i className='ti-lock' /></span>
            </FormGroup>
            <FormGroup className={forgotPasswordClasses('form-group')}>
              <Input
                type='Password'
                name='new-confirm-password'
                className={forgotPasswordClasses('form-input')}
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={this.handleChange.bind(this, 'confirmPassword')}
              />
              <span className={forgotPasswordClasses('input-icon')}><i className='ti-lock' /></span>
            </FormGroup>
            <FormGroup className='mb-15'>
              <Button
                className={forgotPasswordClasses('form-button') + ' ' + baseClasses('button-success')}
                variant='contained'
                size='large'
                onClick={this.createNewPassword.bind(this)}>
                  Change Password
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    )
  }
};

export default NewPasswordRequestComponent
