import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonFormInput from './carbon/CarbonFormInput.js';
import CarbonButton from './carbon/CarbonButton.js';
import {InlineNotification} from 'carbon-components-react';
/**
 * Handles showing a login form and keeping track of inputs
 */
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
		requestFailed: PropTypes.bool.isRequired
	};

	/**
	 * Updates the state of loginData to reflect current inputs
	 * @param {DOM event.target} target - The input that was updated
	 * @stateUsed {this.state.loginData}
	 * @calls {target.getAttribute, this.setState}
	 */
	handleInputChange(inputId, target){
		const data = target.value;
		const selector = inputId;
		let loginData = this.state.loginData;

		//update state to reflect new input text
		loginData[selector] = data;
		this.setState({loginData: loginData});
	}

	/**
	 * Sends the loginData, kept up to date with current inputs, to be processed
	 * @propsUsed {this.props.processLogin}
	 * @stateUsed {this.state.loginData}
	 * @calls {this.props.processLogin}
	 */
	sendLoginAttempt(){
		this.props.processLogin(this.state.loginData);
	}

	/**
	 * Shows an error message if the login failed
	 * @propsUsed {this.props.requestFailed}
	 * @return {InlineNotification}
	 */
	showError(){
		const requestFailed = this.props.requestFailed;
		if(requestFailed){
			return <InlineNotification kind="error" title="Invalid Login" subtitle="The username or password was entered incorrectly" role="alert"/>;
		}
	}


	/**
	 * Shows the login form
	 * @propsUsed {this.props.onAccessToggle}
	 * @stateUsed {this.state.username, this.state.password}
	 * @calls {this.showError}
	 * @return {JSX}
	 */
	render(){
		return(
			<div className="user-access-container login-form-container">
				<CarbonFormInput inputText={this.state.username} inputType="text" inputID="username" inputLabel="Username" onChange={this.handleInputChange}/>
				<CarbonFormInput inputText={this.state.password} inputType="password" inputID="password" inputLabel="Password" onChange={this.handleInputChange}/>
				<CarbonButton text="Submit" onClick={this.sendLoginAttempt} isInForm={true}/>
				<CarbonButton text="Signup Here" onClick={this.props.onAccessToggle} className="user-access-switcher-button" isInForm={true} isSecondary={true} isGhost={true} isSmall={true}/>
				{this.showError()}
			</div>
		);
	}
}

export default LoginForm;
