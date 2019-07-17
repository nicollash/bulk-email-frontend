import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signOut } from '../redux/actions/authActions';
import SidebarComponent from '../components/SidebarComponent';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  signOut
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarComponent));