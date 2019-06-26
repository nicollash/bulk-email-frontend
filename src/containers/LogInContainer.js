import { connect } from 'react-redux';
import LogInComponent from '../components/LogInComponent';

const mapStateToProps = state => {
  return {
    userName: 'Test User'
  };
};

export default connect(
  mapStateToProps
)(LogInComponent);