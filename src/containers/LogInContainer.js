import { connect } from 'react-redux';
import LogInComponent from '../components/LogInComponent';

import { login } from '../redux/actions/authActions'

const mapStateToProps = state => {
  const { auth } = state

  return {
    auth
  }
}

const mapDispatchToProps = {
  login
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInComponent);