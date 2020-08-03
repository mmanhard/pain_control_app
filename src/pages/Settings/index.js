import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from 'validator';

import actions from 'Actions';
import { flashDuration } from 'Common/AppConst';
import AppColors from 'Common/AppColors';
import withWindowDimensions from 'Common/AppDimens';
import BubbleList from 'Components/BubbleList';
import Button from 'Components/Button';
import LoadingSpinner from 'Components/LoadingSpinner';
import Navbar from 'Components/Navbar';
import styles from './style';
import Utils from 'Utils';

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
};

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
      screenType: screenTypes.editAccount,
      flashMessage: '',
      flashSuccess: false
    };
  }

  componentDidUpdate(prevProps) {
    const { userInfo, bodyPartUpdate, userUpdate } = this.props;


    if (!prevProps.userUpdate && userUpdate) {
      this.props.getUserData(userInfo);
    }

    if (!prevProps.bodyPartUpdate && bodyPartUpdate) {
      this.props.getBodyParts(userInfo);
    }

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

    // Validate the user's first name and add it to updates if it has changed.
    if (!first_name) {
      this._setFlashMessage(false, 'Please enter a first name!');
      return;
    } else if (userInfo?.first_name !== first_name) {
      userUpdates.first_name = first_name;
    }

    // Validate the user's last name and add it to updates if it has changed.
    if (!last_name) {
      this._setFlashMessage(false, 'Please enter a first name!');
      return;
    } else if (userInfo?.last_name !== last_name) {
      userUpdates.last_name = last_name;
    }

    // Validate the user's phone number and add it to updates if it has changed.
    if (phone && !validator.isMobilePhone(phone)) {
      this._setFlashMessage(false, 'Please enter a valid phone number!');
      return;
    } else if (userInfo?.phone !== phone) {
      userUpdates.phone = phone;
    }

    // Validate the user's birthday and add it to updates if it has changed.
    if (birthday && birthday.length !== validBirthdayLength) {
      this._setFlashMessage(false, 'Please enter a valid date!');
      return;
    } else if (userInfo?.birthday !== birthday) {
      userUpdates.birthday = birthday;
    }

    // Add hometown to updates if it has changed.
    if (userInfo?.hometown !== hometown) {
      userUpdates.hometown = hometown;
    }

    this.props.updateUser(userInfo, userUpdates, this._setFlashMessage);
  }

  _handleEditBodyPart = () => {
    const { userInfo } = this.props;
    const { currentBodyPart: part, part_name, part_location, part_type } = this.state;

    // Validate the body part has changed and that the fields are valid. Then
    // make a request to edit it.
    if (part_name?.length <= 0) {
      this.setState({ part_name: part.name });
      this._setFlashMessage(false, 'You must enter a name for the pain point!');
    } else if (part_type?.length <= 0) {
      this.setState({ part_type: part.type });
      this._setFlashMessage(false, 'You must enter a type (e.g. joint) for the pain point!');
    } else if (part.name === part_name && part.location === part_location && part.type === part_type) {
      this._setFlashMessage(false, 'You haven\'t edited the pain point!');
    } else {
      const partUpdates = { name: part_name, location: part_location, type: part_type };
      this.props.editBodyPart(userInfo, part.id, partUpdates, this._setFlashMessage);
      this.setState({ currentBodyPart: null })
    }
  }

  _handleAddBodyPart = () => {
    const { userInfo } = this.props;
    const { part_name, part_location, part_type } = this.state;

    // Validate the new body part's name and type. Then make a request to add it.
    if (part_name?.length <= 0) {
      this._setFlashMessage(false, 'You must enter a name for the pain point!');
    } else if (part_type?.length <= 0) {
      this._setFlashMessage(false, 'You must enter a type (e.g. joint) for the pain point!');
    } else {
      const partInfo = { name: part_name, location: part_location, type: part_type }
      this.props.addBodyPart(userInfo, partInfo, this._setFlashMessage);
    }
  }

  _handleChangePassword = () => {
    const { userInfo } = this.props;
    const { old_password, new_password_1, new_password_2 } = this.state;

    // Validate the old and new passwords. Then submit a request to change the
    // password.
    if (old_password.length <= 0) {
      this._setFlashMessage(false, 'Please type in your old password!');
    } else if (new_password_1.length <= 0) {
      this._setFlashMessage(false, 'Please type in your new password!');
    } else if (new_password_2.length <= 0) {
      this._setFlashMessage(false, 'Please re-type your new password!');
    } else if (new_password_1 != new_password_2) {
      this._setFlashMessage(false, 'New passwords do not match!');
    } else {
      const passwordUpdates = { old_password, new_password: new_password_1 };
      this.props.changePassword(userInfo, passwordUpdates, this._setFlashMessage);
    }
  }

  _setFlashMessage = (success, message) => {
    this.setState({flashMessage: message, flashSuccess: success});
    setTimeout(() => this.setState({flashMessage: ''}), flashDuration)
  }

  _renderFlash = () => {
    const { isSmallScreen } = this.props;
    const { flashMessage, flashSuccess } = this.state;

    return (
      <div style={styles.flashMessage(isSmallScreen, flashMessage, flashSuccess)}>
        <div style={{margin: 10, textAlign: 'center'}}>{flashMessage}</div>
      </div>
    );

  }

  _renderEditAccount = () => {
    const { userInfo, isSmallScreen, isMediumScreen } = this.props;

    const title = this._renderSettingsTitle(['Account', 'Settings']);

    return (
      <div style={{...styles.editInfoContainer(isMediumScreen), ...styles.mainContainer(isSmallScreen)}}>

        <div style={{...styles.editAccountLeft, order: isMediumScreen ? 3 : 1}}>
          {!isMediumScreen && title}
          {!isMediumScreen && this._renderFlash()}
          <div style={{marginTop: isMediumScreen ? 0 : 20, marginBottom: 20}}>
            <Button
              btnStyles={styles.continueBtn}
              onClick={this._handleEditAccount}>
              Submit
            </Button>
          </div>
        </div>

        {isMediumScreen && !isSmallScreen && title}

        {isMediumScreen && this._renderFlash()}

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

  // Renders a bubble button (to be used with BubbleList) for the given part. If
  // the part does not have a name, an add more parts button will be returned.
  _renderPart = (part) => {
    const { isSmallScreen, bodyParts } = this.props;
    const { currentBodyPart, addMoreParts } = this.state;

    if (part.name) {
      const selected = currentBodyPart && currentBodyPart.id == part.id;
      const displayName = part.location ? `${part.location} ${part.name}` : part.name;

      return (
        <Button
          key={part.id}
          onClick={() => { this.setState({ currentBodyPart: part, addMoreParts: false, part_name: part.name, part_location: part.location, part_type: part.type })}}
          btnStyles={styles.partContainer(isSmallScreen, selected)}>
          <div>{displayName}</div>
          <div style={styles.editTxt}>Edit</div>
        </Button>
      );
    } else {
      const noParts = bodyParts?.length <= 0;

      // Return a button to add more parts if part name does not exist.
      return (
        <Button
          key='addMoreBtn'
          btnStyles={styles.addMorePartsBtn(addMoreParts, noParts)}
          onClick={() => {this.setState({ currentBodyPart: null, addMoreParts: true, part_name: '', part_location: '', part_type: '' })}}>
            {noParts ? 'Add a Pain Point' : 'Add More'}
        </Button>
      );
    }
  }

  _renderEditBodyParts = () => {
    const { bodyParts, isMobile, isSmallScreen } = this.props;
    const { currentBodyPart: part, addMoreParts } = this.state;

    // Include an empty object with the list of parts to include an add more
    // button in the list.
    const listParts = [...bodyParts, {}];

    return (
      <div style={{...styles.editPartsContainer, ...styles.mainContainer(isSmallScreen)}}>

        {!isSmallScreen && <div style={{width: '100%'}}>
          {this._renderSettingsTitle(['Edit', 'Pain Points'])}
        </div>}

        {this._renderFlash()}

        <BubbleList
            contentContainerStyle={styles.bodyPartsContainer(isSmallScreen)}
            rowContainerStyle={styles.partsContainer}
            renderItem={this._renderPart}
            items={listParts}
            itemsPerRow={isMobile ? 2 : 3}
            offset={30}
        />

        {(part || addMoreParts) && (<div style={styles.partDetailsContainer}>

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

            <Button
              btnStyles={styles.continueBtn}
              onClick={part ? this._handleEditBodyPart : this._handleAddBodyPart}>
              Submit
            </Button>

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
          {!isMediumScreen && this._renderFlash()}
          <div style={{marginTop: isMediumScreen ? 0 : 20, marginBottom: 20}}>
            <Button btnStyles={styles.continueBtn} onClick={this._handleChangePassword}>Submit</Button>
          </div>
        </div>

        {isMediumScreen && !isSmallScreen && title}

        {isMediumScreen && this._renderFlash()}

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

  _renderConfigContainer = (showAccount, showPainPoints, showPassword) => {
    const { isSmallScreen } = this.props;

    return (
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
    )
  }

  render() {
    const { userInfo, windowWidth, isAwaitingResp, logout, isSmallScreen } = this.props;
    const { screenType } = this.state;

    const showAccount = screenType == screenTypes.editAccount;
    const showPainPoints = screenType == screenTypes.editPainPoints;
    const showPassword = screenType == screenTypes.editPassword;

    return (
      <div style={styles.container(isSmallScreen)}>

        <Navbar userInfo={userInfo} logout={logout}/>

        <div style={styles.contentContainer(isSmallScreen)}>

          {this._renderConfigContainer(showAccount, showPainPoints, showPassword)}

          {showAccount && this._renderEditAccount()}
          {showPainPoints && this._renderEditBodyParts()}
          {showPassword && this._renderChangePassword()}

          {isAwaitingResp && <LoadingSpinner />}

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const isAwaitingResp = state.users.isAwaitingResp || state.bodyParts.isAwaitingResp;
  return {
    isAwaitingResp,
    userInfo: state.users.userInfo,
    userUpdate: state.users.userUpdate,
    bodyParts: state.bodyParts.bodyParts,
    bodyPartUpdate: state.bodyParts.bodyPartUpdate
  }
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWindowDimensions(Settings));