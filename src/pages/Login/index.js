import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import styles from './style';
import actions from 'Actions';
import AppColors from 'Common/AppColors';
import Icon from 'Icons/temp_ico.png';
import Modal from 'Components/Modal'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
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
    event.preventDefault();

    this.setState({ didRegister: true });
    this.props.register(this.state);
  }

  _handleLogin = (event) => {
    event.preventDefault();

    this.props.login(this.state);
  }

  _open = () => {
    this.modalRef.current.open();
    console.log('Called');
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.contentContainer}>
          <div style={{ marginLeft: 50, marginTop: 50}}>
            <p style={styles.titleTxt}>pain</p>
            <p style={styles.titleTxt}>control</p>
          </div>
          <div style={styles.formContainer}>
            <div style={styles.noLoginContainer}>
              <p style={{marginRight: 10 }}>Don't have an account?</p>
              <button style={styles.registerBtn} onClick={this._open}>Register</button>
            </div>
            <div style={styles.loginContainer}>
              <div style={styles.txtInputContainer}>
                <img src={Icon} style={{height: 24, margin: 'auto'}} />
                <input
                  name="email"
                  style={styles.txtInput}
                  placeholder='Email'
                  type="text"
                  value={this.state.email}
                  onChange={this._handleInputChange}
                />
              </div>
              <div style={styles.txtInputContainer}>
                <img src={Icon} style={{height: 24, margin: 'auto' }} />
                <input
                  name="password"
                  style={styles.txtInput}
                  placeholder='Password'
                  type="password"
                  value={this.state.password}
                  onChange={this._handleInputChange}
                />
              </div>
              <button style={styles.loginBtn} onClick={this._handleLogin}>Log In</button>
              <p style={{textDecoration: 'underline'}}>Forgot password?</p>
            </div>
          </div>
        </div>
        <Modal
          ref={this.modalRef}
          contentStyle={styles.formModalContainer}
        >
          <div style={styles.loginContainer}>
            <div style={styles.txtInputContainer}>
              <img src={Icon} style={{height: 24, margin: 'auto'}} />
              <input
                name="first_name"
                style={styles.txtInput}
                placeholder='First Name'
                type="text"
                value={this.state.first_name}
                onChange={this._handleInputChange}
              />
            </div>
            <div style={styles.txtInputContainer}>
              <img src={Icon} style={{height: 24, margin: 'auto'}} />
              <input
                name="last_name"
                style={styles.txtInput}
                placeholder='Last Name'
                type="text"
                value={this.state.last_name}
                onChange={this._handleInputChange}
              />
            </div>
            <div style={styles.txtInputContainer}>
              <img src={Icon} style={{height: 24, margin: 'auto'}} />
              <input
                name="email"
                style={styles.txtInput}
                placeholder='Email'
                type="text"
                value={this.state.email}
                onChange={this._handleInputChange}
              />
            </div>
            <div style={styles.txtInputContainer}>
              <img src={Icon} style={{height: 24, margin: 'auto' }} />
              <input
                name="password"
                style={styles.txtInput}
                placeholder='Password'
                type="password"
                value={this.state.password}
                onChange={this._handleInputChange}
              />
            </div>
            <button style={styles.loginBtn} onClick={this._handleRegister}>Register</button>
          </div>
        </Modal>
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
)(withRouter(Login));