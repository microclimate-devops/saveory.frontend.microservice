import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderTooltip from './HeaderTooltip.js';
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
			  <img src="https://devico.io/images/react-logo-dark.svg" className="App-logo" alt={logo} />
			  <h2>Welcome to Saveory</h2>
			  {this.props.isAuth && <HeaderTooltip user={this.props.user} onLogoutClick={this.props.logoutHandler}/>}
			</div>
		);
	}
}

export default Header;
