import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import actions from 'Actions';
import withWindowDimensions from 'Common/AppDimens';
import AppStyles from 'Common/AppStyles';
import BodyVisualizer from 'Components/BodyVisualizer';
import Button from 'Components/Button';
import LoadingSpinner from 'Components/LoadingSpinner';
import Navbar from 'Components/Navbar';
import styles from './style';

const daytimes = {
  all_day: 'All Day',
  wakeup: 'Wake Up',
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

const sortOptions = {
  date: 'Date',
  max_pain: 'Max Pain',
  min_pain: 'Min Pain'
}

class Entries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start_date: null,
      end_date: null,
      currentBodyPart: null,
      currentBodyPartID: null,
      daytime: 'all_day',
      sortBy: 'date',
    };
  }

  componentDidMount() {
    this._reloadEntries();
  }

  _reloadEntries = () => {
    const { userInfo } = this.props;
    const { startDate, endDate, daytime, currentBodyPartID, sortBy } = this.state;

    let params = { sort_by: sortBy, time_of_day: daytime };
    if (currentBodyPartID) {
      params = { ...params, pain_point: currentBodyPartID };
    }
    if (startDate) {
      params = { ...params, start_date: startDate.toISOString(true) };
    }
    if (endDate) {
      params = { ...params, end_date: endDate.toISOString(true) };
    }

    this.props.getEntries(userInfo, params);
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value }, this._reloadEntries);
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
        console.log('Need to handle custom case!!!');
    }

    this.setState({ startDate }, this._reloadEntries);
  }

  _handleSortChange = (sortBy) => {
    this.setState({ sortBy }, this._reloadEntries);
  }

  _goToEntry = (entryID) => {
    this.props.history.push(`entries/${entryID}`);
  }

  _renderEntry = (entry) => {
    const { isSmallScreen, isMediumScreen } = this.props;

    let visualizerBodyParts = entry.pain_subentries.map(subentry => {
      const part = subentry.body_part;
      const displayName = part.location ? `${part.location}_${part.name}` : part.name;
      return ({
        name: displayName,
        id: part.id,
        stats: subentry.pain_level
      });
    });

    let min = 10;
    let max = 0;
    for (let subentry of entry.pain_subentries) {
      if (subentry.pain_level < min) {
        min = subentry.pain_level
      }
      if (subentry.pain_level > max) {
        max = subentry.pain_level
      }
    }

    const date = moment(entry.date).utc();

    let entryContent = (
      <div style={styles.entryContent}>
        <BodyVisualizer
          contentContainerStyle={styles.visualizer(isSmallScreen)}
          bodyParts={visualizerBodyParts} />
        <div style={styles.statsRow}>
          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{max}</div>
            <div style={styles.statTitle}>Max</div>
          </div>
          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{min}</div>
            <div style={styles.statTitle}>Min</div>
          </div>
          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{entry.pain_subentries.length}</div>
            <div style={styles.statTitle}>Pain Points</div>
          </div>
        </div>
      </div>
    );

    let visualizer = (
      <BodyVisualizer
        contentContainerStyle={styles.visualizer(isSmallScreen)}
        bodyParts={visualizerBodyParts} />
    );

    let stats = (
      <div style={styles.statsRow(isSmallScreen)}>
        <div style={styles.statContainer}>
          <div style={styles.statTxt}>{max}</div>
          <div style={styles.statTitle(isSmallScreen)}>Max</div>
        </div>
        <div style={styles.statContainer}>
          <div style={styles.statTxt}>{min}</div>
          <div style={styles.statTitle(isSmallScreen)}>Min</div>
        </div>
        {!isSmallScreen && <div style={styles.statContainer}>
          <div style={styles.statTxt}>{entry.pain_subentries.length}</div>
          <div style={styles.statTitle(isSmallScreen)}>Pain Points</div>
        </div>}
      </div>
    );

    return (<div key={entry.id} style={styles.entryContainer}>
      <div style={styles.entryDetailsContainer(isSmallScreen, isMediumScreen)}>
        <div style={styles.entryTitleContainer(isSmallScreen)}>
          <div>{date.format('MMMM Do, YYYY')}</div>
          <div>{date.format('h:mm a')}</div>
        </div>
        {isMediumScreen && visualizer}
        {isMediumScreen && stats}
        <Button btnStyles={styles.continueBtn} onClick={() => { this._goToEntry(entry.id) }}>View Details</Button>
      </div>
      {!isMediumScreen && <div style={styles.entryContent}>
        {visualizer}
        {stats}
      </div>}
    </div>);
  }

  _renderConfiguration = () => {
    const { bodyParts, entries, isSmallScreen, isMediumScreen } = this.props;
    const { sortBy } = this.state;

    let filterTitle = (
      <div style={styles.configTitle(isSmallScreen)}>
        <div style={styles.configTitleTxt(isSmallScreen)}>Filter</div>
        {!isSmallScreen && <div style={styles.configTitleTxt(isSmallScreen)}>Entries</div>}
      </div>
    );

    let sortTitle = (
      <div style={styles.configTitle(isSmallScreen)}>
        <div style={styles.configTitleTxt(isSmallScreen)}>Sort</div>
        {!isSmallScreen && <div style={styles.configTitleTxt(isSmallScreen)}>Entries</div>}
      </div>
    );

    return (
      <div style={styles.configContentContainer(isSmallScreen)}>
        {!isSmallScreen && <div style={styles.configRow}>
          {filterTitle}
        </div>}
        <div style={{...styles.configRow, ...AppStyles.rowSpace}}>
          {isSmallScreen && filterTitle}
          <div style={styles.filterOption}>
            {!isSmallScreen && <div style={styles.filterOptionTitle}>Dates</div>}
            <select name="dateRange" style={styles.filterOptionTxt(isSmallScreen)} onChange={this._handleDateRangeChange}>
              {Object.entries(dateRanges).map(([key, value]) => {
                return (
                  <option key={key} value={key}>{value}</option>
                );
              })}
            </select>
          </div>

          <div style={styles.filterOption}>
            {!isSmallScreen && <div style={styles.filterOptionTitle}>Pain Point</div>}
            <select name="currentBodyPartID" style={styles.filterOptionTxt(isSmallScreen)} onChange={this._handleInputChange}>
              <option key={'all_bps'} value={''}>All</option>
              {bodyParts.map((part) => {
                const displayName = part.location ? `${part.location} ${part.name}` : part.name;
                return (
                  <option key={part.id} value={part.id}>{displayName}</option>
                );
              })}
            </select>
          </div>

          <div style={styles.filterOption}>
            {!isSmallScreen && <div style={styles.filterOptionTitle}>Time of Day</div>}
            <select name="daytime" style={styles.filterOptionTxt(isSmallScreen)} onChange={this._handleInputChange}>
              {Object.entries(daytimes).map(([key, value]) => {
                return (
                  <option key={key} value={key}>{value}</option>
                );
              })}
            </select>
          </div>

        </div>
        <div style={{...styles.configRow, marginTop: isSmallScreen ? 18 : 32}}>
          {!isSmallScreen && sortTitle}
          <div style={styles.sortOptions(isSmallScreen)}>
            {isSmallScreen && sortTitle}
            {Object.entries(sortOptions).map(([key, value]) => {
              const selected = (sortBy == key);
              return (
                <Button
                  btnStyles={styles.sortOption(isSmallScreen, selected)}
                  key={key}
                  onClick={() => { this._handleSortChange(key) }}>
                  {isSmallScreen ? value.split(' ')[0] : value}
                </Button>
              );
            })}
          </div>
        </div>
        {!isSmallScreen && <div style={styles.entryNumberText}># of Entries: {entries.length}</div>}
      </div>
    );
  }

  render() {
    const { userInfo, entries, isFetching, logout, isSmallScreen, isMediumScreen } = this.props;

    return (
      <div style={styles.container(isSmallScreen)}>
        <Navbar userInfo={userInfo} logout={logout}/>
        <div style={styles.contentContainer(isSmallScreen)}>
          <div style={styles.configContainer(isSmallScreen)}>
            <div style={styles.titleContainer(isSmallScreen)}>
              <div style={styles.titleTxt(isMediumScreen)}>My Entry Feed</div>
              <div style={{...styles.subtitleTxt, marginTop: 8}}>Scroll down to see more entries.</div>
              {!isSmallScreen && <div style={styles.subtitleTxt}>Add filters below.</div>}
            </div>
            {this._renderConfiguration()}
          </div>
          <div style={styles.entriesContainer(isSmallScreen, isMediumScreen)}>
            {entries.map(this._renderEntry)}
          </div>

          {isFetching && <LoadingSpinner />}

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.entries.isFetching,
  userInfo: state.users.userInfo,
  bodyParts: state.bodyParts.bodyParts,
  entries: state.entries.entries
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withWindowDimensions(Entries)));