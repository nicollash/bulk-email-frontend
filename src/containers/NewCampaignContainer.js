import { connect } from 'react-redux';
import NewCampaignComponent from '../components/NewCampaignComponent';
import { getCampaigns } from '../redux/actions/campaignActions';

const mapStateToProps = state => {
  const { campaign } = state

  return {
    campaign
  }
};

const mapDispatchToProps = {
  getCampaigns
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCampaignComponent);