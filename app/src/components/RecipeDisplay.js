import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'carbon-components-react';

/**
 * Manages displaying the recipe details of a selected recipe search result
 */
class RecipeDisplay extends Component{
	static propTypes = {
		recipe: PropTypes.object
	};

	/**
	 * Creates a list entry for the specified recipe ingredient
	 * @param {object} ingr - A recipe ingredient object
	 * @return {JSX} - The ingredient list entry
	 */
	showIngredientElement(ingr, has){
		let hasIcon = (<div className="recipe-display-ingredient-has"></div>);
		let ingredientText = "";
		let ingredientKey = "";

		//Show a checkmark if the user has the ingredient
		if(has){
			hasIcon = (
				<div className="recipe-display-ingredient-has">
					<Icon name="checkmark--glyph" height="16" width="16"/>
				</div>
			);
		}

		//Show correct ingredient data
		if(typeof ingr === 'object'){
			ingredientText = ingr.quantity + " " + ingr.unit + " " + ingr.name;
			ingredientKey = ingr.name;
		}else{
			ingredientText = ingr;
			ingredientKey = ingr;
		}

		return (
			<li key={ingredientKey}>
				{hasIcon}
				<div className="recipe-display-ingredient-data">
					<p>{ingredientText}</p>
				</div>
			</li>
		);
	}

	/**
	 * Creates a JSX list of recipe ingredient entries
	 * @param {Array(Object)} ingredients - The recipes ingredient list
	 * @calls {Array.isArray, ingredients.map}
	 * @return {Array(JSX)}
	 */
	createIngredientList(ingredients, hasList){
		console.log("hasList: ");
		console.log(hasList);
		let ingredList = [];
		let currHas = undefined;
		if(Array.isArray(ingredients)){
			for(var i in ingredients){
				currHas = false;
				if(Array.isArray(hasList)){
					currHas = hasList[i] === '1';
				}
				ingredList.push(this.showIngredientElement(ingredients[i], currHas));
			}
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
	 * @param {Object} recipe - The instruction string
	 * @calls {instructions.split, instructionList.map, this.showInstructionPiece}
	 * @return {Array(JSX)}
	 */
	showInstructions(recipe){
		let instructions = null;
		if(recipe.instructions){
			//seperate instructions on <br/> tag
			const instructionList = recipe.instructions.split("<br/>");

			//Give each element in the array it's own section
			instructions = instructionList.map((instPiece, i) => {return this.showInstructionPiece(instPiece, i)});
		}else{
			instructions = (
				<div className="recipe-display-instructions-link">
					<a href={"http://yummly.com/recipe/"+recipe.id} target="_blank"><p>Available Here</p></a>
				</div>
			);
		}
		return instructions;
	}

	/**
	 * This creates a section for ingredients and instructions
	 * @param {param_type} recipe - The recipe object
	 * @calls {Object.keys, this.createIngredientList, this.showInstructions}
	 * @return {JSX}
	 */
	showRecipeContents(recipe){
		let contents = [];
		if(recipe !== undefined){
			contents.push(
				<div key="recipe-ingredients" className="recipe-display-ingredients">
					<div className="recipe-display-ingredients-title">
						<p>Ingredients</p>
					</div>
					<ul>{this.createIngredientList(recipe.ingredients, recipe.hasList)}</ul>
				</div>
			);

			contents.push(
				<div key="recipe-instructions" className="recipe-display-instructions">{this.showInstructions(recipe)}</div>
			);
		}

		return contents;
	}

	parseCookingTime(timeStr){
    let inSeconds = Number(timeStr);
    inSeconds = inSeconds > 0 ? inSeconds : 0;
    let minStr = inSeconds/60 + " mins";
    return minStr;
  }

	showRecipeHeader(recipe){
		let header = [];
		if(recipe !== undefined){
			//add extra information if available
			if(recipe.imageURL){
				header.push(
					<div key="recipe-image"  className="recipe-display-image"><img src={recipe.imageURL} alt=""/></div>
				);
				header.push(
					<div key="recipe-time" className="recipe-display-time"><p>{this.parseCookingTime(recipe.time)}</p></div>
				);
			}

			header.push(
				<div key="recipe-title" className="recipe-display-title"><p>{recipe.name}</p></div>
			);
		}

		return header;
	}

	/**
	 * Shows all the necessary information about a recipe
	 * @propsUsed {this.props.recipe}
	 * @calls {this.showRecipeContents}
	 * @return {JSX}
	 */
	render(){
		const recipe = this.props.recipe;
		console.log("recipe for display");
		console.log(recipe);
		return (
			<div className="recipe-display-container">
				<div className="recipe-display-header">
					{this.showRecipeHeader(recipe)}
				</div>
				<div className="recipe-display-content">
					{this.showRecipeContents(recipe)}
				</div>
			</div>
		);
	}
}

export default RecipeDisplay;
