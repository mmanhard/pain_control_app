import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import validator from 'validator';

import styles from './style';
import actions from 'Actions';
import AppColors from 'Common/AppColors';
import RegistrationModal from 'Components/RegistrationModal';
import withWindowDimensions from 'Common/AppDimens';

import EmailIcon from 'Icons/icons8-email.png';
import KeyIcon from 'Icons/icons8-key.png';

const minPwdLength = 8;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      email_login: '',
      password_login: '',
      didRegister: false,
    };

    this.modalRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.loginSuccess) {
      this.props.history.replace('/dashboard');
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.loginSuccess) {
      if (this.state.didRegister) {
        this.props.history.replace('/onboarding');
      } else {
        this.props.history.replace('/dashboard');
      }
    }
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _handleRegister = (event) => {
    const { first_name, last_name, email, password } = this.state;

    event.preventDefault();

    if (!first_name) {
      alert('Please enter your first name!');
    } else if (!last_name) {
      alert('Please enter your last name!');
    } else if (!validator.isEmail(email)) {
      alert('Please enter a valid email address!');
    } else if (password.length < minPwdLength) {
      alert(`Password must be at least ${minPwdLength} characters long!`);
    } else {
      this.setState({ didRegister: true });

      const data = { first_name, last_name, email, password };
      this.props.register(data);
    }
  }

  _handleLogin = (event) => {
    const {email_login, password_login} = this.state;

    event.preventDefault();

    if (!validator.isEmail(email_login)) {
      alert('Please enter a valid email address!');
    } else if (password_login.length <= 0) {
      alert('Please enter your password!');
    } else {
      const data = { email: email_login, password: password_login };
      this.props.login(data);
    }
  }

  _open = () => {
    this.modalRef.current.open();
  }

  render() {
    const {isMobile, isSmallScreen} = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.contentContainer(isMobile, isSmallScreen)}>
          <div style={styles.titleContainer(isMobile)}>
            <p style={styles.titleTxt}>pain</p>
            <p style={styles.titleTxt}>control</p>
          </div>
          <div style={styles.formContainer(isMobile)}>
            <div style={styles.noLoginContainer}>
              <p style={{marginRight: 10 }}>Don't have an account?</p>
              <button style={styles.registerBtn} onClick={this._open}>Register</button>
            </div>
            <div style={styles.loginContainer}>
              <div style={styles.txtInputContainer}>
                <img src={EmailIcon} style={{height: 24, margin: 'auto'}} />
                <input
                  name="email_login"
                  style={styles.txtInput}
                  placeholder='Email'
                  type="text"
                  value={this.state.email_login}
                  onChange={this._handleInputChange}
                />
              </div>
              <div style={styles.txtInputContainer}>
                <img src={KeyIcon} style={{height: 24, margin: 'auto' }} />
                <input
                  name="password_login"
                  style={styles.txtInput}
                  placeholder='Password'
                  type="password"
                  value={this.state.password_login}
                  onChange={this._handleInputChange}
                />
              </div>
              <button style={styles.loginBtn} onClick={this._handleLogin}>Log In</button>
              <p style={{textDecoration: 'underline'}}>Forgot password?</p>
            </div>
          </div>
        </div>
        <RegistrationModal
          ref={this.modalRef}
          isMobile={isMobile}
          handleInputChange={this._handleInputChange}
          handleRegister={this._handleRegister}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loginSuccess: state.users.loginSuccess,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withWindowDimensions(Login)));