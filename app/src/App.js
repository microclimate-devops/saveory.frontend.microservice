import React, { Component } from 'react';
//import {Route} from 'react-router-dom';
import Header from './components/Header.js';
import Home from './components/Home.js';
import UserAccess from './components/UserAccess.js';

/**
 * The Main component from which all other component use flows
 */
class App extends Component {
  constructor(props){
	super(props);
	this.state = {
		isAuth: false,
    userData: {},
	}
	this.login = this.login.bind(this);
	this.logout = this.logout.bind(this);
  this.handleUserUpdate = this.handleUserUpdate.bind(this);
  }

  /**
   * Update the state to reflect a user login
   * @param {object} userData-The data of the user that logged in
   * @calls {this.setState}
   */
  login(userData){
	this.setState({isAuth: true, userData: userData});
  }

  /**
   * Update the state to indicate that the user has logged out
   * @calls {this.setState}
   */
  logout(){
	this.setState({isAuth: false});
  }

  /**
   * Updates stored data on the user with new information
   * @param {object} newUserData-
   * @calls {this.setState}
   */
  handleUserUpdate(newUserData){
    this.setState({userData: newUserData})
  }

  /**
   * If the user is logged in, shows Home page, otherwise directs user to gain access
   * @stateUsed {this.state.user, this.state.isAuth, this.state.userData}
   * @return {JSX}
   */
  controlAccess(){
	//TEST DESIGN (DO NOT LEAVE FOR PROD)
	//const content = <Home userToken={1} user={this.state.user}/>;


	//REAL
	let content = null;
	if(this.state.isAuth){
    console.log("Authenticated");
		content = <Home userToken={this.state.userData.token} user={this.state.userData.name}/>;
	}
	return content;

  }

  /**
   * Shows the Header and an appropriate view based on user access
   * @stateUsed {this.state.userData, this.state.isAuth}
   * @calls {this.controlAccess}
   * @return {JSX}
   */
  render() {
    return (
      <div className="App">
		    <Header userData={this.state.userData} isAuth={this.state.isAuth} logoutHandler={this.logout} onUserUpdate={this.handleUserUpdate}/>
        <UserAccess isAuth={this.state.isAuth} loginHandler={this.login}/>
        <Home isAuth={this.state.isAuth} userToken={this.state.userData.token} user={this.state.userData.name}/>
      </div>
    );
  }
}

export default App;
