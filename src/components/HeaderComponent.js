import React from 'react';
import { getBEMClasses } from '../helpers/cssClassesHelper';
import LogoIconComponent from './LogoIconComponent'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { signOutUser } from '../services/aws/aws_cognito';

import '../styles/components/headerComponent.css';
const headerClasses = getBEMClasses(['header']);

class HeaderComponent extends React.Component {
  
  constructor (props) {
    super(props)

    this.state = {
      isMenuOpen: false
    };
  }

  goAccount = () => {
    const { history } = this.props;
    this.handleMenuClose();
    history.push('/account');
  }

  signOut = () => {
    const { signOut } = this.props;
    this.handleMenuClose();
    if (signOutUser()) {
      signOut();
    }
  }

  openProfileMenu = (e) => {
    this.setState({
      isMenuOpen: true
    })
  }

  handleMenuClose = (e) => {
    this.setState({
      isMenuOpen: false
    })
  }

  render() {
    const { isMenuOpen } = this.state;

    const profileMenu = (
      <Menu
        id='primary-search-account-menu'
        keepMounted
        open={isMenuOpen}
        className={headerClasses('profile-menu-container')}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.goAccount}>Profile</MenuItem>
        <MenuItem onClick={this.signOut}>Sign Out</MenuItem>
      </Menu>
    );
  
    return(
      <header className={headerClasses('container')}>
        <AppBar position="static">
          <Toolbar className={headerClasses('toolbar')}>
            {//<LogoIconComponent />
            }
            <div className={headerClasses('left-bar')}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Bulk SMS
              </Typography>
            </div>
            <div>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={ this.openProfileMenu }
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        { profileMenu }
      </header>
    )
  }
}

export default HeaderComponent;
