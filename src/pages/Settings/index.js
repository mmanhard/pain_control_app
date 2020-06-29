import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from 'Actions';
import Navbar from 'Components/Navbar';
import styles from './style';
import withWindowDimensions from 'Common/AppDimens';
import Utils from 'Utils';
import AppColors from 'Common/AppColors';

import BackIcon from 'Icons/icons8-back.png';
import NameIcon from 'Icons/icons8-name.png';
import PhoneIcon from 'Icons/icons8-phone.png';
import BirthdayIcon from 'Icons/icons8-birthday.png';
import HomeIcon from 'Icons/icons8-home.png';
import KeyIcon from 'Icons/icons8-key.png';

const screenTypes = {
  editAccount: 'editAccount',
  editPainPoints: 'editPainPoints',
  editPassword: 'editPassword'
}

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBodyPart: null,
      part_location: '',
      part_name: '',
      part_type: '',
      old_password: '',
      new_password_1: '',
      new_password_2: '',
      screenType: screenTypes.editAccount
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

  _handleEditAccount = () => {
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

  _handleEditBodyPart = () => {
    const { userInfo } = this.props;
    const { currentBodyPart: part, part_name, part_location, part_type } = this.state;

    let partUpdates = {};
    if (part_name?.length > 0) partUpdates.name = part_name;
    if (part_location?.length > 0) partUpdates.location = part_location;
    if (part_type?.length > 0) partUpdates.type = part_type;

    this.props.editBodyPart(userInfo, part.id, partUpdates);
    this.setState({ currentBodyPart: null })
  }

  _handleAddBodyPart = () => {
    const { userInfo } = this.props;
    const { part_name, part_location, part_type } = this.state;

    if (part_name?.length > 0 && part_location?.length > 0 && part_type?.length > 0) {
      const partInfo = { name: part_name, location: part_location, type: part_type }
      this.props.addBodyPart(userInfo, partInfo);
    }
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
      <div style={styles.editAccountContainer}>
        <div style={styles.editAccountLeft}>
          <div style={styles.settingsTitleContainer}>
            <div>Account</div>
            <div>Settings</div>
          </div>
          <button style={{position: 'absolute', left: '25%', top: '60%', ...styles.continueBtn}} onClick={this._handleEditAccount}>Submit</button>
        </div>
        <div style={styles.formContainer}>
          <div style={styles.txtInputContainer}>
            <img src={NameIcon} style={{height: 24, margin: 'auto'}} />
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

  _renderPartsRow = (parts, offset = 0) => {
    const { currentBodyPart, addMoreParts } = this.state;
    return (
      <div style={styles.partsContainer(offset)}>
        {parts.map((part) => {
          const selected = currentBodyPart && currentBodyPart.id == part.id;
          const displayName = part.location ? `${part.location} ${part.name}` : part.name;
          return (
            <button
              key={part.id}
              onClick={() => { this.setState({ currentBodyPart: part, addMoreParts: false, part_name: '', part_location: '', part_type: '' })}}
              style={styles.partContainer(selected)}>
              <div>{displayName}</div>
              <div style={styles.editTxt}>Edit</div>
            </button>
          );
        })}
        {parts.length < 3 && (
          <button
            style={styles.addMorePartsBtn(addMoreParts)}
            onClick={() => {this.setState({ currentBodyPart: null, addMoreParts: true, part_name: '', part_location: '', part_type: '' })}}>
              Add More
          </button>
        )}
      </div>
    );
  }

  _renderEditBodyParts = () => {
    const { bodyParts } = this.props;
    const { currentBodyPart: part, addMoreParts } = this.state;

    return (
      <div style={styles.editPartsContainer}>
        <div style={{width: '100%', position: 'relative', height: 110}}>
          <div style={styles.settingsTitleContainer}>
            <div>Edit Pain</div>
            <div>Points</div>
          </div>
        </div>
        <div style={styles.bodyPartsContainer}>
          {this._renderPartsRow(bodyParts.slice(0,3), 30)}
          {this._renderPartsRow(bodyParts.slice(3,6), -30)}
          {this._renderPartsRow(bodyParts.slice(6,9), 30)}
          {this._renderPartsRow(bodyParts.slice(9,12), -30)}
        </div>
        {part && (
          <div style={styles.partDetailsContainer}>
            <div style={styles.partInputContainer}>
              <input
                name="part_location"
                style={styles.txtInput}
                placeholder='Location'
                type="text"
                value={this.state.part_location ? this.state.part_location : part.location}
                onChange={this._handleInputChange}
              />
            </div>
            <div style={styles.partInputContainer}>
              <input
                name="part_name"
                style={styles.txtInput}
                placeholder='Name'
                type="text"
                value={this.state.part_name ? this.state.part_name : part.name}
                onChange={this._handleInputChange}
              />
            </div>
            <div style={styles.partInputContainer}>
              <input
                name="part_type"
                style={styles.txtInput}
                placeholder='Type'
                type="text"
                value={this.state.part_type ? this.state.part_type : part.type}
                onChange={this._handleInputChange}
              />
            </div>
            <button style={styles.continueBtn} onClick={this._handleEditBodyPart}>Submit</button>
          </div>)}
          {addMoreParts && (
            <div style={styles.partDetailsContainer}>
              <div style={styles.partInputContainer}>
                <input
                  name="part_location"
                  style={styles.txtInput}
                  placeholder='Location'
                  type="text"
                  value={this.state.part_location}
                  onChange={this._handleInputChange}
                />
              </div>
              <div style={styles.partInputContainer}>
                <input
                  name="part_name"
                  style={styles.txtInput}
                  placeholder='Name'
                  type="text"
                  value={this.state.part_name}
                  onChange={this._handleInputChange}
                />
              </div>
              <div style={styles.partInputContainer}>
                <input
                  name="part_type"
                  style={styles.txtInput}
                  placeholder='Type'
                  type="text"
                  value={this.state.part_type}
                  onChange={this._handleInputChange}
                />
              </div>
              <button style={styles.continueBtn} onClick={this._handleAddBodyPart}>Submit</button>
            </div>)}
      </div>
    );
  }

  _renderChangePassword = () => {
    return (
      <div style={styles.editPwdContainer}>
        <div style={styles.changePwdLeft}>
          <div style={styles.settingsTitleContainer}>
            <div>Change</div>
            <div>Password</div>
          </div>
          <button style={{position: 'absolute', left: '25%', top: '60%', ...styles.continueBtn}} onClick={this._handleChangePassword}>Submit</button>
        </div>
        <div style={styles.formContainer}>
          <div style={{...styles.txtInputContainer}}>
            <img src={KeyIcon} style={{height: 24, margin: 'auto' }} />
            <input
              name="old_password"
              style={styles.txtInput}
              placeholder='Old Password'
              type="password"
              value={this.state.old_password}
              onChange={this._handleInputChange}
            />
          </div>
          <div style={{...styles.txtInputContainer, border: 'none'}}>
            <div style={{width: 24, height: 24, margin: 'auto' }} />
            <input
              name="new_password_1"
              style={{...styles.txtInput, borderBottom: `1px solid ${AppColors.blue}`}}
              placeholder='New Password'
              type="password"
              value={this.state.new_password_1}
              onChange={this._handleInputChange}
            />
          </div>
          <div style={{...styles.txtInputContainer, border: 'none'}}>
            <div style={{width: 24, height: 24, margin: 'auto' }} />
            <input
              name="new_password_2"
              style={{...styles.txtInput, borderBottom: `1px solid ${AppColors.blue}`}}
              placeholder='Re-enter New Password'
              type="password"
              value={this.state.new_password_2}
              onChange={this._handleInputChange}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { userInfo, windowWidth, logout } = this.props;
    const { screenType } = this.state;

    const showAccount = screenType == screenTypes.editAccount;
    const showPainPoints = screenType == screenTypes.editPainPoints;
    const showPassword = screenType == screenTypes.editPassword;

    return (
      <div style={styles.container}>
        <Navbar userInfo={userInfo} logout={logout}/>
        <div style={styles.configContainer}>
          <div style={styles.titleContainer}>
            <div style={styles.titleTxt}>Settings</div>
            <div style={{...styles.subtitleTxt, marginTop: 8}}>Modify your account here.</div>
          </div>
          <div style={styles.configContentContainer}>
            <button
              onClick={() => {this.setState({ screenType: screenTypes.editAccount })}}
              style={styles.configTitle(showAccount)}>
              <div style={styles.configTitleTxt}>Account</div>
              <div style={styles.configTitleTxt}>Settings</div>
            </button>
            <button
              onClick={() => {this.setState({ screenType: screenTypes.editPainPoints })}}
              style={styles.configTitle(showPainPoints)}>
              <div style={styles.configTitleTxt}>Edit</div>
              <div style={styles.configTitleTxt}>Pain Points</div>
            </button>
            <button
              onClick={() => {this.setState({ screenType: screenTypes.editPassword })}}
              style={styles.configTitle(showPassword)}>
              <div style={styles.configTitleTxt}>Change</div>
              <div style={styles.configTitleTxt}>Password</div>
            </button>
          </div>
        </div>
        <div style={styles.entriesContainer(windowWidth)}>
          {showAccount && this._renderEditAccount()}
          {showPainPoints && this._renderEditBodyParts()}
          {showPassword && this._renderChangePassword()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.users.userInfo,
  bodyParts: state.bodyParts.bodyParts
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWindowDimensions(Settings));