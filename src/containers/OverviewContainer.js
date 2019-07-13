import { connect } from 'react-redux';
import OverviewComponent from '../components/OverviewComponent';

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps
)(OverviewComponent);