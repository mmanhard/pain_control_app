import React from "react";

import styles from './style';
import Modal from 'Components/Modal'

class HelpModal extends React.Component {
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
    const { handleInputChange, handleRegister, children } = this.props;
    return (
      <Modal
        ref={this.modalRef}
        contentStyle={styles.container}
      >
        <div style={styles.formContainer}>
          {children}
          <button style={styles.registerBtn} onClick={close}>OK</button>
        </div>
      </Modal>
    )
  }
}

export default HelpModal;