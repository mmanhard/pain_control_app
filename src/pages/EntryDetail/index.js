import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from 'Actions';
import Navbar from 'Components/Navbar';
import styles from './style';
import AppStyles from 'Common/AppStyles';
import AppColors from 'Common/AppColors';

class EntryDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // <BodyVisualizer
  //   contentContainerStyle={styles.visualizer}
  //   bodyParts={visualizerBodyParts}
  //   clickBodyPartFound={(part) => { this.setState({currentBodyPartID: part.id})}}
  //   clickBodyPartNotFound={this._displayAddBodyPart} />

  render() {
    const { userInfo, bodyParts, entryInfo, logout } = this.props;
    const { currentBodyPartID } = this.state;

    let part, currentBodyPart;
    for (part of bodyParts) {
      if (currentBodyPartID && part.id == currentBodyPartID) {
        currentBodyPart = part;
        break;
      }
    }

    console.log(entryInfo);

    return (
      <div style={styles.container}>
        <Navbar userInfo={userInfo} logout={logout}/>
        <div style={styles.contentContainer}>
          <div style={styles.leftContentContainer}>
            <div style={{ flex: 1, width: '100%', position: 'relative'}}>
              <div style={styles.titleContainer}>
                <div>My</div>
                <div>Pain Map</div>
              </div>
              <button style={styles.helpIcon}>?</button>

            </div>
            <div style={styles.painLegend}>
              <div>
                <p style={{marginLeft: 40, marginBottom: 0  }}>Pain</p>
                <p style={{marginLeft: 40, marginTop: 0 }}>Legend</p>
              </div>
              <div style={{flex: 1}}>
                <div style={styles.painLegendNumbers}>
                  <div style={{flex: 0.5}}></div>
                  {Object.entries(AppColors.painLevelColors).map(([type, color]) => {
                    if (type === 'none') {
                      return (
                        <div key={type} style={{flex: 1.5, ...AppStyles.rowEnd, paddingRight: 18}}>
                          <div style={{ ...styles.painLegendColor, backgroundColor: color}}></div>
                        </div>
                      );
                    }
                    return (
                      <div key={type} style={{flex: 1, ...AppStyles.rowCenter}}>
                        <div style={{ ...styles.painLegendColor, backgroundColor: color}}></div>
                      </div>
                    );
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
          </div>
          <div style={styles.rightContentContainer}>
            <div style={{ ...AppStyles.typContentContainer, padding: 30, flex: 1, ...AppStyles.columnStart }}>
              <div style={{ ...AppStyles.rowSpace, height: 110, width: '100%', position: 'relative'}}>
                <div style={styles.titleContainer}>
                  <div>{currentBodyPart ? `${currentBodyPart.location} ${currentBodyPart.name}` : 'General'}</div>
                  <div>Stats</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.users.userInfo,
  bodyParts: state.bodyParts.bodyParts,
  entryInfo: state.users.entryInfo
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryDetail);