import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownVisible: false
    };
  }

  _toggleDropdown = () => {
    const { dropdownVisible } = this.state;
    this.setState({ dropdownVisible: !dropdownVisible });
  }

  _renderDropdown = () => {
    return (
      <li>
        <ul>
          <li>
            <a href="/settings">Settings</a>
          </li>
          <li>
            <button onClick={this.props.logout}>Log Out</button>
          </li>
        </ul>
      </li>
    );
  }

  render() {
    const { userInfo } = this.props;
    const { dropdownVisible } = this.state;

    return (
      <div>
        <ul>
          <li>
            <a href="/dashboard">HOME</a>
          </li>
          <li>
            {userInfo.first_name
                ? `Hi, ${userInfo.first_name}`
                : 'Hello there!' }
          </li>
          <li>
            <button onClick={this._toggleDropdown}>DROPDOWN</button>
          </li>
          {dropdownVisible && this._renderDropdown()}
          <li>
            <a href="/add_entry">+</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;