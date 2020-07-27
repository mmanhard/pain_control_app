import React from "react";

import styles from './style';
import AppColors from 'Common/AppColors';
import Modal from 'Components/Modal';
import Button from 'Components/Button';

import NameIcon from 'Icons/icons8-name.png';
import EmailIcon from 'Icons/icons8-email.png';
import KeyIcon from 'Icons/icons8-key.png';

import Icon from 'Icons/temp_ico.png';

const flashDuration = 5000;

class RegistrationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flashMessage: ''
    };

    this.modalRef = React.createRef();
  }

  open = () => {
    this.modalRef.current.open();
  }

  close = () => {
    this.modalRef.current.close();
  }

  setFlashMessage = (errMsg) => {
    this.setState({flashMessage: errMsg});
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
    const { handleInputChange, handleRegister, isMobile } = this.props;
    const { flashMessage } = this.state;
    return (
      <Modal
        ref={this.modalRef}
        contentStyle={styles.container(isMobile)}>

        {flashMessage && this._renderFlash()}

        <div style={styles.formContainer(flashMessage)}>
          <div style={styles.txtInputContainer}>
            <img src={NameIcon} style={{width: 24, height: 24, margin: 'auto'}} />
            <input
              name="first_name"
              style={styles.txtInput}
              placeholder='First Name'
              type="text"
              value={this.state.first_name}
              onChange={handleInputChange}
            />
            <input
              name="last_name"
              style={styles.txtInput}
              placeholder='Last Name'
              type="text"
              value={this.state.last_name}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.txtInputContainer}>
            <img src={EmailIcon} style={{height: 24, margin: 'auto'}} />
            <input
              name="email"
              style={styles.txtInput}
              placeholder='Email'
              type="text"
              value={this.state.email}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.txtInputContainer}>
            <img src={KeyIcon} style={{height: 24, margin: 'auto' }} />
            <input
              name="password"
              style={styles.txtInput}
              placeholder='Password'
              type="password"
              value={this.state.password}
              onChange={handleInputChange}
            />
          </div>
          <Button btnStyles={styles.registerBtn} onClick={handleRegister}>Register</Button>
        </div>
      </Modal>
    )
  }
}

export default RegistrationModal;