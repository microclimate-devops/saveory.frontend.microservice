import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonFormInput from './carbon/CarbonFormInput.js';
import CarbonButtonPrimary from './carbon/CarbonButtonPrimary.js';

class LoginForm extends Component{
	constructor(props){
		super(props);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.sendLoginAttempt = this.sendLoginAttempt.bind(this);
		this.state = {username: "", password: ""};	
	}

	static PropTypes = {
		processLogin: PropTypes.func.isRequired,
		usernameIsInvalid: PropTypes.bool.isRequired,
		passwordIsInvalid: PropTypes.bool.isRequired
	};

	handleUsernameChange(input){
		this.setState({username: input});
	}
	
	handlePasswordChange(input){
		this.setState({password: input});
	}

	sendLoginAttempt(){
		const loginData = {
			username: this.state.username,
			password: this.state.password
		};
	
		this.props.processLogin(loginData);
	}
	
	render(){
		return(
			<div className="login-form-container">
				<CarbonFormInput inputText={this.state.username} inputType="text" inputID="username-input" inputLabel="Username" onChange={this.handleUsernameChange} invalidText="Username is taken" isInvalid={this.props.usernameIsInvalid}/>
				<CarbonFormInput inputText={this.state.password} inputType="password" inputID="password-input" inputLabel="Password" onChange={this.handlePasswordChange} invalidText="Username or password is incorrect" isInvalid={this.props.passwordIsInvalid}/>
				<CarbonButtonPrimary buttonText="Submit" onClick={this.sendLoginAttempt} isInForm={true}/>
			</div>	
		);
	}
}

export default LoginForm;

