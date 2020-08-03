import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import actions from 'Actions';
import { flashDuration } from 'Common/AppConst';
import AppColors from 'Common/AppColors';
import withWindowDimensions from 'Common/AppDimens';
import AppStyles from 'Common/AppStyles';
import BodyVisualizer from 'Components/BodyVisualizer';
import BubbleList from 'Components/BubbleList';
import Button from 'Components/Button';
import HelpModal from 'Components/HelpModal';
import LoadingSpinner from 'Components/LoadingSpinner';
import Navbar from 'Components/Navbar';
import PainLegend from 'Components/PainLegend';
import styles from './style';
import Utils from 'Utils';


import BackIcon from 'Icons/icons8-back.png';

const screenTypes = {
  addPainLevels: 'addPainLevels',
  addPainNotes: 'addPainNotes',
  addNotes: 'addNotes'
}

class AddEntry extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      screenType: screenTypes.addPainLevels,
      highDetail: true,
      bodyPartsIncluded: {},
      entryDate: 'Right Now',
      entryTime: undefined,
      entryTimePeriod: moment().format('A') || 'PM',
      entryMoment: undefined,
      notes: '',
      flashMessage: '',
      flashSuccess: false
    };

    // Create a ref for the help modal.
    this.helpModalRef = React.createRef();
  }

  componentDidMount() {
    const { userInfo } = this.props;

    // Create a flag to keep track of whether or not the component is mounted.
    this._isMounted = true;

    this.props.getUserData(userInfo);
    this.props.getBodyParts(userInfo);
  }

  componentWillUnmount() {
    // The component is unmounting, so indicate that is no longer mounted.
    this._isMounted = false;
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _handlePainLevelChange = (event) => {
    const { bodyParts } = this.props;
    const { bodyPartsIncluded } = this.state;

    const target = event.target;

    // If the input is not empty, validate it and add the body part to the list.
    // Otherwise, remove the body part from the list of included body parts.
    if (target.value.length > 0) {
      const value = Number(target.value);
      if (isNaN(value)) {
        this._setFlashMessage(false, 'Please type in a number!');
      } else if (target.value.length != 1 && value != 10) {
        this._setFlashMessage(false, 'Pain levels must be between 0 and 10. No decimal places allowed!');
      } else {
        bodyPartsIncluded[target.name] = {
          pain_level: value,
          notes: '' };
        this.setState({ bodyPartsIncluded });
      }
    } else {
      delete bodyPartsIncluded[target.name];
      this.setState({ bodyPartsIncluded });
    }
  }

  _handlePainNotesChange = (event) => {
    const { bodyPartsIncluded } = this.state;

    const target = event.target;

    // Add the notes input to the target body part.
    bodyPartsIncluded[target.name].notes = target.value;
    this.setState({ bodyPartsIncluded });
  }

  _handleDateChange = (event) => {
    const target = event.target;
    const { entryDate, entryTime, entryTimePeriod } = this.state;

    if (entryDate === 'Right Now') {
      this.setState({
        entryDate: moment().format('MM/DD/YYYY'),
        entryTime: moment().format('hh:mm')});
    } else {

      // If the user has input a manual date, format it and convert it to a moment.
      let newDateValue = Utils.formatDateInput(target.value);
      let inputMoment = Utils.convertDateTimeToMoment(newDateValue, entryTime, entryTimePeriod);

      // If the new moment is the current moment, display 'Right Now'
      // rather than the typical date format.
      if (inputMoment && inputMoment.diff(moment(), 'minutes') == 0) {
        this.setState({
          entryDate: 'Right Now',
          entryTime: undefined,
        });
      } else {
        this.setState({ entryDate: newDateValue});
      }
    }
  }

  _handleTimeChange = (event) => {
    const target = event.target;
    const { entryDate, entryTimePeriod } = this.state;

    // If the user has input a manual time, format it and convert it to a moment.
    let newTimeValue = Utils.formatTimeInput(target.value);
    let inputMoment = Utils.convertDateTimeToMoment(entryDate, newTimeValue, entryTimePeriod);

    // If the new moment is the current moment, display 'Right Now'
    // rather than the typical date format.
    if (inputMoment && inputMoment.diff(moment(), 'minutes') == 0) {
      this.setState({
        entryDate: 'Right Now',
        entryTime: undefined,
      });
    } else {
      this.setState({ entryTime: newTimeValue});
    }
  }

  // Handler for changing from AM to PM.
  _handleTimePeriodChange = (event) => {
    const target = event.target;
    const { entryDate, entryTime } = this.state;

    let inputMoment = Utils.convertDateTimeToMoment(entryDate, entryTime, target.value);

    // If the new moment is the current moment, display 'Right Now'
    // rather than the typical date format.
    if (inputMoment && inputMoment.diff(moment(), 'minutes') == 0) {
      this.setState({
        entryDate: 'Right Now',
        entryTime: undefined,
      });
    }

    this.setState({ entryTimePeriod: target.value});
  }

  _handleSubmitPainLevels = () => {
    const { bodyParts } = this.props;
    const { bodyPartsIncluded, entryTime, entryDate, entryTimePeriod, highDetail } = this.state;

    // Convert current entry date/time to moment.
    if (entryDate == 'Right Now') {
      this.setState({ entryMoment: moment() });
    } else {
      const inputMoment = Utils.convertDateTimeToMoment(entryDate, entryTime, entryTimePeriod);
      if (inputMoment) {
        this.setState({ entryMoment: inputMoment });
      } else {
        this._setFlashMessage(false, 'You must submit a real date and time!');
        return ;
      }
    }

    // Get the name and location for all included body parts.
    let part;
    for (part of bodyParts) {
      if (bodyPartsIncluded[part.id]) {
        bodyPartsIncluded[part.id].name = part.name;
        bodyPartsIncluded[part.id].location = part.location;
      }
    }

    // Check that the user included at least one body part.
    if (Object.keys(bodyPartsIncluded).length === 0) {
      this._setFlashMessage(false, 'You must record at least one pain level!');
      return ;
    }

    this.setState({ bodyPartsIncluded }, () => {
      if (highDetail) {
        this._switchScreen();
      } else {
        this._handleSubmitEntry();
      }
    });
  }

  _handleSubmitPainNotes = () => {
    const { bodyPartsIncluded } = this.state;
    this._switchScreen();
  }

  _handleSubmitEntry = (e) => {
    const { userInfo, bodyParts } = this.props;
    const { notes, bodyPartsIncluded, entryMoment } = this.state;

    if (e) e.preventDefault();

    let entry = {
      'date': entryMoment.toISOString(true),
      'pain_subentries': []
    };

    if (notes.length > 0) {
      entry.notes = notes;
    }

    // Add each body part and its details (i.e. pain level and optional notes)
    // to the entry that will be submitted to the API.
    bodyParts.forEach((part) => {
      if (bodyPartsIncluded[part.id]) {
        const subentry = {
          'id': part.id,
          'pain_level': bodyPartsIncluded[part.id].pain_level,
          'notes': bodyPartsIncluded[part.id].notes
        }
        entry.pain_subentries.push(subentry);
      }
    });

    this.props.addEntry(userInfo, entry, this._submitEntryCallback);
  }

  _submitEntryCallback = (success, message) => {
    if (success) {
      this.props.history.push({
        pathname: '/dashboard',
        state: { flashMessage: message }
      });
    } else {
      this._setFlashMessage(success, message);
    }
  }

  _setFlashMessage = (success, message) => {
    // Only set the flash message if the component is mounted.
    if (this._isMounted) {
      this.setState({flashMessage: message, flashSuccess: success});

      if (message) {
        setTimeout(() => this.setState({flashMessage: ''}), flashDuration);
      }
    }
  }

  _switchScreen = (backward = false) => {
    const { highDetail } = this.state;

    this._setFlashMessage(false, '');

    switch (this.state.screenType) {

      case (screenTypes.addPainLevels):
        if (!backward) {
          this.setState({ screenType: screenTypes.addPainNotes});
        }
        break;

      case (screenTypes.addPainNotes):
        if (backward) {
          this.setState({ screenType: screenTypes.addPainLevels});
        } else {
          this.setState({ screenType: screenTypes.addNotes});
        }
        break;

      case (screenTypes.addNotes):
        if (backward) {
          this.setState({ screenType: screenTypes.addPainNotes});
        } else {
          this.props.history.replace('/dashboard');
        }
        break;
    }
  }

  _renderItem = (part) => {
    const { isSmallScreen } = this.props;
    const { bodyPartsIncluded } = this.state;

    const selected = bodyPartsIncluded[part.id];
    const displayName = part.location ? `${part.location} ${part.name}` : part.name;

    return (
      <div
        key={part.id}
        style={styles.partContainer(isSmallScreen, selected)}>
        <div>{displayName}</div>
        <input
          type='text'
          name={part.id}
          value={selected ? bodyPartsIncluded[part.id].pain_level : ''}
          placeholder={'-'}
          style={styles.painLevelInput}
          onChange={this._handlePainLevelChange}/>
      </div>
    );
  }

  _renderAddPainLevels = () => {
    const { bodyParts, isMobile, isSmallScreen, isLargeScreen } = this.props;
    const { bodyPartsIncluded, highDetail } = this.state;

    let visualizerBodyParts = bodyParts.map(part => {
      const displayName = part.location ? `${part.location}_${part.name}` : part.name;
      let stats = bodyPartsIncluded[part.id] ? bodyPartsIncluded[part.id].pain_level : undefined;
      return ({
        name: displayName,
        id: part.id,
        stats
      });
    });

    let painBubbleList = (
      <BubbleList
        contentContainerStyle={styles.painLevelsContainer}
        rowContainerStyle={styles.partsContainer}
        renderItem={this._renderItem}
        items={bodyParts}
        itemsPerRow={isMobile ? 2 : 3}
        offset={30}
      />
    );

    let continueBtn = (
      <div style={{marginTop: 20, marginBottom: isSmallScreen ? 40 : 0}}>
        <Button
          btnStyles={styles.continueBtn}
          onClick={this._handleSubmitPainLevels}>
          {highDetail ? 'Continue' : 'Submit Entry'}
        </Button>
      </div>
    );

    let visualizer = (
      <BodyVisualizer
        contentContainerStyle={styles.visualizer(isSmallScreen)}
        bodyParts={visualizerBodyParts} />
    );

    return (
      <div style={{...styles.entryContainer(isSmallScreen), ...AppStyles.rowSpace}}>
        <div style={{...AppStyles.columnStart, flex: 1}}>
          {painBubbleList}
          {this._renderFlash()}
          {isLargeScreen && visualizer}
          {!isMobile && <PainLegend contentContainerStyle={styles.painLegend} />}
          {continueBtn}
        </div>
        {!isLargeScreen && visualizer}
      </div>
    );
  }

  _renderAddPainNotes = () => {
    const { bodyParts, isSmallScreen } = this.props;
    const { bodyPartsIncluded } = this.state;

    const bodyPartList = bodyParts.filter((part) => bodyPartsIncluded[part.id]);

    return (
      <div style={styles.entryContainer(isSmallScreen)}>
        {!isSmallScreen && <div style={{marginBottom: 20}}>
            <Button btnStyles={styles.backBtn} onClick={() => { this._switchScreen(true) }}>
              <img src={BackIcon} style={{ height: 32, margin: 'auto' }} />
            </Button>
          </div>}
        <div style={styles.bodyPartNoteContainer}>
          {bodyPartList.map((part, index) => {
            const displayName = part.location ? `${part.location} ${part.name}` : part.name;
            return (
              <div style={{width: isSmallScreen ? '85%' : '100%', maxWidth: 800}} key={part.id}>
                <div style={styles.bodyPartNote}>
                  <div style={{height: '100%', width: 160, ...AppStyles.center, marginRight: 30}}>
                    <div style={styles.bodyPartTitle}>{displayName}</div>
                    <div style={styles.levelContainer}>Pain Level: {bodyPartsIncluded[part.id].pain_level}</div>
                  </div>
                  <textarea rows="8" cols="50" maxLength="200"
                    name={part.id}
                    value={bodyPartsIncluded[part.id].notes}
                    placeholder={`Add some notes about your ${displayName} here.`}
                    style={styles.bodyPartNotesInput}
                    onChange={this._handlePainNotesChange} />
                </div>
                {(index < bodyPartList.length - 1) && <hr style={{width: '80%', height: 0, borderTop: `solid 1px ${AppColors.blue}`}}/>}
              </div>
            );
          })}
          <Button btnStyles={styles.continueBtn} onClick={this._handleSubmitPainNotes}>Continue</Button>
          <div style={{...AppStyles.rowSpace, marginBottom: isSmallScreen ? 30 : 0}}>
            {isSmallScreen && <Button btnStyles={styles.skipBtn} onClick={() => { this._switchScreen(true) }}>Back</Button>}
            <Button btnStyles={styles.skipBtn} onClick={() => { this._switchScreen() }}>Skip</Button>
          </div>
        </div>
      </div>
    );
  }

  _renderAddNotes = () => {
    const { isSmallScreen } = this.props;
    const { notes } = this.state;
    return (
      <div style={styles.entryContainer(isSmallScreen)}>
        {!isSmallScreen && <Button btnStyles={styles.backBtn} onClick={() => { this._switchScreen(true) }}>
          <img src={BackIcon} style={{height: 32, margin: 'auto' }} />
        </Button>}
        <div style={styles.addNotesContainer}>
          <textarea rows="15" cols="65" maxLength="500"
            name="notes"
            value={notes}
            placeholder={'Add any additional notes here.'}
            style={styles.entryNotesInput}
            onChange={this._handleInputChange} />
          <p style={styles.counterText}>{notes.length}/500</p>
          {this._renderFlash()}
          <Button btnStyles={styles.continueBtn} onClick={this._handleSubmitEntry}>Submit Entry</Button>
          {isSmallScreen && <div style={{marginBottom: 30}}>
            <Button
              btnStyles={styles.skipBtn}
              onClick={() => { this._switchScreen(true) }}>
              Back
            </Button>
          </div>}
        </div>
      </div>
    );
  }

  _renderConfiguration = () => {
    const { isSmallScreen } = this.props;
    const { screenType, highDetail, entryTime, entryMoment } = this.state;
    if (screenType === screenTypes.addPainLevels) {
      return (
        <div style={styles.configContentContainer(isSmallScreen)}>
          {!isSmallScreen && <div style={styles.configRow}>
            <div style={styles.configTitle}>
              <div style={styles.configTitleTxt}>Configure</div>
              <div style={styles.configTitleTxt}>Entry</div>
            </div>
          </div>}
          <div style={{flex: 1, ...AppStyles.center, marginBottom: 20}}>
            <div style={styles.configSubtitleTxt}>Time & Date</div>
            <div style={AppStyles.rowSpace}>
              <input
                type='text'
                style={styles.configTimeTxt}
                name={'entryDate'}
                value={this.state.entryDate}
                onChange={this._handleDateChange}
              />
              {(typeof entryTime !== 'undefined') && (
                <div>
                  <input
                    type='text'
                    style={styles.configTimeTxt}
                    name={'entryTime'}
                    value={this.state.entryTime}
                    onChange={this._handleTimeChange}
                  />
                  <select style={styles.configAMPM} name='entryTimePeriod' value={this.state.entryTimePeriod} onChange={this._handleTimePeriodChange}>
                    <option value={'PM'}>PM</option>
                    <option value={'AM'}>AM</option>
                  </select>
                </div>)}
            </div>
          </div>
          {!isSmallScreen && <div style={{ ...AppStyles.center, marginBottom: 20}}>
            <div style={{...AppStyles.rowSpace, alignItems: 'center'}}>
              <div style={styles.configSubtitleTxt}>Level of Detail</div>
              <Button
                onClick={() => {this.helpModalRef.current.open()}}
                btnStyles={styles.helpBtn}>
                <div style={styles.helpIcon}>?</div>
              </Button>
            </div>
            <div style={{...AppStyles.rowSpace, flexWrap: 'wrap', marginTop: 10}}>
              <Button
                btnStyles={styles.mainButton(highDetail)}
                onClick={() => {this.setState({ highDetail: true })}}>
                High Detail
              </Button>
              <Button
                btnStyles={styles.mainButton(!highDetail)}
                onClick={() => {this.setState({ highDetail: false })}}>
                Low Detail
              </Button>
            </div>
          </div>}
        </div>
      );
    } else {
      return (
        <div style={styles.configContentContainer(isSmallScreen)}>
          {!isSmallScreen && <div style={styles.configRow}>
            <div style={styles.configTitle}>
              <div style={styles.configTitleTxt}>Entry</div>
              <div style={styles.configTitleTxt}>Configuration</div>
            </div>
          </div>}
          <div style={{flex: 1, ...AppStyles.rowSpace, flexWrap: 'wrap', width: '100%', margin: 20, alignItems: 'center'}}>
            <div style={styles.configSubtitleTxt}>Time & Date</div>
            <div style={styles.configDisplayTxt}>{entryMoment?.format('MM/DD/YY hh:mm a')}</div>
          </div>
          {!isSmallScreen && <div style={{flex: 1, ...AppStyles.rowSpace, flexWrap: 'wrap', width: '100%', margin: 20, alignItems: 'center'}}>
            <div style={{...AppStyles.rowSpace, alignItems: 'center'}}>
              <div style={styles.configSubtitleTxt}>Level of Detail</div>
              <Button
                onClick={() => {this.helpModalRef.current.open()}}
                btnStyles={styles.helpBtn}>
                <div style={styles.helpIcon}>?</div>
              </Button>
            </div>
            <div style={styles.configDisplayTxt}>{highDetail ? 'High Detail' : 'Low Detail'}</div>
          </div>}
        </div>
      );
    }

  }

  _renderFlash = () => {
    const { isSmallScreen } = this.props;
    const { flashMessage, flashSuccess } = this.state;

    return (
      <div style={styles.flashMessage(isSmallScreen, flashMessage, flashSuccess)}>
        <div style={{margin: 10, textAlign: 'center'}}>{flashMessage}</div>
      </div>
    );
  }

  render() {
    const { userInfo, bodyParts, logout, isSmallScreen, isMediumScreen, isAwaitingResp } = this.props;
    const { screenType, highDetail } = this.state;

    return (
      <div style={styles.container(isSmallScreen)}>

        <Navbar userInfo={userInfo} logout={logout}/>

        <div style={styles.contentContainer(isSmallScreen)}>

          <div style={styles.configContainer(isSmallScreen)}>
            <div style={styles.titleContainer(isSmallScreen)}>
              <p style={styles.titleTxt(isMediumScreen)}>
                {screenType === screenTypes.addPainLevels && 'Rate your pain on a scale of 1-10.'}
                {screenType === screenTypes.addPainNotes && 'Add some notes to accompany your entry.'}
                {screenType === screenTypes.addNotes && 'Need to say anything else?'}
              </p>
            </div>
            {this._renderConfiguration()}
          </div>

          {screenType === screenTypes.addPainLevels && this._renderAddPainLevels()}
          {screenType === screenTypes.addPainNotes && this._renderAddPainNotes()}
          {screenType === screenTypes.addNotes && this._renderAddNotes()}
        </div>

        {isAwaitingResp && <LoadingSpinner />}

        <HelpModal
          ref={this.helpModalRef}
          contentStyle={styles.formModalContainer} />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAwaitingResp: state.entries.isAwaitingResp,
  userInfo: state.users.userInfo,
  bodyParts: state.bodyParts.bodyParts,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withWindowDimensions(AddEntry)));