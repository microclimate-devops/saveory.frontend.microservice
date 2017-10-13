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
	constructor(props){
		super(props);
		this.updateRecipeFilters = this.updateRecipeFilters.bind(this);
		this.state = {recipeFilters: {}};
	}

	static propTypes = {
		userToken: PropTypes.string.isRequired,
		user: PropTypes.string.isRequired
	};
	/**
	 * Allow filters to be added by subcomponents
	 * @param {string} type - The identifying group the new filter belongs to
	 * @param {object} filter - The new filter to add for recipe searches
	 * @stateUsed {this.state.recipeFilters}
	 * @calls {this.setState}
	 */
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

	/**
	 * @propsUsed {this.props.userToken, this.props.user
	 * @return {JSX} - The Pantry and Recipes components seperated in controlled panels
	 */
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
