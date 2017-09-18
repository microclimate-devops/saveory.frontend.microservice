import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecipeDisplay extends Component{
	static PropTypes = {
		recipe: PropTypes.object.isRequired
	};

	createIngredientList(ingredients){
		let ingredList = [];
		if(Array.isArray(ingredients)){
			ingredList = ingredients.map(this.createIngredientElement);
		}
		return ingredList;
	}

	createIngredientElement(ingr){
		return (
			<li key={ingr.name}>{ingr.quantity} {ingr.unit} {ingr.name}</li>
		);
	}

	render(){
		return (
			<div className="recipe-display-container">
				<h3>{this.props.recipe.name}</h3>
				<p className="recipe-display-description">{this.props.recipe.description}</p>
				<ul>{this.createIngredientList(this.props.recipe.ingredients)}</ul>
				<p className="recipe-display-instructions">{this.props.recipe.instructions}</p>	
			</div>
		);
	}

}

export default RecipeDisplay;
