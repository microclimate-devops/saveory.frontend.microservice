import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import Https from 'https';
//import axios from 'axios';
import Client from './Client.js';
import RecipeSearch from './RecipeSearch.js';
import RecipeSearchResults from './RecipeSearchResults.js';
import RecipeDisplay from './RecipeDisplay.js';

class Recipes extends Component{
	constructor(props){
		super(props)
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleRecipeSelected = this.handleRecipeSelected.bind(this);
		this.state = {
			//recipeServiceURL: "https://dps-ubuntu-cfcmaster.rtp.raleigh.ibm.com:8443/kubernetes/api/v1/proxy/namespaces/default/services/recipeservice-service:9080/RecipeService/",
			recipeServiceURL: "/api/recipes/",
			recipeQuery: "", 
			recipesDB:[
				{
					name: "Chocolate Chip Cookies",
					id: "06gvd",
					description: "This is such an easy chocolate chip cookie. No special equipment, no creaming -- a perfect cookie to do with kids. We love how versatile this dough is, too. It makes an awesome rocky road bar cookie.",
					instructions: "Evenly position 2 racks in the middle of the oven and preheat to 375 degrees F. (on convection setting if you have it.) Line 2 baking sheets with parchment paper or silicone sheets. (If you only have 1 baking sheet, let it cool completely between batches.)\n\nPut the butter in a microwave safe bowl, cover and microwave on medium power until melted. (Alternatively melt in a small saucepan.) Cool slightly. Whisk the sugars, eggs, butter and vanilla in a large bowl until smooth.\n\nWhisk the flour, baking soda and salt in another bowl. Stir the dry ingredients into the wet ingredients with a wooden spoon; take care not to over mix. Stir in the chocolate chips or chunks.\n\nScoop heaping tablespoons of the dough onto the prepared pans. Wet hands slightly and roll the dough into balls. Space the cookies about 2-inches apart on the pans. Bake, until golden, but still soft in the center, 12 to 16 minutes, depending on how chewy or crunchy you like your cookies. Transfer hot cookies with a spatula to a rack to cool. Serve.\n\nStore cookies in a tightly sealed container for up to 5 days.",
					ingredients: [
						{
							name: "unsalted butter",
							id: "90f9f",
							quantity: "1/2 cup",
							notes: ""
						},
						{
							name: "dark brown sugar",
							id: "90f9f",
							quantity: "3/4 cup",
							notes: ""
						},
						{
							name: "sugar",
							id: "90f9f",
							quantity: "3/4 cup",
							notes: ""
						},
						{
							name: "eggs",
							id: "90f9f",
							quantity: "2",
							notes: ""
						},
						{
							name: "vanilla extract",
							id: "90f9f",
							quantity: "1 tsp",
							notes: ""
						},
						{
							name: "semisweet chocolate chips",
							id: "90f9f",
							quantity: "1 (12-ounce) bag",
							notes: ""
						},
						{
							name: "baking soda",
							id: "90f9f",
							quantity: "3/4 tsp",
							notes: ""
						},
						{
							name: "salt",
							id: "90f9f",
							quantity: "1 tsp",
							notes: ""
						}
					],
					tag: ["gluten", "dairy"]
				}
			],
			recipes: [],
			recipeSelected: {}
		};
		
	}
	
	static propTypes = {
		user: PropTypes.string.isRequired
	};
	
	componentDidMount(){
		this.retrieveRecipes();
	}	

	retrieveRecipes(){
		const recipeRequestURL = this.state.recipeServiceURL;
		//retrieve the user's pantry from the backend
		/*Https.get(recipeRequestURL, (res) => {
			res.on('data', (d) => {
				//Parse the data into a JSON object
				const recipes = JSON.parse(d);
				console.log("recipes: "+JSON.stringify(recipes));

				//Add ccc for effect
				recipes.push(this.state.recipesDB[0]);
				this.setState({recipesDB: recipes});
			});
		}).on('error', (e) => {
			this.setState({error: e});
		});*/
		/*axios.get(recipeRequestURL).then((res) => {
			res.on('data', (d) => {
				//Parse the data into a JSON object
				const recipes = JSON.parse(d);
				console.log("recipes: "+JSON.stringify(recipes));

				//Add ccc for effect
				recipes.push(this.state.recipesDB[0]);
				this.setState({recipesDB: recipes});
			});
			console.log(res);
			
		}).catch((e) => {
			this.setState({error: e});
		});*/
		Client.search(recipeRequestURL, (response) => {this.setState({recipesDB: response})});
	}

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

	handleSearchSubmit(query){
		console.log("search submitted: "+query);
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
		this.setState({recipeQuery: query, recipes: recipeMatches, recipeSelected: {}});
	}

	handleRecipeSelected(i){
		this.setState({recipeSelected: this.state.recipes[i]});
	}

	render(){
		return (
			<div className="recipes-wrap">
				<h1>Search for Recipes</h1>
				<div>
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
