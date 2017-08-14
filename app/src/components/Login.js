import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { Form, Text } from 'react-form';

class Login extends Component{
	constructor(props){
		super(props);
		this.verifyCredentials = this.verifyCredentials.bind(this);
	        this.handleUsernameInput = this.handleUsernameInput.bind(this);
	        this.handlePasswordInput = this.handlePasswordInput.bind(this);

		this.state = {username: "", password: "", users: {"test": "pass"}, loginError:""};
	}

	static propTypes = {
		loginHandler: PropTypes.func.isRequired
	};

	handleUsernameInput(e){
		this.setState({username: e.target.value});
	}

	handlePasswordInput(e){
		this.setState({password: e.target.value});
	}

	verifyCredentials(e){
		//Check that recorded password equals entered password
		if(this.state.users[this.state.username] === this.state.password){
			this.props.loginHandler(this.state.username);
		}else{
			//show error message
			this.setState({loginError: "Failed Login. Please enter your username and password"});
		}
	}

	render(){
		//Show the login form
		return (
			<div className="login-form">
			  Username: <input type="text" onChange={this.handleUsernameInput} value={this.state.username}/><br/>
			  Password: <input type="password" onChange={this.handlePasswordInput} value={this.state.password}/><br/>
			  <button onClick={this.verifyCredentials}>Submit</button>
		          <h2 className="error-msg">{this.state.loginError}</h2>
			</div>
		);
	}
}

export default Login;

