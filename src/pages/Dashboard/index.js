import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import actions from 'Actions';
import Navbar from 'Components/Navbar';
import BodyVisualizer from 'Components/BodyVisualizer';
import styles from './style';
import AppStyles from 'Common/AppStyles';
import AppColors from 'Common/AppColors';

const statTypes = {
  avg: 'avg',
  max: 'high',
  min: 'low',
  stddev: 'stddev'
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      type: 'Joint',
      statType: statTypes.max
    };
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _changeStatType = (event) => {

  }

  _displayAddBodyPart = (bodyPartName) => {
    console.log('Would you like to add: ');
    console.log(bodyPartName);
  }

  render() {
    const { userInfo, bodyParts, token, history, logout } = this.props;
    const { statType } = this.state;
    return (
      <div style={styles.container}>
        <Navbar userInfo={userInfo} logout={logout}/>
        <div style={styles.contentContainer}>
          <div style={styles.leftContentContainer}>
            <BodyVisualizer bodyParts={bodyParts} statType={statType} history={history} displayAddBodyPart={this._displayAddBodyPart} />
          </div>
          <div style={styles.rightContentContainer}>
            <div style={{ ...AppStyles.typContentContainer, flex: 1 }}>
              <h3>User ID: {this.props.userInfo?.id}</h3>
              <h3>Name: {`${userInfo?.first_name} ${userInfo?.last_name}`}</h3>
              <h3>{userInfo?.email && `Email: ${userInfo?.email}`}</h3>
              <h3>{userInfo?.phone && `Phone Number: ${userInfo?.phone}`}</h3>
              <h3>{userInfo?.birthday && `Birthday: ${userInfo?.birthday}`}</h3>
              <h3>{userInfo?.hometown && `Hometown: ${userInfo?.hometown}`}</h3>
              <h3>{userInfo?.medical_history && `Medical History: ${userInfo?.medical_history}`}</h3>

              { this.props.bodyParts && <h3>Number of Body Parts: {this.props.bodyParts.length}</h3> }

              { this.props.bodyParts && bodyParts.map((part) => {
                  if (part.stats?.num_entries > 0) {
                    return (
                      <div key={part.id}>
                        {(part.location && `${part.location} `)}
                        {`${part.name} ${part.stats[this.state.statType]}`}
                      </div>
                    );
                  }
              })}

              <form>
                <input name="statType" value={statTypes.avg} type="radio" onChange={this._handleInputChange}/> Avg
                <input name="statType" value={statTypes.max} type="radio" onChange={this._handleInputChange}/> Max
                <input name="statType" value={statTypes.min} type="radio" onChange={this._handleInputChange}/> Min
              </form>
            </div>
            <div style={{ ...AppStyles.typContentContainer, flex: 0.5, marginTop: 20 }}>

            </div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.users.userInfo,
  userUpdate: state.users.userUpdate,
  bodyPartUpdate: state.users.bodyPartUpdate,
  bodyParts: state.users.bodyParts,
  loginSuccess: state.users.loginSuccess
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));