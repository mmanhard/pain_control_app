import React from "react";

import styles from './style';
import Button from 'Components/Button';
import Modal from 'Components/Modal';

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
    const { contentStyle, children } = this.props;

    return (
      <Modal
        ref={this.modalRef}
        contentStyle={contentStyle || styles.container}>

        {children}

        <Button btnStyles={styles.okBtn} onClick={this.close}>OK</Button>

      </Modal>
    )
  }
}

export default HelpModal;