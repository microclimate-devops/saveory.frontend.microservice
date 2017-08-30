import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'carbon-components-react';
//import CarbonButton from './carbon/CarbonButton.js';

class HeaderTool extends Component{
	constructor(props){
		super(props);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
	}

	static PropTypes = {
		onLogoutClick: PropTypes.func.isRequired,
		user: PropTypes.string.isRequired
	};

	handleLogoutClick(){
		this.props.onLogoutClick();
	}

	handleProfileClick(){
		console.log("Profile clicked");
	}

	render(){
		/*
			<p className="header-tooltip-user">{this.props.user}</p>
			<CarbonButton onClick={this.handleLogoutClick} text="Logout" isGhost={true} isSmall={true}/>
		*/
		return (
		<div className="header-tool-container">
			<ul className="header-tool-list">
				<li id="profile-bar" onClick={this.handleProfileClick}>
						<Icon name="user" height="24" width="24"/>
						<p>{this.props.user}</p>
				</li>
				<li id="logout-bar" onClick={this.handleLogoutClick}>
						<Icon name="close--outline" height="24" width="24"/>
						<p>Logout</p>
				</li>
			</ul>
		</div>
		);
	}
}

export default HeaderTool;
