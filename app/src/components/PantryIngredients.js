import React, { Component } from 'react';
import Ingredient from "./Ingredient.js";
import IngredientHeader from "./IngredientHeader.js";
import PropTypes from 'prop-types';

class PantryIngredients extends Component{
	constructor(props){
		super(props);
		this.state = {
			tableDescriptors: {
				item: "Item",
				qty: "Quantity",
				qtyUnit: "Quantity Unit",
				expDate: "Expiration"
			},
			pantryEmptyDescriptor: {
				item: "Empty",
				qty: "Empty",
				qtyUnit: "Empty",
				expDate: "Empty"
			}
		};
	}

	static propTypes = {
		pantry: PropTypes.array.isRequired
	};

	createIngredientsList(pantry){
		if(Array.isArray(pantry)){
			return pantry.map((ingredient) => {return this.createIngredient(ingredient)});
		}else{
			return this.createIngredient(this.state.pantryEmptyDescriptor)
		}
	}

	createIngredient(ingredient){
		return <Ingredient data={ingredient}/>;
	}

	render(){
		return (
			<div className="pantry-ingredients">
				<table className="ingredient-table">
					<thead>
						<IngredientHeader data={this.state.tableDescriptors}/>
					</thead>
					<tbody>
						{this.createIngredientsList(this.props.pantry)}
					</tbody>
				</table>
			</div>
		);
	}
}

export default PantryIngredients;
