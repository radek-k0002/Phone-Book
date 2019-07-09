import React, { Component } from "react";
import "./ContactForm.css";

class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.contactFormContainer = React.createRef();
  }
  render() {
    return (
      <div ref={this.contactFormContainer} id="contactForm">
        <i onClick={this.close} className="fas fa-times"></i>
        <div className="fields">
          <div className="nameField">
            <i className="fas fa-user-plus"></i>
            <input
              onChange={this.props.name}
              value={this.props.nameValue}
              maxLength="20"
              className="name"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="notesField">
            <i className="far fa-sticky-note"></i>
            <input
              onChange={this.props.notes}
              value={this.props.notesValue}
              maxLength="40"
              className="notes"
              type="text"
              placeholder="Notes"
            />
          </div>
          <div className="phoneField">
            <i className="fas fa-phone-alt"></i>
            <input
              onChange={this.props.phone}
              value={this.props.phoneNumber}
              maxLength="15"
              className="phone"
              type="text"
              placeholder={
                this.props.status === "Add Contact"
                  ? "Phone Number*"
                  : "Phone Number"
              }
            />
          </div>
        </div>

        <button
          onClick={this.props.submitForm}
          id="submit"
          className="submit"
          type="submit"
        >
          {this.props.status}
        </button>
      </div>
    );
  }

  close = () => {
    const contactForm = document.getElementById("contactForm");
    const button = document.getElementById("submit");
    button.classList.remove("add", "edit");

    contactForm.classList.remove("active");
  };
}

export default ContactForm;
