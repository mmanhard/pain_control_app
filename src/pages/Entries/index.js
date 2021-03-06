import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import actions from 'Actions';
import { flashDuration } from 'Common/AppConst';
import withWindowDimensions from 'Common/AppDimens';
import AppStyles from 'Common/AppStyles';
import BodyVisualizer from 'Components/BodyVisualizer';
import Button from 'Components/Button';
import ScrollSpinner from 'Components/ScrollSpinner';
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
  this_year: 'This Year'
};

const sortOptions = {
  date: 'Date',
  max_pain: 'Max Pain',
  min_pain: 'Min Pain'
};

const rqdDetail = 'medium';

const scrollReloadThreshold = 0.5;

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
      page: 0,
      flashMessage: '',
      flashSuccess: false
    };
  }

  componentDidMount() {
    this._reloadEntries();

    // Add handler for monitoring scrolling of entry list.
    this.scrollListener = window.addEventListener("scroll", this._handleScroll);
  }

  // Handler for monitoring scrolling of entry list. Will reload entries when
  // the user has scrolled halfway through the list.
  _handleScroll = (e) => {
    const { entries, numEntries } = this.props;

    const lastLi = document.querySelector("ul > li:last-child");

    // Check if the last li element exists. If so, monitor the scroll event.
    if (lastLi) {
      // Calculate the bottom of the last li and the distance from the top of the
      // page to the bottommost visible portion.
      const lastLiBottom = lastLi.offsetTop + lastLi.clientHeight;
      const pageBottomOffset = window.pageYOffset + window.innerHeight;

      // Determine if user has passed the threshold of scrolling (i.e. scrolled
      // past 50% of the current list).
      const scrollRatio = pageBottomOffset / lastLiBottom;
      const pastThreshold = scrollRatio > scrollReloadThreshold;

      if (pastThreshold && !this.props.isFetching && (entries.length < numEntries)) {
        this._reloadEntries();
      }
    }

  }

  _reloadEntries = () => {
    const { userInfo } = this.props;
    const { startDate, endDate, daytime, currentBodyPartID, sortBy, page } = this.state;

    // Determine relevant parameters for fetching entries.
    let params = { sort_by: sortBy, detail_level: rqdDetail, page };
    if (daytime !== 'all_day') {
      params = { ...params, time_of_day: daytime };
    }
    if (currentBodyPartID) {
      params = { ...params, pain_point: currentBodyPartID };
    }
    if (startDate) {
      params = { ...params, start_date: startDate.toISOString(true) };
    }
    if (endDate) {
      params = { ...params, end_date: endDate.toISOString(true) };
    }

    this.props.getEntries(userInfo, params, this._getEntriesCallback);
  }

  _getEntriesCallback = (success) => {
    if (success) {
      // If entries were loaded properly, increase the page number to reload
      // the next set of entries next time _reloadEntries() is called.
      this.setState({ page: this.state.page + 1 });
    }
  }

  _handleInputChange = (event) => {
    const target = event.target;

    // Reset the page number every time an input changes as the parameters for
    // filtering have changed.
    this.setState({ [target.name]: target.value, page: 0 }, this._reloadEntries);
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
    }

    // Reset the page number every time an input changes as the parameters for
    // filtering have changed.
    this.setState({ startDate, page: 0 }, this._reloadEntries);
  }

  _handleSortChange = (sortBy) => {
    // Reset the page number every time an input changes as the parameters for
    // filtering have changed.
    this.setState({ sortBy, page: 0 }, this._reloadEntries);
  }

  _goToEntry = (entryID) => {
    this.props.history.push(`entries/${entryID}`);
  }

  // Callback for deletion of an entry.
  _deleteEntryCallback = (success, message) => {
    if (success) {
      // If deleted succesfully, reload entries from first page.
      this.setState({page: 0}, this._reloadEntries);
    }

    this._setFlashMessage(success, message);
  }

  _setFlashMessage = (success, message) => {
    this.setState({flashMessage: message, flashSuccess: success});
    setTimeout(() => this.setState({flashMessage: ''}), flashDuration)
  }

  _renderEntry = (entry) => {
    const { userInfo, isSmallScreen, isMediumScreen } = this.props;

    // If the entry has no subentries, ignore it.
    if (!entry.pain_subentries) {
      return (<div key={entry.id}/>);
    }

    // Compile info on body parts for the visualizer.
    let visualizerBodyParts = entry.pain_subentries && entry.pain_subentries.map(subentry => {
      const part = subentry.body_part;
      const displayName = part.location ? `${part.location}_${part.name}` : part.name;
      return ({
        name: displayName,
        id: part.id,
        stats: subentry.pain_level
      });
    });

    let min = Number(entry.stats.low).toFixed(0);
    let max = Number(entry.stats.high).toFixed(0);

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

    return (<li key={entry.id} style={styles.entryContainer}>
      <div style={styles.entryDetailsContainer(isSmallScreen, isMediumScreen)}>

        <div style={styles.entryTitleContainer(isSmallScreen)}>
          <div>{date.format('MMMM Do, YYYY')}</div>
          <div>{date.format('h:mm a')}</div>
        </div>

        {isMediumScreen && visualizer}

        {isMediumScreen && stats}

        <div style={AppStyles.center}>

          <Button
            btnStyles={styles.continueBtn}
            onClick={() => { this._goToEntry(entry.id) }}>
            View Details
          </Button>

          <Button
            btnStyles={styles.deleteBtn}
            onClick={() => { this.props.deleteEntry(userInfo, entry.id, this._deleteEntryCallback)}}>
            Delete Entry
          </Button>

        </div>

      </div>

      {!isMediumScreen && <div style={styles.entryContent}>
        {visualizer}
        {stats}
      </div>}

    </li>);
  }

  _renderEmptyState = () => {
    const { isSmallScreen } = this.props;
    return (
      <div style={styles.emptyStateContainer(isSmallScreen)}>
        <p>No entries for the criteria you entered.</p>
        <p>Try updating the filters or adding more entries!</p>
      </div>
    );
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

  _renderConfiguration = () => {
    const { bodyParts, entries, numEntries, isSmallScreen, isMediumScreen } = this.props;
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

        {!isSmallScreen && <div style={styles.entryNumberText}># of Entries: {numEntries}</div>}

      </div>
    );
  }

  render() {
    const { userInfo, entries, numEntries, isFetching, logout, isSmallScreen, isMediumScreen } = this.props;

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

            {this._renderFlash()}

            {this._renderConfiguration()}

          </div>

          <div style={styles.entriesContainer(isSmallScreen, isMediumScreen)}>

            <ul style={{margin: 0, width: '90%'}}>
              {entries?.length > 0
                ? entries.map(this._renderEntry)
                : this._renderEmptyState()}
            </ul>

            {isFetching && <ScrollSpinner />}

          </div>


        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.entries.isFetching,
  userInfo: state.users.userInfo,
  bodyParts: state.bodyParts.bodyParts,
  entries: state.entries.entries,
  numEntries: state.entries.numEntries
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withWindowDimensions(Entries)));