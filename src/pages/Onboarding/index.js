import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import styles from './style';
import actions from 'Actions';

import PhoneIcon from 'Icons/icons8-phone.png';
import BirthdayIcon from 'Icons/icons8-birthday.png';
import HomeIcon from 'Icons/icons8-home.png';

const lr = ['L', 'R'];
const ul = ['Up', 'Lo'];

const defaultBodyParts = [
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
    'name': 'Back',
    'locations': ul,
    'type': 'Region'
  }
];

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
      screenType: screenTypes.addInfo
    };

    let bodyPart;
    for (bodyPart of defaultBodyParts) {
      this.state[bodyPart.name] = null;
    }
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _handleSubmitInfo = (event) => {
    event.preventDefault();

    let userUpdates = {};
    if (this.state.phone.length > 0) userUpdates.phone = this.state.phone;
    if (this.state.birthday.length > 0) userUpdates.birthday = this.state.birthday;
    if (this.state.hometown.length > 0) userUpdates.hometown = this.state.hometown;
    this.props.updateUser(this.props.userInfo, userUpdates);

    this._switchScreen();
  }

  _handleSubmitNotes = (event) => {
    event.preventDefault();

    if (this.state.medicalHistory.length > 0) {
      this.props.updateUser(this.props.userInfo, { medical_history: this.state.medicalHistory });
    }

    this._switchScreen();
  }

  _handleSubmitBodyParts = (event) => {
    event.preventDefault();

    let bodyPart;
    for (bodyPart of defaultBodyParts) {
      if (this.state[bodyPart.name]) {
        const { name, type } = bodyPart;
        const data = { name, type, location: this.state[bodyPart.name]}
        this.props.addBodyPart(this.props.userInfo, data);
      }
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
          <div style={styles.txtInputContainer}>
            <img src={PhoneIcon} style={{height: 24, margin: 'auto' }} />
            <input
              name="phone"
              style={styles.txtInput}
              placeholder='Phone Number'
              type="text"
              value={this.state.phone}
              onChange={this._handleInputChange}
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
              onChange={this._handleInputChange}
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

  _renderAddParts = () => {
    return (
      <div style={styles.contentContainer}>
        <button style={styles.backBtn} onClick={() => { this._switchScreen(true) }}><span style={{marginBottom: 5, marginLeft: 1}}>x</span></button>
        <div style={styles.infoContainer}>
          {defaultBodyParts.map((part) => {
            return (<div key={part.name}>
              <h4>{part.name}</h4>
              {part.locations
              ? part.locations.map((loc) => {
                return (<div key={`${part}${loc}`}>
                  <input type="radio" name={part.name} value={loc} onChange={this._handleInputChange}/> {`${part.name}${loc}`}
                </div>);
              })
              : "goodbye"}
            </div>);
          })}
          <button style={styles.continueBtn} onClick={this._handleSubmitBodyParts}>Continue</button>
          <button style={styles.skipBtn} onClick={() => { this._switchScreen() }}>Skip</button>
        </div>
      </div>
    );
  }

  _renderAddNotes = () => {
    return (
      <div style={styles.contentContainer}>
        <button style={styles.backBtn} onClick={() => { this._switchScreen(true) }}><span style={{marginBottom: 5, marginLeft: 1}}>x</span></button>
        <div style={styles.infoContainer}>
          <textarea rows="8" cols="40" name="medicalHistory" style={styles.medHistoryInput} onChange={this._handleInputChange}></textarea>
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