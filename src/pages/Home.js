import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import API from '../api';
import actions from '../actions';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      token: 'NO TOKEN'
    };
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    this.props.register(this.state);
  }

  render() {
    return (
      <div>
        <h2>HOME</h2>
        <h3>First Name: {this.props.userInfo?.first_name}</h3>
        <h3>Token: {this.props.token}</h3>
        <form onSubmit={this._handleSubmit}>
          <label>
            First Name:
            <input
              name="first_name"
              type="text"
              value={this.state.first_name}
              onChange={this._handleInputChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              name="last_name"
              type="text"
              value={this.state.last_name}
              onChange={this._handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this._handleInputChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this._handleInputChange}
            />
          </label>
          <br />
          <input type="submit" value="Register" />
        </form>
        <button onClick={() => {this.props.logout()}}>Log Out</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.users.userInfo,
  token: state.users.token
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)