import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams
} from "react-router-dom";
import actions from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Pages from "Pages";

class Navigation extends React.Component {
  componentDidMount() {
    const { userInfo } = this.props;

    if (this.props.userUpdate) {
      this.props.getUserData(userInfo);
    }

    if (this.props.entryUpdate) {
      this.props.getEntries(userInfo);
    }

    if (this.props.bodyPartUpdate) {
      this.props.getBodyParts(userInfo);
    }
  }

  componentDidUpdate(prevProps) {
    const { userInfo } = this.props;

    if (this.props.userUpdate) {
      this.props.getUserData(userInfo);
    }

    if (this.props.entryUpdate) {
      this.props.getEntries(userInfo);
    }

    if (this.props.bodyPartUpdate) {
      this.props.getBodyParts(userInfo);
    }
  }

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
              <Entry />
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

function Entry() {
  let { entryID } = useParams();
  return <Pages.EntryDetail entryInfo={ { id: entryID } } />;
}

function PainPoint() {
  let { pointID } = useParams();
  return <Pages.PainPointDetail bodyPartInfo={ { id: pointID } } />;
}

const mapStateToProps = state => ({
  isLogin: state.users.isLogin,
  userInfo: state.users.userInfo,
  userUpdate: state.users.userUpdate,
  entryUpdate: state.users.entryUpdate,
  bodyPartUpdate: state.users.bodyPartUpdate
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);