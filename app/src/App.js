import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
//import components
import Header from './components/Header.js';
//import Home from './components/Home.js';
import LoginPage from './components/auth/LoginPage.js';

class App extends Component {
  render() {
      	//<Home userToken={1} user="test"/>
    return (
      <Router>
	      <div className="App">
		<Route component={Header} />
		<Route path='/login' component={LoginPage} />
	      </div>
     </Router>
    );
  }
}

export default App;
