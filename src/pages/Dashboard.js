import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      type: 'Joint'
    };
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _handleAddBodyPart = (event) => {
    event.preventDefault();

    this.props.addBodyPart({ name: this.state.name, type: this.state.type, id: this.props.userInfo.id });
  }

  _handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { userInfo, token } = this.props;
    return (
      <div>
        <h2>Dashboard</h2>
        <h3>Name: {`${userInfo?.first_name} ${userInfo?.last_name}`}</h3>
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
        <button onClick={() => this.props.getUserData({ id: this.props.userInfo.id })}>Get User Data</button>
        <button onClick={() => this.props.getBodyParts({ id: this.props.userInfo.id })}>Get Body Parts</button>
        <button onClick={this._handleLogout}>Log Out</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.users.userInfo,
  bodyParts: state.users.bodyParts,
  loginSuccess: state.users.loginSuccess
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);