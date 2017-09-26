import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonFormInput from './carbon/CarbonFormInput.js';
import CarbonButton from './carbon/CarbonButton.js';

class SignupForm extends Component{
	constructor(props){
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.sendSignupAttempt = this.sendSignupAttempt.bind(this);
		this.state = {
			signupData: {
				name: "", 
				username: "", 
				password: "",
				verifyPassword: "",
			},
			validate: {name: false, username: false, password: false, verifyPassword: false}
		};	
	}

	static PropTypes = {
		processSignup: PropTypes.func.isRequired,
		onAccessToggle: PropTypes.func.isRequired,
		signupInvalid: PropTypes.bool.isRequired
	};

	handleInputChange(target){
		//validate
		const data = target.value;
		const selector = target.getAttribute('id');
		let signupData = this.state.signupData;
		let validate = this.state.validate;

		//set validity for selector
		if(selector === "validatePassword"){ //verify the validate password entry equals entered password
			validate[selector] = data === this.state.signupData.password;	
		}else{
			validate[selector] = data.length !== 0;
		}

		//set new data
		signupData[selector] = data;

		//update
		this.setState({signupData: signupData, validate: validate});
	}

	sendSignupAttempt(){
		this.props.processSignup(this.state.signupData);
	}

	//check if all fields are valid
	isValid(){
		const validate = this.state.validate;
		for(var field in validate){
			if(validate[field] === false){
				return false; //one of the fields is still invalid
			}
		}
		return true; //all fields passed
	}
	
	render(){
		return(
			<div className="user-access-container signup-form-container">
				<CarbonFormInput inputText={this.state.signupData.name} inputType="text" inputID="name" inputLabel="Name" onChange={this.handleInputChange}/>
				<CarbonFormInput inputText={this.state.signupData.username} inputType="text" inputID="username" inputLabel="Username" onChange={this.handleInputChange}/>
				<CarbonFormInput inputText={this.state.signupData.password} inputType="password" inputID="password" inputLabel="Password" onChange={this.handleInputChange} invalidText="Username or password is incorrect" isInvalid={this.props.signupInvalid}/>
				<CarbonFormInput inputText={this.state.signupData.verifyPassword} inputType="password" inputID="verifyPassword" inputLabel="Verify Password" onChange={this.handleInputChange} invalidText="Username or password is incorrect" isInvalid={this.props.signupInvalid}/>
				<CarbonButton text="Submit" onClick={this.sendSignupAttempt} isInForm={true} isDisabled={!this.isValid()}/>
				<CarbonButton text="Login Here" onClick={this.props.onAccessToggle} className="user-access-switcher-button" isInForm={true} isSecondary={true} isGhost={true} isSmall={true}/>
			</div>	
		);
	}
}

export default SignupForm;


