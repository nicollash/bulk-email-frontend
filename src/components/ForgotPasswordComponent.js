/* eslint-disable no-tabs */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React from 'react'
import { getBEMClasses } from '../helpers/cssClassesHelper'
import { Form, FormGroup, Input } from 'reactstrap'
import Button from '@material-ui/core/Button'
import LogoComponent from './LogoComponent'

import '../styles/components/forgotPasswordComponent.css'

const baseClasses = getBEMClasses(['base'])
const forgotPasswordClasses = getBEMClasses(['forgot-password'])

class ForgotPasswordComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: this.props.email || ''
    }
  }

  componentDidUpdate () {
    const { auth, history, initAuthPwdState } = this.props

    if (auth.auth === 'AUTH_FORGOT_CODE_SENT') {
      initAuthPwdState()
      history.push('/reset-password')
    }
  }

  handleChange (attr, evt) {
    this.setState({
      [attr]: evt.target.value
    })
  }

  sendEmail () {
    const { email } = this.state
    const { sendEmail } = this.props

    sendEmail(email)
  }

  render () {
    const { email } = this.state

    return (
      <div className={forgotPasswordClasses('wrapper')}>
        <div className={forgotPasswordClasses('container')}>
          <LogoComponent />
          <h2 className={forgotPasswordClasses('title')}> </h2>
          <Form>
            <FormGroup className={forgotPasswordClasses('form-group')}>
              <Input
                type='mail'
                required
                placeholder='Enter Username or Email Address'
                className={forgotPasswordClasses('form-input')}
                value={email}
                onChange={this.handleChange.bind(this, 'email')} />
              <span className={forgotPasswordClasses('input-icon')}><i className='ti-email' /></span>
            </FormGroup>
            <FormGroup className='mb-15'>
              <Button
                className={forgotPasswordClasses('form-button') + ' ' + baseClasses('button-success')}
                variant='contained'
                size='large'
                onClick={this.sendEmail.bind(this)}>
								Send Verification Code
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    )
  }
};

export default ForgotPasswordComponent
