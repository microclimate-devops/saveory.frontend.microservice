import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

	handleChange(e){
		this.setState({search: e.target.value});
	}

	onSearch(e){
		this.props.handleSearch(this.state.search);
	}

	render(){
		return (
			<div className="search-container">
				<input type="search" placeholder="Search for Recipes" onChange={this.handleChange} value={this.state.search}/>
				<button onClick={this.onSearch}>Search</button>
			</div>
		);
	}
}

export default RecipeSearch;

