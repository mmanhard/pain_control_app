import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import Icon from 'Icons/temp_ico.png';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    width                 : 400,
    height                : 600,
    transform             : 'translate(-50%, -50%)'
  }
};

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
      <div>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={this.close}
          style={{ overlay: {backgroundColor: 'rgba(0, 0, 0, 0.6)'}, content: {...contentStyle} }}
          contentLabel="Example Modal"
        >
          <button style={{position: 'relative', zIndex: 1, height: 36, width: 36}} onClick={this.close}>
            <img src={Icon} style={{height: 24, width: 24}} />
          </button>
          {children}
        </ReactModal>
      </div>
    );
  }
}

export default Modal;