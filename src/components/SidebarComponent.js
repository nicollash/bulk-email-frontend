import React from 'react';
import { getBEMClasses } from '../helpers/cssClassesHelper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import Add from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import '../styles/components/sidebarComponent.css';

const sidebarClasses = getBEMClasses(['side-bar']);

class SidebarComponent extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      openQueue: true
    };
  }

  goOverview = () => {
    const { history } = this.props;
    history.push('/overview');
  }

  goAddQueue = () => {
    const { history } = this.props;
    history.push('/create-queue');
  }

  goQueueList = () => {
    const { history } = this.props;
    history.push('/queue-list');
  }

  toggleQueue = () => {
    this.setState({
      openQueue: !this.state.openQueue
    })
  }

  render() {
    const { openQueue } = this.state;

    return (
      <List
        component="nav"
      >
        <ListItem button onClick={this.goOverview}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>
        <Divider component="li" />
        <ListItem button onClick={this.toggleQueue}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Queues" />
          {openQueue ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openQueue} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={this.goAddQueue}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="New Queue" />
            </ListItem>
            <ListItem button onClick={this.goQueueList}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Queue List" />
            </ListItem>
          </List>
        </Collapse>
        <Divider component="li" />
      </List>
    )
  }
}

export default SidebarComponent;
