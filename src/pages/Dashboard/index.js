import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import actions from 'Actions';
import Navbar from 'Components/Navbar';
import BodyVisualizer from 'Components/BodyVisualizer';
import styles from './style';
import AppStyles from 'Common/AppStyles';
import AppColors from 'Common/AppColors';

const statTypes = {
  mean: 'mean',
  median: 'median',
  max: 'high',
  min: 'low',
  stdev: 'stdev'
}

const daytimes = {
  all_day: 'All Day',
  wakeup: 'Wake Up',
  morning: 'Morning',
  lunch: 'Lunch',
  evening: 'Evening',
  bed_time: 'Bed Time',
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      type: 'Joint',
      statType: statTypes.mean,
      daytime: 'all_day',
      currentBodyPart: null
    };
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _displayAddBodyPart = (bodyPartName) => {
    console.log('Would you like to add: ');
    console.log(bodyPartName);
  }

  _renderOverviewStats = () => {
    const { currentBodyPart } = this.state;

    if (!currentBodyPart) {
      return (<div>6</div>)
    } else {
      let stats = currentBodyPart?.stats?.total;
      return (
        <div style={styles.statsRow}>
          <div style={styles.subtitleContainer}>Overview</div>
          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{stats.high ? stats.high.toFixed(1) : '-'}</div>
            <div style={styles.statTitle}>Max</div>
          </div>
          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{stats.low ? stats.low.toFixed(1) : '-'}</div>
            <div style={styles.statTitle}>Min</div>
          </div>
          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{stats.median ? stats.median.toFixed(1) : '-'}</div>
            <div style={styles.statTitle}>Median</div>
          </div>
          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{stats.stdev ? stats.stdev.toFixed(1) : '-'}</div>
            <div style={styles.statTitle}>Std Dev</div>
          </div>
        </div>
      );
    }
  }

  _renderDaytimeStats = () => {
    const { currentBodyPart, statType } = this.state;

    if (!currentBodyPart) {
      return (<div>6</div>)
    } else {
      let stats = currentBodyPart?.stats?.daytime;
      return (
        <div style={styles.statsRow}>
          <div style={styles.subtitleContainer}>Pain Throughout the Day</div>
          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{stats?.wakeup && stats.wakeup[statType] ? stats.wakeup[statType] : '-'}</div>
            <div style={styles.statTitle}>Wake Up</div>
          </div>
          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{stats?.morning && stats.morning[statType] ? stats.morning[statType] : '-'}</div>
            <div style={styles.statTitle}>Morning</div>
          </div>
          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{stats?.lunch && stats.lunch[statType] ? stats.lunch[statType] : '-'}</div>
            <div style={styles.statTitle}>Lunch</div>
          </div>
          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{stats?.evening && stats.evening[statType] ? stats.evening[statType] : '-'}</div>
            <div style={styles.statTitle}>Evening</div>
          </div>
          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{stats?.bed_time && stats.bed_time[statType] ? stats.bed_time[statType] : '-'}</div>
            <div style={styles.statTitle}>Bed Time</div>
          </div>
        </div>
      );
    }
  }

  render() {
    const { userInfo, bodyParts, token, history, logout, entries } = this.props;
    const { statType, daytime, currentBodyPart } = this.state;

    const dateEntries = currentBodyPart?.stats?.calendar ? currentBodyPart?.stats?.calendar : entries;
    const last_entry = moment(dateEntries[0].date).utc().format('MM/DD/YY');
    const oldest_entry = moment(dateEntries[dateEntries.length-1].date).utc().format('MM/DD/YY');
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
                <select name="statType" style={styles.filterOptionTxt} onChange={this._handleInputChange}>
                  <option value={statTypes.mean}>Average</option>
                  <option value={statTypes.median}>Median</option>
                  <option value={statTypes.max}>Max</option>
                  <option value={statTypes.min}>Min</option>
                  <option value={statTypes.stdev}>Std Dev</option>
                </select>
                <select name="daytime" style={styles.filterOptionTxt} onChange={this._handleInputChange}>
                  {Object.entries(daytimes).map(([key, value]) => {
                    return (
                      <option key={key} value={key}>{value}</option>
                    );
                  })}
                </select>
                <div style={styles.filterDateContainer}>
                  <span style={styles.filterDate}>TEST</span>
                  <span style={styles.filterDate}>TEST</span>
                </div>
              </div>
              <BodyVisualizer
                contentContainerStyle={styles.visualizer}
                bodyParts={bodyParts}
                daytime={daytime}
                statType={statType}
                history={history}
                changeCurrentBodyPart={(part) => { this.setState({currentBodyPart: part})}}
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
                  <div>{currentBodyPart ? `${currentBodyPart.location} ${currentBodyPart.name}` : 'General'}</div>
                  <div>Stats</div>
                </div>

                <div style={styles.basicStatsContainer}>
                  <div style={{height: '100%', flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
                    <div>Total # of Entries:</div>
                    <div>Last Entry:</div>
                    <div>Tracking Since:</div>
                  </div>
                  <div style={{height: '100%', flex: 0.8, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-end'}}>
                    <div>{currentBodyPart ? currentBodyPart.stats.total.num_entries : entries.length}</div>
                    <div>{last_entry}</div>
                    <div>{oldest_entry}</div>
                  </div>
                </div>
              </div>
              <div style={styles.statsContainer}>
                {this._renderOverviewStats()}
                <hr style={{width: '85%', height: 0, borderTop: `solid 2px ${AppColors.blue}`}}/>
                {this._renderDaytimeStats()}
                <button
                  onClick={() => {
                    if (currentBodyPart) {
                      this.props.history.push(`pain_points/${currentBodyPart.id}`);
                    } else {
                      this.props.history.push(`pain_points/`);
                    }
                  }}
                  style={styles.mainButtonInactive}>{currentBodyPart ? 'View Details' : 'View All Pain Points'}</button>
              </div>
            </div>
            <div style={styles.mainButtonContainer}>
              <button
                onClick={() => { this.props.history.push('add_entry')}}
                style={styles.mainButton}>
                Add An Entry
              </button>
              <button
                onClick={() => { this.props.history.push('entries')}}
                style={styles.mainButton}>
                View All Entries
              </button>
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
  loginSuccess: state.users.loginSuccess,
  entries: state.users.entries
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));