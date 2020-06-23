import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import actions from 'Actions';
import Navbar from 'Components/Navbar';
import styles from './style';
import BodyVisualizer from 'Components/BodyVisualizer';
import AppStyles from 'Common/AppStyles';

import BackIcon from 'Icons/icons8-back.png';

const screenTypes = {
  addPainLevels: 'addPainLevels',
  addPainNotes: 'addPainNotes',
  addNotes: 'addNotes'
}

class AddEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screenType: screenTypes.addPainLevels,
      bodyPartsIncluded: {},
      notes: ''
    };
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _handlePainLevelChange = (event) => {
    const { bodyParts } = this.props;
    const { bodyPartsIncluded } = this.state;
    const target = event.target;

    if (target.value.length > 0) {
      bodyPartsIncluded[target.name] = {
        pain_level: target.value,
        notes: '' };
      this.setState({ bodyPartsIncluded });
    } else {
      delete bodyPartsIncluded[target.name];
      this.setState({ bodyPartsIncluded });
    }
  }

  _handlePainNotesChange = (event) => {
    const { bodyPartsIncluded } = this.state;
    const target = event.target;

    bodyPartsIncluded[target.name].notes = target.value;
    this.setState({ bodyPartsIncluded });
  }

  _handleSubmitPainLevels = () => {
    const { bodyParts } = this.props;
    const { bodyPartsIncluded } = this.state;
    console.log(bodyPartsIncluded);

    let part;
    for (part of bodyParts) {
      if (bodyPartsIncluded[part.id]) {
        bodyPartsIncluded[part.id].name = part.name;
        bodyPartsIncluded[part.id].location = part.location;
      }
    }
    this.setState({ bodyPartsIncluded });
    this._switchScreen();
  }

  _handleSubmitPainNotes = () => {
    const { bodyPartsIncluded } = this.state;
    console.log(bodyPartsIncluded);
    this._switchScreen();
  }

  _handleSubmitEntry = (e) => {
    const { userInfo, bodyParts } = this.props;
    const { notes, bodyPartsIncluded } = this.state;

    e.preventDefault();

    let entry = {
      'pain_subentries': []
    };

    if (notes.length > 0) {
      entry.notes = notes;
    }

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

    this.props.addEntry(userInfo, entry);
    this.props.history.push('/dashboard');
  }

  _switchScreen = (backward = false) => {
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

  _renderPartsRow = (parts, offset = 0) => {
    const { bodyPartsIncluded } = this.state;
    return (
      <div style={styles.partsContainer(offset)}>
        {parts.map((part) => {
          const selected = bodyPartsIncluded[part.id];
          const displayName = part.location ? `${part.location} ${part.name}` : part.name;
          return (
            <div
              key={part.id}
              style={styles.partContainer(selected)}>
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
        })}
      </div>
    );
  }

  _renderAddPainLevels = () => {
    const { bodyParts } = this.props;
    const { bodyPartsIncluded } = this.state;

    let visualizerBodyParts = bodyParts.map(part => {
      const displayName = part.location ? `${part.location}_${part.name}` : part.name;
      let stats = bodyPartsIncluded[part.id] ? bodyPartsIncluded[part.id].pain_level : undefined;
      return ({
        name: displayName,
        id: part.id,
        stats
      });
    });

    return (
      <div style={{...styles.entryContainer, ...AppStyles.center}}>
        <div style={styles.painLevelsContainer}>
          {this._renderPartsRow(bodyParts.slice(0,3), 30)}
          {this._renderPartsRow(bodyParts.slice(3,6), -30)}
          {this._renderPartsRow(bodyParts.slice(6,9), -30)}
        </div>
        <div style={styles.visualizerContainer}>
          <div style={{...AppStyles.center, flex: 1}}>
            <button style={styles.continueBtn} onClick={this._handleSubmitPainLevels}>Continue</button>
          </div>
          <BodyVisualizer
            contentContainerStyle={styles.visualizer}
            bodyParts={visualizerBodyParts} />
        </div>
      </div>
    );
  }

  _renderAddPainNotes = () => {
    const { bodyParts } = this.props;
    const { bodyPartsIncluded } = this.state;

    const bodyPartList = bodyParts.filter((part) => bodyPartsIncluded[part.id]);
    console.log(bodyPartList);
    return (
      <div style={styles.entryContainer}>
        <button style={styles.backBtn} onClick={() => { this._switchScreen(true) }}>
          <img src={BackIcon} style={{height: 32, margin: 'auto' }} />
        </button>
        <div style={styles.bodyPartNoteContainer}>
          {bodyPartList.map(part => {
            const displayName = part.location ? `${part.location} ${part.name}` : part.name;
            return (
              <div style={styles.bodyPartNote} key={part.id}>
                <div style={{height: '100%', width: 160, ...AppStyles.center, marginRight: 20}}>
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
            );
          })}
          <button style={styles.continueBtn} onClick={this._handleSubmitPainNotes}>Continue</button>
          <button style={styles.skipBtn} onClick={() => { this._switchScreen() }}>Skip</button>
        </div>
      </div>
    );
  }

  _renderAddNotes = () => {
    const { notes } = this.state;
    return (
      <div style={styles.entryContainer}>
        <button style={styles.backBtn} onClick={() => { this._switchScreen(true) }}>
          <img src={BackIcon} style={{height: 32, margin: 'auto' }} />
        </button>
        <div style={styles.addNotesContainer}>
          <textarea rows="14" cols="65" maxLength="500"
            name="notes"
            value={notes}
            placeholder={'Add any additional notes here.'}
            style={styles.entryNotesInput}
            onChange={this._handleInputChange} />
          <p style={styles.counterText}>{notes.length}/500</p>
          <button style={styles.continueBtn} onClick={this._handleSubmitEntry}>Submit Entry</button>
        </div>
      </div>
    );
  }

  render() {
    const { userInfo, bodyParts, logout } = this.props;
    const { screenType } = this.state;

    return (
      <div style={styles.container}>
        <Navbar userInfo={userInfo} logout={logout}/>
        <div style={styles.configContainer}>
          <div style={styles.titleContainer}>
            <p style={styles.titleTxt}>
              {screenType === screenTypes.addPainLevels && 'Rate your pain on a scale of 1-10.'}
              {screenType === screenTypes.addPainNotes && 'Add some notes to accompany your entry.'}
              {screenType === screenTypes.addNotes && 'Need to say anything else?'}
            </p>
          </div>
          <div style={styles.configContentContainer}>

          </div>
        </div>

        {screenType === screenTypes.addPainLevels && this._renderAddPainLevels()}
        {screenType === screenTypes.addPainNotes && this._renderAddPainNotes()}
        {screenType === screenTypes.addNotes && this._renderAddNotes()}

      </div>
    )
  }
}

// <h2>AddEntry</h2>
// <h3>User ID: {this.props.userInfo?.id}</h3>
// <form onSubmit={this._handleSubmit}>
//   {bodyParts.map((part) => {
//     const pk = part.location ? `${part.location}_${part.name}` : part.name;
//     return (<div key={pk}>
//       <h4>{pk}</h4>
//       <input type="number" name={part.name} onChange={this._handleInputChange}/>
//     </div>);
//   })}
//   <br />
//   <label>
//     Notes:
//     <textarea rows="4" cols="50" name="notes" onChange={this._handleInputChange}/>
//   </label>
//   <input type="submit" value="Submit Entry" />
// </form>

const mapStateToProps = state => ({
  userInfo: state.users.userInfo,
  bodyParts: state.users.bodyParts,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEntry));