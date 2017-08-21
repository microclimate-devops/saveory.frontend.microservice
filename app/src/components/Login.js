import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm.js';
//import { Form, Text } from 'react-form';

class Login extends Component{
	constructor(props){
		super(props);
		this.validateLogin = this.validateLogin.bind(this);
		this.state = { users: {"test": "pass"}, usernameIsInvalid: false, passwordIsInvalid: false};
	}

	static PropTypes = {
		loginHandler: PropTypes.func.isRequired
	};

	validateLogin(loginData){
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

