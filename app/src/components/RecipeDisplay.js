import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecipeDisplay extends Component{
	static PropTypes = {
		recipe: PropTypes.object.isRequired
	};

	//Update only if the recipe prop is not empty
	shouldComponentUpdate(nextProps, nextState){
		return Object.keys(nextProps.recipe).length !== 0;
	}

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

	render(){

		console.log("Recipe");
		console.log(this.props.recipe);
		return (
			<div className="recipe-display-container">
				<div className="recipe-display-header">
					<p className="recipe-display-title">{this.props.recipe.name}</p>
					<p className="recipe-display-description">{this.props.recipe.description}</p>
				</div>
				<div className="recipe-display-content">
					<div className="recipe-display-ingredients"><ul>{this.createIngredientList(this.props.recipe.ingredients)}</ul></div>
					<div className="recipe-display-instructions">{this.showInstructions(this.props.recipe.instruction)}</div>	
				</div>
			</div>
		);
	}

}

export default RecipeDisplay;
