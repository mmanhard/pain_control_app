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
            <div style={{ flex: 1, width: '100%', position: 'relative'}}>
              <div style={styles.titleContainer}>
                <div>My</div>
                <div>Pain Map</div>
              </div>
              <button style={styles.helpIcon}>?</button>
              <div style={styles.filterContaienr}>
                <div style={styles.filterTxt}>Show:</div>
                <button style={styles.filterOptionTxt}>MAX</button>
                <button style={styles.filterOptionTxt}>ALL DAY</button>
                <div style={styles.filterDateContainer}>
                  <span style={styles.filterDate}>TEST</span>
                  <span style={styles.filterDate}>TEST</span>
                </div>
              </div>
              <BodyVisualizer
                contentContainerStyle={styles.visualizer}
                bodyParts={bodyParts}
                statType={statType}
                history={history}
                displayAddBodyPart={this._displayAddBodyPart} />
            </div>
            <div style={styles.painLegend}>
              <div>
                <p style={{marginLeft: 40, marginBottom: 0  }}>Pain</p>
                <p style={{marginLeft: 40, marginTop: 0 }}>Legend</p>
              </div>
              <div style={{flex: 1}}>
                <div style={styles.painLegendNumbers}>
                  <div style={{flex: 0.5}}></div>
                  {Object.entries(AppColors.painLevelColors).map(([type, color]) => {
                    if (type === 'none') {
                      return (
                        <div key={type} style={{flex: 1.5, ...AppStyles.rowEnd, paddingRight: 18}}>
                          <div style={{ ...styles.painLegendColor, backgroundColor: color}}></div>
                        </div>
                      );
                    }
                    return (
                      <div key={type} style={{flex: 1, ...AppStyles.rowCenter}}>
                        <div style={{ ...styles.painLegendColor, backgroundColor: color}}></div>
                      </div>
                    );
                  })}
                </div>
                <div style={styles.painLegendNumbers}>
                  <span style={{flex: 1, textAlign: 'center'}}>0</span>
                  <span style={{flex: 1, textAlign: 'center'}}>2</span>
                  <span style={{flex: 1, textAlign: 'center'}}>4</span>
                  <span style={{flex: 1, textAlign: 'center'}}>6</span>
                  <span style={{flex: 1, textAlign: 'center'}}>8</span>
                  <span style={{flex: 1, textAlign: 'center'}}>10</span>
                  <span style={{flex: 1, textAlign: 'end', paddingRight: 16}}>N/A</span>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.rightContentContainer}>
            <div style={{ ...AppStyles.typContentContainer, padding: 30, flex: 1, ...AppStyles.columnStart }}>
              <div style={{ ...AppStyles.rowSpace, height: 110, width: '100%', position: 'relative'}}>
                <div style={styles.titleContainer}>
                  <div>General</div>
                  <div>Stats</div>
                </div>

                <div style={styles.basicStatsContainer}>
                  <div style={{height: '100%', flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
                    <div>Total # of Entries:</div>
                    <div>Last Entry:</div>
                    <div>Tracking Since:</div>
                  </div>
                  <div style={{height: '100%', flex: 0.8, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-end'}}>
                    <div>58</div>
                    <div>5/24/2020</div>
                    <div>5/8/2020</div>
                  </div>
                </div>
              </div>
              <div style={styles.statsContainer}>
                <div style={styles.statsRow}>
                  <div style={styles.subtitleContainer}>General</div>
                  <div style={styles.statContainer}>
                    <div style={styles.statTxt}>8.3</div>
                    <div style={styles.statTitle}>Max</div>
                  </div>
                  <div style={styles.statContainer}>
                    <div style={styles.statTxt}>8.3</div>
                    <div style={styles.statTitle}>Min</div>
                  </div>
                  <div style={styles.statContainer}>
                    <div style={styles.statTxt}>8.3</div>
                    <div style={styles.statTitle}>Std Dev</div>
                  </div>
                  <div style={styles.statContainer}>
                    <div style={styles.statTxt}>8.3</div>
                    <div style={styles.statTitle}>Swing</div>
                  </div>
                </div>
                <hr style={{width: '85%', height: 0, borderTop: `solid 2px ${AppColors.blue}`}}/>
                <div style={styles.statsRow}>
                  <div style={styles.subtitleContainer}>Time of Day</div>
                  <div style={styles.statContainer}>
                    <div style={styles.statTxt}>8.3</div>
                    <div style={styles.statTitle}>Wake Up</div>
                  </div>
                  <div style={styles.statContainer}>
                    <div style={styles.statTxt}>8.3</div>
                    <div style={styles.statTitle}>Morning</div>
                  </div>
                  <div style={styles.statContainer}>
                    <div style={styles.statTxt}>8.3</div>
                    <div style={styles.statTitle}>Afternoon</div>
                  </div>
                  <div style={styles.statContainer}>
                    <div style={styles.statTxt}>8.3</div>
                    <div style={styles.statTitle}>Dinner</div>
                  </div>
                  <div style={styles.statContainer}>
                    <div style={styles.statTxt}>8.3</div>
                    <div style={styles.statTitle}>Bed Time</div>
                  </div>
                </div>
                <button style={styles.mainButtonInactive}>View Details</button>
              </div>

              {/*}<h3>User ID: {this.props.userInfo?.id}</h3>
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
              </form>*/}
            </div>
            <div style={styles.mainButtonContainer}>
              <button style={styles.mainButton}>Add An Entry</button>
              <button style={styles.mainButton}>View Entries</button>
              <button style={styles.mainButton}>Build Report</button>
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