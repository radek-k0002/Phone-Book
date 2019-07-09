import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import Contacts from "./pages/contacts";
import "babel-polyfill";
import "./App.css";
require("es6-promise").polyfill();
require("isomorphic-fetch");

function App() {
  return (
    <Router>
      <Route exact path="/" component={SignUpForm}></Route>

      <Route path="/sign_in" component={SignInForm}></Route>

      <Route path="/contacts" component={Contacts}></Route>
    </Router>
  );
}

export default App;
