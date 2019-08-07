import { connect } from 'react-redux';
import NewCampaignComponent from '../components/NewCampaignComponent';
import { getCampaigns } from '../redux/actions/campaignActions';
import { createQueue } from '../redux/actions/queueActions';

const mapStateToProps = state => {
  const { campaign } = state

  return {
    campaign
  }
};

const mapDispatchToProps = {
  getCampaigns,
  createQueue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCampaignComponent);