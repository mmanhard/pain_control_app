import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import validator from 'validator';

import actions from 'Actions';
import { flashDuration } from 'Common/AppConst';
import withWindowDimensions from 'Common/AppDimens';
import BubbleList from 'Components/BubbleList';
import Button from 'Components/Button';
import styles from './style';
import Utils from 'Utils';

import BackIcon from 'Icons/icons8-back.png';
import PhoneIcon from 'Icons/icons8-phone.png';
import BirthdayIcon from 'Icons/icons8-birthday.png';
import HomeIcon from 'Icons/icons8-home.png';

const lr = ['L', 'R'];
const ul = ['Up', 'Lo'];

const maxBodyPartNameLength = 12;
const validBirthdayLength = 10;

const defaultUpperJoints = [
  {
    'name': 'Shoulder',
    'locations': lr,
    'type': 'Joint'
  },
  {
    'name': 'Elbow',
    'locations': lr,
    'type': 'Joint'
  },
  {
    'name': 'Wrist',
    'locations': lr,
    'type': 'Joint'
  },
  {
    'name': 'Hand',
    'locations': lr,
    'type': 'Joint'
  }
];

const defaultLowerJoints = [
  {
    'name': 'Hip',
    'locations': lr,
    'type': 'Joint'
  },
  {
    'name': 'Knee',
    'locations': lr,
    'type': 'Joint'
  },
  {
    'name': 'Ankle',
    'locations': lr,
    'type': 'Joint'
  },
  {
    'name': 'Foot',
    'locations': lr,
    'type': 'Region'
  }
];

const defaultRegions = [
  {
    'name': 'Neck',
    'type': 'Region'
  },
  {
    'name': 'Back',
    'locations': ul,
    'type': 'Region'
  },
  {
    'name': 'Head',
    'type': 'Region'
  },
];

const defaultBodyParts = [
  ...defaultUpperJoints,
  ...defaultLowerJoints,
  ...defaultRegions
]

const screenTypes = {
  addInfo: 'addInfo',
  addParts: 'addParts',
  addNotes: 'addNotes'
}

const completeMsg = 'You\'re all set! Welcome to Pain Control!';
const incompMsg = 'Welcome to Pain Control! You can add more details about yourself over in the settings page.';

