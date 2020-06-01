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
            <Route path="/" exact={true}>
              <Pages.Login />
            </Route>
            <PrivateRoute path="/onboarding" isLogin={this.props.isLogin} exact={true}>
              <Pages.Onboarding />
            </PrivateRoute>
            <PrivateRoute path="/dashboard" isLogin={this.props.isLogin} exact={true}>
              <Pages.Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/entries" isLogin={this.props.isLogin} exact={true}>
              <Pages.Entries />
            </PrivateRoute>
            <PrivateRoute path="/entries/:entryID" isLogin={this.props.isLogin}>
              <Pages.EntryDetail />
            </PrivateRoute>
            <PrivateRoute path="/add_entry" isLogin={this.props.isLogin} exact={true}>
              <Pages.AddEntry />
            </PrivateRoute>
            <PrivateRoute path="/pain_points" isLogin={this.props.isLogin} exact={true}>
              <Pages.PainPoints />
            </PrivateRoute>
            <PrivateRoute path="/pain_points/:pointID" isLogin={this.props.isLogin}>
              <Pages.PainPointDetail />
            </PrivateRoute>
            <PrivateRoute path="/settings" isLogin={this.props.isLogin} exact={true}>
              <Pages.Settings />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}

function PrivateRoute({ isLogin, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        isLogin
        ? children
        : <Redirect to={"/"} />
      }
    />
  );
}

const mapStateToProps = state => ({
  isLogin: state.users.isLogin
});

export default connect(
  mapStateToProps,
)(Navigation);