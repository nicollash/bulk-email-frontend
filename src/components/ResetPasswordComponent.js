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

class ResetPasswordComponent extends React.Component {
  
  state = {
    pin: '',
    password: '',
    confirmPassword: ''
  }

  componentDidUpdate () {
    const { auth, history } = this.props

    if (auth.passwordChanged) {
      toastr.success('Success', 'Password has been successfully reset!')
      history.push('/login')
    }

    if (auth.passwordChangedFailed) {
      toastr.error('Error', 'An error occured in changing your password!')
    }
  }

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    })
  }

  changePassword = () => {
    const { pin, password } = this.state
    const { changePassword } = this.props

    changePassword({ pin, password })
  }

  render () {
    const { pin, password, confirmPassword } = this.state
    const { auth } = this.props

    return (
      <div className={forgotPasswordClasses('wrapper')}>
        <div className={forgotPasswordClasses('container')}>
          <LogoComponent />
          <h2 className={forgotPasswordClasses('title')}>Verification code was sent to your {auth.forgot.details.CodeDeliveryDetails.DeliveryMedium === 'SMS' ? 'phone' : 'email' } successfully.</h2>
          <Form>
            <FormGroup className={forgotPasswordClasses('form-group')}>
              <Input
                type='text'
                name='pin'
                className={forgotPasswordClasses('form-input')}
                placeholder='Verification code'
                value={pin}
                onChange={this.handleChange}
              />
              <span className={forgotPasswordClasses('input-icon')}><i className='ti-lock' /></span>
            </FormGroup>
            <FormGroup className={forgotPasswordClasses('form-group')}>
              <Input
                type='Password'
                name='password'
                className={forgotPasswordClasses('form-input')}
                placeholder='Password'
                value={password}
                onChange={this.handleChange}
              />
              <span className={forgotPasswordClasses('input-icon')}><i className='ti-lock' /></span>
            </FormGroup>
            <FormGroup className={forgotPasswordClasses('form-group')}>
              <Input
                type='Password'
                name='confirmPassword'
                className={forgotPasswordClasses('form-input')}
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={this.handleChange}
              />
              <span className={forgotPasswordClasses('input-icon')}><i className='ti-lock' /></span>
            </FormGroup>
            <FormGroup className='mb-15'>
              <Button
                className={forgotPasswordClasses('form-button') + ' ' + baseClasses('button-success')}
                variant='contained'
                size='large'
                onClick={this.changePassword}>
                  Change Password
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    )
  }
};

export default ResetPasswordComponent
