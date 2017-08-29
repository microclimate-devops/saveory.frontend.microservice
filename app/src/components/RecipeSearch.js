import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonButton from './carbon/CarbonButton.js';
import CarbonFormInput from './carbon/CarbonFormInput.js';

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

	handleChange(target){
		this.setState({search: target.value});
	}

	onSearch(e){
		this.props.handleSearch(this.state.search);
	}

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

