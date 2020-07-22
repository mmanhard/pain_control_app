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
import Button from 'Components/Button';
import withWindowDimensions from 'Common/AppDimens';

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

  _renderTitleContainer = () => {
    const { bodyPartInfo, isSmallScreen } = this.props;

    const displayName = bodyPartInfo?.location ? `${bodyPartInfo.location} ${bodyPartInfo.name}` : bodyPartInfo.name;
    const visualizerName = bodyPartInfo?.location ? `${bodyPartInfo.location}_${bodyPartInfo.name}` : bodyPartInfo.name;

    return (
      <div style={styles.titleContainer(isSmallScreen)}>
        <div style={styles.titleTxt(isSmallScreen)}>My {displayName}</div>
        {!isSmallScreen && <BodyVisualizer
          clickBodyPartFound={() => {}}
          clickBodyPartNotFound={() => {}}
          contentContainerStyle={styles.miniVisualizer}
          bodyParts={[{name: visualizerName, stats: 1}]}/>}
      </div>
    );
  }

  _renderConfigContainer = () => {
    const { isSmallScreen } = this.props;
    const { chartType } = this.state;

    const mainBtnStyles = styles.mainButton(isSmallScreen);
    const inactiveBtnStyles = styles.mainButtonInactive(isSmallScreen);

    return (
      <div style={styles.configContentContainer(isSmallScreen)}>
        <div style={styles.toggleTxtContainer(isSmallScreen)}>Toggle Chart Type</div>
        <Button
          btnStyles={chartType === chartTypes.daytime ? mainBtnStyles : inactiveBtnStyles}
          onClick={() => {this.setState({ statType: 'mean', chartType: chartTypes.daytime })}}>
          Time of Day
        </Button>
        <Button
          btnStyles={chartType === chartTypes.calendar ? mainBtnStyles : inactiveBtnStyles}
          onClick={() => {this.setState({ statType: 'mean', chartType: chartTypes.calendar })}}>
          Pain Over Time
        </Button>
        <Button
          btnStyles={chartType === chartTypes.histogram ? mainBtnStyles : inactiveBtnStyles}
          onClick={() => {this.setState({ statType: 'mean', chartType: chartTypes.histogram })}}>
          Histogram
        </Button>
      </div>
    );
  }

  _renderGraphContainer = () => {
    const { bodyPartInfo, isMobile, isSmallScreen, isMediumScreen, windowWidth } = this.props;
    const { chartType, statType } = this.state;

    let daytimeStats = bodyPartInfo?.stats.daytime;
    let calendarStats = bodyPartInfo?.stats.calendar;
    let movingStats = bodyPartInfo?.stats.moving;
    let histogram =  bodyPartInfo?.stats.histogram;

    let graphWidth = isSmallScreen ? 0.8 * windowWidth : 0.6 * windowWidth;
    let graphHeight = styles.graphHeight(isMobile, isSmallScreen);
    let graphFontSize = isSmallScreen ? 10 : 16;

    return (
      <div style={styles.mainContentContainer(isSmallScreen, isMediumScreen)}>
        <div style={styles.graphContainer(isSmallScreen)}>
          <div style={styles.graphTitle}>
            {chartType === chartTypes.daytime && 'Pain Throughout the Day'}
            {chartType === chartTypes.calendar && 'Pain Over Time'}
            {chartType === chartTypes.histogram && 'Frequency of Pain'}
          </div>
          {chartType === chartTypes.daytime &&
            <DaytimeChart
              fontSize={graphFontSize}
              width={graphWidth}
              height={graphHeight}
              graphStyle={styles.graph}
              daytimeDatasets={[daytimeStats]}
              statType={statType} />}

          {chartType === chartTypes.calendar &&
            <CalendarChart
              fontSize={graphFontSize}
              width={graphWidth}
              height={graphHeight}
              graphStyle={styles.graph}
              movingStats={[...movingStats].reverse()}
              calendarStats={[...calendarStats].reverse()}
              statType={statType} />}

          {chartType === chartTypes.histogram &&
            <HistogramChart
              fontSize={graphFontSize}
              width={graphWidth}
              height={graphHeight}
              graphStyle={styles.graph}
              histograms={[histogram]}
              statType={statType} />}
        </div>

        {this._renderFilterContainer()}

      </div>
    );
  }

  _renderFilterContainer = () => {
    const { isSmallScreen } = this.props;
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
      <div style={styles.filterContainer(isSmallScreen, customStartDate)}>
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
        {(typeof customStartDate !== 'undefined') && <div style={isSmallScreen ? AppStyles.rowSpace : AppStyles.center}>
          {!isSmallScreen && <div style={styles.filterTxt}>Start Date</div>}
          <input
            type='text'
            style={styles.configTimeTxt(isSmallScreen)}
            name='customStartDate'
            value={customStartDate}
            onChange={this._handleCustomDateChange}
          />
          {!isSmallScreen && <div style={styles.filterTxt}>End Date</div>}
          {isSmallScreen && <div style={styles.filterTxt}>to</div>}
          <input
            type='text'
            style={styles.configTimeTxt(isSmallScreen)}
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

  render() {
    const { userInfo, bodyPartInfo, isSmallScreen, logout } = this.props;
    const { chartType, statType } = this.state;

    // console.log(bodyPartInfo);

    return (
      <div style={styles.container(isSmallScreen)}>

        <Navbar userInfo={userInfo} logout={logout}/>

        <div style={styles.contentContainer(isSmallScreen)}>

          <div style={styles.configContainer(isSmallScreen)}>
            {this._renderTitleContainer()}
            {this._renderConfigContainer()}
          </div>

          {this._renderGraphContainer()}

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
)(withWindowDimensions(PainPointDetail));