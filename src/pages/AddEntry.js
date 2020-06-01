import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import Navbar from '../components/Navbar';

class AddEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { userInfo, logout } = this.props;
    
    return (
      <div>
        <Navbar userInfo={userInfo} logout={logout}/>
        <h2>AddEntry</h2>
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
)(AddEntry);