import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import actions from '../actions';

class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      birthday: '',
      hometown: '',
      medicalHistory: ''
    };
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    let userUpdates = {};
    if (this.state.phone.length > 0) userUpdates.phone = this.state.phone;
    if (this.state.birthday.length > 0) userUpdates.birthday = this.state.birthday;
    if (this.state.hometown.length > 0) userUpdates.hometown = this.state.hometown;
    if (this.state.medicalHistory.length > 0) userUpdates.medical_history = this.state.medicalHistory;
    this.props.updateUser(this.props.userInfo, userUpdates);
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
        <form onSubmit={this._handleSubmit}>
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
          <input type="submit" value="Submit" />
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