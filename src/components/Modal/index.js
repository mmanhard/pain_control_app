import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import AppColors from 'Common/AppColors';
import AppStyles from 'Common/AppStyles';

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
        <button style={{ zIndex: 1, ...AppStyles.closeBtn}} onClick={this.close}><img src={XIcon} style={{height: 20, margin: 'auto' }} /></button>
        {children}
      </ReactModal>
    );
  }
}

export default Modal;