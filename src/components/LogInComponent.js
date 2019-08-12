import React from 'react';
import { getBEMClasses } from '../helpers/cssClassesHelper';
import { Form, FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button'
import { toastr } from 'react-redux-toastr'
import ReactLoading from 'react-loading'

import LogoComponent from './LogoComponent'

import '../styles/components/loginComponent.css';

const loginClasses = getBEMClasses([ 'login' ]);

class LogInComponent extends React.Component {

  state = {
    username: '',
    password: ''
  }

  getSnapshotBeforeUpdate() {
    const { auth } = this.props

    if (auth.auth === 'NEW_PASSWORD_REQUIRED') {
      toastr.success('Success', 'Log in success!')
      return 'passwordRequired'
    }

    if (auth.auth === 'AUTH_LOGIN_FAILED') {
      return 'failed'
    }

    if (auth.auth === 'AUTH_LOGIN_SUCCEEDED') {
      return 'success'
    }

    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { history, setNewPasswordPending } = this.props
    switch (snapshot) {
      case 'passwordRequired':
        setNewPasswordPending()
        history.push('/request-password')
        break;
      case 'failed':
        toastr.error('Error', 'Incorrect username or password!')
        break;
      case 'success':
        history.push('/create-campaign')
        break;
      default:
        break;
    }
  }

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [ name ]: value
    })
  }

  doLogin = () => {
    const { login } = this.props
    const { username, password } = this.state

    if (username && password) {
      login({ username, password })
    } else {
      toastr.error('Error', 'Please fill the required fields!')
    }
  }

  forgotPassword = () => {
    const { history } = this.props

    history.push('/forgot-password')
  }

  keyDownEmail = (evt) => {
    if (evt.keyCode === 13) {
      this.passwordInput.current.focus()
    }
  }

  keyDownPassword = (evt) => {
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
        <div className={ loginClasses('wrapper') }>
            <div className={ containerClass }>
                {
            auth.isLoading &&
            <div className={ loginClasses('container-loading') }>
                <ReactLoading type='spin' color='#ffc600' margin='auto' height={ 50 } width={ 50 } />
            </div>
          }
                <LogoComponent />
                <Form>
                    <FormGroup className={ loginClasses('form-group') }>
                        <Input
                type='mail'
                required
                placeholder='Enter Username or Email Address'
                className={ loginClasses('form-input') }
                name='username'
                value={ username }
                onKeyDown={ this.keyDownEmail }
                onChange={ this.handleChange } />
                        <span className={ loginClasses('input-icon') }><i className='ti-email' /></span>
                    </FormGroup>
                    <FormGroup className={ loginClasses('form-group') }>
                        <Input
                type='Password'
                className={ loginClasses('form-input') }
                placeholder='Password'
                value={ password }
                innerRef={ this.passwordInput }
                name='password'
                onKeyDown={ this.keyDownPassword }
                onChange={ this.handleChange } />
                        <span className={ loginClasses('input-icon') }><i className='ti-lock' /></span>
                    </FormGroup>
                    <FormGroup className={ loginClasses('form-group') }>
                        <Button
                color='primary'
                className={ loginClasses('form-button') }
                variant='contained'
                size='large'
                onClick={ this.doLogin }>
                Sign In
                        </Button>
                        <div onClick={ this.forgotPassword } className={ loginClasses('forgot-password') }>
                Forgot your password?
                        </div>
                    </FormGroup>
                </Form>
            </div>
        </div>
    )
  }
}

export default LogInComponent;
