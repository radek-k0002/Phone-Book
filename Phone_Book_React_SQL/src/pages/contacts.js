import React, { Component } from "react";
import AppHeader from "./components/AppHeader.js.js";
import ContactsList from "./components/ContactsList.js.js";
import ContactForm from "./components/ContactForm";
import "./contacts.css";

class Contacts extends Component {
  state = {
    contacts: [],
    name: "",
    surename: "",
    notes: "",
    phone: "",
    filteredUsers: [],
    status: "Add Contact",
    editID: "",
    showUnexpError: false,
  };

  componentDidMount() {
    fetch("/getContacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.status === "ok") {
          const contacts = resp.contacts;
          this.setState({
            contacts: contacts,
          });
        } else {
          this.setState({
            showUnexpError: true,
          });
        }
      });

    //Send requests to keep session alive
    setInterval(() => {
      fetch("/contacts/refresh", {
        method: "POST",
      });
    }, 1000 * 60);
  }

  render() {
    return (
      <div onClick={this.hideUnexpError}>
        <AppHeader search={this.search} logout={this.logout} />
        <ContactsList
          contacts={
            this.state.filteredUsers.length > 0
              ? this.state.filteredUsers
              : this.state.contacts
          }
          delete={this.delete}
          add={this.add}
          edit={this.edit}
        />
        <ContactForm
          submitForm={this.submitForm}
          status={this.state.status}
          name={this.getName}
          nameValue={this.state.name}
          notes={this.getNotes}
          notesValue={this.state.notes}
          phone={this.getPhone}
          phoneNumber={this.state.phone}
        />

        {this.state.showUnexpError ? (
          <div className="unexpectedErrorDiv">
            Oops! Something went wrong. Refresh the page and try again.
          </div>
        ) : null}
      </div>
    );
  }

  search = e => {
    const value = e.target.value.toLowerCase();
    const { contacts } = this.state;
    const filteredUsers = [];
    contacts.map(el => {
      if (
        el.name.toLowerCase().includes(value) ||
        el.notes.toLowerCase().includes(value) ||
        el.phone.toLowerCase().includes(value)
      ) {
        filteredUsers.push(el);
      }
    });
    this.setState({
      filteredUsers,
    });
  };

  logout = () => {
    fetch("/logout", {
      headers: { "Content-Type": "application/json" },
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.status === "logout") {
          this.props.history.push("/sign_in");
        } else {
          this.setState({
            showUnexpError: true,
          });
        }
      });
  };

  hideUnexpError = () => {
    this.setState({ showUnexpError: false });
  };

  delete = e => {
    const { id } = e.target.parentNode.parentNode.dataset;
    const { contacts } = this.state;
    fetch(`/contacts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.status === "ok") {
          for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].id === parseInt(id)) {
              contacts.splice(i, 1);
              this.setState({
                contacts,
              });

              break;
            }
          }
        } else {
          this.setState({
            showUnexpError: true,
          });
        }
      });
  };

  add = () => {
    const contactForm = document.getElementById("contactForm");

    this.setState({
      name: "",
      notes: "",
      phone: "",
      status: "Add Contact",
    });

    contactForm.classList.toggle("active");
  };

  edit = e => {
    const contactForm = document.getElementById("contactForm");

    this.setState({
      name: "",
      notes: "",
      phone: "",
      status: "Edit Contact",
      editID: e.target.parentNode.parentNode.dataset.id,
    });

    contactForm.classList.toggle("active");
  };

  getName = e => {
    this.setState({
      name: e.target.value,
    });
  };

  getNotes = e => {
    this.setState({
      notes: e.target.value,
    });
  };

  getPhone = e => {
    const phoneDiv = document.querySelector("input.phone");
    phoneDiv.classList.remove("errorRequired");
    const reg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if (e.target.value.match(reg) || e.target.value === "") {
      this.setState({
        phone: e.target.value,
      });
    }
  };

  submitForm = e => {
    const { name, notes, phone, contacts } = this.state;
    if (this.state.status === "Add Contact") {
      let highestID = 0;
      const phoneDiv = document.querySelector("input.phone");
      if (phone !== "") {
        contacts.map(el => {
          if (el.id > highestID) highestID = el.id;
        });
        const newContact = { id: highestID + 1, name, notes, phone };

        fetch("/contacts/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newContact),
        })
          .then(resp => resp.json())
          .then(resp => {
            if (resp.status === "ok") {
              phoneDiv.classList.remove("errorRequired");
              this.setState({
                contacts: resp.contacts,
              });
              const contactForm = document.getElementById("contactForm");
              contactForm.classList.toggle("active");
            } else {
              this.setState({
                showUnexpError: true,
              });
            }
          });
      } else {
        phoneDiv.classList.add("errorRequired");
      }
    } else if (this.state.status === "Edit Contact") {
      const data = {};
      const contactForm = document.getElementById("contactForm");
      contacts.some(el => {
        if (el.id === parseInt(this.state.editID)) {
          const contactIndex = contacts.indexOf(el);
          if (Object.keys(data).length > 0) return false;
          if (name !== "") {
            data.name = name;
            contacts[contactIndex].name = name;
          }

          if (notes !== "") {
            data.notes = notes;
            contacts[contactIndex].notes = notes;
          }

          if (phone !== "") {
            data.phone_number = phone;
            contacts[contactIndex].phone = phone;
          }
        }
      });
      if (Object.keys(data).length > 0) {
        fetch(`/contacts/${this.state.editID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then(resp => resp.json())
          .then(resp => {
            if (resp.status === "ok") {
              this.setState({
                contacts,
              });
            } else {
              this.setState({
                showUnexpError: true,
              });
            }
            contactForm.classList.toggle("active");
          });
      } else {
        contactForm.classList.toggle("active");
      }
    }
  };
}

export default Contacts;
