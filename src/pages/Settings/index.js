import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from 'Actions';
import Navbar from 'Components/Navbar';
import styles from './style';
import withWindowDimensions from 'Common/AppDimens';
import Utils from 'Utils';

import BackIcon from 'Icons/icons8-back.png';
import NameIcon from 'Icons/icons8-name.png';
import PhoneIcon from 'Icons/icons8-phone.png';
import BirthdayIcon from 'Icons/icons8-birthday.png';
import HomeIcon from 'Icons/icons8-home.png';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      old_password: '',
      new_password_1: '',
      new_password_2: ''
    };
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _handlePhoneChange = (event) => {
    const target = event.target;

    this.setState({ phone: Utils.formatPhoneInput(target.value) });
  };

  _handleBirthdayChange = (event) => {
    const target = event.target;

    this.setState({ birthday: Utils.formatDateInput(target.value) });
  };

  _handleSubmitInfo = () => {
    const { userInfo } = this.props;
    const { first_name, last_name, phone, birthday, hometown } = this.state;
    let userUpdates = {};


    if (first_name?.length > 0) userUpdates.first_name = first_name;
    if (last_name?.length > 0) userUpdates.last_name = last_name;
    if (phone?.length > 0) userUpdates.phone = phone;
    if (birthday?.length > 0) userUpdates.birthday = birthday;
    if (hometown?.length > 0) userUpdates.hometown = hometown;

    this.props.updateUser(userInfo, userUpdates);
  }

  _handleChangePassword = () => {
    const { userInfo } = this.props;
    const { old_password, new_password_1, new_password_2 } = this.state;

    if (old_password.length > 0 && new_password_1.length > 0) {
      if (new_password_1 == new_password_2) {
        const passwordUpdates = { old_password, new_password: new_password_1 };
        this.props.changePassword(userInfo, passwordUpdates);
      }
    }
  }

  _renderEditAccount = () => {
    const { userInfo } = this.props;
    return (
      <div style={styles.entryContainer}>
        <div style={styles.entryTitleContainer}>
          <div>Account</div>
          <div>Settings</div>
        </div>
        <button onClick={this._handleSubmitInfo}>Submit</button>
        <div style={styles.formContainer}>
          <div style={styles.txtInputContainer}>
            <img src={NameIcon} style={{width: 24, height: 24, margin: 'auto'}} />
            <input
              name="first_name"
              style={styles.txtInput}
              placeholder='First Name'
              type="text"
              value={this.state.first_name ? this.state.first_name : userInfo.first_name}
              onChange={this._handleInputChange}
            />
            <input
              name="last_name"
              style={styles.txtInput}
              placeholder='Last Name'
              type="text"
              value={this.state.last_name ? this.state.last_name : userInfo.last_name}
              onChange={this._handleInputChange}
            />
          </div>
          <div style={{...styles.txtInputContainer}}>
            <img src={PhoneIcon} style={{height: 24, margin: 'auto' }} />
            <input
              name="phone"
              style={styles.txtInput}
              placeholder='Phone Number'
              type="text"
              value={this.state.phone ? this.state.phone : userInfo.phone}
              onChange={this._handlePhoneChange}
            />
          </div>
          <div style={styles.txtInputContainer}>
            <img src={BirthdayIcon} style={{height: 24, margin: 'auto' }} />
            <input
              name="birthday"
              style={styles.txtInput}
              placeholder='mm/dd/yyyy'
              type="text"
              value={this.state.birthday ? this.state.birthday : userInfo.birthday}
              onChange={this._handleBirthdayChange}
            />
          </div>
          <div style={styles.txtInputContainer}>
            <img src={HomeIcon} style={{height: 24, margin: 'auto' }} />
            <input
              name="hometown"
              style={styles.txtInput}
              placeholder='Hometown'
              type="text"
              value={this.state.hometown ? this.state.hometown : userInfo.hometown}
              onChange={this._handleInputChange}
            />
          </div>
        </div>
      </div>
    );
  }

  _renderEditBodyParts = () => {
    return (
      <div style={styles.entryContainer}>
        <div style={styles.entryTitleContainer}>
          <div>Edit Pain</div>
          <div>Points</div>
        </div>
      </div>
    );
  }

  _renderChangePassword = () => {
    return (
      <div style={styles.entryContainer}>
        <div style={styles.entryTitleContainer}>
          <div>Change</div>
          <div>Password</div>
        </div>
        <div style={styles.formContainer}>
          <div style={{...styles.txtInputContainer}}>
            <img src={PhoneIcon} style={{height: 24, margin: 'auto' }} />
            <input
              name="old_password"
              style={styles.txtInput}
              placeholder='Old Password'
              type="password"
              value={this.state.old_password}
              onChange={this._handleInputChange}
            />
          </div>
          <div style={{...styles.txtInputContainer}}>
            <img src={PhoneIcon} style={{height: 24, margin: 'auto' }} />
            <input
              name="new_password_1"
              style={styles.txtInput}
              placeholder='New Password'
              type="password"
              value={this.state.new_password_1}
              onChange={this._handleInputChange}
            />
          </div>
          <div style={{...styles.txtInputContainer}}>
            <img src={PhoneIcon} style={{height: 24, margin: 'auto' }} />
            <input
              name="new_password_2"
              style={styles.txtInput}
              placeholder='New Password'
              type="password"
              value={this.state.new_password_2}
              onChange={this._handleInputChange}
            />
          </div>
          <button onClick={this._handleChangePassword}>Submit</button>
        </div>
      </div>
    );
  }

  render() {
    const { userInfo, windowWidth, logout } = this.props;

    return (
      <div style={styles.container}>
        <Navbar userInfo={userInfo} logout={logout}/>
        <div style={styles.configContainer}>
          <div style={styles.titleContainer}>
            <div style={styles.titleTxt}>Settings</div>
            <div style={{...styles.subtitleTxt, marginTop: 8}}>Modify your account here.</div>
          </div>
          <div style={styles.configContentContainer}>
            <div style={styles.configTitle}>
              <div style={styles.configTitleTxt}>Filter</div>
              <div style={styles.configTitleTxt}>Entries</div>
            </div>
            <div style={styles.configTitle}>
              <div style={styles.configTitleTxt}>Filter</div>
              <div style={styles.configTitleTxt}>Entries</div>
            </div>
            <div style={styles.configTitle}>
              <div style={styles.configTitleTxt}>Filter</div>
              <div style={styles.configTitleTxt}>Entries</div>
            </div>
          </div>
        </div>
        <div style={styles.entriesContainer(windowWidth)}>
          {this._renderEditAccount()}
          {this._renderEditBodyParts()}
          {this._renderChangePassword()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.users.userInfo,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWindowDimensions(Settings));