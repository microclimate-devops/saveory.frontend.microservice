import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Client from './Client.js';
import RecipeSearch from './RecipeSearch.js';
import RecipeSearchResults from './RecipeSearchResults.js';
import RecipeDisplay from './RecipeDisplay.js';

/**
 * Manages the components necessary to search for recipes, select a search results, and show the details of the selected recipe
 */
class Recipes extends Component{
	constructor(props){
		super(props)
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleRecipeSelected = this.handleRecipeSelected.bind(this);
		this.state = {
			recipeServiceURL: "api/recipes/",
			recipesDB:[],
			recipes: [],
			recipeSelected: {}
		};
	}

	static propTypes = {
		userToken: PropTypes.string.isRequired
	};

	/**
	 * Requests recipes in the database when the component mounts
	 * @calls {this.retrieveRecipes}
	 */
	componentDidMount(){
		this.retrieveRecipes();
	}

	/**
	 * Updates the list of recipes state when the response comes in
	 * @param {Array(object)} response - the GET recipes response
	 * @calls {this.setState}
	 */
	handleRecipeResponse(response){
		console.log("GET to "+this.state.recipeServiceURL);
		console.log(response);
		this.setState({recipesDB: response});
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
	handleSearchSubmit(query){
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
		this.setState({recipes: recipeMatches, recipeSelected: {}});
	}

	handleSearchSubmit__new(query){

	}

	/**
	 * Updates the currently selected recipe to whichever search result the user clicked
	 * @param {int} i - the index of the selected recipe
	 * @stateUsed {this.state.recipes}
	 * @calls {this.setState}
	 */
	handleRecipeSelected(i){
		this.setState({recipeSelected: this.state.recipes[i]});
	}

	/**
	 * Handles rendering the components for searching, showing results, and displaying selected recipes
	 * @stateUsed {this.state.recipes, this.state.recipeSelected}
	 * @return {JSX}
	 */
	render(){
		return (
			<div className="recipes-wrap">
				<div className="recipes-container">
					<RecipeSearch handleSearch={this.handleSearchSubmit}/>
					<RecipeSearchResults recipes={this.state.recipes} onResultSelected={this.handleRecipeSelected}/>
					<RecipeDisplay recipe={this.state.recipeSelected} />
				</div>
				<div className="spacer"></div>
			</div>
		);
	}
}

export default Recipes;
