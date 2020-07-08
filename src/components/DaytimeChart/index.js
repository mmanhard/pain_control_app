import React from "react";

// import styles from './style';
import AppColors from 'Common/AppColors';
import AppStyles from 'Common/AppStyles';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Label, Tooltip } from 'recharts';

const daytimeOrder = {
  wakeup: 0,
  morning: 1,
  lunch: 2,
  afternoon: 3,
  evening: 4,
  bed_time: 5,
}

const daytimes = {
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
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const { daytimeDatasets, statType, graphStyle } = this.props;

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
      <div style={{...AppStyles.rowCenter}}>
        <div style={{...AppStyles.center, height: 400}}>
          <div style={styles.yLabel}>{statDisplayName} Pain Level</div>
        </div>
        <BarChart width={800} height={400} data={data} style={graphStyle} margin={{ top: 8, right: 0, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey='daytimeName' />
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