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
import AppFonts from 'Common/AppFonts';
import AppColors from 'Common/AppColors';

class Navigation extends React.Component {
  componentDidMount() {
    document.body.style = `background: ${AppColors.lilac};`;
  }

  render() {
    return (
      <Router>
        <div style={AppFonts.Raleway.bold}>
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

            <PrivateRoute path="/pain_points/:bodyPartID" isLogin={this.props.isLogin}>
              <PainPoint />
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

// PrivateRoute is only accessible when isLogin is set to true.
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

// Hook to give pain entry detail page access to entryID in URL params.
function Entry() {
  let { entryID } = useParams();
  return <Pages.EntryDetail entryID={entryID} />;
}

// Hook to give pain point detail page access to bodyPartID in URL params.
function PainPoint() {
  let { bodyPartID } = useParams();
  return <Pages.PainPointDetail bodyPartID={bodyPartID} />;
}

const mapStateToProps = state => ({
  isLogin: state.users.isLogin,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);