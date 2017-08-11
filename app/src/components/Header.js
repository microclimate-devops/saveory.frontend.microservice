import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../logo.svg';

class Header extends Component{
	static propTypes = {
		isAuth: PropTypes.bool.isRequired,
		logoutHandler: PropTypes.func.isRequired,
		loginHandler: PropTypes.func.isRequired
	};

	showLoginLogoutButton(){
		var returnButton;
		if(this.props.isAuth){
			returnButton = <button onClick={this.props.logoutHandler}>Logout</button>;
		}else{
			returnButton = <button onClick={this.props.loginHandler}>Login</button>;
		}
		return returnButton;
	}

	render(){
		return (
			<div className="App-header">
			  <img src={logo} className="App-logo" alt="logo" />
			  <h2>Welcome to Saveory</h2>
		    	  {this.showLoginLogoutButton}
			</div>
		);
	}
}

export default Header;
