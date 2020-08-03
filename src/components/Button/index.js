import Radium from 'radium';
import React from 'react';

class Button extends React.Component {

  render() {
    const { btnStyles, children, radiumConfigContext, styleKeeperContext, ...otherProps } = this.props;
    const { normalStyle, addStyles, hoverStyle, activeStyle, focusStyle } = btnStyles;

    const appliedActiveStyle = activeStyle ? activeStyle : hoverStyle;

    // Set up styles for hovering over, focusing on, and activating the button.
    const btnStyle = {
      ...normalStyle,
      ...addStyles,
      ':hover': {cursor: 'pointer', ...hoverStyle},
      ':active': {cursor: 'pointer', ...appliedActiveStyle},
      ':focus': {outline: 'none', ...focusStyle},
    }

    return (
      <button style={[btnStyle]} {...otherProps}>
        {children}
      </button>
    );
  }
}

// Radium allows the Button class to use inline styles for events such as
// hovering, focusing, being activated.
export default Radium(Button);