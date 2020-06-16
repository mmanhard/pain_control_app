import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from 'Actions';
import Navbar from 'Components/Navbar';
import styles from './style';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { userInfo, logout } = this.props;

    return (
      <div style={styles.container}>
        <Navbar userInfo={userInfo} logout={logout}/>
        <h2>Settings</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.users.userInfo,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);