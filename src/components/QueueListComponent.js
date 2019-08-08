import React from 'react';
import MaterialTable from 'material-table';
import { getBEMClasses } from '../helpers/cssClassesHelper';
import HomePageLayout from '../layouts/HomePageLayout';

import '../styles/components/queueListComponent.css';

const queueListClasses = getBEMClasses(['queue-list']);

class QueueListComponent extends React.Component {
  //initialize state
  state = {
  }

  componentDidMount() {
    const { getCampaigns, getQueues } = this.props;

    getCampaigns();
    getQueues();
  }

  // MARK: - Event handlers
  handleChange = ({target}) => this.setState({
    [target.name]: target.value
  })

  // MARK: - Lifecycle Methods

  render() {
    const { campaigns } = this.props.campaign;
    const { queues } = this.props.queue;

    const columns = [
      { title: 'Bucket Name', field: 'bucket' },
      { title: 'Channel', field: 'channel' },
      { title: 'Key', field: 'key' },
      { title: 'Text Templates', field: 'textTemplates' },
      { title: 'Tier', field: 'tier' },
      { title: 'Status', field: 'status' }
    ];

    return (
      <HomePageLayout>
        <div className={queueListClasses('container')}>
          <MaterialTable
            title="Queue List"
            columns={columns}
            data={queues}
            options={{
              pageSize: 10
            }}
          />
        </div>
      </HomePageLayout>
    )
  }
}

export default QueueListComponent;
