import React from "react";

import styles from './style';
import Button from 'Components/Button';
import Modal from 'Components/Modal';

class ActionModal extends React.Component {
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

  _handleOK = () => {
    const { action } = this.props;

    if (action) this.props.action();

    this.close();
  }

  render() {
    const { children } = this.props;
    return (
      <Modal
        ref={this.modalRef}
        contentStyle={styles.container}>
        <div style={styles.contentContainer}>
          {children}
          <div style={styles.btnContainer}>
            <Button btnStyles={styles.okBtn} onClick={this._handleOK}>Yes</Button>
            <Button btnStyles={styles.cancelBtn} onClick={this.close}>No</Button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ActionModal;