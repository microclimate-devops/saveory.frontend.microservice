import React, { Component } from 'react';
//import {Route} from 'react-router-dom';
import Header from './components/Header.js';
import Home from './components/Home.js';
import UserAccess from './components/UserAccess.js';
//import auth components
/*import SecureRoute from './components/auth/SecureRoute.js';
import UserAccess from './components/auth/UserAccess.js';
import Callback from './components/auth/Callback.js';
import OktaWrapHeader from './components/auth/OktaWrapHeader.js';
import OktaWrapHome from './components/auth/OktaWrapHome.js';*/

class App extends Component {
  constructor(props){
	super(props);
	this.state = {
		isAuth: false,
		username: "",
		userID: "",
		userToken: "",
	}
	this.login = this.login.bind(this);
	this.logout = this.logout.bind(this);
  }

  login(userData){
	console.log("logging in user with token: "+userData.token);
	this.setState({isAuth: true, userID: userData.username, username: userData.name, userToken: userData.token});
  }

  logout(){
	this.setState({isAuth: false});	
  }

  controlAccess(){
	//TEST DESIGN (DO NOT LEAVE FOR PROD)
	//const content = <Home userToken={1} user={this.state.user}/>;
	

	//REAL
	let content = null;
	if(this.state.isAuth){
		content = <Home userToken={this.state.userToken} user={this.state.username}/>;
	}else{
		content = <UserAccess loginHandler={this.login}/>;
	}
	return content;

  }

  render() {
	/*<Route component={OktaWrapHeader} />
	<SecureRoute exact={true} path="/" component={OktaWrapHome}/>
	<Route path="/login" component={UserAccess}/>
	<Route path="/callback" component={Callback}/>*/
    return (
      <div className="App">
		<Header user={this.state.username} isAuth={this.state.isAuth} logoutHandler={this.logout}/>
		{this.controlAccess()}
      </div>
    );
  }
}

export default App;
