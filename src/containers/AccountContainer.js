import { connect } from 'react-redux'
import AccountComponent from '../components/AccountComponent'

const mapStateToProps = state => {
  const { auth } = state

  return {
    auth
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountComponent)
