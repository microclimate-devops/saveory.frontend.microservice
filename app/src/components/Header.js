import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo.js';
import HeaderTool from './HeaderTool.js';

/**
 * Handles showing the app header with logo/identifier and universal actions
 */
class Header extends Component{
	static propTypes = {
		userData: PropTypes.object,
		isAuth: PropTypes.bool.isRequired,
		logoutHandler: PropTypes.func.isRequired,
		onUserUpdate: PropTypes.func.isRequired
	};

	/**
	 * @propsUsed {this.props.isAuth, this.props.user, this.props.logoutHandler}
	 * @return {JSX} - The header bar with actions displayed if the user is logged in
	 */
render(){
	/*
<h1>Saveory</h1>
	*/
		return (
			<div className="App-header">
				<div className="header-app-name-container">
					<Logo />
				</div>
			  {this.props.isAuth && <HeaderTool userData={this.props.userData} onLogoutClick={this.props.logoutHandler} onUserUpdate={this.props.onUserUpdate}/>}
			</div>
		);
	}
}

export default Header;
