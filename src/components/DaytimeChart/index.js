import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Label, Tooltip } from 'recharts';

import AppColors from 'Common/AppColors';
import AppStyles from 'Common/AppStyles';
import RotatedAxisTick from 'Components/RotatedAxisTick';

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

  render() {
    const { daytimeDatasets, statType, graphStyle, width, height, fontSize } = this.props;

    const statDisplayName = daytimeStatTypes[statType];

    let dataDict = {};
    let i = 0;
    for (var dataset of daytimeDatasets) {
      for (const [daytime, stats] of Object.entries(dataset)) {
        if (!dataDict[daytime]) {
          dataDict[daytime] = { daytime, daytimeName: daytimes[daytime] };
        }

        dataDict[daytime][statDisplayName] = stats ? Number(stats[statType]).toFixed(1) : 0
      }
      i++;
    }

    let data = Object.values(dataDict);
    data.sort((a, b) => {
      return daytimeOrder[a.daytime] - daytimeOrder[b.daytime];
    });

    return (
      <div style={AppStyles.rowCenter}>
        <div style={{...AppStyles.center, height: (height-66), alignSelf: 'flex-start'}}>
          <div style={styles.yLabel}>{statDisplayName} Pain Level</div>
        </div>
        <BarChart width={width} height={height} data={data} margin={{ top: 8, right: 0, bottom: 32, left: -30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            interval={0}
            tick={width < 500 ? <RotatedAxisTick fontSize={fontSize}/> : {fontSize}}
            dataKey='daytimeName' />
          <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
          <Tooltip />
          {daytimeDatasets.map((_, index) => {
            const key = statDisplayName
            return <Bar key={key} dataKey={key} fill={AppColors.barSeries[index % AppColors.barSeries.length]} />
          })}
        </BarChart>
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

export default DaytimeChart;