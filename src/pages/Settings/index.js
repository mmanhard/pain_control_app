import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from 'validator';

import actions from 'Actions';
import Navbar from 'Components/Navbar';
import styles from './style';
import withWindowDimensions from 'Common/AppDimens';
import Utils from 'Utils';
import AppColors from 'Common/AppColors';
import BubbleList from 'Components/BubbleList';
import Button from 'Components/Button';

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

const validBirthdayLength = 10;

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
      first_name: props?.userInfo ? props.userInfo.first_name : '',
      last_name: props?.userInfo ? props.userInfo.last_name : '',
      phone: Utils.formatPhoneInput(props?.userInfo?.phone),
      birthday: Utils.formatDateInput(props?.userInfo?.birthday),
      hometown: props?.userInfo ? props.userInfo.hometown : '',
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

    if (!first_name) {
      alert('Please enter a first name!')
    } else if (userInfo?.first_name !== first_name) {
      userUpdates.first_name = first_name;
    }

    if (!last_name) {
      alert('Please enter a first name!')
    } else if (userInfo?.last_name !== last_name) {
      userUpdates.last_name = last_name;
    }

    if (phone && !validator.isMobilePhone(phone)) {
      alert('Please enter a valid phone number!')
    } else if (userInfo?.phone !== phone) {
      userUpdates.phone = phone;
    }

    if (birthday && birthday.length !== validBirthdayLength) {
      alert('Please enter a valid date!')
    } else if (userInfo?.birthday !== birthday) {
      userUpdates.birthday = birthday;
    }


    if (userInfo?.hometown !== hometown) {
      userUpdates.hometown = hometown;
    }

    console.log(userUpdates);
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
    const { userInfo, isSmallScreen, isMediumScreen } = this.props;

    const title = this._renderSettingsTitle(['Account', 'Settings']);

    return (
      <div style={{...styles.editInfoContainer(isMediumScreen), ...styles.mainContainer(isSmallScreen)}}>
        <div style={{...styles.editAccountLeft, order: isMediumScreen ? 3 : 1}}>
          {!isMediumScreen && title}
          <div style={{marginTop: isMediumScreen ? 0 : 72, marginBottom: 20}}>
            <Button btnStyles={styles.continueBtn} onClick={this._handleEditAccount}>Submit</Button>
          </div>
        </div>
        {isMediumScreen && !isSmallScreen && title}
        <div style={{...styles.formContainer, order: 2}}>
          <div style={styles.txtInputContainer}>
            <img src={NameIcon} style={{height: 24, margin: 'auto'}} />
            <input
              name="first_name"
              style={styles.txtInput}
              placeholder='First Name'
              type="text"
              value={this.state.first_name}
              onChange={this._handleInputChange}
            />
            <input
              name="last_name"
              style={styles.txtInput}
              placeholder='Last Name'
              type="text"
              value={this.state.last_name}
              onChange={this._handleInputChange}
            />
          </div>
          <div style={styles.txtInputContainer}>
            <img src={PhoneIcon} style={{height: 24, margin: 'auto' }} />
            <input
              name="phone"
              style={styles.txtInput}
              placeholder='Phone Number'
              type="text"
              value={this.state.phone}
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
              value={this.state.birthday}
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
              value={this.state.hometown}
              onChange={this._handleInputChange}
            />
          </div>
        </div>
      </div>
    );
  }

  _renderPart = (part) => {
    const { isSmallScreen } = this.props;
    const { currentBodyPart, addMoreParts } = this.state;
    if (part.name) {
      const selected = currentBodyPart && currentBodyPart.id == part.id;
      const displayName = part.location ? `${part.location} ${part.name}` : part.name;
      return (
        <Button
          key={part.id}
          onClick={() => { this.setState({ currentBodyPart: part, addMoreParts: false, part_name: '', part_location: '', part_type: '' })}}
          btnStyles={styles.partContainer(isSmallScreen, selected)}>
          <div>{displayName}</div>
          <div style={styles.editTxt}>Edit</div>
        </Button>
      );
    } else {
      return (
        <Button
          key='addMoreBtn'
          btnStyles={styles.addMorePartsBtn(addMoreParts)}
          onClick={() => {this.setState({ currentBodyPart: null, addMoreParts: true, part_name: '', part_location: '', part_type: '' })}}>
            Add More
        </Button>
      );
    }
  }

  _renderEditBodyParts = () => {
    const { bodyParts, isMobile, isSmallScreen } = this.props;
    const { currentBodyPart: part, addMoreParts } = this.state;

    return (
      <div style={{...styles.editPartsContainer, ...styles.mainContainer(isSmallScreen)}}>
        {!isSmallScreen && <div style={{width: '100%', height: 110}}>
          {this._renderSettingsTitle(['Edit', 'Pain Points'])}
        </div>}
        <BubbleList
            contentContainerStyle={styles.bodyPartsContainer(isSmallScreen)}
            rowContainerStyle={styles.partsContainer}
            renderItem={this._renderPart}
            items={[...bodyParts, {}]}
            itemsPerRow={isMobile ? 2 : 3}
            offset={30}
        />
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
            <Button btnStyles={styles.continueBtn} onClick={this._handleEditBodyPart}>Submit</Button>
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
              <Button btnStyles={styles.continueBtn} onClick={this._handleAddBodyPart}>Submit</Button>
            </div>)}
      </div>
    );
  }

  _renderChangePassword = () => {
    const { isSmallScreen, isMediumScreen } = this.props;

    const title = this._renderSettingsTitle(['Change', 'Password']);

    return (
      <div style={{...styles.editInfoContainer(isMediumScreen), ...styles.mainContainer(isSmallScreen)}}>
        <div style={{...styles.changePwdLeft, order: isMediumScreen ? 3 : 1}}>
          {!isMediumScreen && title}
          <div style={{marginTop: isMediumScreen ? 0 : 72, marginBottom: 20}}>
            <Button btnStyles={styles.continueBtn} onClick={this._handleChangePassword}>Submit</Button>
          </div>
        </div>
        {isMediumScreen && !isSmallScreen && title}
        <div style={{...styles.formContainer, order: 2}}>
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

  _renderSettingsTitle = (titleLines) => {
    return (
      <div style={styles.settingsTitleContainer}>
        <div>{titleLines[0]}</div>
        <div>{titleLines[1]}</div>
      </div>
    )
  }

  render() {
    const { userInfo, windowWidth, logout, isSmallScreen } = this.props;
    const { screenType } = this.state;

    const showAccount = screenType == screenTypes.editAccount;
    const showPainPoints = screenType == screenTypes.editPainPoints;
    const showPassword = screenType == screenTypes.editPassword;

    return (
      <div style={styles.container(isSmallScreen)}>
        <Navbar userInfo={userInfo} logout={logout}/>
        <div style={styles.contentContainer(isSmallScreen)}>
          <div style={styles.configContainer(isSmallScreen)}>
            <div style={styles.titleContainer(isSmallScreen)}>
              <div style={styles.titleTxt}>Settings</div>
              <div style={{...styles.subtitleTxt, marginTop: 8}}>Modify your account here.</div>
            </div>
            <div style={styles.configContentContainer(isSmallScreen)}>
              <Button
                onClick={() => {this.setState({ screenType: screenTypes.editAccount })}}
                btnStyles={styles.configTitle(isSmallScreen, showAccount)}>
                <div style={styles.configTitleTxt(isSmallScreen)}>Account</div>
                <div style={styles.configTitleTxt(isSmallScreen)}>Settings</div>
              </Button>
              <Button
                onClick={() => {this.setState({ screenType: screenTypes.editPainPoints })}}
                btnStyles={styles.configTitle(isSmallScreen, showPainPoints)}>
                <div style={styles.configTitleTxt(isSmallScreen)}>Edit</div>
                <div style={styles.configTitleTxt(isSmallScreen)}>Pain Points</div>
              </Button>
              <Button
                onClick={() => {this.setState({ screenType: screenTypes.editPassword })}}
                btnStyles={styles.configTitle(isSmallScreen, showPassword)}>
                <div style={styles.configTitleTxt(isSmallScreen)}>Change</div>
                <div style={styles.configTitleTxt(isSmallScreen)}>Password</div>
              </Button>
            </div>
          </div>

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