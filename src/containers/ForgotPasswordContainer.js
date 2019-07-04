import { connect } from 'react-redux'
import ForgotPasswordComponent from '../components/ForgotPasswordComponent'

import { sendEmail, initAuthPwdState } from '../redux/actions/authActions'

const mapStateToProps = state => {
  const { auth } = state

  return {
    auth
  }
}

const mapDispatchToProps = {
  sendEmail,
  initAuthPwdState
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordComponent)
