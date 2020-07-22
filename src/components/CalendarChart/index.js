import React from "react";
import { ComposedChart, Bar, Area, CartesianGrid, XAxis, YAxis, Label, Legend, Tooltip } from 'recharts';
import moment from 'moment';

import AppStyles from 'Common/AppStyles';
import AppColors from 'Common/AppColors';

const calendarStatTypes = {
  mean: 'Mean',
  high: 'Max',
  low: 'Min',
  stdev: 'Std Dev'
}

class CalendarChart extends React.Component {

  _formatXAxisTick = (firstEntryMoment, daysAfter) => {

    let tickMoment = moment(firstEntryMoment).add(daysAfter, 'days');
    return tickMoment.format('MM/DD');
  }

  render() {
    const { movingStats, calendarStats, statType, width, height, fontSize } = this.props;

    const statDisplayName = calendarStatTypes[statType];

    const firstEntryMoment = moment(calendarStats[0].date);
    const lastEntryMoment = moment(calendarStats[calendarStats.length-1].date);

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

    let dataDict = {};
    for (var calendarDay of movingStats) {
      const currentMoment = moment(calendarDay.date);
      const timeDiff = currentMoment.diff(firstEntryMoment,'days');

      if (!dataDict[timeDiff]) {
        dataDict[timeDiff] = { timeDiff, tickValue: currentMoment.format('MM/DD/YY') };
      }

      dataDict[timeDiff]['3-Day Moving Average'] =  Number(calendarDay.stats[statType]).toFixed(2);
    }

    for (var calendarDay of calendarStats) {
      const currentMoment = moment(calendarDay.date);
      const timeDiff = currentMoment.diff(firstEntryMoment,'days');

      if (!dataDict[timeDiff]) {
        dataDict[timeDiff] = { timeDiff };
      }

      dataDict[timeDiff][`${statDisplayName} Daily Pain Level`] =  Number(calendarDay.stats[statType]).toFixed(2);
    }

    let data = Object.values(dataDict);
    data.sort((a, b) => {
      return a.timeDiff - b.timeDiff;
    });

    return (
      <div style={AppStyles.rowCenter}>
        <div style={{...AppStyles.center, height: height}}>
          <div style={styles.yLabel}>{statDisplayName} Pain Level</div>
        </div>
        <ComposedChart width={width} height={height} data={data} margin={{ top: 8, right: 0, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis tick={{fontSize}} dataKey='timeDiff' type='number' tickFormatter={v => { return this._formatXAxisTick(firstEntryMoment, v) }} padding={{left: 30, right: 30}}/>
          <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
          <Tooltip labelFormatter={v => { return this._formatXAxisTick(firstEntryMoment, v) }}/>
          <Legend height={36}/>
          <Area type='monotone' dataKey={'3-Day Moving Average'} />
          <Bar dataKey={`${statDisplayName} Daily Pain Level`} fill={AppColors.barSeries[0 % AppColors.barSeries.length]} />
        </ComposedChart>
      </div>
    )
  }
}

const styles = {
  yLabel: {
    width: 30,
    borderRadius: 20,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 10,
    backgroundColor: AppColors.lilac,
    color: AppColors.blue,
    writingMode: 'vertical-rl',
    textOrientation: 'sideways',
  }
}

export default CalendarChart;