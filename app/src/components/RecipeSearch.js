import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonButton from './carbon/CarbonButton.js';
import CarbonFormInput from './carbon/CarbonFormInput.js';

/**
 * Manages the search bar to find reicpes
 */
class RecipeSearch extends Component{
	constructor(props){
		super(props);
		this.state = {search: ""};
		this.handleChange = this.handleChange.bind(this);
		this.onSearch = this.onSearch.bind(this);
	}

	static PropTypes = {
		handleSearch: PropTypes.func.isRequired
	};

	/**
	 * When the search input changes, update state.search to reflect new data
	 * @param {DOM event.target} target - the search input
	 * @calls {this.setState}
	 */
	handleChange(inputId, target){
		this.setState({search: target.value});
	}

	/**
	 * Sends the user's search query through prop handler
	 * @param {DOM event} e- The search submit was clicked
	 * @propsUsed {this.props.handleSearch}
	 * @stateUsed {this.state.search}
	 * @calls {this.props.handleSearch}
	 */
	onSearch(e){
		this.props.handleSearch(this.state.search);
	}

	/**
	 * Shows the recipe search bar and the submit button to see results
	 * @stateUsed {this.state.search, this.state.search}
	 * @return {JSX}
	 */
	render(){
		//<input type="search" placeholder="Search for Recipes" onChange={this.handleChange} value={this.state.search}/>
		return (
			<div className="recipe-search-container">
				<CarbonFormInput inputData={this.state.search} inputType="text" inputID="recipe-search" inputLabel="Search for Recipes" onChange={this.handleChange} className="recipe-search-input-container"/>
				<CarbonButton onClick={this.onSearch} text="Search" addedClass="recipe-search-button-container"/>
			</div>
		);
	}
}

export default RecipeSearch;
