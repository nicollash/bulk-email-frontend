import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SidebarComponent from '../components/SidebarComponent';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarComponent));