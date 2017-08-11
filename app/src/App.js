import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
//import auth components
import SecureRoute from './components/auth/SecureRoute.js';
import Login from './components/auth/Login.js';
import Callback from './components/auth/Callback.js';
import OktaWrapHeader from './components/auth/OktaWrapHeader.js';
import OktaWrapHome from './components/auth/OktaWrapHome.js';

class App extends Component {
  render() {
    return (
      <div className="App">
	<Route component={OktaWrapHeader} />
	<SecureRoute exact={true} path="/" component={OktaWrapHome}/>
	<Route path="/login" component={Login}/>
	<Route path="/callback" component={Callback}/>
      </div>
    );
  }
}

export default App;
