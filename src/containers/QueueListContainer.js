import { connect } from 'react-redux';
import QueueListComponent from '../components/QueueListComponent';
import { getCampaigns } from '../redux/actions/campaignActions';
import { getQueues } from '../redux/actions/queueActions';

const mapStateToProps = state => {
  const { campaign, queue } = state

  return {
    campaign,
    queue
  }
};

const mapDispatchToProps = {
  getCampaigns,
  getQueues
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueueListComponent);