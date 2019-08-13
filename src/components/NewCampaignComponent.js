import React from 'react';
import { Storage } from 'aws-amplify';
import { getBEMClasses } from '../helpers/cssClassesHelper';
import HomePageLayout from '../layouts/HomePageLayout';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

	const channelItems = channelValues.map(channel => {
		return (<MenuItem key={ channel.value } value={ channel.text }>{ channel.text }</MenuItem>)
	})
    const botItems = campaigns.map(campaign => {
		return (<MenuItem key={ campaign.id } value={ campaign.id }>{ campaign.name }</MenuItem>)
	});
	const tierItems = tierValues.map(tier => {
		return (<MenuItem key={ tier.value } value={ tier.value }>{ tier.value }</MenuItem>)
    });

    const fieldItems = fieldValues.map(field => {
		return (<MenuItem key={ field.value } value={ field.value }>{ field.value }</MenuItem>)
	});

    const contentClass = isUploading ? newCampaignClasses('content') + ' ' + newCampaignClasses('content-overlay') : newCampaignClasses('content')

    return (
        <HomePageLayout>
            <div className={ newCampaignClasses('container') } >
                <AppBar position="static" className={ newCampaignClasses('title') }>
                    <Toolbar className={ newCampaignClasses('title-toolbar') }>
						New Campaign
                    </Toolbar>
                </AppBar>
                <Paper className={ contentClass }>
                    <div className = { newCampaignClasses('content-row') }>
						Channel : 
                        <Select value = { channel } onChange={ this.handleChange } inputProps={ { name: 'channel' } } >
                            { channelItems }
                        </Select>
						Bot : 
                        <Select value = { bot } onChange={ this.handleChange } inputProps={ { name: 'bot' } } className = { newCampaignClasses('select') } >
                            { botItems }
                        </Select>
						Tier : 
                        <Select value = { tier } onChange={ this.handleChange } inputProps={ { name: 'tier' } } >
                            { tierItems }
                        </Select>
                    </div>
                    <div className = { newCampaignClasses('content-row') }>
                        <div style={ { flex: '1 1 auto' } }>{ filepath }</div>
                    </div>
                    <div className = { newCampaignClasses('content-row') }>
                        <Button className="file-upload-button" variant="contained" color="primary" onClick={ this.handleUploadClick }>
							Upload File
                        </Button>
                        <a href="./example.csv" download>Download CSV example</a>
                        <input className="file-upload-input" type="file" onChange={ this.handleUploadChange } ref={ e => this.fileInput = e } />
                    </div>
                    <div className = { newCampaignClasses('content-row') }>
						fname : 
                        <Select value = { fnameField } onChange={ this.handleChange } inputProps={ { name: 'fnameField' } } >
                            { fieldItems }
                        </Select>
                    </div>
                    <div className = { newCampaignClasses('content-row') }>
						lname : 
                        <Select value = { lnameField } onChange={ this.handleChange } inputProps={ { name: 'lnameField' } } >
                            { fieldItems }
                        </Select>
                    </div>
                    <div className = { newCampaignClasses('content-row') }>
						phoneNumber : 
                        <Select value = { pNumberField } onChange={ this.handleChange } inputProps={ { name: 'pNumberField' } } >
                            { fieldItems }
                        </Select>
                    </div>
                    <div className = { newCampaignClasses('content-row') }>
						address1 : 
                        <Select value = { addressField1 } onChange={ this.handleChange } inputProps={ { name: 'addressField1' } } >
                            { fieldItems }
                        </Select>
                    </div>
                    <div className = { newCampaignClasses('content-row') }>
						address2 : 
                        <Select value = { addressField2 } onChange={ this.handleChange } inputProps={ { name: 'addressField2' } } >
                            { fieldItems }
                        </Select>
                    </div>
                    <div className = { newCampaignClasses('content-row') }>
						city : 
                        <Select value = { cityField } onChange={ this.handleChange } inputProps={ { name: 'cityField' } } >
                            { fieldItems }
                        </Select>
                    </div>
                    <div className = { newCampaignClasses('content-row') }>
						zip : 
                        <Select value = { zipField } onChange={ this.handleChange } inputProps={ { name: 'zipField' } } >
                            { fieldItems }
                        </Select>
                    </div>
                    <div className = { newCampaignClasses('content-row') }>
						subId : 
                        <Select value = { subIdField } onChange={ this.handleChange } inputProps={ { name: 'subIdField' } } >
                            { fieldItems }
                        </Select>
                    </div>
                    <div className = { newCampaignClasses('content-row') }>
						tum : 
                        <Select value = { utmField } onChange={ this.handleChange } inputProps={ { name: 'utmField' } } >
                            { fieldItems }
                        </Select>
                    </div>
                    <div className = { newCampaignClasses('content-row') }>
                        <TextField
							id="outlined-multiline-static"
							label="Message Content"
							multiline
							rows="4"
							margin="normal"
							variant="outlined"
							value={ message }
							onChange={ this.handleChange }
						/>
                    </div>
                    <div className = { newCampaignClasses('content-row') }>
                        <Button variant="contained" color="primary" onClick={ this.handleSaveClick }>
							Save
                        </Button>
                    </div>
                </Paper>
            </div>
        </HomePageLayout>
    )
  }
}

export default NewCampaignComponent;
