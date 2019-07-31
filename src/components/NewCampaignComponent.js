import React from 'react';
import { Storage } from 'aws-amplify';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { getBEMClasses } from '../helpers/cssClassesHelper';
import HomePageLayout from '../layouts/HomePageLayout';
import Select from './common/Select';

import '../styles/components/newCampaignComponent.css';

const newCampaignClasses = getBEMClasses(['new-campaign']);

const Channel = {
  SMS: "SMS"
}

const VALID_FILE_TYPES = ['text/csv'];

class NewCampaignComponent extends React.Component {
  //initialize state
  state = {
    name: "",
    channel: Channel.SMS,
    bot: 3000,
    filepath: "",
    message: "",
    csvFields: [],
    fnameField: "",
    lnameField: "",
    pNumberField: "",
    stateField: "",
    addressField: "",
    cityField: ""
  }

  componentDidMount() {
    const { getCampaigns } = this.props;

    getCampaigns();
  }

  // MARK: - Event handlers
  handleChange = ({target}) => this.setState({
    [target.name]: target.value
  })

  handleUploadClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.fileInput.click();
  }

  handleUploadChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    let file = e.target.files[0];

    Storage.put(`campaign_${new Date().getTime()}.csv`, file, {
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
    })
      .then (result => console.log(result))
      .catch(err => console.log(err));

    if (!file || !VALID_FILE_TYPES.includes(file.type)) {
      return;
    }

    let reader = new FileReader();
    let that = this;

    reader.readAsText(file, "UTF-8");
    reader.onload = function(evt) {
      let content = evt.target.result;
      let header = content.split('\n')[0];
      let headers = header.split(',');

      that.setState({
        filepath: file.name,
        csvFields: headers
      })
    }
  }

  // MARK: - Lifecycle Methods

  render() {
    const { name, channel, bot, filepath, message, csvFields, fnameField, lnameField, pNumberField, stateField, addressField, cityField } = this.state;
    const { campaigns } = this.props.campaign;

    const channelValues = [
      { value: Channel.SMS, text: "SMS" },
      { value: Channel.Facebook, text: "Facebook" },
      { value: Channel.Email, text: "Email" }
    ];

    const botValues = campaigns.map(campaign => {
      return {value: campaign.id, text: campaign.name}
    });

    const fieldValues = csvFields.map(field => {
      return {
        value: field,
        text: field
      }
    })

    return (
      <HomePageLayout>
        <div className={newCampaignClasses('container')}>
          <div className={newCampaignClasses('title')}>
            New Campaign
          </div>
          <div className={newCampaignClasses('content')}>
            <FormGroup>
              <Label htmlFor="channel">Channel</Label>
              <Select options={channelValues} id="channel" name="channel" placeholder="Choose a channel" value={channel} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="bot">Bot</Label>
              <Select options={botValues} id="bot" name="bot" placeholder="Choose a bot" value={bot} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label>File</Label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flex: "1 1 auto" }}>{filepath}</div>
                <Button className="file-upload-button" color="primary" size="sm" onClick={this.handleUploadClick}>
                  Choose File...
                  <i className="fa fa-upload"></i>
                </Button>
              </div>
              <input className="file-upload-input" type="file" onChange={this.handleUploadChange} ref={e => this.fileInput = e} />
              { filepath &&
                <div>
                  <div className={newCampaignClasses('row')}>
                    <Label htmlFor="fnameField">fname</Label>
                    <Select options={fieldValues} id="fnameField" name="fnameField" placeholder="Choose a field" value={fnameField} onChange={this.handleChange} />
                  </div>
                  <div className={newCampaignClasses('row')}>
                    <Label htmlFor="lnameField">lname</Label>
                    <Select options={fieldValues} id="lnameField" name="lnameField" placeholder="Choose a field" value={lnameField} onChange={this.handleChange} />
                  </div>
                  <div className={newCampaignClasses('row')}>
                    <Label htmlFor="pNumberField">phoneNumber</Label>
                    <Select options={fieldValues} id="pNumberField" name="pNumberField" placeholder="Choose a field" value={pNumberField} onChange={this.handleChange} />
                  </div>
                  <div className={newCampaignClasses('row')}>
                    <Label htmlFor="stateField">state</Label>
                    <Select options={fieldValues} id="stateField" name="stateField" placeholder="Choose a field" value={stateField} onChange={this.handleChange} />
                  </div>
                  <div className={newCampaignClasses('row')}>
                    <Label htmlFor="addressField">address</Label>
                    <Select options={fieldValues} id="addressField" name="addressField" placeholder="Choose a field" value={addressField} onChange={this.handleChange} />
                  </div>
                  <div className={newCampaignClasses('row')}>
                    <Label htmlFor="cityField">city</Label>
                    <Select options={fieldValues} id="cityField" name="cityField" placeholder="Choose a field" value={cityField} onChange={this.handleChange} />
                  </div>
                </div>
              }
            </FormGroup>
            <FormGroup>
              <a href="./example.csv" download>Download CSV example</a>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="message">Message Content</Label>
              <Input type="textarea" id="message" name="message" placeholder="Input a message" required value={message} onChange={this.handleChange} />
            </FormGroup>
          </div>
          <div className={newCampaignClasses('footer')}>
            <Button color="success" onClick={this.handleSaveClick}>Save</Button>
          </div>
        </div>
      </HomePageLayout>
    )
  }
}

export default NewCampaignComponent;
