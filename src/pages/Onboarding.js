import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import actions from '../actions';

const lrb = ['left', 'right', 'both'];
const ulb = ['upper', 'lower', 'both'];

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
]

class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      birthday: '',
      hometown: '',
      medicalHistory: ''
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
    if (this.state.medicalHistory.length > 0) userUpdates.medical_history = this.state.medicalHistory;
    this.props.updateUser(this.props.userInfo, userUpdates);
    this._onNext();
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
    this._onNext();
  }

  _onNext = () => {
    this.props.history.replace('/dashboard');
  }

  render() {
    return (
      <div>
        <h2>Onboarding</h2>
        <h3>User ID: {this.props.userInfo?.id}</h3>
        <form onSubmit={this._handleSubmitInfo}>
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
          <label>
            Medical History:
            <input
              name="medicalHistory"
              type="text"
              value={this.state.medicalHistory}
              onChange={this._handleInputChange}
            />
          </label>
          <br />
          <input type="submit" value="Submit Add'l Info" />
        </form>

        <form onSubmit={this._handleSubmitBodyParts}>
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
        </form>

        <button onClick={this._onNext}>Skip</button>
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