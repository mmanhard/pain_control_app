import Radium from 'radium';
import React from 'react';

class Button extends React.Component {

  render() {
    const { btnStyles, onClick } = this.props;
    const { normalStyle, addStyles, hoverStyle, activeStyle, focusStyle } = btnStyles;

    const appliedActiveStyle = activeStyle ? activeStyle : hoverStyle;

    const style = {
      ...normalStyle,
      ...addStyles,
      ':hover': {cursor: 'pointer', ...hoverStyle},
      ':active': {cursor: 'pointer', ...appliedActiveStyle},
      ':focus': {outline: 'none', ...focusStyle},
    }

    return (
      <button onClick={onClick} style={[style]}>
        {this.props.children}
      </button>
    );
  }
}

export default Radium(Button);