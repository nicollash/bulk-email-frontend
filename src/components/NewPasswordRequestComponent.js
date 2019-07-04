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

  state = {
    password: '',
    confirmPassword: ''
  }

  componentDidUpdate () {
    const { auth, history } = this.props

    if (auth.auth === 'NEW_PASSWORD_SUCCESS') {
      toastr.success('Success', 'Password has been successfully reset!')
      history.push('/login')
    }
  }

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    })
  }

  createNewPassword = () => {
    const { password, confirmPassword } = this.state
    if (password !== confirmPassword) {
      toastr.error('Error', 'password and confirm password are not same.');
      return ;
    }
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
                onClick={this.createNewPassword}>
                  Change Password
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    )
  }
}

export default NewPasswordRequestComponent
