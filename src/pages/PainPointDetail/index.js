import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import actions from 'Actions';
import Navbar from 'Components/Navbar';
import styles from './style';
import DaytimeChart from 'Components/DaytimeChart';
import CalendarChart from 'Components/CalendarChart';
import HistogramChart from 'Components/HistogramChart';
import BodyVisualizer from 'Components/BodyVisualizer';
import Utils from 'Utils';
import AppStyles from 'Common/AppStyles';

const chartTypes = {
  daytime: 'daytime',
  calendar: 'calendar',
  histogram: 'histogram'
}

const daytimeStatTypes = {
  mean: 'Mean',
  median: 'Median',
  high: 'Max',
  low: 'Min',
  stdev: 'Std Dev'
}

const calendarStatTypes = {
  mean: 'Mean',
  high: 'Max',
  low: 'Min',
  stdev: 'Std Dev'
}

const histogramStatTypes = {
  mean: 'Mean',
  median: 'Median',
  high: 'Max',
  low: 'Min',
}

const dateRanges = {
  all_time: 'All Time',
  this_week: 'This Week',
  this_month: 'This Month',
  this_year: 'This Year',
  custom: 'Custom'
};

class PainPointDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartType: chartTypes.calendar,
      statType: 'mean',
      customStartDate: undefined,
      customEndDate: undefined,
    };
  }

  componentDidMount() {
    const { userInfo, bodyPartID } = this.props;
    this.props.getBodyPart(userInfo, bodyPartID, {});
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _handleDateRangeChange = (event) => {
    const { userInfo, bodyPartID } = this.props;
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
    this.props.getBodyPart(userInfo, bodyPartID, params);
  }

  _handleCustomDateChange = (event) => {
    const target = event.target;
    const { entryDate, entryTime, entryTimePeriod } = this.state;

    this.setState({ [target.name]: Utils.formatDateInput(target.value) });
  }

  _handleSubmitCustomDates = () => {
    const { userInfo, bodyPartID } = this.props;
    const { customStartDate, customEndDate } = this.state;

    const startDate = Utils.convertDateTimeToMoment(customStartDate, '12:00', 'AM');
    const endDate = Utils.convertDateTimeToMoment(customEndDate, '11:59', 'PM');

    if (startDate && endDate) {
      const params = { start_date: startDate.toISOString(), end_date: endDate.toISOString() };
      this.props.getBodyPart(userInfo, bodyPartID, params);
    } else{
      alert('Incomplete dates!')
    }
  }

  _renderFilterContainer = () => {
    const { chartType, customStartDate, customEndDate } = this.state;

    let currentStatTypes;
    switch (chartType) {
      case chartTypes.daytime:
        currentStatTypes = daytimeStatTypes;
        break;
      case chartTypes.calendar:
        currentStatTypes = calendarStatTypes;
        break;
      case chartTypes.histogram:
        currentStatTypes = histogramStatTypes;
        break;
    }
    return (
      <div style={styles.filterContainer(customStartDate)}>
        <div style={styles.filterTxt}>Show:</div>
        <select name="statType" style={styles.filterOptionTxt} onChange={this._handleInputChange}>
          {Object.entries(currentStatTypes).map(([key, value]) => {
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
          <button
            style={styles.submitDateBtn}
            onClick={this._handleSubmitCustomDates}>
            Submit
          </button>
        </div>}
      </div>
    );
  }

  render() {
    const { userInfo, bodyPartInfo, logout } = this.props;
    const { chartType, statType } = this.state;

    let daytimeStats = bodyPartInfo.stats.daytime;
    let calendarStats = bodyPartInfo.stats.calendar;
    let movingStats = bodyPartInfo.stats.moving;
    let histogram =  bodyPartInfo.stats.histogram;

    const displayName = bodyPartInfo.location ? `${bodyPartInfo.location} ${bodyPartInfo.name}` : bodyPartInfo.name;
    const visualizerName = bodyPartInfo.location ? `${bodyPartInfo.location}_${bodyPartInfo.name}` : bodyPartInfo.name;

    return (
      <div style={styles.container}>
        <Navbar userInfo={userInfo} logout={logout}/>
        <div style={styles.configContainer}>
          <div style={styles.titleContainer}>
            <div style={styles.titleTxt}>My {displayName}</div>
            {true && <BodyVisualizer
              clickBodyPartFound={() => {}}
              clickBodyPartNotFound={() => {}}
              contentContainerStyle={styles.miniVisualizer}
              bodyParts={[{name: visualizerName, stats: 1}]}/>}
          </div>
          <div style={styles.configContentContainer}>
            <div style={styles.toggleTxtContainer}>
              <div>Toggle</div>
              <div>Chart Type</div>
            </div>
            <button
              style={chartType === chartTypes.daytime ? styles.mainButton : styles.mainButtonInactive}
              onClick={() => {this.setState({ statType: 'mean', chartType: chartTypes.daytime })}}>
              Time of Day
            </button>
            <button
              style={chartType === chartTypes.calendar ? styles.mainButton : styles.mainButtonInactive}
              onClick={() => {this.setState({ statType: 'mean', chartType: chartTypes.calendar })}}>
              Pain Over Time
            </button>
            <button
              style={chartType === chartTypes.histogram ? styles.mainButton : styles.mainButtonInactive}
              onClick={() => {this.setState({ statType: 'mean', chartType: chartTypes.histogram })}}>
              Histogram
            </button>
          </div>
        </div>
        <div style={styles.mainContentContainer}>
          <div style={styles.graphContainer}>
            <div style={styles.graphTitle}>
              {chartType === chartTypes.daytime && 'Pain Throughout the Day'}
              {chartType === chartTypes.calendar && 'Pain Over Time'}
              {chartType === chartTypes.histogram && 'Frequency of Pain'}
            </div>
            {chartType === chartTypes.daytime &&
              <DaytimeChart
                graphStyle={styles.graph}
                daytimeDatasets={[daytimeStats]}
                statType={statType} />}

            {chartType === chartTypes.calendar &&
              <CalendarChart
                graphStyle={styles.graph}
                movingStats={[...movingStats].reverse()}
                calendarStats={[...calendarStats].reverse()}
                statType={statType} />}

            {chartType === chartTypes.histogram &&
              <HistogramChart
                graphStyle={styles.graph}
                histograms={[histogram]}
                statType={statType} />}
          </div>

          {this._renderFilterContainer()}

        </div>

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