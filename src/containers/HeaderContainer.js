import { connect } from 'react-redux';
import HeaderComponent from '../components/HeaderComponent';

const mapStateToProps = state => {
  return {
    userName: 'Test User'
  };
};

export default connect(
  mapStateToProps
)(HeaderComponent);