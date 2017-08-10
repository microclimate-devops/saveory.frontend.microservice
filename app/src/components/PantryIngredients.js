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

	makePantryTableData(){
		//Get the data for the table ready
		var pantry = this.props.pantry;

		console.log("pantry in table: "+JSON.stringify(pantry));

		//Check that the pantry is a non-empty array
		if(!Array.isArray(pantry) || pantry.length === 0 ){
			pantry = [this.state.pantryEmptyDescriptor];
		}

		//TEST
		if(pantry.length == 1){
			pantry.push({
				item: "Empty",
				qty: "Empty",
				qtyUnit: "Empty",
				expDate: "Empty"
			});
		}

		return pantry;
	}

	handlePantryItemRemoval(item){
		
	}

	render(){
		//Get the data for the table ready
		var pantryColumns = this.state.pantryColumns;

		return (
			<div>
				<ReactTable
					SubComponent={(row) => {
						console.log("seeing info from row");
						console.log(row);
						return (
							<DeleteIngredientButton deleteIngredientHandler={this.props.deleteIngredientHandler} targetItem={row.original}/>
						)
					}}
					data={this.makePantryTableData()}
					columns={pantryColumns}
					filterable
				/>
			</div>
			);
	}
}

export default PantryIngredients;
