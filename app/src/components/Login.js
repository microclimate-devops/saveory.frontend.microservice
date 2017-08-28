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
		this.state = { userMgmtResourceURL: "api/users/", users: {"test": "pass"}, usernameIsInvalid: false, passwordIsInvalid: false};
	}

	static PropTypes = {
		loginHandler: PropTypes.func.isRequired
	};

	validateLoginCallback(resp){
		console.log(resp);
	}

	validateLogin(loginData){
		console.log("verifying user credentials with: "+JSON.stringify());
		const loginApiUrl = this.state.userMgmtResourceURL + "login";
		//Check with user management service to verify credentials
		Client.request(loginApiUrl, "POST", this.validateLoginCallback, loginData);
		
	}

	validateLogin_frontendonly(loginData){
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

