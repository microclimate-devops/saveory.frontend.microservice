import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm.js';
import Client from './Client.js';
//import { Form, Text } from 'react-form';

class Login extends Component{
	constructor(props){
		super(props);
		this.validateLogin = this.validateLogin.bind(this);
		this.validateLoginCallback = this.validateLoginCallback.bind(this);
		this.validateLoginErrorHandler = this.validateLoginErrorHandler.bind(this);
		this.state = { userMgmtResourceURL: "api/users/", users: {"test": "pass"}, usernameIsInvalid: false, passwordIsInvalid: false};
	}

	static PropTypes = {
		loginHandler: PropTypes.func.isRequired
	};

	validateLoginCallback(resp){
		const userToken = resp.token;
		let passwordIsInvalid = true;

		if(userToken !== undefined){
			this.props.loginHandler(userToken);
			passwordIsInvalid = false;
		}

		this.setState({passwordIsInvalid: passwordIsInvalid});
	}

	validateLoginErrorHandler(e){
		//Show error message
		console.log("Error: ");
		console.log(e);
	}

	validateLogin(loginData){
		console.log("verifying user credentials with: "+JSON.stringify(loginData));
		const loginApiUrl = this.state.userMgmtResourceURL+"login";
		//Check with user management service to verify credentials
		Client.request(loginApiUrl, "POST", this.validateLoginCallback, loginData, this.validateLoginErrorHandler);
		
	}

	validateLogin_old(loginData){
		let passwordIsInvalid = true;

		//Check that password for user equals entered password
		if(this.state.users[loginData.username] === loginData.password){
			passwordIsInvalid = false;
			this.props.loginHandler(loginData.username);
		}
	
		console.log("password invalid: " +passwordIsInvalid);	
		this.setState({passwordIsInvalid: passwordIsInvalid});
	}

	render(){
		//Show the login form
		return (
			  <LoginForm processLogin={this.validateLogin} usernameIsInvalid={this.state.usernameIsInvalid} passwordIsInvalid={this.state.passwordIsInvalid}/>
		);
	}
}

export default Login;

