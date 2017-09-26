import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonFormInput from './carbon/CarbonFormInput.js';
import CarbonButton from './carbon/CarbonButton.js';

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
		onAccessToggle: PropTypes.func.isRequired,
		loginInvalid: PropTypes.bool.isRequired
	};

	handleUsernameChange(target){
		this.setState({username: target.value});
	}
	
	handlePasswordChange(target){
		this.setState({password: target.value});
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
			<div className="user-access-container login-form-container">
				<CarbonFormInput inputText={this.state.username} inputType="text" inputID="username-input" inputLabel="Username" onChange={this.handleUsernameChange}/>
				<CarbonFormInput inputText={this.state.password} inputType="password" inputID="password-input" inputLabel="Password" onChange={this.handlePasswordChange} invalidText="Username or password is incorrect" isInvalid={this.props.loginInvalid}/>
				<CarbonButton text="Submit" onClick={this.sendLoginAttempt} isInForm={true}/>
				<CarbonButton text="Signup Here" onClick={this.props.onAccessToggle} className="user-access-switcher-button" isInForm={true} isSecondary={true} isGhost={true} isSmall={true}/>
			</div>	
		);
	}
}

export default LoginForm;

