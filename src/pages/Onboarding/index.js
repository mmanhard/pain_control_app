import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import DatePicker from "react-datepicker";

import styles from './style';
import actions from 'Actions';
import Utils from 'Utils';

import BackIcon from 'Icons/icons8-back.png';
import PhoneIcon from 'Icons/icons8-phone.png';
import BirthdayIcon from 'Icons/icons8-birthday.png';
import HomeIcon from 'Icons/icons8-home.png';

const lr = ['L', 'R'];
const ul = ['Up', 'Lo'];

const maxBodyPartNameLength = 12;

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

class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      birthday: '',
      hometown: '',
      medicalHistory: '',
      screenType: screenTypes.addInfo,
      selectOtherBodyParts: false,
      otherBodyParts: []
    };

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
    let input = target.value .replace(/\D/g, '');
    input = input.substring(0, 8);
    const monthInput = input.substring(0, 2);
    const dayInput = input.substring(2, 4);
    const yearInput = input.substring(4, 8);

    let output;
    if (monthInput) {
      output = Utils.formatMonthInput(monthInput);
    }
    if (dayInput) {
      output = output.concat(`/${Utils.formatDayInput(dayInput)}`);
    }
    if (yearInput) {
      output = output.concat(`/${Utils.formatYearInput(yearInput)}`);
    }

    this.setState({ birthday: output });
  };

  _handleSubmitInfo = (event) => {
    event.preventDefault();

    let userUpdates = {};
    if (this.state.phone.length > 0) userUpdates.phone = this.state.phone;
    if (this.state.birthday.length > 0) userUpdates.birthday = this.state.birthday;
    if (this.state.hometown.length > 0) userUpdates.hometown = this.state.hometown;
    this.props.updateUser(this.props.userInfo, userUpdates);

    this._switchScreen();
  }

  _handleSubmitBodyParts = (event) => {
    const { otherBodyParts } = this.state;
    event.preventDefault();

    let bodyPart;
    for (bodyPart of defaultBodyParts) {
      const { name, type, locations } = bodyPart;
      const { selected, locations: selectedLocations } = this.state[bodyPart.name];

      if (selected) {
        const data = { name, type };

        // If body part has possible locations, check that some are added and send request.
        if (locations) {
          if (selectedLocations.length > 0) {
            let loc;
            for (loc of selectedLocations) {
              const data = { name, type, location: loc };
              this.props.addBodyPart(this.props.userInfo, data);
            }
          } else {
            alert(`Need to add locations for ${name}!`);
            return;
          }
        } else {
          const data = { name, type }
          this.props.addBodyPart(this.props.userInfo, data);
        }
      }
    }

    for (bodyPart of otherBodyParts) {
      const { name, type } = bodyPart;
      const data = { name, type }
      this.props.addBodyPart(this.props.userInfo, data);
    }

    this._switchScreen();
  }

  _handleAddOther = () => {
    const { selectOtherBodyParts, otherBodyParts } = this.state;
    if (!selectOtherBodyParts) {
      this.setState( { selectOtherBodyParts: true })
    }
    if (otherBodyParts.length >= 3) {
      alert('Can\'t add any more. Don\'t worry! You can always add more later.');
      return;
    }
    const newBodyPart = { name: '', type: 'Other'};
    otherBodyParts.push(newBodyPart);
    this.setState( { otherBodyParts } );
  }

  _handleOtherChange = (event, i) => {
    const target = event.target;
    if (target.value.length <= maxBodyPartNameLength) {
      const { otherBodyParts } = this.state;
      otherBodyParts[i].name = target.value;
      this.setState({ otherBodyParts });
    }
  }

  _handleRemoveOther = (i) => {
    const { otherBodyParts } = this.state;
    otherBodyParts.splice(i, 1);
    this.setState({ otherBodyParts });
    if (otherBodyParts.length <= 0) {
      this.setState({ selectOtherBodyParts: false });
    }
  }

  _handleSubmitNotes = (event) => {
    event.preventDefault();

    if (this.state.medicalHistory.length > 0) {
      this.props.updateUser(this.props.userInfo, { medical_history: this.state.medicalHistory });
    }

    this._switchScreen();
  }

  _switchScreen = (backward = false) => {
    switch (this.state.screenType) {
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
          this.props.history.replace('/dashboard');
        }
        break;
    }
  }

  _renderAddInfo = () => {
    return (
      <div style={styles.contentContainer}>
        <div style={styles.infoContainer}>
          <div style={{...styles.txtInputContainer, marginTop: 40 }}>
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
              placeholder='--/--/--'
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
          <button style={styles.continueBtn} onClick={this._handleSubmitInfo}>Continue</button>
          <button style={styles.skipBtn} onClick={() => { this._switchScreen() }}>Skip</button>
        </div>
      </div>
    );
  }

  _selectBodyPart = (part) => {
    const oldPartState = this.state[part.name];
    this.setState({ [part.name]: { ...oldPartState, selected: !oldPartState.selected }});
  }

  _selectBodyPartLocation = (part, loc) => {
    const oldPartState = this.state[part.name];
    let locations = oldPartState.locations;
    const index = locations.indexOf(loc);
    if (index === -1) {
      locations.push(loc);
    } else {
      locations.splice(index, 1);
    }
    this.setState({ [part.name]: { ...oldPartState, locations: locations }});
  }

  _renderPartsRow = (parts, offset = 0, addPartButton = false) => {
    const { selectOtherBodyParts } = this.state;
    return (
      <div style={styles.partsContainer(offset)}>
        {parts.map((part) => {
          const selected = this.state[part.name].selected
          return (
            <div key={part.name} style={styles.partContainer}>
              <button
                style={styles.partButton(selected)}
                onClick={() => this._selectBodyPart(part)}
                >
                {part.name}
              </button>

              <div>
                {selected && part.locations
                  ? part.locations.map((loc) => {
                    const selected = this.state[part.name].locations.indexOf(loc) !== -1;
                    return (
                      <button
                        key={`${loc} ${part.name}`}
                        style={styles.locButton(selected)}
                        onClick={() => this._selectBodyPartLocation(part, loc)}
                        >
                        {loc}
                      </button>
                    );
                  })
                  : <div style={{ height: 32 }}></div>}
              </div>

            </div>);
        })}
        {addPartButton && <div style={styles.partContainer}>
          <button
            style={styles.partButton(selectOtherBodyParts)}
            onClick={this._handleAddOther}
            >
            {selectOtherBodyParts ? 'Add More' : 'Other'}
          </button>
        </div>}
      </div>
    );
  }

  _renderAddParts = () => {
    const { selectOtherBodyParts, otherBodyParts } = this.state;
    return (
      <div style={styles.contentContainer}>
        <button style={styles.backBtn} onClick={() => { this._switchScreen(true) }}><img src={BackIcon} style={{height: 32, margin: 'auto' }} /></button>
        <div style={{ ...styles.infoContainer}}>
          {this._renderPartsRow(defaultUpperJoints, 30)}
          {this._renderPartsRow(defaultLowerJoints, -30)}
          {this._renderPartsRow(defaultRegions, 30, true)}
          {selectOtherBodyParts && <div style={styles.addMoreContainer}>
            {otherBodyParts.map((part, i) => {
              return (
                <div key={`otherPart${i}`} style={styles.otherPartContainer}>
                  <input
                    name={`otherPart${i}`}
                    style={{ ...styles.txtInput, textAlign: 'center', width: '80%' }}
                    placeholder='Add Here'
                    type="text"
                    value={part.name}
                    onChange={(event) => this._handleOtherChange(event, i)}
                  />
                  <button style={styles.removePartBtn} onClick={() => {this._handleRemoveOther(i)}}><span>x</span></button>
                </div>
              );
            })}
          </div>}
          <button style={styles.continueBtn} onClick={this._handleSubmitBodyParts}>Continue</button>
          <button style={styles.skipBtn} onClick={() => { this._switchScreen() }}>Skip</button>
        </div>
      </div>
    );
  }

  _renderAddNotes = () => {
    return (
      <div style={styles.contentContainer}>
        <button style={styles.backBtn} onClick={() => { this._switchScreen(true) }}><img src={BackIcon} style={{height: 32}} /></button>
        <div style={styles.infoContainer}>
          <textarea rows="14" cols="65" maxLength="500"
            name="medicalHistory"
            placeholder={'Please enter your medical history here!'}
            style={styles.medHistoryInput}
            onChange={this._handleInputChange} />
          <p style={styles.counterText}>{this.state.medicalHistory.length}/500</p>
          <button style={styles.continueBtn} onClick={this._handleSubmitNotes}>Finish!</button>
          <button style={styles.skipBtn} onClick={() => { this._switchScreen() }}>Skip</button>
        </div>
      </div>
    );
  }

  render() {
    const { screenType } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.titleContainer}>
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
)(withRouter(Onboarding));