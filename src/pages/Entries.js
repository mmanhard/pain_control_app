import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';

class Entries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h2>Entries</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entries);