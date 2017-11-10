import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MakeRecipe from './MakeRecipe.js';

/**
 * Manages displaying the recipe details of a selected recipe search result
 */
class RecipeDisplay extends Component{
	static propTypes = {
		recipe: PropTypes.object.isRequired
	};

	/**
	 * Creates a list entry for the specified recipe ingredient
	 * @param {object} ingr - A recipe ingredient object
	 * @return {JSX} - The ingredient list entry
	 */
	showIngredientElement(ingr){
		return (
			<li key={ingr.name}>{ingr.quantity} {ingr.unit} {ingr.name}</li>
		);
	}

	/**
	 * Creates a JSX list of recipe ingredient entries
	 * @param {Array(Object)} ingredients - The recipes ingredient list
	 * @calls {Array.isArray, ingredients.map}
	 * @return {Array(JSX)}
	 */
	createIngredientList(ingredients){
		let ingredList = [];
		if(Array.isArray(ingredients)){
			ingredList = ingredients.map(this.showIngredientElement);
		}
		return ingredList;
	}

	/**
	 * Creates a paragraph for a piece of the instructions
	 * @param {string} instPiece - the text to show
	 * @param {int} i - the piece index
	 * @return {JSX}
	 */
	showInstructionPiece(instPiece, i){
		return (
			<p key={i} className="recipe-instruction-piece">{instPiece}</p>
		);
	}

	/**
	 * Creates a list of paragraphs to represent to recipe's instructions
	 * @param {param_type} instructions - The instruction string
	 * @calls {instructions.split, instructionList.map, this.showInstructionPiece}
	 * @return {Array(JSX)}
	 */
	showInstructions(instructions){
		if(typeof instructions === "string"){
			//seperate instructions on <br/> tag
			const instructionList = instructions.split("<br/>");

			//Give each element in the array it's own section
			return instructionList.map((instPiece, i) => {return this.showInstructionPiece(instPiece, i)});
		}
	}

	/**
	 * This creates a section for ingredients and instructions
	 * @param {param_type} recipe - The recipe object
	 * @calls {Object.keys, this.createIngredientList, this.showInstructions}
	 * @return {JSX}
	 */
	showRecipeContents(recipe){
		//Only render if there is a recipe selected to show
		if(typeof recipe === "object" && Object.keys(recipe).length > 0){
			return (
				<div className="recipe-display-content">
					<div className="recipe-display-ingredients"><ul>{this.createIngredientList(recipe.ingredients)}</ul></div>
					<div className="recipe-display-instructions">{this.showInstructions(recipe.instructions)}</div>
				</div>
			);
		}
	}

	/**
	 * Shows all the necessary information about a recipe
	 * @propsUsed {this.props.recipe}
	 * @calls {this.showRecipeContents}
	 * @return {JSX}
	 */
	render(){
		const recipe = this.props.recipe;
		return (
			<div className="recipe-display-container">
				<MakeRecipe recipeIngredients={[{ "name" : "Steak" , "tag" : [ "beef"] , "description" : "2-inch-thick bone-in porterhouse steak" , "quantity" : "3" , "unit" : "pound" , "has" : "0"} , { "name" : "Salt" , "tag" : [ ] , "description" : "Kosher" , "quantity" : "1" , "unit" : "tbsp" , "has" : "0"} , { "name" : "Sugar" , "tag" : [ ] , "description" : "Light Brown" , "quantity" : "1" , "unit" : "tbsp" , "has" : "0"} , { "name" : "Pepper" , "tag" : [ ] , "description" : "Cayenne" , "quantity" : "0.5" , "unit" : "tsp" , "has" : "0"} , { "name" : "Oil" , "tag" : [ ] , "description" : "Rice bran or vegetable" , "quantity" : "0.5" , "unit" : "tsp" , "has" : "0"} , { "name" : "Butter" , "tag" : [ ] , "description" : "Unsalted" , "quantity" : "4" , "unit" : "tbsp" , "has" : "0"} , { "name" : "Masala" , "tag" : [ ] , "description" : "or any spice mix of choice" , "quantity" : "1" , "unit" : "tsp" , "has" : "0"}]} matchingPantryIngredients={["sugar", "cayenne"]}/>
				<div className="recipe-display-header">
					<p className="recipe-display-title">{recipe.name}</p>
					<p className="recipe-display-description">{recipe.description}</p>
				</div>
				{this.showRecipeContents(recipe)}
			</div>
		);
	}
}

export default RecipeDisplay;
