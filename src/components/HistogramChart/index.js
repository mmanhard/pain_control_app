import React from "react";

import AppColors from 'Common/AppColors';
import AppStyles from 'Common/AppStyles';
import RotatedAxisTick from 'Components/RotatedAxisTick';
import styles from './style';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Label, Tooltip } from 'recharts';

const bucketOrder = {
  none: 0,
  low: 1,
  medium: 2,
  high: 3,
  xHigh: 4,
}

const bucketNames = {
  none: 'Very Low (0-2)',
  low: 'Low (2-4)',
  medium: 'Medium (4-6)',
  high: 'High (6-8)',
  xHigh: 'Very High (8-10)',
}

const histogramStatTypes = {
  mean: 'Mean',
  median: 'Median',
  high: 'Max',
  low: 'Min',
}

class HistogramChart extends React.Component {

  _computeChartData = () => {
    const { histogram, statType, width } = this.props;

    // Initialize the dictionary with bucket names corresponding to pain levels.
    let dataDict = {};
    for (var [bucket, bucketName] of Object.entries(bucketNames)) {
      bucketName = width < 500 ? bucketName.split(' ').slice(0, -1).join(' ') : bucketName;

      dataDict[bucket] = { bucketName };
    }

    // Fill the dictionary with histogram data.
    let maxCount = 0;
    if (histogram[statType]) {
      for (const [bucket, count] of Object.entries(histogram[statType])) {
        dataDict[bucket]['Quantity'] = count;
        if (count > maxCount) maxCount = count;
      }
    }

    // Sort the buckets in ascending order of pain level.
    let data = Object.values(dataDict);
    data.sort((a, b) => {
      return bucketOrder[a.key] - bucketOrder[b.key];
    });

    return {data, maxCount};
  }

  _renderChart = () => {
    const { width, height, fontSize } = this.props;

    const { data, maxCount } = this._computeChartData();

    return (
      <BarChart
        style={{position: 'relative'}}
        width={width} height={height}
        data={data}
        margin={{ top: 8, right: 0, bottom: width < 500 ? 32 : 8, left: -30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          interval={0}
          tick={width < 500 ? <RotatedAxisTick fontSize={fontSize}/> : {fontSize}}
          dataKey='bucketName' />
        <YAxis
          domain={[0, maxCount + 2]}
          type='number' />
        <Tooltip />
        <Bar
          dataKey={'Quantity'}
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
    const { histogram, statType, width, height } = this.props;

    const statDisplayName = histogramStatTypes[statType];

    return (
      <div style={AppStyles.rowCenter}>

        <div style={styles.yLabelContainer(height)}>
          <div style={styles.yLabel}># of Daily Occurences</div>
        </div>

        <div style={AppStyles.center}>
          {this._renderChart()}
          {width >= 400 && <div style={styles.xLabel}>{statDisplayName} Pain Levels</div>}
          {(!histogram[statType]) && this._renderNoDataAlert()}
        </div>

      </div>
    )
  }
}

export default HistogramChart;