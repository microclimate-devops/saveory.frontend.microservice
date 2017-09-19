import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecipeDisplay extends Component{
	static PropTypes = {
		recipe: PropTypes.object.isRequired
	};

	showIngredientElement(ingr){
		return (
			<li key={ingr.name}>{ingr.quantity} {ingr.unit} {ingr.name}</li>
		);
	}
	
	createIngredientList(ingredients){
		let ingredList = [];
		if(Array.isArray(ingredients)){
			ingredList = ingredients.map(this.showIngredientElement);
		}
		return ingredList;
	}

	showInstructionPiece(instPiece, i){
		return (
			<p key={i} className="recipe-instruction-piece">{instPiece}</p>
		);
	}

	showInstructions(instructions){
		if(typeof instructions === "string"){
			//seperate instructions on <br/> tag
			const instructionList = instructions.split("<br/>");
		
			//Give each element in the array it's own section
			return instructionList.map((instPiece, i) => {return this.showInstructionPiece(instPiece, i)});
		}
	}

	showRecipeContents(recipe){
		//Only render if there is a recipe selected to show
		if(Object.keys(recipe).length > 0){
			return (
				<div className="recipe-display-content">
					<div className="recipe-display-ingredients"><ul>{this.createIngredientList(recipe.ingredients)}</ul></div>
					<div className="recipe-display-instructions">{this.showInstructions(recipe.instructions)}</div>	
				</div>
			);
		}
	}

	render(){
		const recipe = this.props.recipe;
		return (
			<div className="recipe-display-container">
				<div className="recipe-display-header">
					<p className="recipe-display-title">{recipe.name}</p>
					<p className="recipe-display-description">{recipe.description}</p>
				</div>
				{this.showRecipeContents()}
			</div>
		);
	}

}

export default RecipeDisplay;
