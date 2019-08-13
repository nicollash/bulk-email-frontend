import React from 'react';
import { getBEMClasses } from '../helpers/cssClassesHelper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import HomePageLayout from '../layouts/HomePageLayout';

import '../styles/components/overviewComponent.css';

const overviewClasses = getBEMClasses([ 'overview' ]);

class OverviewComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      channel: 'SMS'
    }
  }

  handleChange = (event) => {
    this.setState({
      [ event.target.name ]: event.target.value
    });
  }

  changeFilterDate = () => {

  }

  render() {
    const channels = [ 'SMS', 'Facebook', 'Email' ];

    return (
        <HomePageLayout>
            <div className={ overviewClasses('container') } >
                <AppBar position="static" className={ overviewClasses('title') }>
                    <Toolbar>
              Campaign Overview
                        <Select
                value = { this.state.channel }
                onChange={ this.handleChange }
                inputProps={ {
                  name: 'channel'
                } }
              >
                            <MenuItem value={ 'SMS' }>SMS</MenuItem>
                            <MenuItem value={ 'SMFacebookS' }>Facebook</MenuItem>
                            <MenuItem value={ 'Email' }>Email</MenuItem>
                        </Select>
                        <MuiPickersUtilsProvider utils={ DateFnsUtils }>
                            <KeyboardDatePicker
                  disableToolbar
                  format = "MM/dd/yyyy"
                  margin = "normal"
                  id = "date-picker-inline"
                  value = { this.state.filterDate }
                  onChange = { this.changeFilterDate }
                  KeyboardButtonProps = { {
                    'aria-label': 'change date',
                  } }
                />
                        </MuiPickersUtilsProvider>
                    </Toolbar>
                </AppBar>
                <Paper className={ overviewClasses('content') }>
                    <Card className={ overviewClasses('card-content') }>
                        <CardContent>
                            <div className={ overviewClasses('card-item') }>
                  Student Loan Help
                            </div>
                            <div className={ overviewClasses('card-item') }>
                  Channel : <span className='span-value'>SMS</span>
                            </div>
                            <div className={ overviewClasses('card-item') }>
                  Date : <span className='span-value'>2019-08-06</span>
                            </div>
                        </CardContent>
                    </Card>
                </Paper>
            </div>
        </HomePageLayout>
    );
  }
}

export default OverviewComponent;