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

    let tickMoment = moment(firstEntryMoment).add(daysAfter+1, 'days');
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

    const maxBarSize = 60;
    const xTickCount = width < 600 ? (width < 450 ? (width < 350 ? 4 : 6) : 9) : 12;
    const xDomain = [-1, data[data.length-1].timeDiff+1];

    return (
      <div style={AppStyles.rowCenter}>
        <div style={{...AppStyles.center, height: (height-66), alignSelf: 'flex-start'}}>
          <div style={styles.yLabel}>{statDisplayName} Pain Level</div>
        </div>
        <ComposedChart width={width} height={height} data={data} margin={{ top: 8, right: 0, bottom: 8, left: -30 }}>
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
          <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
          <Tooltip labelFormatter={v => { return this._formatXAxisTick(firstEntryMoment, v) }}/>
          <Legend height={36}/>
          <Area type='monotone' dataKey={'3-Day Moving Average'} />
          <Bar dataKey={`${statDisplayName} Daily Pain Level`} minPointSize={5} maxBarSize={maxBarSize} fill={AppColors.barSeries[0 % AppColors.barSeries.length]} />
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