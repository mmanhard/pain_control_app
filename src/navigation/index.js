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
            <PrivateRoute path="/dashboard" isLogin={this.props.isLogin}>
              <Pages.Dashboard />
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