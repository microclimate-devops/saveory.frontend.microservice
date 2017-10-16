import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm.js';
import SignupForm from './SignupForm.js';
import Client from './Client.js';
//import { Form, Text } from 'react-form';

/**
 * Manages giving the user access to saveory through the login and signup process
 */
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
		loginHandler: PropTypes.func.isRequired,
		isAuth: PropTypes.bool.isRequired
	};

	/**
	 * Handle a successfull response from a login or signup attempt
	 * @param {object} resp - The user management request response
	 * @propsUsed {this.props.loginHandler}
	 * @calls {this.props.loginHandler, this.setState}
	 */
	requestCallback(resp){
		let requestFailed = true;
		//If the token is present, send in handler defined through props
		if(resp.token !== undefined){
			console.log("POST to "+this.state.userMgmtResourceURL+"login");
			console.log(resp);
			this.props.loginHandler(resp);
			requestFailed = false;
		}
		//Update the request status
		this.setState({requestFailed: true});
	}

	/**
	 * Indicate that there was an error due to the request by updating the state
	 * @param {error} e
	 * @calls {this.setState}
	 */
	requestErrorHandler(e){
		//Show error message
		this.setState({requestFailed: true});
	}

	/**
	 * Send a request to login with entered data
	 * @param {object} loginData-The login data that the user entered
	 * @stateUsed {this.state.userMgmtResourceURL}
	 * @calls {Client.request}
	 */
	requestLogin(loginData){
		console.log("Login requested")
		Client.request(this.state.userMgmtResourceURL+"login", "POST", this.requestCallback, this.requestErrorHandler, loginData);
	}

	/**
	 * Send a request to signup with entered data
	 * @param {object} signupData-The signup data that the user entered
	 * @stateUsed {this.state.userMgmtResourceURL}
	 * @calls {Client.request}
	 */
	requestSignup(signupData){
		Client.request(this.state.userMgmtResourceURL, "POST", this.requestCallback, this.requestErrorHandler, signupData);
	}

	/**
	 * Allow the user to switch between the login and signup forms
	 * @param {DOM event} e - The toggle button was clicked
	 * @stateUsed {this.state.needsSignup}
	 * @calls {this.setState}
 	*/
	toggleNeedsSignup(e){
		//Invert variable to initiate switch between login and signup form
		const needsSignup = this.state.needsSignup;
		this.setState({needsSignup: !needsSignup});
	}


	/**
	 * Choose to show either login or signup form depending on the toggle switch button
	 * @stateUsed {this.state.requestFailed, this.state.needsSignup, this.state.requestFailed}
	 * @return {JSX} - Either the LoginForm or the SignupForm
	 */
	showAccessForm(){
		let form = null;
		if(!this.props.isAuth){
			form = <LoginForm processLogin={this.requestLogin} requestFailed={this.state.requestFailed} onAccessToggle={this.toggleNeedsSignup}/>;
			if(this.state.needsSignup){
				form = <SignupForm processSignup={this.requestSignup} requestFailed={this.state.requestFailed} onAccessToggle={this.toggleNeedsSignup}/>;
			}
		}
		return form;
	}

	/**
	 * Show the login or signup form
	 * @calls {this.showAccessForm}
	 * @return {JSX}
	 */
	render(){
		//Show the login form
		return this.showAccessForm();
	}
}

export default UserAccess;
