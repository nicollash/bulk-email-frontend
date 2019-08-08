import { connect } from 'react-redux'
import AccountComponent from '../components/AccountComponent'
import { setNewPassword } from '../redux/actions/authActions'

const mapStateToProps = state => {
  const { auth } = state

  return {
    auth
  }
}

const mapDispatchToProps = {
  setNewPassword
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountComponent)
