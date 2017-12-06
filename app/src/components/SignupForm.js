import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonFormInput from './carbon/CarbonFormInput.js';
import CarbonButton from './carbon/CarbonButton.js';
import {InlineNotification} from 'carbon-components-react';

/**
 * Manages the user signup form
 */
class SignupForm extends Component{
	constructor(props){
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.sendSignupAttempt = this.sendSignupAttempt.bind(this);
		this.state = {
			signupData: {
				name: "",
				username: "",
				email: "",
				password: "",
				verifyPassword: "",
			},
			validate: {name: false, username: false, email: false, password: false, verifyPassword: false}
		};
	}

	static propTypes = {
		processSignup: PropTypes.func.isRequired,
		onAccessToggle: PropTypes.func.isRequired,
		requestFailed: PropTypes.bool.isRequired
	};

	/**
	 * Validate and update the state when user input changes
	 * @param {DOM event.target} target- the input that changed
	 * @stateUsed {this.state.signupData, this.state.validate, this.state.signupData}
	 * @calls {target.getAttribute, this.setState}
	 */
	handleInputChange(inputId, target){
		//validate
		const data = target.value;
		const selector = inputId;
		let signupData = this.state.signupData;
		let validate = this.state.validate;

		//set validity for selector
		if(selector === "verifyPassword"){ //verify the validate password entry equals entered password
			validate[selector] = data === this.state.signupData.password;
		}else{
			validate[selector] = data.length !== 0;
		}

		//set new data
		signupData[selector] = data;

		//update
		this.setState({signupData: signupData, validate: validate});
	}

	/**
	 * Sends the signup data to prop handler
	 * @propsUsed {this.props.processSignup}
	 * @stateUsed {this.state.signupData, this.state.signupData}
	 * @calls {this.props.processSignup}
	 */
	sendSignupAttempt(){
		this.props.processSignup(this.state.signupData);
	}


	/**
	 * check if all fields are valid
	 * @stateUsed {this.state.validate}
	 * @return {boolean} - tell if all the user inputs are valid
	 */
	isValid(){
		const validate = this.state.validate;
		for(var field in validate){
			if(validate[field] === false){
				return false; //one of the fields is still invalid
			}
		}
		return true; //all fields passed
	}

	/**
	 * Show a notification if the signup request failed
	 * @propsUsed {this.props.requestFailed}
	 * @return {return_type} -
	 */
	showError(){
		const requestFailed = this.props.requestFailed;
		if(requestFailed){
			return <InlineNotification kind="error" title="Invalid Signup" subtitle="That username is not available" role="alert"/>;
		}
	}

	/**
	 * Show the signup form
	 * @propsUsed {this.props.onAccessToggle}
	 * @stateUsed {this.state.signupData, this.state.validate, this.state.signupData, this.state.validate, this.state.signupData, this.state.validate, this.state.signupData, this.state.validate, this.state.signupData, this.state.validate}
	 * @calls {return, this.isValid, this.showError}
	 * @return {JSX}
	 */
	render(){
		return(
			<div className="user-access-container signup-form-container">
				<CarbonFormInput inputData={this.state.signupData.name} inputType="text" inputID="name" inputLabel="Name" onChange={this.handleInputChange} invalidText="Required" isInvalid={!this.state.validate.name}/>
				<CarbonFormInput inputData={this.state.signupData.email} inputType="text" inputID="email" inputLabel="Email" onChange={this.handleInputChange} invalidText="Required" isInvalid={!this.state.validate.email}/>
				<CarbonFormInput inputData={this.state.signupData.username} inputType="text" inputID="username" inputLabel="Username" onChange={this.handleInputChange} invalidText="Required" isInvalid={!this.state.validate.username}/>
				<CarbonFormInput inputData={this.state.signupData.password} inputType="password" inputID="password" inputLabel="Password" onChange={this.handleInputChange} invalidText="Required" isInvalid={!this.state.validate.password}/>
				<CarbonFormInput inputData={this.state.signupData.verifyPassword} inputType="password" inputID="verifyPassword" inputLabel="Verify Password" onChange={this.handleInputChange} invalidText="Passwords Must Match" isInvalid={!this.state.validate.verifyPassword}/>
				<CarbonButton text="Submit" onClick={this.sendSignupAttempt} isInForm={true} isDisabled={!this.isValid()}/>
				<CarbonButton text="Login Here" onClick={this.props.onAccessToggle} className="user-access-switcher-button" isInForm={true} isSecondary={true} isGhost={true} isSmall={true}/>
				{this.showError()}
			</div>
		);
	}
}

export default SignupForm;
