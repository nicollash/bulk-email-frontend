import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SidebarComponent from '../components/SidebarComponent';

const mapStateToProps = state => {
  return state;
};

export default withRouter(connect(
  mapStateToProps
)(SidebarComponent));