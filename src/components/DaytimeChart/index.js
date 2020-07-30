import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Label, Tooltip } from 'recharts';

import AppColors from 'Common/AppColors';
import AppStyles from 'Common/AppStyles';
import RotatedAxisTick from 'Components/RotatedAxisTick';
import styles from './style';

const daytimeOrder = {
  sleep: 0,
  wakeup: 1,
  morning: 2,
  lunch: 3,
  afternoon: 4,
  evening: 5,
  bed_time: 6,
}

const daytimes = {
  sleep: 'Sleep',
  wakeup: 'Wake Up',
  morning: 'Morning',
  lunch: 'Lunch',
  afternoon: 'Afternoon',
  evening: 'Evening',
  bed_time: 'Bed Time',
};

const daytimeStatTypes = {
  mean: 'Mean',
  median: 'Median',
  high: 'Max',
  low: 'Min',
  stdev: 'Std Dev'
}

class DaytimeChart extends React.Component {

  _computeChartData = (statDisplayName) => {
    const { daytimeStats, statType } = this.props;

    // Initialize the dictionary with bucket names corresponding to time of day.
    let dataDict = {};
    for (const [daytime, daytimeName] of Object.entries(daytimes)) {
      dataDict[daytime] = { daytimeName };
    }

    // Fill the dictionary with daytime pain level data.
    for (const [daytime, stats] of Object.entries(daytimeStats)) {
      dataDict[daytime][statDisplayName] = stats ? Number(stats[statType]).toFixed(1) : 0
    }

    // Sort the buckets in ascending order of time of day.
    let data = Object.values(dataDict);
    data.sort((a, b) => {
      return daytimeOrder[a.daytime] - daytimeOrder[b.daytime];
    });

    return data;
  }

  _renderChart = (statDisplayName) => {
    const { width, height, fontSize } = this.props;

    const data = this._computeChartData(statDisplayName);

    return (
      <BarChart
        style={{position: 'relative'}}
        margin={{ top: 8, right: 0, bottom: 32, left: -30 }}
        width={width} height={height}
        data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          interval={0}
          tick={width < 500 ? <RotatedAxisTick fontSize={fontSize}/> : {fontSize}}
          dataKey='daytimeName' />
        <YAxis
          domain={[0, 10]}
          ticks={[0, 2, 4, 6, 8, 10]} />
        <Tooltip />
        <Bar
          dataKey={statDisplayName}
          fill={AppColors.barSeries[0]} />
      </BarChart>
    );
  }

  _renderNoDataAlert = () => {
    const { width, height } = this.props;

    return (
      <div style={styles.noDataContainer(height, width)}>
        <div>Not enough entries yet!</div>
        <div>Add more to see a histogram of your pain levels.</div>
      </div>
    )
  }

  render() {
    const { daytimeStats, statType, height } = this.props;

    const statDisplayName = daytimeStatTypes[statType];

    return (
      <div style={AppStyles.rowCenter}>

        <div style={styles.yLabelContainer(height)}>
          <div style={styles.yLabel}>{statDisplayName} Pain Level</div>
        </div>

        {this._renderChart(statDisplayName)}

        {(daytimeStats.length <= 0) && this._renderNoDataAlert()}

      </div>
    )
  }
}

export default DaytimeChart;