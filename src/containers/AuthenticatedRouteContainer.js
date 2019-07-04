import { connect } from 'react-redux'
import AuthenticatedRoute from '../components/AuthenticatedRoute'
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
)(AuthenticatedRoute)
