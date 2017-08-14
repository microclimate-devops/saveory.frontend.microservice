import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from './open/Tabs.js';
import Pane from './open/Pane.js';
import Pantry from './Pantry.js';
import Recipes from './Recipes.js';

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {username: "", pantry: []};
	}

	static propTypes = {
		userToken: PropTypes.number.isRequired,
		user: PropTypes.string.isRequired
	};

	render(){
		return (
			<div className="content-wrap">
				<Tabs selected={0}>
					<Pane label="Pantry"><Pantry user={this.props.user}/></Pane>
					<Pane label="Recipe Search"><Recipes/></Pane>
				</Tabs>
			</div>
		);
	}
}

export default Home;
