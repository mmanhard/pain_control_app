import React from "react";

import styles from './style';
import AppColors from 'Common/AppColors';
import Icon from 'Icons/temp_ico.png';
import Modal from 'Components/Modal'

class RegistrationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.modalRef = React.createRef();
  }

  open = () => {
    this.modalRef.current.open();
  }

  close = () => {
    this.modalRef.current.close();
  }

  render() {
    const { handleInputChange, handleRegister } = this.props;
    return (
      <Modal
        ref={this.modalRef}
        contentStyle={styles.container}
      >
        <div style={styles.formContainer}>
          <div style={styles.txtInputContainer}>
            <img src={Icon} style={{height: 24, margin: 'auto'}} />
            <input
              name="first_name"
              style={styles.txtInput}
              placeholder='First Name'
              type="text"
              value={this.state.first_name}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </div>
          <button style={styles.registerBtn} onClick={handleRegister}>Register</button>
        </div>
      </Modal>
    )
  }
}

export default RegistrationModal;