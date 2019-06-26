import { connect } from 'react-redux';
import SidebarComponent from '../components/SidebarComponent';

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps
)(SidebarComponent);