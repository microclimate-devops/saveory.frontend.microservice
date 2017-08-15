import React, { Component } from 'react';
//import ReactTable from 'react-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import axios from 'axios';
import Https from 'https';
import DeleteIngredients from "./DeleteIngredients.js";
import AddIngredients from "./AddIngredients.js";
import PropTypes from 'prop-types';

class Pantry extends Component{
	constructor(props){
		super(props);
		this.state = {
			pantry: [ { "item" : "apple" , "qty" : 4 , "qtyUnit" : "piece" , "expDate" : "08-04-2017"} , { "item" : "whole milk" , "qty" : 2 , "qtyUnit" : "gallon" , "expDate" : "08-10-2017"}],
			error: {}, 
			pantryServiceURL: "https://dps-ubuntu-cfcmaster.rtp.raleigh.ibm.com:8443/kubernetes/api/v1/proxy/namespaces/default/services/microservicetalkingbackend-service:9080/microservicetalkingbackend/", 
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
			],
			sortOptions: {
				defaultSortName: 'item',
				defaultSortOrder: 'desc',
			},
			deleteIngredientError: false
		};
		this.deleteIngredient = this.deleteIngredient.bind(this);
	}

	static propTypes = {
		user: PropTypes.string.isRequired
	};

	retrievePantry(){
		const pantryRequestURL = this.state.pantryServiceURL+"pantries?user="+this.props.user;
		//retrieve the user's pantry from the backend
		Https.get(pantryRequestURL, (res) => {
			res.on('data', (d) => {
				//Parse the data into a JSON object
				const resultObj = JSON.parse(d);
				var userPantry;

				//If the result is an array then use the first element as the user's pantry
				if(Array.isArray(resultObj)){
					userPantry = resultObj[0].pantry;
				}else{
					userPantry = resultObj.pantry;
				}
				console.log("user's pantry: "+JSON.stringify(userPantry));

				this.setState({pantry: userPantry});
			});
		}).on('error', (e) => {
			this.setState({error: e});
		});
	}

	componentDidMount(){
		this.retrievePantry();
	}

	findIngredientInPantry(ingredient){
		let itemIndex = undefined;
		let userPantry = this.state.pantry;
		//Go through the pantry until the ingredient with the correct name is found
		for(let i = 0; i < userPantry.length && itemIndex === undefined; i++){
			if(userPantry[i].item === ingredient){
				itemIndex = i;
			}
		}
		return itemIndex;
	}

	deleteIngredient(ingredient){
		console.log("PASSED INGREDIENT: "+ingredient);
		//TEST before backend implementation

		//remove the item from the pantry
		var userPantry = this.state.pantry;
		var indexToDelete = this.findIngredientInPantry(ingredient);

		console.log("pantry before delete at index "+indexToDelete+"("+(indexToDelete===undefined)+"), " + JSON.stringify(userPantry));
		//Check that index is valid
		if(indexToDelete !== undefined){
			userPantry.splice(indexToDelete, 1);
		}
		console.log("pantry after delete at index "+indexToDelete+", " + JSON.stringify(userPantry));
		//Update pantry and delete error
		this.setState({pantry: userPantry, deleteIngredientError: (indexToDelete === undefined)});
	}

	render(){
				/*<ReactTable
					SubComponent={(row) => {
						console.log("seeing info from row");
						console.log(row);
						return (
							<DeleteIngredientButton deleteIngredientHandler={this.deleteIngredient} targetItem={row.original}/>
						)
					}}
					data={this.state.pantry}
					columns={this.state.pantryColumns}
					filterable
				/>*/
		return (
			<div id="pantry">
				<h1>user {this.props.user}'s pantry</h1>
				<BootstrapTable data={this.state.pantry} options={this.state.sortOptions} striped hover>
				      <TableHeaderColumn isKey dataField='item' datasort>Ingredient</TableHeaderColumn>
				      <TableHeaderColumn dataField='qty' datasort>Quantity</TableHeaderColumn>
				      <TableHeaderColumn dataField='qtyUnit' datasort>Unit</TableHeaderColumn>
				      <TableHeaderColumn dataField='expDate' datasort>Expiration</TableHeaderColumn>
				  </BootstrapTable>
				  <DeleteIngredients onDelete={this.deleteIngredient} deleteError={this.state.deleteIngredientError} />
				  <AddIngredients />
			</div>
		);
	}
}

export default Pantry;
