import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import actions from 'Actions';
import AppColors from 'Common/AppColors';
import { flashDuration } from 'Common/AppConst';
import withWindowDimensions from 'Common/AppDimens';
import AppStyles from 'Common/AppStyles';
import ActionModal from 'Components/ActionModal';
import BodyVisualizer from 'Components/BodyVisualizer';
import Button from 'Components/Button';
import HelpModal from 'Components/HelpModal';
import LoadingSpinner from 'Components/LoadingSpinner';
import Navbar from 'Components/Navbar';
import styles from './style';
import Utils from 'Utils';

const statTypes = {
  mean: 'Mean',
  median: 'Median',
  high: 'Max',
  low: 'Min',
  stdev: 'Std Dev'
}

const daytimes = {
  all_day: 'All Day',
  morning: 'Morning',
  lunch: 'Lunch',
  evening: 'Evening',
  bed_time: 'Bed Time',
};

const dateRanges = {
  all_time: 'All Time',
  today: 'Today',
  this_week: 'This Week',
  this_month: 'This Month',
  this_year: 'This Year',
  custom: 'Custom'
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    const flashMessage = props.history?.location?.state?.flashMessage
      ? props.history.location.state.flashMessage : '';

    this.state = {
      name: '',
      type: 'Joint',
      statType: 'mean',
      daytime: 'all_day',
      currentBodyPartID: undefined,
      newBodyPart: undefined,
      customStartDate: undefined,
      customEndDate: undefined,
      flashMessage: flashMessage,
      flashSuccess: true
    };

    this.actionModalRef = React.createRef();
    this.helpModalRef = React.createRef();
  }

  componentDidMount() {
    const { userInfo } = this.props;
    const { flashMessage } = this.state;

    this.props.getUserData(userInfo);
    this.props.getEntries(userInfo);
    this.props.getBodyParts(userInfo);

    if (flashMessage) {
      setTimeout(() => this.setState({flashMessage: ''}), flashDuration);
    }
  }

  componentDidUpdate(prevProps) {
    const { userInfo } = this.props;

    if (!prevProps.userUpdate && this.props.userUpdate) {
      this.props.getUserData(userInfo);
    }

    if (!prevProps.entryUpdate && this.props.entryUpdate) {
      this.props.getEntries(userInfo);
    }

    if (!prevProps.bodyPartUpdate && this.props.bodyPartUpdate) {
      this.props.getBodyParts(userInfo);
    }
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _handleDateRangeChange = (event) => {
    const { userInfo } = this.props;
    const target = event.target;

    let startDate, endDate;
    switch (target.value) {
      case 'today':
        startDate = moment().startOf('day');
        break;
      case 'this_week':
        startDate = moment().subtract(6,'d').startOf('day');
        break;
      case 'this_month':
        startDate = moment().subtract(1,'M').startOf('day');
        break;
      case 'this_year':
        startDate = moment().subtract(1,'Y').startOf('day');
        break;
      case 'custom':
        startDate = moment().subtract(1,'Y').startOf('day');
        endDate = moment();
        this.setState({ customStartDate: startDate.format('MM/DD/YYYY'), customEndDate: endDate.format('MM/DD/YYYY') });
    }

    if (target.value !== 'custom') {
      this.setState({ customStartDate: undefined, customEndDate: undefined });
    }

    let params = {};
    if (startDate) {
      params = { ...params, start_date: startDate.toISOString() };
    }
    if (endDate) {
      params = { ...params, end_date: endDate.toISOString() };
    }
    this.props.getEntries(userInfo, params);
    this.props.getBodyParts(userInfo, params);
  }

  _handleCustomDateChange = (event) => {
    const target = event.target;
    const { entryDate, entryTime, entryTimePeriod } = this.state;

    this.setState({ [target.name]: Utils.formatDateInput(target.value) });
  }

  _handleSubmitCustomDates = () => {
    const { userInfo } = this.props;
    const { customStartDate, customEndDate } = this.state;

    const startDate = Utils.convertDateTimeToMoment(customStartDate, '12:00', 'AM');
    const endDate = Utils.convertDateTimeToMoment(customEndDate, '11:59', 'PM');

    if (!startDate) {
      this._setFlashMessage(false, 'Please submit a valid start date!');
    } else if (!endDate) {
      this._setFlashMessage(false, 'Please submit a valid end date!');
    } else if (startDate.isSameOrAfter(endDate)) {
      this._setFlashMessage(false, 'Start date must be before end date!');
    } else {
      const params = { start_date: startDate.toISOString(), end_date: endDate.toISOString() };
      this.props.getEntries(userInfo, params);
      this.props.getBodyParts(userInfo, params);
    }
  }

  _displayAddBodyPart = (bodyPart) => {
    this.setState({newBodyPart: bodyPart });
    this.actionModalRef.current.open();
  }

  _renderGeneralStats = (bodyParts) => {
    const { statType } = this.state;
    return (
      <ul style={styles.generalStatsContainer}>
        <div style={styles.subtitleContainer}>
          <div>{statTypes[statType]}</div>
          <div>Pain Level</div>
        </div>
        {bodyParts.map(part => {
          return (
            <li key={part.id} style={styles.statContainer}>
              <Button
                onClick={() => {this.setState({ currentBodyPartID: part.id })}}
                btnStyles={styles.statTxtBtn}>
                {part.stats ? Number(part.stats).toFixed(1) : '-'}
              </Button>
              <div style={styles.statTitle}>{part.name.replace('_', ' ')}</div>
            </li>
          )
        })}
      </ul>
    )
  }

  _renderOverviewStats = (currentBodyPart) => {
    let stats = currentBodyPart?.stats?.total;
    return (
      <div style={styles.statsRow}>
        <div style={styles.subtitleContainer}>Overall</div>
        <div style={styles.statContainer}>
          <div style={styles.statTxt}>{stats?.high ? stats.high.toFixed(1) : '-'}</div>
          <div style={styles.statTitle}>Max</div>
        </div>
        <div style={styles.statContainer}>
          <div style={styles.statTxt}>{stats?.low ? stats.low.toFixed(1) : '-'}</div>
          <div style={styles.statTitle}>Min</div>
        </div>
        <div style={styles.statContainer}>
          <div style={styles.statTxt}>{stats?.median ? stats.median.toFixed(1) : '-'}</div>
          <div style={styles.statTitle}>Median</div>
        </div>
        <div style={styles.statContainer}>
          <div style={styles.statTxt}>{stats?.stdev ? stats.stdev.toFixed(1) : '-'}</div>
          <div style={styles.statTitle}>Std Dev</div>
        </div>
      </div>
    );
  }

  _renderDaytimeStats = (currentBodyPart) => {
    const { statType } = this.state;

    let stats = currentBodyPart?.stats?.daytime;
    return (
      <div style={styles.statsRow}>
        <div style={styles.subtitleContainer}>
          <div>{statTypes[statType]}</div>
          <div>Over the Day</div>
        </div>
        <div style={styles.statContainer}>
          <div style={styles.statTxt}>{stats?.morning && stats.morning[statType] ? stats.morning[statType].toFixed(1) : '-'}</div>
          <div style={styles.statTitle}>Morning</div>
        </div>
        <div style={styles.statContainer}>
          <div style={styles.statTxt}>{stats?.lunch && stats.lunch[statType] ? stats.lunch[statType].toFixed(1) : '-'}</div>
          <div style={styles.statTitle}>Lunch</div>
        </div>
        <div style={styles.statContainer}>
          <div style={styles.statTxt}>{stats?.evening && stats.evening[statType] ? stats.evening[statType].toFixed(1) : '-'}</div>
          <div style={styles.statTitle}>Evening</div>
        </div>
        <div style={styles.statContainer}>
          <div style={styles.statTxt}>{stats?.bed_time && stats.bed_time[statType] ? stats.bed_time[statType].toFixed(1) : '-'}</div>
          <div style={styles.statTitle}>Bed Time</div>
        </div>
      </div>
    );
  }

  _renderPainLegend = () => {
    return (
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
    );
  }

  _renderLeftContainer = (visualizerBodyParts) => {
    const { isMobile, isSmallScreen, isMediumScreen } = this.props;
    const { customStartDate, customEndDate } = this.state;

    return (
      <div style={styles.leftContentContainer(isSmallScreen)}>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 20, marginBottom: 20}}>
          <div style={styles.titleContainer(isSmallScreen)}>
            <div>My</div>
            <div>Pain Map</div>
          </div>
          {!isSmallScreen && this._renderFlash()}
          <Button
            onClick={() => {this.helpModalRef.current.open()}}
            btnStyles={styles.helpBtn}>
            <div style={styles.helpIcon}>?</div>
          </Button>
        </div>
        {isSmallScreen && this._renderFlash()}
        <div style={{width: '90%', ...AppStyles.rowSpace, alignItems: 'center'}}>
          <div style={styles.filterContainer(isSmallScreen)}>
            <div style={styles.filterTxt}>Show:</div>
            <select name="statType" style={styles.filterOptionTxt} onChange={this._handleInputChange}>
              {Object.entries(statTypes).map(([key, value]) => {
                return (
                  <option key={key} value={key}>{value}</option>
                );
              })}
            </select>
            <select name="daytime" style={styles.filterOptionTxt} onChange={this._handleInputChange}>
              {Object.entries(daytimes).map(([key, value]) => {
                return (
                  <option key={key} value={key}>{value}</option>
                );
              })}
            </select>
            <select name="dateRange" style={styles.filterOptionTxt} onChange={this._handleDateRangeChange}>
              {Object.entries(dateRanges).map(([key, value]) => {
                return (
                  <option key={key} value={key}>{value}</option>
                );
              })}
            </select>
            {(typeof customStartDate !== 'undefined') && <div style={AppStyles.center}>
              <div style={styles.filterTxt}>Start Date</div>
              <input
                type='text'
                style={styles.configTimeTxt}
                name='customStartDate'
                value={customStartDate}
                onChange={this._handleCustomDateChange}
              />
              <div style={styles.filterTxt}>End Date</div>
              <input
                type='text'
                style={styles.configTimeTxt}
                name='customEndDate'
                value={customEndDate}
                onChange={this._handleCustomDateChange}
              />
              <Button
                btnStyles={styles.submitDateBtn}
                onClick={this._handleSubmitCustomDates}>
                Submit
              </Button>
              </div>}
          </div>
          <BodyVisualizer
            contentContainerStyle={styles.visualizer(isSmallScreen, isMediumScreen)}
            bodyParts={visualizerBodyParts}
            clickBackground={() => { this.setState({currentBodyPartID: undefined })}}
            clickBodyPartFound={(part) => { this.setState({currentBodyPartID: part.id})}}
            clickBodyPartNotFound={this._displayAddBodyPart} />
        </div>
        {!isMobile && this._renderPainLegend()}
        {isMediumScreen && this._renderStatsContainer(visualizerBodyParts)}
        {isMediumScreen && this._renderMainButtonContainer()}
      </div>
    );
  }

  _renderMainButtonContainer = () => {
    const { history, isMobile, isMediumScreen } = this.props;
    return (
      <div style={styles.mainButtonContainer(isMediumScreen)}>
        <Button
          onClick={() => { history.push('entries')}}
          btnStyles={styles.mainButtonInactive(isMobile)}>
          View All Entries
        </Button>
        <Button
          onClick={() => { history.push('add_entry')}}
          btnStyles={styles.mainButton(isMobile)}>
          Add An Entry
        </Button>
      </div>
    );
  }

  _renderBasicStats = (currentBodyPart) => {
    const { entries } = this.props;

    const dateEntries = currentBodyPart?.stats?.calendar ? currentBodyPart?.stats?.calendar : entries;
    const last_entry = moment(dateEntries[0]?.date).utc().format('MM/DD/YY');
    const oldest_entry = moment(dateEntries[dateEntries.length-1]?.date).utc().format('MM/DD/YY');

    if (!currentBodyPart || currentBodyPart.stats?.total?.num_entries) {
      return (
        <div style={styles.basicStatsContainer}>
          <div style={{height: '100%', flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
            <div># of Entries:</div>
            <div>Last Entry:</div>
            <div>Tracking Since:</div>
          </div>
          <div style={{height: '100%', flex: 0.8, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-end'}}>
            <div>{currentBodyPart
              ? (currentBodyPart.stats?.total?.num_entries ? currentBodyPart.stats.total.num_entries : 0 )
              : entries.length}
            </div>
            <div>{last_entry}</div>
            <div>{oldest_entry}</div>
          </div>
        </div>
        );
      } else {
        return (
          <div style={styles.basicStatsContainer}>
            No entries for this pain point in this timeframe!
          </div>
        );
      }
  }

  _renderStatsContainer = (visualizerBodyParts) => {
    const { history, bodyParts, entries, isMobile, isSmallScreen, isMediumScreen } = this.props;
    const { currentBodyPartID } = this.state;

    let part, currentBodyPart;
    for (part of bodyParts) {
      if (currentBodyPartID && part.id == currentBodyPartID) {
        currentBodyPart = part;
        currentBodyPart.displayName = currentBodyPart.location ? `${currentBodyPart.location} ${currentBodyPart.name}` : currentBodyPart.name;
        break;
      }
    }

    return (
        <div style={styles.mainStatsContainer(isMediumScreen)}>
          <div style={{ ...AppStyles.rowBetween, height: 110, width: '95%', marginTop: 20}}>
            <div style={styles.titleContainer(isSmallScreen)}>
              <div>{currentBodyPart ? currentBodyPart.displayName : 'General'}</div>
              <div>Stats</div>
            </div>
            {!isMobile && this._renderBasicStats(currentBodyPart)}
          </div>
          {(currentBodyPart) ? (
            <div style={styles.statsContainer(isSmallScreen)}>
              {this._renderOverviewStats(currentBodyPart)}
              <hr style={{width: '85%', height: 0, borderTop: `solid 2px ${AppColors.blue}`}}/>
              {this._renderDaytimeStats(currentBodyPart)}
              <div style={AppStyles.rowSpace}>
                <Button
                  onClick={() => {this.setState({ currentBodyPartID: undefined })}}
                  btnStyles={styles.mainButtonInactive}>
                  View General
                </Button>
                <Button
                  onClick={() => { history.push(`pain_points/${currentBodyPart.id}`)}}
                  btnStyles={styles.mainButtonInactive}>
                  View Details
                </Button>
              </div>
            </div>
          ) : (
            <div style={styles.statsContainer(isSmallScreen)}>
              {this._renderGeneralStats(visualizerBodyParts)}
            </div>
          )}
        </div>
    );
  }

  _setFlashMessage = (success, message) => {
    this.setState({flashMessage: message, flashSuccess: success});
    setTimeout(() => this.setState({flashMessage: ''}), flashDuration);
  }

  _renderFlash = () => {
    const { isSmallScreen } = this.props;
    const { flashMessage, flashSuccess } = this.state;

    return (
      <div style={styles.flashMessage(isSmallScreen, flashMessage, flashSuccess)}>
        <div style={{margin: 10, textAlign: 'center'}}>{flashMessage}</div>
      </div>
    );

  }


  render() {
    const { userInfo, bodyParts, entries, logout, isSmallScreen, isMediumScreen, isFetching } = this.props;
    const { statType, daytime, newBodyPart } = this.state;

    let visualizerBodyParts;
    if (bodyParts) {
      visualizerBodyParts = bodyParts.map(part => {
        const displayName = part.location ? `${part.location}_${part.name}` : part.name;
        let stats;
        if (daytime !== 'all_day') {
          if (part.stats?.daytime && part.stats?.daytime[daytime]) {
            stats = part.stats.daytime[daytime][statType];
          }
        } else {
          if (part.stats?.total) {
            stats = part.stats.total[statType];
          }
        }
        return ({
          name: displayName,
          id: part.id,
          stats
        });
      });
    }

    return (
      <div style={styles.container(isSmallScreen)}>

        <Navbar userInfo={userInfo} logout={logout}/>

        {(!userInfo || !bodyParts || !entries || isFetching) && <LoadingSpinner />}

        {(userInfo && bodyParts && entries) &&
          <div style={styles.contentContainer(isMediumScreen)}>
            {this._renderLeftContainer(visualizerBodyParts)}
            <div style={styles.rightContentContainer(isSmallScreen)}>
              {!isMediumScreen && this._renderStatsContainer(visualizerBodyParts)}
              {!isMediumScreen && this._renderMainButtonContainer()}
            </div>
          </div>}

        <ActionModal
          ref={this.actionModalRef}
          contentStyle={styles.formModalContainer}
          action={() => {
            this.props.addBodyPart(userInfo, newBodyPart)
          }}>
          <p style={styles.actionModalTxt}>
            Would you like to start tracking your {newBodyPart && newBodyPart.displayName}?
          </p>
        </ActionModal>

        <HelpModal
          ref={this.helpModalRef}
          contentStyle={styles.formModalContainer} />

      </div>
    )
  }
}

const mapStateToProps = state => {
  const { users, bodyParts, entries } = state;

  const isFetching = (users.isFetching || bodyParts.isFetching || entries.isFetching);

  return {
    isFetching,
    userInfo: users.userInfo,
    userUpdate: users.userUpdate,
    loginSuccess: users.loginSuccess,
    bodyPartUpdate: bodyParts.bodyPartUpdate,
    bodyParts: bodyParts.bodyParts,
    entries: entries.entries
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withWindowDimensions(Dashboard)));