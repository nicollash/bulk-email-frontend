import { connect } from 'react-redux'
import NewPasswordRequestComponent from '../components/NewPasswordRequestComponent'

import { createNewPassword } from '../redux/actions/authActions'

const mapStateToProps = state => {
  const { auth } = state

  return {
    auth
  }
}

const mapDispatchToProps = {
  createNewPassword
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPasswordRequestComponent)
