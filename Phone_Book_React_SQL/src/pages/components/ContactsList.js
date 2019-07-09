import React, { Component } from "react";
import "./ContactsList.css";

class ContactsList extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.addUser = React.createRef();
  }
  render() {
    return (
      <main>
        <div className="contacts">
          <div ref={this.addUser} className="addUser">
            <i onClick={this.props.add} className="fas fa-plus"></i>
          </div>

          {this.props.contacts.map(el => (
            <div className="contactContainer" data-id={el.id} key={el.id}>
              <i className="fas fa-user"></i>
              <div className="contact">
                <div className="name">{el.name}</div>
                <div className="notes">{el.notes}</div>
                <div className="phone">{el.phone}</div>
              </div>
              <div className="icons-container">
                <i
                  onClick={this.props.edit}
                  className="editUser fas fa-user-edit"
                ></i>
                <i onClick={this.props.delete} className="fas fa-trash-alt"></i>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

export default ContactsList;
