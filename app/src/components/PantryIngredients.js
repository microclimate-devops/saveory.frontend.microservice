import React, { Component } from 'react';
import ReactTable from 'react-table';
import DeleteIngredientButton from "./DeleteIngredientButton.js";
import PropTypes from 'prop-types';

class PantryIngredients extends Component{
	constructor(props){
		super(props);
		this.state = {
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
		pantry: PropTypes.array.isRequired,
		deleteIngredientHandler: PropTypes.func.isRequired
	};

	render(){
		//Get the data for the table ready
		var pantry = this.props.pantry;
		var pantryColumns = this.state.pantryColumns;

		//Check that the pantry is a non-empty array
		if(!Array.isArray(pantry) || pantry.length == 0 ){
			pantry = this.state.pantryEmptyDescriptor;
		}

		return (
						<ReactTable
							SubComponent={(row) => {
								/*return (
									<DeleteIngredientButton deleteIngredientHandler={this.props.deleteIngredientHandler}/>
								)*/
								<p>test</p>
							}}
							data={pantry}
							columns={pantryColumns}
							filterable
						/>
					);
	}
}

export default PantryIngredients;
