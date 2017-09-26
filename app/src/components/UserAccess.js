import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonButton from './carbon/CarbonButton.js';
import LoginForm from './LoginForm.js';
import SignupForm from './SignupForm.js';
import Client from './Client.js';
//import { Form, Text } from 'react-form';

class UserAccess extends Component{
	constructor(props){
		super(props);
		this.requestLogin = this.requestLogin.bind(this);
		this.requestCallback = this.requestCallback.bind(this);
		this.requestErrorHandler = this.requestErrorHandler.bind(this);
		this.toggleNeedsSignup = this.toggleNeedsSignup.bind(this);
		this.state = { userMgmtResourceURL: "api/users/", users: {"test": "pass"}, didRequestFail: false, needsSignup: false};
	}

	static PropTypes = {
		loginHandler: PropTypes.func.isRequired
	};

	//Handle a successfull response from a login or signup attempt
	requestCallback(resp){
		let didRequestFail = true;
		
		//If the token is present, send in handler defined through props
		if(resp.token !== undefined){
			this.props.loginHandler(resp);
			didRequestFail = false;
		}

		this.setState({didRequestFail: didRequestFail});
	}

	requestErrorHandler(e){
		//Show error message
		console.log("Error: ");
		console.log(e);
		this.setState({didRequestFail: true});
	}

	requestLogin(loginData){
		Client.request(this.state.userMgmtResourceURL+"login", "POST", this.requestCallback, this.requestErrorHandler, loginData);
		
	}

	requestSignup(signupData){
		Client.request(this.state.userMgmtResourceURL, "POST", this.requestCallback, this.requestErrorHandler, signupData);	
	}

	requestLogin_old(loginData){
		let didRequestFail = true;

		//Check that password for user equals entered password
		if(this.state.users[loginData.username] === loginData.password){
			didRequestFail = false;
			this.props.loginHandler(loginData.username);
		}
	
		console.log("password invalid: " +didRequestFail);	
		this.setState({didRequestFail: didRequestFail});
	}

	toggleNeedsSignup(e){
		//Invert variable to initiate switch between login and signup form
		const needsSignup = this.state.needsSignup;
		this.setState({needsSignup: needsSignup});
	}

	showAccessForm(){
		let form = <LoginForm processLogin={this.requestLogin} didRequestFail={this.state.didRequestFail}/>;

		if(this.state.needsSignup){
			form = <SignupForm processSignup={this.requestSignup} signupInvalid={this.state.didRequestFail}/>;
		}

		return form;
	}

	showAccessSwitcher(){
		//Determine what to show the user based on the current state of showing login or signup
		let switcherText = "Signup Here";
		if(this.state.needsSignup){
			switcherText = "Login Here";
		}

		return (
			<CarbonButton text={switcherText} onClick={this.toggleNeedsSignup} className="user-access-switcher-button"/>
		);
	}

	render(){
		//Show the login form
		return (
			<div className="user-access-container">
				{this.showAccessForm()}
				{this.showAccessSwitcher()}
			</div>
		);
	}
}

export default UserAccess;

