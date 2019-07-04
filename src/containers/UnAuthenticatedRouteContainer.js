import { connect } from 'react-redux'
import UnAuthenticatedRoute from '../components/UnAuthenticatedRoute'

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
)(UnAuthenticatedRoute)
