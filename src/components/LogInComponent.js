import React from 'react';
import { getBEMClasses } from '../helpers/cssClassesHelper';
import { Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { toastr } from 'react-redux-toastr'
import ReactLoading from 'react-loading'

import LogoComponent from './LogoComponent'

import '../styles/components/loginComponent.css';

const loginClasses = getBEMClasses(['login']);

class LogInComponent extends React.Component {
  constructor (props) {
    super(props)

    this.passwordInput = React.createRef()
    
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidUpdate () {
    const { auth, history } = this.props

    if (auth.auth === 'NEW_PASSWORD_REQUIRED') {
      history.push('/request-password');
    }

    if (auth.auth === 'AUTH_LOGIN_INITIAL_STATE') {
      history.push('/checklist')
    }

    if (auth.auth === 'AUTH_LOGIN_FAILED') {
      toastr.error('Error', 'Log in failed!')
    }

    if (auth.auth === 'AUTH_LOGIN_SUCCEEDED') {
      history.push('/create-campaign')
    }
  }

  handleChange (attr, evt) {
    this.setState({
      [attr]: evt.target.value
    })
  }

  doLogin () {
    const { login } = this.props
    const { username, password } = this.state

    if (username && password) {
      login({ username, password })
    } else {
      toastr.error('Error', 'Please fill the required fields!')
    }
  }

  forgotPassword () {
    const { history } = this.props

    history.push('/forgot-password')
  }

  keyDownEmail (evt) {
    if (evt.keyCode === 13) {
      this.passwordInput.current.focus()
    }
  }

  keyDownPassword (evt) {
    if (evt.keyCode === 13) {
      this.doLogin()
    }
  }

  render() {
    const { username, password } = this.state
    const { auth } = this.props

    let containerClass = loginClasses('container') + ' '

    if (auth.isLoading) {
      containerClass += loginClasses('container--loading')
    }

    return (
      <div className={loginClasses('wrapper')}>
        <div className={containerClass}>
          {
            auth.isLoading &&
            <div className={loginClasses('container-loading')}>
              <ReactLoading type='spin' color='#ffc600' margin='auto' height={50} width={50} />
            </div>
          }
          <LogoComponent />
          <h2 className={loginClasses('title')}></h2>
          <Form>
            <FormGroup className={loginClasses('form-group')}>
              <Input
                type='mail'
                required
                placeholder='Enter Username or Email Address'
                className={loginClasses('form-input')}
                value={username}
                onKeyDown={this.keyDownEmail.bind(this)}
                onChange={this.handleChange.bind(this, 'username')} />
              <span className={loginClasses('input-icon')}><i className='ti-email' /></span>
            </FormGroup>
            <FormGroup className={loginClasses('form-group')}>
              <Input
                type='Password'
                className={loginClasses('form-input')}
                placeholder='Password'
                value={password}
                innerRef={this.passwordInput}
                onKeyDown={this.keyDownPassword.bind(this)}
                onChange={this.handleChange.bind(this, 'password')} />
              <span className={loginClasses('input-icon')}><i className='ti-lock' /></span>
            </FormGroup>
            <FormGroup className={loginClasses('form-group')}>
              <Button
                color='primary'
                className={loginClasses('form-button')}
                variant='contained'
                size='large'
                onClick={this.doLogin.bind(this)}>
                Sign In
              </Button>
              <div onClick={this.forgotPassword.bind(this)} className={loginClasses('forgot-password')}>
                Forgot your password?
              </div>
            </FormGroup>
          </Form>
          <div className={loginClasses('signup-container')}>
          </div>
        </div>
      </div>
    )
  }
};

export default LogInComponent;
