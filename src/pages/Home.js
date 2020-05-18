import React from "react";
import API from '../api';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };
  }

  _handleInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    API.register( this.state );
  }

  render() {
    return (
      <div>
        <h2>HOME</h2>
        <form onSubmit={this._handleSubmit}>
          <label>
            First Name:
            <input
              name="first_name"
              type="text"
              value={this.state.first_name}
              onChange={this._handleInputChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              name="last_name"
              type="text"
              value={this.state.last_name}
              onChange={this._handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this._handleInputChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this._handleInputChange}
            />
          </label>
          <br />
          <input type="submit" value="Register" />
        </form>
      </div>
    )
  }
}