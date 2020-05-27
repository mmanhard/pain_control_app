import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  _handleLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <button onClick={this._handleLogout}>Log Out</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.users.userInfo,
  token: state.users.token,
  loginSuccess: state.users.loginSuccess
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);