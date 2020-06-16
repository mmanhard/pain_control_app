import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from 'Actions';
import Navbar from 'Components/Navbar';
import styles from './style';

class Entries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { userInfo, bodyParts, entries, logout } = this.props;

    return (
      <div style={styles.container}>
        <Navbar userInfo={userInfo} logout={logout}/>
        <h2>Entries</h2>
        <ul>
          {entries.map((entry) => {
            return (<li key={entry.id}>
              <div>{`Entry ID: ${entry.id}`}</div>
              <div>{`Entry Notes: ${entry.notes}`}</div>
              {entry.pain_subentries.map((subentry) => {

                return (<div key={subentry.body_part.id}>
                  {`Body Part: ${subentry.body_part.name} - ${subentry.pain_level}`}
                </div>);
              })}
            </li>);
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.users.userInfo,
  entries: state.users.entries
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entries);