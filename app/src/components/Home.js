import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from './open/Tabs.js';
import Pane from './open/Pane.js';
import Pantry from './Pantry.js';
import Recipes from './Recipes.js';

/**
 * Shows the main top-level components of Saveory in an easy-to-navigate fashion: Pantry and Recipes.
 */
class Home extends Component{
	static propTypes = {
		userToken: PropTypes.string,
		user: PropTypes.string,
		isAuth: PropTypes.bool.isRequired
	};

	static defaultProps = {
			userToken: "",
			user: ""
	};

	/**
	 * @propsUsed {this.props.userToken, this.props.user
	 * @return {JSX} - The Pantry and Recipes components seperated in controlled panels
	 */
	render(){
		let content = null;
		if(this.props.isAuth){
			content = (
				<div className="content-wrap">
					<Tabs selected={0}>
						<Pane label="Pantry"><Pantry userToken={this.props.userToken} user={this.props.user}/></Pane>
						<Pane label="Recipes"><Recipes userToken={this.props.userToken}/></Pane>
					</Tabs>
				</div>
			);
		}
		return content;
	}
}

export default Home;
