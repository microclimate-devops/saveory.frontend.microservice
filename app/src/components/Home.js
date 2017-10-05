import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from './open/Tabs.js';
import Pane from './open/Pane.js';
import Pantry from './Pantry.js';
import Recipes from './Recipes.js';

class Home extends Component{
	constructor(props){
		super(props);
		this.updateRecipeFilters = this.updateRecipeFilters.bind(this);
		this.state = {recipeFilters: {}};
	}

	static propTypes = {
		userToken: PropTypes.number.isRequired,
		user: PropTypes.string.isRequired
	};

	//Allow filters to be added by subcomponents
	updateRecipeFilters(type, filter){
		//if the filter type is not found in existing filter data, add it as an array
		let recipeFilters = this.state.recipeFilters;
		if(recipeFilters[type] === undefined){
			recipeFilters[type] = [];
		}

		//push the filter
		recipeFilters[type].push(filter);

		//update state
		this.setState({recipeFilters: recipeFilters});
	}

	render(){
		return (
			<div className="content-wrap">
				<Tabs selected={0}>
					<Pane label="Pantry"><Pantry userToken={this.props.userToken} user={this.props.user} onRecipeFilterUpdate={this.updateRecipeFilters}/></Pane>
					<Pane label="Recipes"><Recipes userToken={this.props.userToken}/></Pane>
				</Tabs>
			</div>
		);
	}
}

export default Home;
