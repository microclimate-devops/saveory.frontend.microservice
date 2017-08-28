import React, { Component } from 'react';
//import {Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
//import auth components
/*import SecureRoute from './components/auth/SecureRoute.js';
import Login from './components/auth/Login.js';
import Callback from './components/auth/Callback.js';
import OktaWrapHeader from './components/auth/OktaWrapHeader.js';
import OktaWrapHome from './components/auth/OktaWrapHome.js';*/

class App extends Component {
  constructor(props){
	super(props);
	this.state = {
		isAuth: false,
		user: "me",
		userToken: undefined,
	}
	this.login = this.login.bind(this);
	this.logout = this.logout.bind(this);
  }

  login(token){
	console.log("logging in user with token: "+token);
	this.setState({isAuth: true, user: token, userToken: token});
  }

  logout(){
	this.setState({isAuth: false});	
  }

  accessHome(){
	let content = null;
	if(this.state.isAuth){
		content = <Home userToken={1} user={this.state.user}/>;
	}else{
		content = <Login loginHandler={this.login}/>;
	}
	return content;

  }

  render() {
	/*<Route component={OktaWrapHeader} />
	<SecureRoute exact={true} path="/" component={OktaWrapHome}/>
	<Route path="/login" component={Login}/>
	<Route path="/callback" component={Callback}/>*/
    return (
      <div className="App">
		<Header user={this.state.user} isAuth={this.state.isAuth} logoutHandler={this.logout}/>
		{this.accessHome()}
      </div>
    );
  }
}

export default App;
