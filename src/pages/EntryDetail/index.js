import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import actions from 'Actions';
import AppColors from 'Common/AppColors';
import withWindowDimensions from 'Common/AppDimens';
import AppStyles from 'Common/AppStyles';
import BodyVisualizer from 'Components/BodyVisualizer';
import Button from 'Components/Button';
import LoadingSpinner from 'Components/LoadingSpinner';
import Navbar from 'Components/Navbar';
import styles from './style';

class EntryDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBodyPartID: undefined
    };
  }

  componentDidMount() {
    const { userInfo, entryID, isSmallScreen } = this.props;
    this.props.getEntry(userInfo, entryID, {});
  }

  _renderPainLegend = () => {
    return (
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
    );
  }

  _renderLeftContainer = (currentBodyPart, currentSubentry) => {
    const { entryInfo, isSmallScreen, isMediumScreen } = this.props;

    const visualizerBodyParts = entryInfo.pain_subentries.map(subentry => {
      const part = subentry.body_part;
      const displayName = part.location ? `${part.location}_${part.name}` : part.name;
      return ({
        name: displayName,
        id: part.id,
        stats: subentry.pain_level
      });
    });

    const date = moment(entryInfo.date).utc();

    return (
      <div style={styles.leftContentContainer(isSmallScreen)}>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 20, marginBottom: 20}}>
          <div style={styles.titleContainer(isSmallScreen)}>
            <div>{date.format('MMMM Do, YYYY')}</div>
            <div>{date.format('h:mm a')}</div>
          </div>
          <Button btnStyles={styles.helpBtn}>
            <div style={styles.helpIcon}>?</div>
          </Button>
        </div>
        <div style={{width: '90%', ...AppStyles.rowSpace, alignItems: 'center'}}>
          <BodyVisualizer
            contentContainerStyle={styles.visualizer(isSmallScreen, isMediumScreen)}
            bodyParts={visualizerBodyParts}
            clickBackground={() => { this.setState({currentBodyPartID: undefined })}}
            clickBodyPartFound={(part) => { this.setState({currentBodyPartID: part.id})}}
            clickBodyPartNotFound={this._displayAddBodyPart} />
          {!isSmallScreen && isMediumScreen && this._renderRightContainer(currentBodyPart, currentSubentry)}
          {isSmallScreen && this._renderTitle(currentBodyPart, currentSubentry)}
        </div>
        {isSmallScreen && this._renderRightContainer(currentBodyPart, currentSubentry)}
        {!isSmallScreen && this._renderPainLegend()}
      </div>
    );
  }

  _renderBodyPartStats = (currentSubentry) => {
    const { entryInfo, isSmallScreen, isMediumScreen, history } = this.props;
    const { currentBodyPartID } = this.state;

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

    return (
      <div style={styles.statsContainer(isSmallScreen)}>
        <div style={styles.statsRow}>
          <div style={styles.subtitleContainer}>Changes</div>

          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{currentComparisons.lastEntry}</div>
            <div style={styles.statTitle}>Last Entry</div>
          </div>

          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{currentComparisons.yesterday}</div>
            <div style={styles.statTitle}>Yesterday</div>
          </div>

          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{currentComparisons.lastWeek}</div>
            <div style={styles.statTitle}>Last Week</div>
          </div>
        </div>

        <div style={styles.statsRow}>
          <div style={styles.notesContainer}>
            {currentSubentry.notes ? currentSubentry.notes : 'No notes with this pain point.'}
          </div>
          <Button
            onClick={() => {
              history.push(`../pain_points/${currentBodyPartID}`)}
            }
            btnStyles={styles.mainButton(isSmallScreen, isMediumScreen)}>
            View Pain Point
          </Button>
        </div>
      </div>
    );
  }

  _renderGeneralStats = () => {
    const { entryInfo, isSmallScreen, isMediumScreen } = this.props;

    return (
      <div style={styles.statsContainer(isSmallScreen)}>
        <div style={styles.statsRow}>
          <div style={styles.subtitleContainer}>Stats</div>

          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{Number(entryInfo.stats?.high).toFixed(1)}</div>
            <div style={{...styles.statTitle, marginBottom: 0}}>Max</div>
            <div style={{...styles.statTitle, marginTop: 0}}>Pain Level</div>
          </div>

          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{Number(entryInfo.stats?.low).toFixed(1)}</div>
            <div style={{...styles.statTitle, marginBottom: 0}}>Min</div>
            <div style={{...styles.statTitle, marginTop: 0}}>Pain Level</div>
          </div>

          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{Number(entryInfo.stats?.avg).toFixed(1)}</div>
            <div style={{...styles.statTitle, marginBottom: 0}}>Mean</div>
            <div style={{...styles.statTitle, marginTop: 0}}>Pain Level</div>
          </div>

          {!isMediumScreen && <div style={styles.statContainer}>
            <div style={styles.statTxt}>{entryInfo.stats?.num_body_parts}</div>
            <div style={{...styles.statTitle, marginBottom: 0}}># of Pain</div>
            <div style={{...styles.statTitle, marginTop: 0}}>Points</div>
          </div>}
        </div>

        <div style={styles.statsRow}>
          <div style={styles.notesContainer}>
            {entryInfo.notes}
          </div>
        </div>
      </div>
    );
  }

  _renderTitle = (currentBodyPart, currentSubentry) => {
    const { isSmallScreen, isMediumScreen } = this.props;

    return (
      <div style={styles.titleRow(isSmallScreen, isMediumScreen)}>
        <div style={styles.titleContainer(isMediumScreen)}>
          <div>{currentBodyPart ? `${currentBodyPart.location} ${currentBodyPart.name}` : 'General'}</div>
        </div>
        {currentSubentry && <div style={styles.painLevelTxt(isSmallScreen)}>{currentSubentry.pain_level.toFixed(1)}</div>}
      </div>
    )
  }

  _renderRightContainer = (currentBodyPart, currentSubentry) => {
    const { isSmallScreen, isMediumScreen } = this.props;

    return (
      <div style={styles.rightContentContainer(isSmallScreen, isMediumScreen)}>
        {!isSmallScreen && this._renderTitle(currentBodyPart, currentSubentry)}
        {currentSubentry ? this._renderBodyPartStats(currentSubentry) : this._renderGeneralStats()}
      </div>
    );
  }

  render() {
    const { userInfo, entryInfo, isFetching, isSmallScreen, isMediumScreen, logout } = this.props;
    const { currentBodyPartID } = this.state;


    let subentry, currentSubentry, currentBodyPart;
    if (entryInfo) {
      for (subentry of entryInfo.pain_subentries) {
        const part = subentry.body_part;
        if (currentBodyPartID && part.id == currentBodyPartID) {
          currentBodyPart = part;
          currentSubentry = subentry;
          break;
        }
      }
    }

    return (
      <div style={styles.container(isSmallScreen)}>
        <Navbar userInfo={userInfo} logout={logout}/>
        <div style={styles.contentContainer(isSmallScreen, isMediumScreen)}>
          {entryInfo && this._renderLeftContainer(currentBodyPart, currentSubentry)}
          {entryInfo && !isMediumScreen && this._renderRightContainer(currentBodyPart, currentSubentry)}

          {(!entryInfo || isFetching) && <LoadingSpinner />}
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.entries.isFetching,
  userInfo: state.users.userInfo,
  entryInfo: state.entries.entryInfo
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withWindowDimensions(EntryDetail)));