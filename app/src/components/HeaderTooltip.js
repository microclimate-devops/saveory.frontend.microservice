import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonButton from './carbon/CarbonButton.js';

class HeaderTooltip extends Component{
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

	render(){
		return (
		<div className="header-tooltip-container">
			<p className="header-tooltip-user">{this.props.user}</p>
			<CarbonButton onClick={this.handleLogoutClick} text="Logout" isGhost={true} isSmall={true}/>
		</div>
		);
	}
}

export default HeaderTooltip;
