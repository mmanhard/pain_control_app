import React from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import AppColors from 'Common/AppColors';
import AppStyles from 'Common/AppStyles';
import styles from './style';

class LoadingSpinner extends React.Component {

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.contentContainer}>
          <Loader
             type="Bars"
             color={AppColors.blue}
             height={100}
             width={150}
             timeout={10000}
          />
        </div>
      </div>
    );
  }
}

export default LoadingSpinner;