import React from "react";

import AppColors from 'Common/AppColors';
import AppStyles from 'Common/AppStyles';

class PainLegend extends React.Component {

  render() {
    const { contentContainerStyle } = this.props;

    // These are the default pain level types / colors that will be iterated
    // over to create the pain legend.
    const painLevels = Object.entries(AppColors.painLevelColors);

    return (
      <div style={contentContainerStyle}>

        <div>
          <p style={{ marginLeft: 40, marginBottom: 0  }}>Pain</p>
          <p style={{ marginLeft: 40, marginTop: 0 }}>Legend</p>
        </div>

        <div style={{flex: 1}}>
          <div style={styles.painLegendNumbers}>

            <div style={{flex: 0.5}} />

            {painLevels.map(([type, color]) => {

              // If 'none' type, this indicates no pain level.
              if (type === 'none') {
                return (
                  <div key={type} style={{flex: 1.5, ...AppStyles.rowEnd, paddingRight: 18}}>
                    <div style={{ ...styles.painLegendColor, backgroundColor: color}}></div>
                  </div>
                );
              } else {
                // All other types correspond to a pain level (e.g. 0-2);
                return (
                  <div key={type} style={{flex: 1, ...AppStyles.rowCenter}}>
                    <div style={{ ...styles.painLegendColor, backgroundColor: color}}></div>
                  </div>
                );
              }
            })}

          </div>

          <div style={styles.painLegendNumbers}>
            <span style={{flex: 1, textAlign: 'center'}}>0</span>
            <span style={{flex: 1, textAlign: 'center'}}>2</span>
            <span style={{flex: 1, textAlign: 'center'}}>4</span>
            <span style={{flex: 1, textAlign: 'center'}}>6</span>
            <span style={{flex: 1, textAlign: 'center'}}>8</span>
            <span style={{flex: 1, textAlign: 'center'}}>10</span>
            <span style={{flex: 1, textAlign: 'end', paddingRight: 16}}>N/A</span>
          </div>
          
        </div>
      </div>
    );
  }
}

const styles = {
  painLegendColor: {
    height: 28,
    width: 28,
    borderRadius: 18,
    border: '2px solid black',
  },
  painLegendNumbers:{
    ...AppStyles.rowCenter,
    flex: 1,
  },
}

export default PainLegend;