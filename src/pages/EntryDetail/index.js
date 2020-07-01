import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import actions from 'Actions';
import Navbar from 'Components/Navbar';
import styles from './style';
import AppStyles from 'Common/AppStyles';
import AppColors from 'Common/AppColors';
import BodyVisualizer from 'Components/BodyVisualizer';

class EntryDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBodyPartID: undefined
    };
  }

  componentDidMount() {
    const { userInfo, entryID } = this.props;
    this.props.getEntry(userInfo, entryID, {});
  }

  render() {
    const { userInfo, bodyParts, entryInfo, logout } = this.props;
    const { currentBodyPartID } = this.state;

    let subentry, currentSubentry, currentBodyPart;
    for (subentry of entryInfo.pain_subentries) {
      const part = subentry.body_part;
      if (currentBodyPartID && part.id == currentBodyPartID) {
        currentBodyPart = part;
        currentSubentry = subentry;
        break;
      }
    }

    const visualizerBodyParts = entryInfo.pain_subentries.map(subentry => {
      const part = subentry.body_part;
      const displayName = part.location ? `${part.location}_${part.name}` : part.name;
      return ({
        name: displayName,
        id: part.id,
        stats: subentry.pain_level
      });
    });

    console.log(visualizerBodyParts);

    let currentComparisons;
    if (currentBodyPartID) {
      currentComparisons = {};

      const lastEntry = entryInfo.comparisons.most_recent[currentBodyPartID];
      currentComparisons.lastEntry = lastEntry ? lastEntry.toString() : '-';
      if (!currentComparisons.lastEntry.startsWith('-')) {
        currentComparisons.lastEntry = '+' + currentComparisons.lastEntry;
      }

      const yesterday = entryInfo.comparisons.yesterday[currentBodyPartID];
      currentComparisons.yesterday = yesterday ? yesterday.toString() : '-';
      if (!currentComparisons.yesterday.startsWith('-')) {
        currentComparisons.yesterday = '+' + currentComparisons.yesterday;
      }

      const lastWeekComp = entryInfo.comparisons.last_week[currentBodyPartID];
      currentComparisons.lastWeek = lastWeekComp ? lastWeekComp.toString() : '-';
      if (!currentComparisons.lastWeek.startsWith('-')) {
        currentComparisons.lastWeek = '+' + currentComparisons.lastWeek;
      }

    }

    console.log(currentSubentry);

    const date = moment(entryInfo.date).utc();
    return (
      <div style={styles.container}>
        <Navbar userInfo={userInfo} logout={logout}/>
        <div style={styles.contentContainer}>
          <div style={styles.leftContentContainer}>
            <div style={{ flex: 1, width: '100%', position: 'relative'}}>
              <div style={styles.titleContainer}>
                <div>{date.format('MMMM Do, YYYY')}</div>
                <div>{date.format('h:mm a')}</div>
              </div>
              <button style={styles.helpIcon}>?</button>
              <BodyVisualizer
                contentContainerStyle={styles.visualizer}
                bodyParts={visualizerBodyParts}
                clickBackground={() => { this.setState({currentBodyPartID: undefined })}}
                clickBodyPartFound={(part) => { this.setState({currentBodyPartID: part.id})}}
                clickBodyPartNotFound={this._displayAddBodyPart} />
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
              <div style={{ ...AppStyles.rowEnd, height: 110, width: '100%', position: 'relative'}}>
                <div style={styles.titleContainer}>
                  <div>{currentBodyPart ? `${currentBodyPart.location} ${currentBodyPart.name}` : 'General'}</div>
                </div>
                {currentSubentry && <div style={styles.painLevelTxt}>{currentSubentry.pain_level.toFixed(1)}</div>}
              </div>
              {currentSubentry ? (
                <div style={styles.statsContainer}>
                  <div style={styles.statsRow}>
                    <div style={styles.subtitleContainer}>Stats</div>
                    <div style={styles.statContainer}>
                      <div style={styles.statTxt}>{currentSubentry.pain_level.toFixed(1)}</div>
                      <div style={styles.statTitle}>Pain Level</div>
                    </div>
                    <div style={styles.statContainer}>
                      <div style={styles.statTxt}>{currentComparisons.lastEntry}</div>
                      <div style={{...styles.statTitle, marginBottom: 0}}>Change From</div>
                      <div style={{...styles.statTitle, marginTop: 0}}>Last Entry</div>
                    </div>
                    <div style={styles.statContainer}>
                      <div style={styles.statTxt}>{currentComparisons.yesterday}</div>
                      <div style={{...styles.statTitle, marginBottom: 0}}>Change From</div>
                      <div style={{...styles.statTitle, marginTop: 0}}>Yesterday</div>
                    </div>
                    <div style={styles.statContainer}>
                      <div style={styles.statTxt}>{currentComparisons.lastWeek}</div>
                      <div style={{...styles.statTitle, marginBottom: 0}}>Change From</div>
                      <div style={{...styles.statTitle, marginTop: 0}}>Last Week</div>
                    </div>
                  </div>
                  <div style={styles.statsRow}>
                    <div style={styles.notesContainer}>
                      {currentSubentry.notes ? currentSubentry.notes : 'No notes with this pain point.'}
                    </div>
                    <div styles={styles.buttonContainer}>
                      <button
                        onClick={() => {
                          this.props.history.push('/');
                          this.props.history.push(`pain_points/${currentBodyPartID}`)}
                        }
                        style={styles.mainButton}>
                        View Pain Point
                      </button>
                      <button style={styles.mainButtonInactive}>
                        Edit Entry
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={styles.statsContainer}>
                  <div style={styles.statsRow}>
                    <div style={styles.subtitleContainer}>Stats</div>
                    <div style={styles.statContainer}>
                      <div style={styles.statTxt}>{Number(entryInfo.stats?.high).toFixed(1)}</div>
                      <div style={styles.statTitle}>Max Pain Level</div>
                    </div>
                    <div style={styles.statContainer}>
                      <div style={styles.statTxt}>{Number(entryInfo.stats?.low).toFixed(1)}</div>
                      <div style={styles.statTitle}>Min Pain Level</div>
                    </div>
                    <div style={styles.statContainer}>
                      <div style={styles.statTxt}>{Number(entryInfo.stats?.avg).toFixed(1)}</div>
                      <div style={styles.statTitle}>Mean Pain Level</div>
                    </div>
                    <div style={styles.statContainer}>
                      <div style={styles.statTxt}>{entryInfo.stats?.num_body_parts}</div>
                      <div style={styles.statTitle}># of Pain Points</div>
                    </div>
                  </div>
                  <div style={styles.statsRow}>
                    <div style={styles.notesContainer}>
                      {entryInfo.notes}
                    </div>
                    <div styles={styles.buttonContainer}>
                      <button style={styles.mainButtonInactive}>
                        Edit Entry
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
  entryInfo: state.entries.entryInfo
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EntryDetail));