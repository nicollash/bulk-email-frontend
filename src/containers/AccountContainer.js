import { connect } from 'react-redux'
import AccountComponent from '../components/AccountComponent'

import { updateUser } from '../redux/actions/authActions'

const mapStateToProps = state => {
  const { auth } = state

  return {
    auth
  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountComponent)
