import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import actions from '../actions';
import Navbar from '../components/Navbar';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      type: 'Joint'
    };
  }

  componentDidMount() {
    const { userInfo } = this.props;

    if (this.props.userUpdate) {
      this.props.getUserData(userInfo);
    }

    if (this.props.bodyPartUpdate) {
      this.props.getBodyParts(userInfo);
    }
  }

  componentDidUpdate(prevProps) {
    const { userInfo } = this.props;

    if (this.props.userUpdate) {
      this.props.getUserData(userInfo);
    }

    if (this.props.bodyPartUpdate) {
      this.props.getBodyParts(userInfo);
    }
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _handleAddBodyPart = (event) => {
    event.preventDefault();

    this.props.addBodyPart(this.props.userInfo, { name: this.state.name, type: this.state.type});
  }

  render() {
    const { userInfo, token, logout } = this.props;
    return (
      <div>
        <Navbar userInfo={userInfo} logout={logout}/>
        <h2>Dashboard</h2>
        <h3>User ID: {this.props.userInfo?.id}</h3>
        <h3>Name: {`${userInfo?.first_name} ${userInfo?.last_name}`}</h3>
        <h3>{userInfo?.email && `Email: ${userInfo?.email}`}</h3>
        <h3>{userInfo?.phone && `Phone Number: ${userInfo?.phone}`}</h3>
        <h3>{userInfo?.birthday && `Birthday: ${userInfo?.birthday}`}</h3>
        <h3>{userInfo?.hometown && `Hometown: ${userInfo?.hometown}`}</h3>
        <h3>{userInfo?.medical_history && `Medical History: ${userInfo?.medical_history}`}</h3>

        { this.props.bodyParts && <h3>Number of Body Parts: {this.props.bodyParts.length}</h3>}
        <form onSubmit={this._handleAddBodyPart}>
          <label>
            Joint Name:
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this._handleInputChange}
            />
          </label>
          <br />
          <label>
            Joint Type:
            <input
              name="type"
              type="text"
              value={this.state.type}
              onChange={this._handleInputChange}
            />
          </label>
          <br />
          <input type="submit" value="Add Body Part" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.users.userInfo,
  userUpdate: state.users.userUpdate,
  bodyPartUpdate: state.users.bodyPartUpdate,
  bodyParts: state.users.bodyParts,
  loginSuccess: state.users.loginSuccess
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));