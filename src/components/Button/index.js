import Radium from 'radium';
import React from 'react';

class Button extends React.Component {

  render() {
    const { btnStyles, children, radiumConfigContext, styleKeeperContext, ...otherProps } = this.props;
    const { normalStyle, addStyles, hoverStyle, activeStyle, focusStyle } = btnStyles;

    const appliedActiveStyle = activeStyle ? activeStyle : hoverStyle;

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

export default Radium(Button);