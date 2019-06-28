import { connect } from 'react-redux';
import NewCampaignComponent from '../components/NewCampaignComponent';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCampaignComponent);