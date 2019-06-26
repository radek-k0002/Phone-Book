import React, { Component } from "react";

class ErrorsField extends Component {
  state = {};
  render() {
    return (
      <div style={this.props.style} className={this.props.className}>
        {this.props.message}
      </div>
    );
  }
}

export default ErrorsField;
