import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signOut } from '../redux/actions/authActions';
import HeaderComponent from '../components/HeaderComponent';

const mapStateToProps = state => {
  return {
    userName: 'Test User'
  };
};

const mapDispatchToProps = {
  signOut
};

export default  withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent));