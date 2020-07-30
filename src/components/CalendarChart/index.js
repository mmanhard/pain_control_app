import React from "react";
import { ComposedChart, Bar, Area, CartesianGrid, XAxis, YAxis, Label, Legend, Tooltip } from 'recharts';
import moment from 'moment';

import AppColors from 'Common/AppColors';
import AppStyles from 'Common/AppStyles';
import styles from './style';

const calendarStatTypes = {
  mean: 'Mean',
  high: 'Max',
  low: 'Min',
  stdev: 'Std Dev'
}

const maxBarSize = 60;

class CalendarChart extends React.Component {

  _computeChartData = (statDisplayName) => {
    const { movingStats, calendarStats, statType } = this.props;

    // Determine the first and lest calendar days (if there are any). If no
    // entries, use the current day as the first day.
    let firstEntryMoment, lastEntryMoment;
    if (calendarStats.length > 0) {
      firstEntryMoment = moment(calendarStats[0].date);
      lastEntryMoment = moment(calendarStats[calendarStats.length-1].date);
    } else {
      firstEntryMoment = moment();
    }

    // NOT USED - for using date increments that are not just daily.
    // let dateIncrement;
    // if (lastEntryMoment.diff(firstEntryMoment, 'days') <= 63) {
    //   dateIncrement = 'daily';
    // } else if (lastEntryMoment.diff(firstEntryMoment, 'months') <= 6) {
    //   dateIncrement = 'weekly';
    // } else if (lastEntryMoment.diff(firstEntryMoment, 'years') <= 1) {
    //   dateIncrement = 'biweekly';
    // } else {
    //   dateIncrement = 'monthly';
    // }

    // Fill the dictionary with moving average stats. The dictionary keys are
    // number of days from the first entry.
    let dataDict = {};
    for (var calendarDay of movingStats) {
      const currentMoment = moment(calendarDay.date);
      const timeDiff = currentMoment.diff(firstEntryMoment,'days');

      if (!dataDict[timeDiff]) {
        dataDict[timeDiff] = { timeDiff };
      }

      dataDict[timeDiff]['3-Day Moving Average'] =  Number(calendarDay.stats[statType]).toFixed(2);
    }

    // Fill the dictionary with the pain levels on calendar days. The dictionary
    // keys are number of days from the first entry.
    for (var calendarDay of calendarStats) {
      const currentMoment = moment(calendarDay.date);
      const timeDiff = currentMoment.diff(firstEntryMoment,'days');

      if (!dataDict[timeDiff]) {
        dataDict[timeDiff] = { timeDiff };
      }

      dataDict[timeDiff][`${statDisplayName} Daily Pain Level`] =  Number(calendarDay.stats[statType]).toFixed(2);
    }

    // Sort the data in ascending order of date.
    let data = Object.values(dataDict);
    data.sort((a, b) => {
      return a.timeDiff - b.timeDiff;
    });

    return {data, firstEntryMoment, lastEntryMoment};
  }

  // Converts difference in days from the first date to format 'MM/YY'.
  _formatXAxisTick = (firstEntryMoment, daysAfter) => {
    let tickMoment = moment(firstEntryMoment).add(daysAfter+1, 'days');
    return tickMoment.format('MM/DD');
  }

  _renderChart = (statDisplayName) => {
    const { width, height, fontSize } = this.props;

    const { data, firstEntryMoment, lastEntryMoment } = this._computeChartData(statDisplayName);

    // Wide number of tick counts to fill in as many ticks as possible for the
    // current chart width.
    const xTickCount = width < 600 ? (width < 450 ? (width < 350 ? 4 : 6) : 9) : 12;

    // If there are entries, the domain will go from 1 day before the first
    // entry to 1 day after the last. If not, the domain will go from 1 day
    // before today to 1 day after today.
    let xDomain;
    if (data.length > 0) {
      xDomain = [-1, data[data.length-1].timeDiff+1];
    } else {
      xDomain = [-1, 1];
    }

    return (
      <ComposedChart
        style={{position: 'relative'}}
        margin={{ top: 8, right: 0, bottom: 8, left: -30 }}
        width={width} height={height}
        data={data}>
        <CartesianGrid
          strokeDasharray="3 3" />
        <XAxis
          interval={0}
          tickCount={xTickCount}
          domain={xDomain}
          tick={{fontSize}}
          dataKey='timeDiff'
          type='number'
          allowDecimals={false}
          tickFormatter={v => { return this._formatXAxisTick(firstEntryMoment, v) }}
          padding={{left: 40, right: 40}}/>
        <YAxis
          domain={[0, 10]}
          ticks={[0, 2, 4, 6, 8, 10]} />
        <Tooltip labelFormatter={v => { return this._formatXAxisTick(firstEntryMoment, v) }}/>
        <Legend height={36}/>
        <Area
          type='monotone'
          dataKey={'3-Day Moving Average'} />
        <Bar
          dataKey={`${statDisplayName} Daily Pain Level`}
          minPointSize={5}
          maxBarSize={maxBarSize}
          fill={AppColors.barSeries[0]} />
      </ComposedChart>
    );
  }

  _renderNoDataAlert = () => {
    const { width, height } = this.props;

    return (
      <div style={styles.noDataContainer(height, width)}>
        <div>Not enough entries yet!</div>
        <div>Add more to see pain levels over time.</div>
      </div>
    )
  }

  render() {
    const { movingStats, statType, height } = this.props;

    const statDisplayName = calendarStatTypes[statType];

    return (
      <div style={AppStyles.rowCenter}>

        <div style={styles.yLabelContainer(height)}>
          <div style={styles.yLabel}>{statDisplayName} Pain Level</div>
        </div>

        {this._renderChart(statDisplayName)}

        {(movingStats.length <= 1) && this._renderNoDataAlert()}

      </div>
    )
  }
}

export default CalendarChart;