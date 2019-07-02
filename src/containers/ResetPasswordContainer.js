import { connect } from 'react-redux'
import ResetPasswordComponent from '../components/ResetPasswordComponent'

import { changePassword, initAuthPwdState } from '../redux/actions/authActions'

const mapStateToProps = state => {
  const { auth } = state

  return {
    auth
  }
}

const mapDispatchToProps = {
  changePassword,
  initAuthPwdState
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordComponent)
