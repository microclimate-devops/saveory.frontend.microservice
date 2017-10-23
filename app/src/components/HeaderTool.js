import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'carbon-components-react';
import AccountSettingsModal from "./AccountSettingsModal";

/**
 * Handles universal user action operations in the header
 */
class HeaderTool extends Component{
	constructor(props){
		super(props);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.handleProfileClick = this.handleProfileClick.bind(this);
		this.toggleShowSettings = this.toggleShowSettings.bind(this);
		this.state = {showSettings: false};
	}

	static PropTypes = {
		onLogoutClick: PropTypes.func.isRequired,
		user: PropTypes.string.isRequired
	};

	handleLogoutClick(){
		this.props.onLogoutClick();
	}

	handleProfileClick(){
		this.toggleShowSettings();
	}

	/**
	 *
	 * @stateUsed {this.state.showSettings}
	 * @calls {this.setState}
	 */
	toggleShowSettings(){
		let showSettings = !this.state.showSettings;
		this.setState({showSettings: showSettings});
	}

	/**
	 * @propsUsed {this.props.user}
	 * @return {JSX} - The user actions list in the header
	 */
render(){
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
			<AccountSettingsModal open={this.state.showSettings} onClose={this.toggleShowSettings}/>
		</div>
		);
	}
}

export default HeaderTool;
