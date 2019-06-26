import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import ErrorsField from "./errorsField";

const unexpectedErrorStyles = {
  width: "70%",
  margin: "0 auto 20px auto",
  "font-size": "14px",
  color: "#b31622",
  "text-align": "center",
};

class SignUpForm extends Component {
  state = {
    email: "",
    password: "",
    repeatedPassword: "",
    checkbox: false,
    errors: {
      email: "Email is invalid",
      password: "Password is to short (min 4 characters)",
      repeatedPassword: "You need to fill the field",
      checkbox: "You need to accept statements",
    },
    unexpectError: "Oops! Something went wrong. Try again later.",
    emailValid: false,
    passwordValid: false,
    repeatedPasswordValid: false,
    checkboxValid: false,
    formValid: false,
    loadErrors: false,
    loadUnexpectedError: false,
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
              onChange={this.handleChange}
            />
            {this.state.loadErrors ? (
              <ErrorsField
                className="error"
                message={this.state.errors.email}
              />
            ) : null}

            <input
              type="password"
              name="password"
              placeholder="Password"
              maxLength="255"
              onChange={this.handleChange}
            />
            {this.state.loadErrors ? (
              <ErrorsField
                className="error"
                message={this.state.errors.password}
              />
            ) : null}

            <input
              type="password"
              name="repeatedPassword"
              placeholder="Retype Password"
              maxLength="255"
              onChange={this.handleChange}
            />
            {this.state.loadErrors ? (
              <ErrorsField
                className="error"
                message={this.state.errors.repeatedPassword}
              />
            ) : null}

            <div className="checkbox-container">
              <input
                type="checkbox"
                name="checkbox"
                onChange={this.handleChange}
              />
              <p className="statement">I agree all statements</p>
              {this.state.loadErrors ? (
                <ErrorsField
                  className="checkbox-error"
                  message={this.state.errors.checkbox}
                />
              ) : null}
            </div>

            <button type="submit" name="submit" onClick={this.handleSubmit}>
              Sign up
            </button>
            {this.state.loadUnexpectedError ? (
              <ErrorsField
                style={unexpectedErrorStyles}
                message={this.state.unexpectError}
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

    this.setState(
      {
        [name]: value,
      },
      () => {
        this.validateField(target, name, value);
      }
    );
  };

  validateField = (target, name, value) => {
    let errors = this.state.errors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let repeatedPasswordValid = this.state.repeatedPasswordValid;
    let checkboxValid = this.state.checkboxValid;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    switch (name) {
      case "email":
        emailValid = re.test(value);
        errors.email = emailValid ? "" : "E-mail is invalid";
        break;
      case "password":
        passwordValid = value.length >= 4;
        errors.password = passwordValid ? "" : "Password is to short";
        repeatedPasswordValid =
          this.state.password === this.state.repeatedPassword;
        errors.repeatedPassword = repeatedPasswordValid
          ? ""
          : "Passwords are not the same";
        break;
      case "repeatedPassword":
        repeatedPasswordValid =
          this.state.password === this.state.repeatedPassword;
        errors.repeatedPassword = repeatedPasswordValid
          ? ""
          : "Passwords are not the same";
        if (this.state.repeatedPassword === "") {
          errors.repeatedPassword = repeatedPasswordValid
            ? ""
            : "You need to fill the field";
        }
        break;
      case "checkbox":
        checkboxValid = target.checked;
        errors.checkbox = checkboxValid ? "" : "You need to accept statements";
        break;
      default:
        break;
    }

    this.setState(
      {
        errors: errors,
        emailValid: emailValid,
        passwordValid: passwordValid,
        repeatedPasswordValid: repeatedPasswordValid,
        checkboxValid: checkboxValid,
      },
      this.validateForm
    );
  };

  validateForm = () => {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.repeatedPasswordValid &&
        this.state.checkboxValid,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.validateForm();

    if (this.state.formValid === false) {
      this.setState({ loadErrors: true });

      return;
    } else {
      const data = {
        email: this.state.email,
        password: this.state.password,
        repeatedPassword: this.state.repeatedPassword,
        checkbox: this.state.checkboxValid,
      };

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(resp => resp.json())
        .then(resp => {
          if (resp.errors) {
            const errors = resp.errors;
            for (let error in errors) {
              switch (error) {
                case "email":
                  this.setState(prevState => ({
                    errors: {
                      ...prevState.errors,
                      email: errors[error],
                    },
                    emailValid: false,
                  }));
                  break;
                case "password":
                  this.setState(prevState => ({
                    errors: {
                      ...prevState.errors,
                      password: errors[error],
                    },
                    passwordValid: false,
                  }));
                  break;
                case "repeatedPassword":
                  this.setState(prevState => ({
                    errors: {
                      ...prevState.errors,
                      repeatedPassword: errors[error],
                    },
                    repeatedPasswordValid: false,
                  }));
                  break;
                case "checkbox":
                  this.setState(prevState => ({
                    errors: {
                      ...prevState.errors,
                      checkbox: errors[error],
                    },
                    checkboxValid: false,
                  }));
                  break;
                default:
                  break;
              }
              this.setState({
                loadErrors: true,
              });
            }
          } else if (resp.status === "ok") {
            this.props.history.push("/sign_in");
          } else {
            this.setState({
              loadUnexpectedError: true,
            });
          }
        });
    }
  };
}

export default SignUpForm;
