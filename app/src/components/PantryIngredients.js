import React, { Component } from 'react';
import ReactTable from 'react-table';
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
			},
			pantryColumns: [
				{
					Header: "Ingredients",
					columns: [
						{
							Header: "Item",
							accessor: "item"
						},
						{
							Header: "Quantity",
							accessor: "qty"
						},
						{
							Header: "Quantity Unit",
							accessor: "qtyUnit"
						},
						{
							Header: "Expiration",
							accessor: "expDate"
						}
					]
				}
			]
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
		return <ReactTable
							SubComponent={(row) => {
								return (
									<button>Remove</button>
								)
							}}
							data={this.props.pantry}
							columns={this.state.pantryColumns}
							filterable
						/>
		/*return (
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
		);*/
	}
}

export default PantryIngredients;
