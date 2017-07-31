import React, { Component } from 'react';
import Ingredient from "./Ingredient.js";

class PantryIngredients extends Component{
	constructor(props){
		super(props);
		this.state = {tableDescriptors: {
			item: "Item",
			qty: "Quantity",
			qtyUnit: "Quantity Unit",
			expDate: "Expiration"
		}};
	}

	createIngredientsList(pantry){
		return pantry.map(this.createIngredient());
	}

	createIngredient(ingredient){
		return <Ingredient data={ingredient}/>;
	}

	render(){
		return (
			<div className="pantry-ingredients">
				<table className="ingredient-table">
					<tbody>
						<Ingredient data={this.state.tableDescriptors}/>
						<tr><td>this.createIngredientsList(this.props.pantry)</td></tr>
						<tr><td>{JSON.stringify(this.props.pantry)}</td></tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default PantryIngredients;
