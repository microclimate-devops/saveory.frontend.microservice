import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm.js';
import SignupForm from './SignupForm.js';
import Client from './Client.js';
//import { Form, Text } from 'react-form';

class UserAccess extends Component{
	constructor(props){
		super(props);
		this.requestLogin = this.requestLogin.bind(this);
		this.requestSignup = this.requestSignup.bind(this);
		this.requestCallback = this.requestCallback.bind(this);
		this.requestErrorHandler = this.requestErrorHandler.bind(this);
		this.toggleNeedsSignup = this.toggleNeedsSignup.bind(this);
		this.state = { 
			userMgmtResourceURL: "api/users/", 
			users: {"test": "pass"}, 
			requestFailed: false, 
			needsSignup: false
		};
	}

	static PropTypes = {
		loginHandler: PropTypes.func.isRequired
	};

	//Handle a successfull response from a login or signup attempt
	requestCallback(resp){
		let requestFailed = true;
		
		//If the token is present, send in handler defined through props
		if(resp.token !== undefined){
			this.props.loginHandler(resp);
			requestFailed = false;
		}

		this.setState({requestFailed: requestFailed});
	}

	requestErrorHandler(e){
		//Show error message
		console.log("Error: ");
		console.log(e.message);
		this.setState({requestFailed: true});
	}

	requestLogin(loginData){
		Client.request(this.state.userMgmtResourceURL+"login", "POST", this.requestCallback, this.requestErrorHandler, loginData);
		
	}

	requestSignup(signupData){
		Client.request(this.state.userMgmtResourceURL, "POST", this.requestCallback, this.requestErrorHandler, signupData);	
	}

	requestLogin_old(loginData){
		let requestFailed = true;
		

		//Check that password for user equals entered password
		if(this.state.users[loginData.username] === loginData.password){
			requestFailed = false;
			this.props.loginHandler(loginData.username);
		}
	
		console.log("password invalid: " +requestFailed);	
		this.setState({requestFailed: requestFailed});
	}

	toggleNeedsSignup(e){
		//Invert variable to initiate switch between login and signup form
		const needsSignup = this.state.needsSignup;
		this.setState({needsSignup: !needsSignup});
	}

	//Choose to show either login or signup form depending on the toggle switch button
	showAccessForm(){
		let form = <LoginForm processLogin={this.requestLogin} requestFailed={this.state.requestFailed} onAccessToggle={this.toggleNeedsSignup}/>;

		if(this.state.needsSignup){
			form = <SignupForm processSignup={this.requestSignup} requestFailed={this.state.requestFailed} onAccessToggle={this.toggleNeedsSignup}/>;
		}

		return form;
	}

	render(){
		//Show the login form
		return this.showAccessForm();
	}
}

export default UserAccess;

