import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';

import Pages from "../pages";

class Navigation extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" component={Pages.Home} exact={true} />
            <Route path="/dashboard">
              { this.props.isLogin
              ? <Pages.Dashboard />
              : <Redirect to="/" /> }
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.users.isLogin
});

export default connect(
  mapStateToProps,
)(Navigation);