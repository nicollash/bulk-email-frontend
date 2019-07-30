import React from 'react';
import { Button, FormGroup, Input, Label } from 'reactstrap';

import { getBEMClasses } from '../helpers/cssClassesHelper';

import HomePageLayout from '../layouts/HomePageLayout';
import Select from './common/Select';

import '../styles/components/newCampaignComponent.css';

const newCampaignClasses = getBEMClasses(['new-campaign']);

const Channel = {
  SMS: "SMS",
  Facebook: "Facebook",
  Email: "Email"
}

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

    if (e.target.files.length === 0) {
      return;
    }

    let file = e.target.files[0];
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
    
    const channelValues = [
      { value: Channel.SMS, text: "SMS" },
      { value: Channel.Facebook, text: "Facebook" },
      { value: Channel.Email, text: "Email" }
    ];

    const botValues = [
      { value: 3000, text: "Campaign 3000" },
      { value: 4000, text: "Campaign 4000" },
      { value: 5000, text: "Campaign 5000" },
      { value: 6000, text: "Campaign 6000" }
    ];

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
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" placeholder="Enter campaign name" required value={name} onChange={this.handleChange} />
            </FormGroup>
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
                    <Label htmlFor="fname">fname</Label>
                    <Select options={fieldValues} id="fname" name="fname" placeholder="Choose a field" value={fnameField} onChange={this.handleChange} />
                  </div>
                  <div className={newCampaignClasses('row')}>
                    <Label htmlFor="lname">lname</Label>
                    <Select options={fieldValues} id="lname" name="lname" placeholder="Choose a field" value={lnameField} onChange={this.handleChange} />
                  </div>
                  <div className={newCampaignClasses('row')}>
                    <Label htmlFor="pNumber">phoneNumber</Label>
                    <Select options={fieldValues} id="pNumber" name="pNumber" placeholder="Choose a field" value={pNumberField} onChange={this.handleChange} />
                  </div>
                  <div className={newCampaignClasses('row')}>
                    <Label htmlFor="state">state</Label>
                    <Select options={fieldValues} id="state" name="state" placeholder="Choose a field" value={stateField} onChange={this.handleChange} />
                  </div>
                  <div className={newCampaignClasses('row')}>
                    <Label htmlFor="address">address</Label>
                    <Select options={fieldValues} id="address" name="address" placeholder="Choose a field" value={addressField} onChange={this.handleChange} />
                  </div>
                  <div className={newCampaignClasses('row')}>
                    <Label htmlFor="city">city</Label>
                    <Select options={fieldValues} id="city" name="city" placeholder="Choose a field" value={cityField} onChange={this.handleChange} />
                  </div>
                </div>
              }
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
