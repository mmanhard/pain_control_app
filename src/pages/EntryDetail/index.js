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
import PainLegend from 'Components/PainLegend';
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

  // Format the given stat. If it does not exist or is not a number, return '-'.
  // Otherwise, return the number to one decimal place.
  _formatStat = (stat) => {
    return isNaN(stat) ? '-' : Number(stat).toFixed(1);
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
        {!isSmallScreen && <PainLegend contentContainerStyle={styles.painLegend} />}
      </div>
    );
  }

  // Renders stats for the current selected body part. Includes the pain level
  // indicated for the entry and compares it to previous entries.
  _renderBodyPartStats = (currentSubentry) => {
    const { entryInfo, isSmallScreen, isMediumScreen, history } = this.props;
    const { currentBodyPartID } = this.state;

    // Format the comparisons to the most recent entry, yesterday, and last week.
    let lastEntry, yesterday, lastWeek;
    if (currentBodyPartID) {

      lastEntry = entryInfo.comparisons.most_recent[currentBodyPartID];
      lastEntry = this._formatStat(lastEntry);
      if (!isNaN(lastEntry) && lastEntry > 0) {
        lastEntry = '+' + lastEntry.toString();
      }

      yesterday = entryInfo.comparisons.yesterday[currentBodyPartID];
      yesterday = this._formatStat(yesterday);
      if (!isNaN(yesterday) && yesterday > 0) {
        yesterday = '+' + yesterday.toString();
      }

      lastWeek = entryInfo.comparisons.last_week[currentBodyPartID];
      lastWeek = this._formatStat(lastWeek);
      if (!isNaN(lastWeek) && lastWeek > 0) {
        lastWeek = '+' + lastWeek.toString();
      }

    }

    return (
      <div style={styles.statsContainer(isSmallScreen)}>
        <div style={styles.statsRow}>
          <div style={styles.subtitleContainer}>Changes</div>

          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{lastEntry}</div>
            <div style={styles.statTitle}>Last Entry</div>
          </div>

          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{yesterday}</div>
            <div style={styles.statTitle}>Yesterday</div>
          </div>

          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{lastWeek}</div>
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

  // Renders general stats. Displayed when no body part has been selected.
  _renderGeneralStats = () => {
    const { entryInfo, isSmallScreen, isMediumScreen } = this.props;

    let stats = entryInfo?.stats;

    return (
      <div style={styles.statsContainer(isSmallScreen)}>
        <div style={styles.statsRow}>

          <div style={styles.subtitleContainer}>Stats</div>

          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{this._formatStat(stats?.high)}</div>
            <div style={{...styles.statTitle, marginBottom: 0}}>Max</div>
            <div style={{...styles.statTitle, marginTop: 0}}>Pain Level</div>
          </div>

          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{this._formatStat(stats?.low)}</div>
            <div style={{...styles.statTitle, marginBottom: 0}}>Min</div>
            <div style={{...styles.statTitle, marginTop: 0}}>Pain Level</div>
          </div>

          <div style={styles.statContainer}>
            <div style={styles.statTxt}>{this._formatStat(stats?.avg)}</div>
            <div style={{...styles.statTitle, marginBottom: 0}}>Mean</div>
            <div style={{...styles.statTitle, marginTop: 0}}>Pain Level</div>
          </div>

          {!isMediumScreen && <div style={styles.statContainer}>
            <div style={styles.statTxt}>{this._formatStat(stats?.num_body_parts)}</div>
            <div style={{...styles.statTitle, marginBottom: 0}}># of Pain</div>
            <div style={{...styles.statTitle, marginTop: 0}}>Points</div>
          </div>}

        </div>

        <div style={styles.statsRow}>
          <div style={styles.notesContainer}>
            {entryInfo.notes ? entryInfo.notes : 'No general notes with this entry.'}
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
          <div>{currentBodyPart ?
            (currentBodyPart.location ?
              `${currentBodyPart.location} ${currentBodyPart.name}`
              : currentBodyPart.name)
            : 'General'}</div>
        </div>

        {currentSubentry &&
          <div style={styles.painLevelTxt(isSmallScreen)}>
            {currentSubentry.pain_level.toFixed(1)}
          </div>}

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

    // If current body part is selected, extract the appropriate pain subentry
    // from the entry as well as the actual body part.
    let subentry, currentSubentry, currentBodyPart;
    if (entryInfo && currentBodyPartID) {
      for (subentry of entryInfo.pain_subentries) {
        const part = subentry.body_part;
        if (part.id == currentBodyPartID) {
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