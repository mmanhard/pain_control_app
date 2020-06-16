import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import actions from 'Actions';
import Navbar from 'Components/Navbar';
import styles from './style';

class AddEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: ''
    };
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _handleSubmit = (e) => {
    const { userInfo, bodyParts } = this.props;

    e.preventDefault();

    let entry = {
      'pain_subentries': []
    };

    if (this.state.notes.length > 0) {
      entry.notes = this.state.notes;
    }

    bodyParts.forEach((bodyPart) => {
      if (this.state[bodyPart.name] && this.state[bodyPart.name].length > 0) {
        const subentry = {
          'id': bodyPart.id,
          'pain_level': this.state[bodyPart.name]
        }
        entry.pain_subentries.push(subentry);
        console.log(subentry);
      }
    });

    console.log(entry);
    // this.props.addEntry(userInfo, entry);
    // this.props.history.replace('/dashboard');
  }

  render() {
    const { userInfo, bodyParts, logout } = this.props;

    return (
      <div style={styles.container}>
        <Navbar userInfo={userInfo} logout={logout}/>
        <h2>AddEntry</h2>
        <h3>User ID: {this.props.userInfo?.id}</h3>
        <form onSubmit={this._handleSubmit}>
          {bodyParts.map((part) => {
            const pk = part.location ? `${part.location}_${part.name}` : part.name;
            return (<div key={`part.name`}>
              <h4>{pk}</h4>
              <input type="number" name={part.name} onChange={this._handleInputChange}/>
            </div>);
          })}
          <br />
          <label>
            Notes:
            <textarea rows="4" cols="50" name="notes" onChange={this._handleInputChange}/>
          </label>
          <input type="submit" value="Submit Entry" />
        </form>
      </div>
    )
  }
}

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