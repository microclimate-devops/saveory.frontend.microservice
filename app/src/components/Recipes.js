import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Client from './Client.js';
import RecipeSearch from './RecipeSearch.js';
import RecipeSearchResults from './RecipeSearchResults.js';
import RecipeSelection from './RecipeSelection.js';

/**
 * Manages the components necessary to search for recipes, select a search results, and show the details of the selected recipe
 */
class Recipes extends Component{
	constructor(props){
		super(props)
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.setSearchFilter = this.setSearchFilter.bind(this);
		this.state = {
			pantryServiceURL: "api/pantry/",
			recipeServiceURL: "api/recipes/",
			recipesDB:[],
			recipes: [],
			pantryIngredients: [],
			searchFilters: {
				includedIngredients: [],
				excludedIngredients: []
			},
			searchFilterTypes: {
				ingredient: {
					include: "includedIngredients",
					exclude: "excludedIngredients"
				}
			}
		};
	}

	static propTypes = {
		userToken: PropTypes.string.isRequired
	};

	/**
	 * Sets data for specified filter
	 * @param {string} filterType-The filter named used as a key
	 * @param {array} filterData-The new filter data
	 * @stateUsed {this.state.searchFilters}
	 * @calls {this.setState}
	 */
	setSearchFilter(filterType, filterData){
		let searchFilters = this.state.searchFilters;
		if(searchFilters[filterType] !== undefined){
			searchFilters[filterType] = filterData;
			this.setState({searchFilters:searchFilters});
		}
	}

	/**
	 * Updates the list of recipes state when the response comes in
	 * @param {Array(object)} response - the GET recipes response
	 * @calls {this.setState}
	 */
	handleRecipeResponse(response){
		if(Array.isArray(response)){
			this.setState({recipes: response});
		}
	}

	/**
	 * Handles an error generated from requesting recipes
	 * @param {error} e
	 * @calls {console.log}
	 */
	handleRecipeError(e){
		console.log("Error accessing recipes from backend");
	}

	/**
	 * Initiates the request to the recipes service to get all the recipes
	 * @stateUsed {this.state.recipeServiceURL}
	 * @calls {Client.request, this.handleRecipeResponse}
	 */
	retrieveRecipes(){
		//retrieve the user's pantry from the backend
		Client.request(this.state.recipeServiceURL, "GET", (response) => {this.handleRecipeResponse(response)}, (e) => {this.handleRecipeResponse(e)});
	}

	/**
	 * Gets the list of ingredient names from user's pantry
	 * @propsUsed {this.props.userToken, this.props.userToken}
	 * @stateUsed {this.state.pantryServiceURL, this.state.pantryServiceURL}
	 * @calls {console.log, Client.request, this.setState}
	 */
	retrievePantryIngredients(){
		const reqURL = this.state.pantryServiceURL+this.props.userToken+"/ingredients";
		Client.request(reqURL, "GET",
			(response) => {
				this.setState({pantryIngredients: response});
			},
			(e) => {
				console.log("Error getting ingredient names from user's pantry. Message: "+e.message+". "+e.trace);
			});
	}

	/**
	 * Determines whether or not a query input matches a string target
	 * @param {string} query-The user's search
	 * @param {string} target-A target to compare against
	 * @calls {query.toLowerCase, target.toLowerCase, queryLowercase.split, targetLowercase.indexOf}
	 * @return {boolean}
	 */
	isQueryMatch(query, target){
		let matchResult = -1;
		//make sure query is not an empty string
		if(query.length !== 0){
			const queryLowercase = query.toLowerCase();
			const targetLowercase = target.toLowerCase();
			const querySplit = queryLowercase.split(" ");


			//go through words in query to see if any substrings match in target
			for(let i = 0; i < querySplit.length && matchResult === -1; i++){
				matchResult = targetLowercase.indexOf(querySplit[i]);
			}
		}
		return matchResult !== -1;

	}

	/**
	 * Processes the user search by comparing their query with each recipe in the state.recipesDB list
	 * @param {string} query- The user's search
	 * @stateUsed {this.state.recipesDB}
	 * @calls {this.isQueryMatch, recipeMatches.push, this.setState}
	 */
	handleSearchSubmit__old(query){
		this.handleSearchSubmit__new(query);
		const recipesDB = this.state.recipesDB;
		let recipeMatches = [];
		//find recipes in db that match
		for(let recipeIndex in recipesDB){
			const recipe = recipesDB[recipeIndex];
			//check if query matches recipe name
			if(this.isQueryMatch(query, recipe.name)){
				//add index to recipe
				recipe.index = recipeMatches.length;
				recipeMatches.push(recipe);

			}
		}
		//Update state to represent new search
		this.setState({recipes: recipeMatches});
	}

	addSearchFilters(targetStr){
		const filterTypes = this.state.searchFilterTypes.ingredient;
		const searchFilters = this.state.searchFilters;
		let currentFilter = undefined;
		let filterType = undefined;
		//go through each filter and add it's data
		for(var key in filterTypes){
			filterType = filterTypes[key]
			currentFilter = searchFilters[filterType];
			//reduce the filter array into a single query string
			targetStr += currentFilter.reduce(
				(filterString, currData) => {
					return filterString+ "&"+filterType+"="+currData;
				}, "");
		}
		return targetStr;
	}

	handleSearchSubmit(query){
			//Put together request URL with all necessary data
			let reqURL = this.state.recipeServiceURL;

			//Add user token
			reqURL += "?user_token="+this.props.userToken;

			//Add query
			reqURL += "&search=" + query.replace(" ", "+");

			//Add search filters
			reqURL = this.addSearchFilters(reqURL);

			//Make request
			Client.request(reqURL, "GET", (response) => {this.handleRecipeResponse(response)}, (e) => {this.handleRecipeResponse(e)});
	}

	/**
	 * Requests recipes in the database when the component mounts
	 * @calls {this.retrieveRecipes}
	 */
	componentDidMount(){
		//this.retrieveRecipes();
		this.retrievePantryIngredients();
	}

	/**
	 * Handles rendering the components for searching, showing results, and displaying selected recipes
	 * @stateUsed {this.state.recipes, this.state.recipeIndex}
	 * @return {JSX}
	 */
	render(){
		//<RecipeDisplay userToken={this.props.userToken} recipe={this.state.recipeSelected} pantryServiceURL={this.state.pantryServiceURL}/>
		//<RecipeSelection recipes={this.state.recipes} recipeIndex={this.state.recipeIndex} onChange={this.handleRecipeSelected}/>
		return (
			<div className="recipes-wrap">
				<div className="recipes-container">
					<RecipeSearch handleSearch={this.handleSearchSubmit} pantryIngredients={this.state.pantryIngredients} filters={this.state.searchFilters} filterTypes={this.state.searchFilterTypes} onFilterChange={this.setSearchFilter}/>
					<RecipeSearchResults userToken={this.props.userToken} recipes={this.state.recipes} onResultSelected={this.handleRecipeSelected}/>
				</div>
				<div className="spacer"></div>
			</div>
		);
	}
}

export default Recipes;
