import React from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import AppColors from 'Common/AppColors';

class ScrollSpinner extends React.Component {

  render() {
    const { contentContainerStyle } = this.props;
    return (
      <div style={contentContainerStyle}>
        <Loader
           type="Watch"
           color={AppColors.blue}
           height={40}
           width={40}
           timeout={10000}
        />
      </div>
    );
  }
}

export default ScrollSpinner;