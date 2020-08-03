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
import LoadingSpinner from 'Components/LoadingSpinner';
import Navbar from 'Components/Navbar';
import PainLegend from 'Components/PainLegend';
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
  sleep: 'Sleep',
  wakeup: 'Wake Up',
  morning: 'Morning',
  lunch: 'Lunch',
  afternoon: 'Afternoon',
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

    // Initialize flashMessage with flashMessage from history if it exists.
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

    // Create references to the two modal types.
    this.actionModalRef = React.createRef();
  }

  componentDidMount() {
    const { userInfo } = this.props;
    const { flashMessage } = this.state;

    this.props.getUserData(userInfo);
    this.props.getEntries(userInfo);
    this.props.getBodyParts(userInfo);

    // If Initialized with a flashMessage, set timer to remove it.
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

    // Set the start date and end date based on the given date range.
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
        // By default, set initial custom start date to 1 month ago and initial
        // custom end date to today.
        startDate = moment().subtract(1,'M').startOf('day');
        endDate = moment();
        this.setState({ customStartDate: startDate.format('MM/DD/YYYY'),
          customEndDate: endDate.format('MM/DD/YYYY') });
    }

    if (target.value !== 'custom') {
      this.setState({ customStartDate: undefined, customEndDate: undefined });
    }

    // Add the start date and end date to params that will be passed when fetching.
    let params = {};
    if (startDate) {
      params = { ...params, start_date: startDate.toISOString(true) };
    }
    if (endDate) {
      params = { ...params, end_date: endDate.toISOString(true) };
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

    // Check the start and end date are valid. If so, fetch body parts.
    if (!startDate) {
      this._setFlashMessage(false, 'Please submit a valid start date!');
    } else if (!endDate) {
      this._setFlashMessage(false, 'Please submit a valid end date!');
    } else if (startDate.isSameOrAfter(endDate)) {
      this._setFlashMessage(false, 'Start date must be before end date!');
    } else {
      const params = { start_date: startDate.toISOString(true), end_date: endDate.toISOString(true) };
      this.props.getEntries(userInfo, params);
      this.props.getBodyParts(userInfo, params);
    }
  }

  // Format the given stat. If it does not exist or is not a number, return '-'.
  // Otherwise, return the number to one decimal place.
  _formatStat = (stat) => {
    return isNaN(stat) ? '-' : Number(stat).toFixed(1);
  }

  // Compiles parts for the visualizer based on the current stattype and daytime.
  _compileVisualizerParts = () => {
    const { bodyParts } = this.props;
    const { statType, daytime } = this.state;

    let visualizerBodyParts = bodyParts.map(part => {
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

    return visualizerBodyParts;
  }

  _displayAddBodyPart = (bodyPart) => {
    this.setState({newBodyPart: bodyPart });
    this.actionModalRef.current.open();
  }

  // Renders general stats. Displayed when no body part has been selected.
  _renderGeneralStats = (bodyParts) => {
    const { isMobile } = this.props;
    const { statType } = this.state;

    if (bodyParts?.length > 0) {
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
                  btnStyles={styles.statTxtBtn(isMobile)}>
                  {this._formatStat(part?.stats)}
                </Button>

                <div style={styles.statTitle}>
                  {part.name.replace('_', ' ')}
                </div>

              </li>
            );
          })}
        </ul>
      )
    } else {
      return (
        <div style={styles.noPartsText}>
          <p>No pain points yet!</p>
          <p>Click on the body visualizer to add more
          or go to the settings page and add more there!</p>
        </div>
      )
    }
  }

  // Renders basic stats (i.e. # of entries, date of oldest entry, date of most
  // recent entry).
  _renderBasicStats = (currentBodyPart) => {
    const { entries } = this.props;
    const { dateRange } = this.state;

    // Use stats from body part if one has been selected. Otherwise, use the
    // entries list.
    const dateEntries = currentBodyPart?.stats?.calendar ? currentBodyPart?.stats?.calendar : entries;

    // Get the oldest and most recent entry.
    const last_entry = moment(dateEntries[0]?.date).utc().format('MM/DD/YY');
    const oldest_entry = moment(dateEntries[dateEntries.length-1]?.date).utc().format('MM/DD/YY');

    // Get the number of entries.
    const num_entries = currentBodyPart
      ? (currentBodyPart.stats?.total?.num_entries ? currentBodyPart.stats.total.num_entries : 0 )
      : entries.length;

    if (num_entries) {
      return (
        <div style={styles.basicStatsContainer}>

          <div style={{height: '100%', flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
            <div># of Entries:</div>
            <div>Last Entry:</div>
            <div>Oldest Entry:</div>
          </div>

          <div style={{height: '100%', flex: 0.8, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-end'}}>
            <div>{num_entries}</div>
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

  // Renders overview of current selected body part's stats.
  _renderOverviewStats = (currentBodyPart) => {
    const { isMobile, isSmallScreen } = this.props;

    let stats = currentBodyPart?.stats?.total;

    return (
      <div style={styles.statsRow(isSmallScreen)}>
        <div style={styles.subtitleContainer}>Overall</div>

        <div style={styles.statContainer}>
          <div style={styles.statTxt(isMobile)}>{this._formatStat(stats?.high)}</div>
          <div style={styles.statTitle}>Max</div>
        </div>

        <div style={styles.statContainer}>
          <div style={styles.statTxt(isMobile)}>{this._formatStat(stats?.low)}</div>
          <div style={styles.statTitle}>Min</div>
        </div>

        <div style={styles.statContainer}>
          <div style={styles.statTxt(isMobile)}>{this._formatStat(stats?.median)}</div>
          <div style={styles.statTitle}>Median</div>
        </div>

        <div style={styles.statContainer}>
          <div style={styles.statTxt(isMobile)}>{this._formatStat(stats?.stdev)}</div>
          <div style={styles.statTitle}>Std Dev</div>
        </div>

      </div>
    );
  }

  // Renders current selected body part's stats over the course of the day.
  _renderDaytimeStats = (currentBodyPart) => {
    const { isMobile, isSmallScreen} = this.props;
    const { statType } = this.state;

    let stats = currentBodyPart?.stats?.daytime;

    return (
      <div style={styles.statsRow(isSmallScreen)}>

        <div style={styles.subtitleContainer}>
          <div>{statTypes[statType]}</div>
          {!isMobile && <div style={{textAlign: 'center'}}>Over the Day</div>}
        </div>

        <div style={styles.statContainer}>
          <div style={styles.statTxt(isMobile)}>{stats.morning ? this._formatStat(stats.morning[statType]) : '-'}</div>
          <div style={styles.statTitle}>Morning</div>
        </div>

        <div style={styles.statContainer}>
          <div style={styles.statTxt(isMobile)}>{stats.lunch ? this._formatStat(stats.lunch[statType]) : '-'}</div>
          <div style={styles.statTitle}>Lunch</div>
        </div>

        <div style={styles.statContainer}>
          <div style={styles.statTxt(isMobile)}>{stats.evening ? this._formatStat(stats.evening[statType]) : '-'}</div>
          <div style={styles.statTitle}>Evening</div>
        </div>

        <div style={styles.statContainer}>
          <div style={styles.statTxt(isMobile)}>{stats.bed_time ? this._formatStat(stats.bed_time[statType]) : '-'}</div>
          <div style={styles.statTitle}>Bed Time</div>
        </div>

      </div>
    );
  }

  _renderFilterContainer = () => {
    const { isSmallScreen } = this.props;
    const { customStartDate, customEndDate } = this.state;

    return (
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

        </div>

        {isSmallScreen && this._renderFlash()}

        <div style={{width: '90%', ...AppStyles.rowSpace, alignItems: 'center'}}>

          {this._renderFilterContainer()}

          <BodyVisualizer
            contentContainerStyle={styles.visualizer(isSmallScreen, isMediumScreen)}
            bodyParts={visualizerBodyParts}
            clickBackground={() => { this.setState({currentBodyPartID: undefined })}}
            clickBodyPartFound={(part) => { this.setState({currentBodyPartID: part.id})}}
            clickBodyPartNotFound={this._displayAddBodyPart} />

        </div>

        {!isMobile && <PainLegend contentContainerStyle={styles.painLegend} />}
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

  _renderStatsContainer = (visualizerBodyParts) => {
    const { history, bodyParts, entries, isMobile, isSmallScreen, isMediumScreen } = this.props;
    const { currentBodyPartID } = this.state;

    // Determine the current body part based on its ID and format the display name.
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

            {!isMobile && bodyParts?.length > 0 && this._renderBasicStats(currentBodyPart)}

          </div>

          {(currentBodyPart) ? (

            <div style={styles.statsContainer(isSmallScreen)}>

              {this._renderOverviewStats(currentBodyPart)}

              <hr style={{width: '85%', height: 0, borderTop: `solid 2px ${AppColors.blue}`}}/>

              {this._renderDaytimeStats(currentBodyPart)}

              <div style={AppStyles.rowSpace}>
                <Button
                  onClick={() => {this.setState({ currentBodyPartID: undefined })}}
                  btnStyles={styles.mainButtonInactive(isMobile)}>
                  View General
                </Button>

                <Button
                  onClick={() => { history.push(`pain_points/${currentBodyPart.id}`)}}
                  btnStyles={styles.mainButtonInactive(isMobile)}>
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

    const visualizerBodyParts = bodyParts ? this._compileVisualizerParts() : [];

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