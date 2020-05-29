import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import actions from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    if (this.props.loginSuccess) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.loginSuccess) {
      this.props.history.push('/dashboard');
    }
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _handleRegister = (event) => {
    event.preventDefault();

    this.props.register(this.state);
  }

  _handleLogin = (event) => {
    event.preventDefault();

    this.props.login(this.state);
  }

  render() {
    return (
      <div>
        <h2>Register / Login</h2>
        <form onSubmit={this._handleRegister}>
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
        <button onClick={this._handleLogin}>Log In</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.users.userInfo,
  loginSuccess: state.users.loginSuccess
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));