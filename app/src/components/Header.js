import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'carbon-components-react';
import CarbonButton from './carbon/CarbonButton.js';
import HeaderTooltip from './HeaderTooltip.js';

class Header extends Component{
	constructor(props){
		super(props);
		this.activateMenu = this.activateMenu.bind(this);
	}

	static propTypes = {
		isAuth: PropTypes.bool.isRequired,
		logoutHandler: PropTypes.func.isRequired
	};

	activateMenu(){
		console.log("Activate menu button clicked");
	}

	render(){
		//{this.showLoginLogoutButton()}
		return (
			<div className="App-header">
			  <div className="header-menu-container">
				<CarbonButton onClick={this.activateMenu} text="">
					<Icon name="menu" />
				</CarbonButton>
			  </div>
			  <div className="header-app-name-container">
				<h1>Saveory</h1>
			  </div>
			  {this.props.isAuth && <HeaderTooltip user={this.props.user} onLogoutClick={this.props.logoutHandler}/>}
			</div>
		);
	}
}

export default Header;
