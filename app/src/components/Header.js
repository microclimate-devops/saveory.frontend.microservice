import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderTool from './HeaderTool.js';

/**
 * Handles showing the app header with logo/identifier and universal actions
 */
class Header extends Component{
	static propTypes = {
		user: PropTypes.string,
		isAuth: PropTypes.bool.isRequired,
		logoutHandler: PropTypes.func.isRequired
	};

	static defaultProps = {
		user: ""
	};

	/**
	 * @propsUsed {this.props.isAuth, this.props.user, this.props.logoutHandler}
	 * @return {JSX} - The header bar with actions displayed if the user is logged in
	 */
render(){
		return (
			<div className="App-header">
			  <div className="header-app-name-container">
				<h1>Saveory</h1>
			  </div>
			  {this.props.isAuth && <HeaderTool user={this.props.user} onLogoutClick={this.props.logoutHandler}/>}
			</div>
		);
	}
}

export default Header;