class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      birthday: '',
      hometown: '',
      medicalHistory: '',
      screenType: screenTypes.addInfo,
      selectManualParts: false,
      manualParts: [],
      flashMessage: '',
      flashSuccess: false
    };

    // Create a state object for each default body part.
    let bodyPart;
    for (bodyPart of defaultBodyParts) {
      this.state[bodyPart.name] = {
        selected: false,
        locations: []
      };
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

  _handleSubmitInfo = (event) => {
    const { phone, birthday, hometown } = this.state;

    event.preventDefault();

    let userUpdates = {};

    // Validate the user's phone number and add it to updates if it has changed.
    if (phone && !validator.isMobilePhone(phone)) {
      this._setFlashMessage(false, 'Please enter a valid phone number!');
      return;
    } else if (phone.length > 0) {
      userUpdates.phone = phone;
    }

    // Validate the user's birthday and add it to updates if it has changed.
    if (birthday && birthday.length !== validBirthdayLength) {
      this._setFlashMessage(false, 'Please enter a valid date!');
      return;
    } else if (birthday.length > 0) {
      userUpdates.birthday = birthday;
    }

    if (this.state.hometown.length > 0) userUpdates.hometown = this.state.hometown;

    // Check that at least one field has been completed.
    if (Object.entries(userUpdates).length > 0) {
      this.props.updateUser(this.props.userInfo, userUpdates, this._submitCallback);
      this._switchScreen();
    } else {
      this._setFlashMessage(false, 'You must fill in at least one field!');
    }
  }

  _handleSubmitBodyParts = (event) => {
    const { manualParts } = this.state;

    event.preventDefault();

    // Loop through all default body parts.
    let bodyPart;
    let bodyPartData = [];
    for (bodyPart of defaultBodyParts) {
      const { name, type, locations } = bodyPart;
      const { selected, locations: selectedLocations } = this.state[bodyPart.name];

      if (selected) {
        const data = { name, type };

        // If body part has possible locations, check that some are added and
        // send request. If not, just send the request.
        if (locations) {
          if (selectedLocations.length > 0) {
            let loc;
            for (loc of selectedLocations) {
              const data = { name, type, location: loc };
              bodyPartData.push(data);

            }
          } else {
            this._setFlashMessage(false, `Need to add locations for ${name}!`);
            return;
          }
        } else {
          const data = { name, type }
          bodyPartData.push(data);
        }
      }
    }

    // Submit a request for all body parts the user manually input.
    for (bodyPart of manualParts) {
      const { name } = bodyPart;

      // Don't submit the body part if it's name is empty.
      if (name?.length > 0) {
        const data = { name, type };
        bodyPartData.push(data);
      }
    }

    let data;
    for (data of bodyPartData) {
      this.props.addBodyPart(this.props.userInfo, data);
    }

    this._switchScreen();
  }

  // Handler for adding body parts manually.
  _handleAddManualPart = () => {
    const { selectManualParts, manualParts } = this.state;

    if (!selectManualParts) {
      this.setState( { selectManualParts: true })
    }

    // Only allow 3 body parts to be added manually.
    if (manualParts.length >= 3) {
      this._setFlashMessage(false, 'Can\'t add any more pain points right now. Don\'t worry! You can always add more later.');
      return;
    }

    const newBodyPart = { name: '', type: 'Other'};
    manualParts.push(newBodyPart);
    this.setState( { manualParts } );
  }

  // Handler for changing body parts that were added manually.
  _handleManualPartChange = (event, i) => {
    const target = event.target;

    if (target.value.length <= maxBodyPartNameLength) {
      const { manualParts } = this.state;
      manualParts[i].name = target.value;
      this.setState({ manualParts });
    }
  }

  // Handler for deleting body parts that were added manually.
  _handleRemoveManualPart = (index) => {
    const { manualParts } = this.state;

    manualParts.splice(index, 1);
    this.setState({ manualParts });

    if (manualParts.length <= 0) {
      this.setState({ selectManualParts: false });
    }
  }

  _handleSubmitNotes = (event) => {
    event.preventDefault();

    if (this.state.medicalHistory.length > 0) {
      this.props.updateUser(this.props.userInfo,
        { medical_history: this.state.medicalHistory },
        this._submitCallback);
    }
  }

  _selectBodyPart = (part) => {
    const oldPartState = this.state[part.name];
    this.setState({ [part.name]: { ...oldPartState, selected: !oldPartState.selected }});
  }

  _selectBodyPartLocation = (part, loc) => {
    const oldPartState = this.state[part.name];

    let locations = oldPartState.locations;
    const index = locations.indexOf(loc);

    // If the location was not found in the the old list of locations, we add it.
    // If it was found, we remove it.
    if (index === -1) {
      locations.push(loc);
    } else {
      locations.splice(index, 1);
    }

    this.setState({ [part.name]: { ...oldPartState, locations: locations }});
  }

  // Callback used when submitting at each screenType.
  _submitCallback = (success, message) => {
    if (success) {
      this._switchScreen(false, false);
    } else {
      this._setFlashMessage(success, message);
    }
  }

  _switchScreen = (backward = false, skip = true) => {
    const { screenType } = this.state;

    switch (screenType) {

      case (screenTypes.addInfo):
        if (!backward) {
          this.setState({ screenType: screenTypes.addParts});
        }
        break;

      case (screenTypes.addParts):
        if (backward) {
          this.setState({ screenType: screenTypes.addInfo});
        } else {
          this.setState({ screenType: screenTypes.addNotes});
        }
        break;

      case (screenTypes.addNotes):
        if (backward) {
          this.setState({ screenType: screenTypes.addParts});
        } else {
          this.props.history.push({
            pathname: '/dashboard',
            state: { flashMessage: skip ? incompMsg : completeMsg }
          });
        }
        break;
    }
  }

  _renderTitle = () => {
    const { isMobile } = this.props;
    const { screenType } = this.state;

    return (
      <div style={styles.titleContainer(isMobile)}>

        {screenType === screenTypes.addInfo && (<div>
          <p style={styles.titleTxt}>Welcome to Pain Control, {this.props.userInfo?.first_name}!</p>
          <p style={styles.subtitleTxt}>Tell us a little more about yourself.</p>
          </div>
        )}

        {screenType === screenTypes.addParts && (<div>
          <p style={styles.titleTxt}>Where are your aches and pains?</p>
          <p style={styles.subtitleTxt}>We'll start to manage them right now.</p>
          </div>
        )}

        {screenType === screenTypes.addNotes && (<div>
          <p style={styles.titleTxt}>Almost done!</p>
          <p style={styles.subtitleTxt}>Let's get a brief summary of your medical history.</p>
          </div>
        )}

      </div>
    )
  }

  _renderAddInfo = () => {
    const { isMobile, isShortScreen } = this.props;

    return (
      <div style={styles.contentContainer(isMobile)}>
        <div style={styles.infoContainer}>

          {this._renderFlash()}

          <div style={{...styles.txtInputContainer(isShortScreen), marginTop: 40 }}>
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

          <div style={styles.txtInputContainer(isShortScreen)}>
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

          <div style={styles.txtInputContainer(isShortScreen)}>
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

          <Button
            btnStyles={styles.continueBtn}
            onClick={this._handleSubmitInfo}>
            Continue
          </Button>

          <Button
            btnStyles={styles.skipBtn}
            onClick={() => { this._switchScreen() }}>
            Skip
          </Button>

        </div>
      </div>
    );
  }

  // Renders a bubble item (to be used with BubbleList) for the given part. If
  // the part does not have a name, an add more parts button will be returned.
  _renderItem = (part) => {
    const { isMobile } = this.props;
    const { selectManualParts } = this.state;

    if (part.name) {
      const selected = this.state[part.name].selected;

      return (
        <div
          key={part.name}
          style={styles.partContainer}>

          <Button
            btnStyles={styles.partButton(isMobile, selected)}
            onClick={() => this._selectBodyPart(part)}>
            {part.name}
          </Button>

          <div>
            {selected && part.locations
              ? part.locations.map((loc) => {
                const selected = this.state[part.name].locations.indexOf(loc) !== -1;
                return (
                  <Button
                    key={`${loc} ${part.name}`}
                    btnStyles={styles.locButton(selected)}
                    onClick={() => this._selectBodyPartLocation(part, loc)}
                    >
                    {loc}
                  </Button>
                );
              })
              : <div style={{ height: 32 }}></div>}
          </div>

        </div>);
      } else {

        // Return a button to add more parts if part name does not exist.
        return (
          <div
            key={'addMoreBtn'}
            style={styles.partContainer}>
            <Button
              btnStyles={styles.partButton(isMobile, selectManualParts)}
              onClick={this._handleAddManualPart}
              >
              {selectManualParts ? 'Add More' : 'Other'}
            </Button>
          </div>
        );
      }
  }

  _renderAddParts = () => {
    const { isMobile } = this.props;
    const { selectManualParts, manualParts } = this.state;

    const bodyParts = [...defaultUpperJoints, ...defaultLowerJoints, ...defaultRegions, {}];

    return (
      <div style={styles.contentContainer(isMobile)}>

        <Button btnStyles={styles.backBtn} onClick={() => { this._switchScreen(true) }}>
          <img src={BackIcon} style={{height: 32, margin: 'auto' }} />
        </Button>

        <div style={{ ...styles.infoContainer}}>

          {this._renderFlash()}

          <BubbleList
              rowContainerStyle={styles.partsContainer}
              renderItem={this._renderItem}
              items={bodyParts}
              itemsPerRow={isMobile ? 3 : 4}
              offset={isMobile ? 16 : 32}
          />

          {selectManualParts && <div style={styles.addMoreContainer}>
            {manualParts.map((part, i) => {
              return (
                <div key={`otherPart${i}`} style={styles.otherPartContainer}>
                  <input
                    name={`otherPart${i}`}
                    style={{ ...styles.txtInput, textAlign: 'center', width: '80%' }}
                    placeholder='Add Here'
                    type="text"
                    value={part.name}
                    onChange={(event) => this._handleManualPartChange(event, i)}
                  />
                  <Button btnStyles={styles.removePartBtn} onClick={() => {this._handleRemoveManualPart(i)}}><span>x</span></Button>
                </div>
              );
            })}
          </div>}

          <Button
            btnStyles={styles.continueBtn}
            onClick={this._handleSubmitBodyParts}>
            Continue
          </Button>

          <Button
            btnStyles={styles.skipBtn}
            onClick={() => { this._switchScreen() }}>
            Skip
          </Button>

        </div>
      </div>
    );
  }

  _renderAddNotes = () => {
    const { isMobile } = this.props;
    return (
      <div style={styles.contentContainer(isMobile)}>

        <Button btnStyles={styles.backBtn} onClick={() => { this._switchScreen(true) }}><img src={BackIcon} style={{height: 32}} /></Button>

        <div style={styles.infoContainer}>

          {this._renderFlash()}

          <textarea rows="15" cols="65" maxLength="500"
            name="medicalHistory"
            placeholder={'Please enter your medical history here!'}
            style={styles.medHistoryInput}
            onChange={this._handleInputChange} />

          <p style={styles.counterText}>{this.state.medicalHistory.length}/500</p>

          <Button
            btnStyles={styles.continueBtn}
            onClick={this._handleSubmitNotes}>
            Finish!
          </Button>

          <Button
            btnStyles={styles.skipBtn}
            onClick={() => { this._switchScreen() }}>
            Skip
          </Button>

        </div>
      </div>
    );
  }

  _setFlashMessage = (success, message) => {
    this.setState({flashMessage: message, flashSuccess: success});
    setTimeout(() => this.setState({flashMessage: ''}), flashDuration);
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

  render() {
    const { screenType } = this.state;
    return (
      <div style={styles.container}>
        {this._renderTitle()}
        {screenType === screenTypes.addInfo && this._renderAddInfo()}
        {screenType === screenTypes.addParts && this._renderAddParts()}
        {screenType === screenTypes.addNotes && this._renderAddNotes()}
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
)(withRouter(withWindowDimensions(Onboarding)));