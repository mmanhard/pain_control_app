import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import AppColors from 'Common/AppColors';
import AppStyles from 'Common/AppStyles';
import Button from 'Components/Button';

import XIcon from 'Icons/icons8-x.png';



class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    }
  }

  open = () => {
    this.setState({ modalIsOpen: true });
  }

  close = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { children, contentStyle } = this.props;
    const { modalIsOpen } = this.state;
    let subtitle;


    return (
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={this.close}
        style={{ overlay: {backgroundColor: 'rgba(0, 0, 0, 0.6)'}, content: contentStyle }}>
        <Button btnStyles={btnStyles} onClick={this.close}><img src={XIcon} style={{height: 20, margin: 'auto' }} /></Button>
        {children}
      </ReactModal>
    );
  }
}

export default Modal;

const btnStyles = {
  addStyles: {
    zIndex: 1,
    ...AppStyles.closeBtn
  },
  ...AppStyles.activeBtn
}