import React from 'react';
import { Storage } from 'aws-amplify';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { getBEMClasses } from '../helpers/cssClassesHelper';
import HomePageLayout from '../layouts/HomePageLayout';
import Select from './common/Select';
import ReactLoading from 'react-loading';

import '../styles/components/newCampaignComponent.css';

const newCampaignClasses = getBEMClasses([ 'new-campaign' ]);

const Channel = {
  SMS: 'SMS'
}

const VALID_FILE_TYPES = [ 'text/csv' ];

class NewCampaignComponent extends React.Component {
  //initialize state
  state = {
    name: '',
    channel: Channel.SMS,
    bot: '0',
    tier: 1,
    filepath: '',
    message: '',
    csvFields: [],
    fnameField: '',
    lnameField: '',
    pNumberField: '',
    stateField: '',
    addressField1: '',
    addressField2: '',
    cityField: '',
    zipField: '',
    subIdField: '',
    utmField: '',
    isUploading: false,
    key: ''
  }

  componentDidMount() {
    const { getCampaigns } = this.props;

    getCampaigns();
  }

  // MARK: - Event handlers
  handleChange = ({ target }) => this.setState({
    [ target.name ]: target.value
  })

  handleUploadClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.fileInput.click();
  }

  handleUploadChange = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isUploading: true
    })
    
    const that = this;
    const file = e.target.files[ 0 ];

    Storage.put(`campaign_${ new Date().getTime() }.csv`, file, {})
      .then (result => {
        that.setState({
          isUploading: false,
          key: result.key
        });
      })
      .catch(err => {
        that.setState({
          isUploading: false
        });
      });

    if (!file || !VALID_FILE_TYPES.includes(file.type)) {
      return;
    }

    const reader = new FileReader();

    reader.readAsText(file, 'UTF-8');
    reader.onload = function(evt) {
      const content = evt.target.result;
      const header = content.split('\n')[ 0 ];
      const headers = header.split(',');

      that.setState({
        filepath: file.name,
        csvFields: headers
      })
    }
  }

  handleSaveClick = () => {
    const { createQueue } = this.props;
    const { bot, channel, tier, key, fnameField, lnameField, pNumberField, stateField, addressField1, addressField2, cityField, zipField, subIdField, utmField } = this.state;
    createQueue({
      campaignId: bot,
      channel,
      tier,
      bucket: 'chatmantics-dev-csv',
      key,
      keyMappings: {
        fname: fnameField,
        lname: lnameField,
        p: pNumberField,
        address1: addressField1,
        address2: addressField2,
        city: cityField,
        state: stateField,
        zip: zipField,
        subId: subIdField,
        utm: utmField
      }
    })
  }

  // MARK: - Lifecycle Methods

  render() {
    const { name, channel, bot, tier, filepath, message, csvFields, fnameField, lnameField, pNumberField, stateField, addressField1, addressField2, cityField, zipField, subIdField, utmField, isUploading } = this.state;
    const { campaigns } = this.props.campaign;

    const channelValues = [
      { value: Channel.SMS, text: 'SMS' },
      { value: Channel.Facebook, text: 'Facebook' },
      { value: Channel.Email, text: 'Email' }
    ];

    const botValues = campaigns.map(campaign => {
      return { value: ''+campaign.id, text: campaign.name }
    });

    const tierValues = [
      { value: 1, text: '1' },
      { value: 2, text: '2' },
      { value: 3, text: '3' },
      { value: 4, text: '4' },
      { value: 5, text: '5' },
      { value: 6, text: '6' }
    ];

    const fieldValues = csvFields.map(field => {
      return {
        value: field,
        text: field
      }
    })

    const contentClass = isUploading ? newCampaignClasses('content') + ' ' + newCampaignClasses('content-overlay') : newCampaignClasses('content')

    return (
        <HomePageLayout>
            <div className={ newCampaignClasses('container') }>
                <div className={ newCampaignClasses('title') }>
            New Queue
                </div>
                <div className={ contentClass }>
                    { isUploading &&
                    <div className={ newCampaignClasses('content-loading') }>
                        <ReactLoading type='spin' color='#ffc600' margin='auto' height={ 50 } width={ 50 } />
                    </div>
            }
                    <FormGroup>
                        <Label htmlFor="channel">Channel</Label>
                        <Select options={ channelValues } id="channel" name="channel" placeholder="Choose a channel" value={ channel } onChange={ this.handleChange } />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="bot">Bot</Label>
                        <Select options={ botValues } id="bot" name="bot" placeholder="Choose a bot" value={ bot } onChange={ this.handleChange } />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="tier">Tier</Label>
                        <Select options={ tierValues } id="tier" name="tier" placeholder="Choose a Tier" value={ tier } onChange={ this.handleChange } />
                    </FormGroup>
                    <FormGroup>
                        <Label>File</Label>
                        <div style={ { display: 'flex', alignItems: 'center' } }>
                            <div style={ { flex: '1 1 auto' } }>{filepath}</div>
                            <Button className="file-upload-button" color="primary" size="sm" onClick={ this.handleUploadClick }>
                  Choose File...
                                <i className="fa fa-upload"></i>
                            </Button>
                        </div>
                        <input className="file-upload-input" type="file" onChange={ this.handleUploadChange } ref={ e => this.fileInput = e } />
                        { (!isUploading && filepath) &&
                        <div>
                            <div className={ newCampaignClasses('row') }>
                                <Label htmlFor="fnameField">fname</Label>
                                <Select options={ fieldValues } id="fnameField" name="fnameField" placeholder="Choose a field" value={ fnameField } onChange={ this.handleChange } />
                            </div>
                            <div className={ newCampaignClasses('row') }>
                                <Label htmlFor="lnameField">lname</Label>
                                <Select options={ fieldValues } id="lnameField" name="lnameField" placeholder="Choose a field" value={ lnameField } onChange={ this.handleChange } />
                            </div>
                            <div className={ newCampaignClasses('row') }>
                                <Label htmlFor="pNumberField">phoneNumber</Label>
                                <Select options={ fieldValues } id="pNumberField" name="pNumberField" placeholder="Choose a field" value={ pNumberField } onChange={ this.handleChange } />
                            </div>
                            <div className={ newCampaignClasses('row') }>
                                <Label htmlFor="stateField">state</Label>
                                <Select options={ fieldValues } id="stateField" name="stateField" placeholder="Choose a field" value={ stateField } onChange={ this.handleChange } />
                            </div>
                            <div className={ newCampaignClasses('row') }>
                                <Label htmlFor="addressField1">address1</Label>
                                <Select options={ fieldValues } id="addressField1" name="addressField1" placeholder="Choose a field" value={ addressField1 } onChange={ this.handleChange } />
                            </div>
                            <div className={ newCampaignClasses('row') }>
                                <Label htmlFor="addressField2">address2</Label>
                                <Select options={ fieldValues } id="addressField2" name="addressField2" placeholder="Choose a field" value={ addressField2 } onChange={ this.handleChange } />
                            </div>
                            <div className={ newCampaignClasses('row') }>
                                <Label htmlFor="cityField">city</Label>
                                <Select options={ fieldValues } id="cityField" name="cityField" placeholder="Choose a field" value={ cityField } onChange={ this.handleChange } />
                            </div>
                            <div className={ newCampaignClasses('row') }>
                                <Label htmlFor="zipField">zip</Label>
                                <Select options={ fieldValues } id="zipField" name="zipField" placeholder="Choose a field" value={ zipField } onChange={ this.handleChange } />
                            </div>
                            <div className={ newCampaignClasses('row') }>
                                <Label htmlFor="subIdField">subId</Label>
                                <Select options={ fieldValues } id="subIdField" name="subIdField" placeholder="Choose a field" value={ subIdField } onChange={ this.handleChange } />
                            </div>
                            <div className={ newCampaignClasses('row') }>
                                <Label htmlFor="utmField">utm</Label>
                                <Select options={ fieldValues } id="utmField" name="utmField" placeholder="Choose a field" value={ utmField } onChange={ this.handleChange } />
                            </div>
                        </div>
              }
                    </FormGroup>
                    <FormGroup>
                        <a href="./example.csv" download>Download CSV example</a>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="message">Message Content</Label>
                        <Input type="textarea" id="message" name="message" placeholder="Input a message" required value={ message } onChange={ this.handleChange } />
                    </FormGroup>
                </div>
                <div className={ newCampaignClasses('footer') }>
                    <Button color="success" onClick={ this.handleSaveClick }>Save</Button>
                </div>
            </div>
        </HomePageLayout>
    )
  }
}

export default NewCampaignComponent;
