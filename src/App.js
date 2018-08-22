import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Calculator from "./Calculator";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="center">Rend Research Calculator</h1>
        <Calculator />
      </React.Fragment>
    );
  }
}

export default App;
