import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import actions from 'Actions';
import styles from './style';
import withWindowDimensions from 'Common/AppDimens';

import LogoIcon from 'Icons/icons8-p.png';
import AddIcon from 'Icons/icons8-plus.png';
import BackIcon from 'Icons/icons8-back.png';
import SettingsIcon from 'Icons/icons8-settings.png';
import ExitIcon from 'Icons/icons8-exit.png';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownVisible: false
    };
  }

  _toggleDropdown = () => {
    const { dropdownVisible } = this.state;
    this.setState({ dropdownVisible: !dropdownVisible });
  }

  _goToPage = (pageName) => {
    this.props.history.push(`/${pageName}`);
  }

  _renderDropdown = () => {
    const { isMobile } = this.props;
    return (
      <div style={styles.dropdownMenu(isMobile)}>
        <button style={{ ...styles.dropdownItem, borderBottom: 'solid 1px black' }} onClick={() => {this._goToPage('settings')}}>
          <img src={SettingsIcon} style={{ height: 24, width: 24 }} />
          <p style={{ flex: 1, marginLeft: 8 }}>Settings</p>
        </button>
        <button style={styles.dropdownItem} onClick={this.props.logout}>
          <img src={ExitIcon} style={{ height: 24, width: 24 }} />
          <p style={{ flex: 1, marginLeft: 8 }}>Log Out</p>
        </button>
      </div>
    );
  }

  render() {
    const { userInfo, isMobile } = this.props;
    const { dropdownVisible } = this.state;

    return (
      <div style={styles.container}>
        <div>
          <a href="/dashboard"><img src={LogoIcon} style={{ height: 36, marginLeft: isMobile ? 18 : 64 }} /></a>
        </div>
        <div style={styles.rightContainer}>
          <div style={styles.welcomeTxt}>
            {userInfo.first_name
                ? `Hi, ${userInfo.first_name}!`
                : 'Hello there!' }
          </div>
          <button onClick={this._toggleDropdown} style={styles.dropdownToggle(isMobile, dropdownVisible)}><img src={BackIcon} style={{ height: 21 }} /></button>
          {dropdownVisible && this._renderDropdown()}
          <button style={styles.addIconBtn(isMobile)} onClick={() => {this._goToPage('add_entry')}}>
            <img src={AddIcon} style={{height: 36 }} />
          </button>
        </div>
      </div>
    );
  }
}

export default withWindowDimensions(withRouter(Navbar));