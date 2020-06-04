import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import actions from '../actions';

const lrb = ['Left', 'Right', 'Both'];
const ulb = ['Upper', 'Lower', 'Both'];

const defaultBodyParts = [
  {
    'name': 'Shoulder',
    'locations': lrb,
    'type': 'Joint'
  },
  {
    'name': 'Elbow',
    'locations': lrb,
    'type': 'Joint'
  },
  {
    'name': 'Wrist',
    'locations': lrb,
    'type': 'Joint'
  },
  {
    'name': 'Back',
    'locations': ulb,
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

  render() {
    const { screenType } = this.state;
    return (
      <div>
        <h2>Onboarding</h2>
        <h3>User ID: {this.props.userInfo?.id}</h3>
        {screenType === screenTypes.addInfo && <form onSubmit={this._handleSubmitInfo}>
          <label>
            Phone Number:
            <input
              name="phone"
              type="text"
              value={this.state.phone}
              onChange={this._handleInputChange}
            />
          </label>
          <br />
          <label>
            Birthday:
            <input
              name="birthday"
              type="text"
              value={this.state.birthday}
              onChange={this._handleInputChange}
            />
          </label>
          <br />
          <label>
            Hometown:
            <input
              name="hometown"
              type="text"
              value={this.state.hometown}
              onChange={this._handleInputChange}
            />
          </label>
          <br />
          <input type="submit" value="Submit Add'l Info" />
        </form>}

        {screenType === screenTypes.addParts && <form onSubmit={this._handleSubmitBodyParts}>
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
          <input type="submit" value="Submit Parts" />
        </form>}

        {screenType === screenTypes.addNotes && <form onSubmit={this._handleSubmitNotes}>
          <textarea rows="4" cols="50" name="medicalHistory" onChange={this._handleInputChange}></textarea>
          <input type="submit" value="Submit Notes" />
        </form>}

        <button onClick={() => { this._switchScreen(true) }}>Go Back</button>
        <button onClick={() => { this._switchScreen() }}>Skip</button>
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