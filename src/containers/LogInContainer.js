import { connect } from 'react-redux';
import LogInComponent from '../components/LogInComponent';

import { login, setNewPasswordPending } from '../redux/actions/authActions'

const mapStateToProps = state => {
  const { auth } = state

  return {
    auth
  }
}

const mapDispatchToProps = {
  login,
  setNewPasswordPending
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInComponent);