import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import ErrorsField from "./errorsField";

const unexpectedErrorStyles = {
  width: "70%",
  margin: "0 auto 20px auto",
  fontSize: "14px",
  color: "#b31622",
  textAlign: "center",
};

class SignInForm extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loadErrors: false,
  };

  render() {
    return (
      <div className="App">
        <div className="sign-up-container">
          <div className="left">
            <div className="page-switcher">
              <NavLink
                exact
                to="/"
                activeClassName="page-switcher-active"
                className="page-switcher-item"
              >
                Sign up
              </NavLink>
              <div className="ps-or">||</div>
              <NavLink
                to="/sign_in"
                activeClassName="page-switcher-active"
                className="page-switcher-item"
              >
                Sign in
              </NavLink>
            </div>

            <input
              type="email"
              name="email"
              placeholder="E-mail"
              maxLength="255"
              value={this.state.email}
              onChange={this.handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              maxLength="255"
              value={this.state.password}
              onChange={this.handleChange}
            />

            <button onClick={this.handleSubmit} type="submit" name="submit">
              Sign In
            </button>

            {this.state.loadErrors ? (
              <ErrorsField
                style={unexpectedErrorStyles}
                message={this.state.error}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  handleChange = e => {
    const target = e.target;

    const name = target.name;

    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = { email: this.state.email, password: this.state.password };
    fetch("/sign_in", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.status === "failure") {
          this.setState({
            error: "The email or password doesn't match any account",
            loadErrors: true,
          });
        } else if (resp.status === "ok") {
          this.setState({
            loadErrors: false,
          });
          this.props.history.push("/contacts");
        } else {
          this.setState({
            error: "Oops! Something went wrong. Try again later.",
            loadErrors: true,
          });
        }
      });
  };
}

export default SignInForm;
