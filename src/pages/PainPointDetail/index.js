import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from 'Actions';
import Navbar from 'Components/Navbar';
import styles from './style';

class PainPointDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const { userInfo, bodyPartID } = this.props;
    this.props.getBodyPart(userInfo, bodyPartID, {});
  }

  render() {
    const { userInfo, bodyPartInfo, logout } = this.props;

    return (
      <div style={styles.container}>
        <Navbar userInfo={userInfo} logout={logout}/>
        <h2>PainPointDetail</h2>
        <h3>{`Pain Point ID: ${bodyPartInfo?.id}`}</h3>
        <h3>{`Pain Point Name: ${bodyPartInfo?.name}`}</h3>
        <h3>{`Pain Point Location: ${bodyPartInfo?.location}`}</h3>
        <h3>{`Pain Max: ${bodyPartInfo?.customStats?.total?.high}`}</h3>
        <h3>{`Pain Min: ${bodyPartInfo?.customStats?.total?.low}`}</h3>
        <h3>{`Pain Mean: ${bodyPartInfo?.customStats?.total?.mean}`}</h3>
        <h3>{`Pain Median: ${bodyPartInfo?.customStats?.total?.median}`}</h3>
        <h3>{`Pain StdDev: ${bodyPartInfo?.customStats?.total?.stdev}`}</h3>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.users.userInfo,
  bodyPartInfo: state.bodyParts.bodyPartInfo
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PainPointDetail);