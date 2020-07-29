import React from "react";

import AppStyles from 'Common/AppStyles';
import AppColors from 'Common/AppColors';
import RotatedAxisTick from 'Components/RotatedAxisTick';

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

  render() {
    const { histograms, statType, width, height, fontSize } = this.props;

    const statDisplayName = histogramStatTypes[statType];

    let maxCount = 0;
    let dataDict = {};
    let i = 0;
    for (var histogram of histograms) {
      for (const [key, value] of Object.entries(histogram[statType])) {
        const bucketName = width < 500 ? bucketNames[key].split(' ').slice(0, -1).join(' ') : bucketNames[key];
        if (!dataDict[key]) {
          dataDict[key] = { key, bucketName };
        }

        dataDict[key]['Quantity'] = value;
        if (value > maxCount) maxCount = value;
      }
      i++;
    }

    let data = Object.values(dataDict);
    data.sort((a, b) => {
      return bucketOrder[a.key] - bucketOrder[b.key];
    });


    return (
      <div style={AppStyles.rowCenter}>
        <div style={{...AppStyles.center, height: height}}>
          <div style={styles.yLabel}># of Daily Occurences</div>
        </div>
        <div style={AppStyles.center}>
          <BarChart width={width} height={height} data={data} margin={{ top: 8, right: 0, bottom: width < 500 ? 32 : 8, left: -30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              interval={0}
              tick={width < 500 ? <RotatedAxisTick fontSize={fontSize}/> : {fontSize}}
              dataKey='bucketName' />
            <YAxis domain={[0, Math.ceil(1.25 * maxCount)]} type='number' />
            <Tooltip />
            {histograms.map((_, index) => {
              const key = 'Quantity';
              return <Bar key={key} dataKey={key} fill={AppColors.barSeries[index % AppColors.barSeries.length]} />
            })}
          </BarChart>
          {width >= 400 && <div style={styles.xLabel}>{statDisplayName} Pain Levels</div>}
        </div>
      </div>
    )
  }
}

const styles = {
  xLabel: {
    height: 30,
    marginBottom: 20,
    borderRadius: 20,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    backgroundColor: AppColors.lilac,
    color: AppColors.blue,
  },
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

export default HistogramChart;