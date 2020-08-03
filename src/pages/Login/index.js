import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import validator from 'validator';

import styles from './style';
import actions from 'Actions';
import AppColors from 'Common/AppColors';
import LoadingSpinner from 'Components/LoadingSpinner';
import RegistrationModal from 'Components/RegistrationModal';
import withWindowDimensions from 'Common/AppDimens';
import Button from 'Components/Button';

import EmailIcon from 'Icons/icons8-email.png';
import KeyIcon from 'Icons/icons8-key.png';

const minPwdLength = 8;
const flashDuration = 5000;
const shortScreenHt = 600;

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
      flashMessage: ''
    };

    // Create a reference to the registration modal.
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

    // Validate all fields prior to registration.
    if (!first_name) {
      this.modalRef.current.setFlashMessage(false, 'Please enter your first name!');
    } else if (!last_name) {
      this.modalRef.current.setFlashMessage(false, 'Please enter your last name!');
    } else if (!validator.isEmail(email)) {
      this.modalRef.current.setFlashMessage(false, 'Please enter a valid email address!');
    } else if (password.length < minPwdLength) {
      this.modalRef.current.setFlashMessage(false, `Password must be at least ${minPwdLength} characters long!`);
    } else {
      this.setState({ didRegister: true });

      const data = { first_name, last_name, email, password };
      this.props.register(data, this.modalRef.current.setFlashMessage);
    }
  }

  _handleLogin = (event) => {
    const {email_login, password_login} = this.state;

    event.preventDefault();

    // Validate all fields prior to logging in.
    if (!validator.isEmail(email_login)) {
      this._setFlashMessage(false, 'Please enter a valid email address!');
    } else if (password_login.length <= 0) {
      this._setFlashMessage(false, 'Please enter your password!');
    } else {
      const data = { email: email_login, password: password_login };
      this.props.login(data, this._loginCallback);
    }
  }

  _loginCallback = (success, message) => {
    if (success) {
      this.props.history.push({
        pathname: '/dashboard',
        state: { flashMessage: message }
      });
    } else {
      this._setFlashMessage(success, message);
    }
  }

  // Opens the registration modal.
  _open = () => {
    this.modalRef.current.open();
  }

  _setFlashMessage = (success, message) => {
    this.setState({flashMessage: message});
    setTimeout(() => this.setState({flashMessage: ''}), flashDuration)
  }

  _renderFlash = () => {
    const { isSmallScreen } = this.props;
    const { flashMessage } = this.state;

    return (
      <div style={styles.flashMessage(isSmallScreen)}>
        <div style={{margin: 10}}>{flashMessage}</div>
      </div>
    )
  }

  render() {
    const { isMobile, isSmallScreen, windowHeight, isAwaitingResp } = this.props;
    const { flashMessage } = this.state;
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
              <Button
                btnStyles={styles.registerBtn}
                onClick={this._open}>
                Register
              </Button>
            </div>

            {flashMessage && this._renderFlash()}

            <div style={styles.loginContainer(windowHeight < shortScreenHt, flashMessage)}>

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

              <Button
                btnStyles={styles.loginBtn}
                onClick={this._handleLogin}>
                Log In
              </Button>
              
            </div>

          </div>
        </div>

        {isAwaitingResp && <LoadingSpinner />}

        <RegistrationModal
          ref={this.modalRef}
          isMobile={isMobile}
          isSmallScreen={isSmallScreen}
          handleInputChange={this._handleInputChange}
          handleRegister={this._handleRegister}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAwaitingResp: state.users.isAwaitingResp,
  loginSuccess: state.users.loginSuccess,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withWindowDimensions(Login)));