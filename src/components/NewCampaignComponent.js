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
  constructor(props) {
    super(props);

    //initialize state
    this.state = {
      name: "",
      channel: Channel.SMS,
      bot: 3000,
      filepath: "",
      message: "",
    }
  }

  render() {
    const { name, channel, bot, filepath, message } = this.state;

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

    return (
      <HomePageLayout>
        <div className={newCampaignClasses('container')}>
          <div className={newCampaignClasses('title')}>
            New Campaign
          </div>
          <div className={newCampaignClasses('content')}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" placeholder="Enter campaign name" required value={name} onChange={this.handleNameChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="channel">Channel</Label>
              <Select options={channelValues} id="channel" placeholder="Choose a channel" value={channel} onChange={this.handleChannelChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="bot">Bot</Label>
              <Select options={botValues} id="bot" placeholder="Choose a bot" value={bot} onChange={this.handleBotChange} />
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
            </FormGroup>
            <FormGroup>
              <Label htmlFor="message">Message Content</Label>
              <Input type="textarea" id="message" placeholder="Input a message" required value={message} onChange={this.handleMessageChange} />
            </FormGroup>
          </div>
          <div className={newCampaignClasses('footer')}>
            <Button color="success" onClick={this.handleSaveClick}>Save</Button>
          </div>
        </div>
      </HomePageLayout>
    )
  }

  // MARK: - Event handlers

  handleNameChange = (e) => {
    const name = e.target.value;

    this.setState({
      name
    });
  }

  handleChannelChange = (e) => {
    const channel = e.target.value;

    this.setState({
      channel
    });
  }

  handleMessageChange = (e) => {
    const message = e.target.value;

    this.setState({
      message
    });
  }

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

    // let formData = new FormData();
    // formData.append('file', file);

    // fetch(`${Settings.fileServer}/upload`, {
    //   method: 'POST',
    //   headers: {
    //   },
    //   body: formData,
    // }).then(response => response.json()).then(reply => {
    //   this.setState({
    //     filepath: `${reply.data}`
    //   });
    // });

    this.setState({
      filepath: file.name
    });
  }

  handleSaveClick = (e) => {
    console.log("save clicked!");
  }
};

export default NewCampaignComponent;
