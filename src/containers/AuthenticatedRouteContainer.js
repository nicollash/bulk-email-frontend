import { connect } from 'react-redux'
import AuthenticatedRoute from '../components/AuthenticatedRoute'

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
)(AuthenticatedRoute)
