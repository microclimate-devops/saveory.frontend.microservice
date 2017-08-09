import React, { Component } from 'react';
import Ingredient from "./Ingredient.js";
import PropTypes from 'prop-types';

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

	static propTypes = {
		pantry: PropTypes.array.isRequired
	};

	createIngredientsList(pantry){
		console.log(pantry);
		console.log(JSON.stringify(pantry));
		//return pantry.map((ingredient) => {return this.createIngredient(ingredient)});
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
						{this.createIngredientsList(this.props.pantry)}
						<tr><td>{JSON.stringify(this.props.pantry)}</td></tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default PantryIngredients;
