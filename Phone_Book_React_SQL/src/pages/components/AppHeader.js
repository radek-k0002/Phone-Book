import React, { Component } from "react";
import "./AppHeader.css";

class AppHeader extends Component {
  state = {};
  render() {
    return (
      <header>
        <div>
          <div className="searchContainer">
            <input
              onChange={this.props.search}
              className="search"
              type="search"
              placeholder="Search"
            />
          </div>
          <div className="logOut" onClick={this.props.logout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </header>
    );
  }
  logout = () => {
    fetch("http://localhost:4000/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.status === "logout") {
          this.props.history.push("/sign_in");
        }
      });
  };
}

export default AppHeader;
