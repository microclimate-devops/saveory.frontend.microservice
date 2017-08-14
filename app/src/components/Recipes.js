import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import RecipeSearch from './RecipeSearch.js';

class Recipes extends Component{
	constructor(props){
		super(props)
		this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
		this.handleSearchClear = this.handleSearchClear.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		
	}

	handleSearchTextChange(e){
		console.log("text changed: "+JSON.stringify(e));
	}

	handleSearchClear(e){
		console.log("text cleared: "+JSON.stringify(e));
	}

	handleSearchSubmit(query){
		console.log("search submitted: "+query);
	}

	render(){
		return (
			<div className="recipes-wrap">
				//search bar
				<h1>Search for Recipes</h1>
				<RecipeSearch handleSearch={this.handleSearchSubmit}/>
				//search results

				//recipe description
			</div>
		);
	}
}

export default Recipes;
