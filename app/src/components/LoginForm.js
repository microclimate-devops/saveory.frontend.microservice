import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonFormInput from './carbon/CarbonFormInput.js';
import CarbonButton from './carbon/CarbonButton.js';
import {InlineNotification} from 'carbon-components-react';

class LoginForm extends Component{
	constructor(props){
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.sendLoginAttempt = this.sendLoginAttempt.bind(this);
		this.state = {
			loginData: {
				username: "", 
				password: ""
			}
		};	
	}

	static PropTypes = {
		processLogin: PropTypes.func.isRequired,
		onAccessToggle: PropTypes.func.isRequired,
		requestStatus: PropTypes.bool.isRequired
	};

	handleInputChange(target){
		const data = target.value;
		const selector = target.getAttribute('id');
		let loginData = this.state.loginData;
		
		//update state to reflect new input text
		loginData[selector] = data;
		this.setState({loginData: loginData});
	}

	sendLoginAttempt(){
		this.props.processLogin(this.state.loginData);
	}

	showError(){
		const requestStatus = this.props.requestStatus;
		if(requestStatus.failed){
			return <InlineNotification kind="error" title="Invalid Login" subtitle={requestStatus.msg} role="alert"/>;
		}
	}
	
	
	render(){
		return(
			<div className="user-access-container login-form-container">
				<CarbonFormInput inputText={this.state.username} inputType="text" inputID="username-input" inputLabel="Username" onChange={this.handleInputChange}/>
				<CarbonFormInput inputText={this.state.password} inputType="password" inputID="password-input" inputLabel="Password" onChange={this.handleInputChange}/>
				<CarbonButton text="Submit" onClick={this.sendLoginAttempt} isInForm={true}/>
				<CarbonButton text="Signup Here" onClick={this.props.onAccessToggle} className="user-access-switcher-button" isInForm={true} isSecondary={true} isGhost={true} isSmall={true}/>
				{this.showError()}
			</div>	
		);
	}
}

export default LoginForm;

