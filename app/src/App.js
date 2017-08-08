import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import components
import Home from './components/Home.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Saveory</h2>
        </div>
	<Home userToken={1}/>
	<Pantry user="test"/>
      </div>
    );
  }
}

export default App;
