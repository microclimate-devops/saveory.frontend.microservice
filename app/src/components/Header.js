import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../logo.svg';

class Header extends Component{
	static propTypes = {
		isAuth: PropTypes.bool.isRequired,
		logoutHandler: PropTypes.func.isRequired
	};

	render(){
		//{this.showLoginLogoutButton()}
		return (
			<div className="App-header">
			  <img src={logo} className="App-logo" alt="logo" />
			  <h2>Welcome to Saveory</h2>
			  {this.props.isAuth && <button className="logout-button" onClick={this.props.logoutHandler}>Logout</button>}
			</div>
		);
	}
}

export default Header;
