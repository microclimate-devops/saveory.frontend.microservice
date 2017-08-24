import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import ReactTable from 'react-table';
//import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import CarbonNotification from './carbon/CarbonNotification.js';
//import CarbonDataTable from './carbon/CarbonDataTable.js';
import PantryTable from './PantryTable.js';
import {DataTable, Notification} from 'carbon-components';
//import axios from 'axios';
import Https from 'https';
import AddIngredients from "./AddIngredients.js";
//import InfoMessage from './InfoMessage.js';


class Pantry extends Component {
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
							title: "Item",
							selector: "item"
						},
						{
							title: "Quantity",
							selector: "qty"
						},
						{
							title: "Quantity Unit",
							selector: "qtyUnit"
						},
						{
							title: "Expiration",
							selector: "expDate"
						}
					]
				}
			],
			sortOptions: {
				defaultSortName: 'item',
				defaultSortOrder: 'desc',
			},
			actionMsgType: "",
			actionMsgTitle: "",
			actionMsgSubtitle: "",
			showActionMsg: false,
		};
		this.deleteIngredient = this.deleteIngredient.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
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
		console.log("ingredient: "+ingredient);
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
		console.log("PASSED INGREDIENT: "+ingredient.item);
		//TEST before backend implementation
		
		//remove the item from the pantry
		let userPantry = this.state.pantry;
		let indexToDelete = this.findIngredientInPantry(ingredient.item);
		let actionMsgTitle = "Success"
		let actionMsgSubtitle = "The ingredient was deleted"
		let actionMsgType = "success";
		let showActionMsg = true;

		//console.log("pantry before delete at index "+indexToDelete+"("+(indexToDelete===undefined)+"), " + JSON.stringify(userPantry));
		//Check that index is valid
		if(indexToDelete !== undefined){
			userPantry.splice(indexToDelete, 1);
		}else{
			actionMsgTitle = "Failure";
			actionMsgSubtitle = "Failed to delete message";
			actionMsgType = "error"
		}
		//console.log("pantry after delete at index "+indexToDelete+", " + JSON.stringify(userPantry));
		//Update pantry and message stuff
		this.setState({pantry: userPantry, actionMsgType: actionMsgType, actionMsgTitle: actionMsgTitle, actionMsgSubtitle: actionMsgSubtitle, showActionMsg: showActionMsg});
	}

	ingredientIsValid(ingredient){
		let isValid = false;
		console.log("pantry: "+JSON.stringify(this.state.pantry));
		//check if it's already in pantry
		console.log("in pantry result: "+this.findIngredientInPantry(ingredient));
		if(this.findIngredientInPantry(ingredient.item) === undefined){
			//Make sure no fields are empty
			if(ingredient.item.length !== 0 && ingredient.qty !== 0 && ingredient.qtyUnit.length !== 0 && ingredient.expDate.length !== 0){
				isValid = true;
			}
		}

		return isValid;
	}

	addIngredient(ingredient){
		let userPantry = this.state.pantry;
		let actionMsgTitle = "Failure"
		let actionMsgSubtitle = "Could not add ingredient. Please make sure the ingredient is not already in the pantry and fill all fields. "
		let actionMsgType = "error";
		let showActionMsg = true;
		if(this.ingredientIsValid(ingredient)){
			userPantry.push(ingredient);
			actionMsgTitle = "Success"
			actionMsgSubtitle = "Ingredient was added"
			actionMsgType = "success";
		}

		//Update pantry and message stuff
		this.setState({pantry: userPantry, actionMsgType: actionMsgType, actionMsgTitle: actionMsgTitle, actionMsgSubtitle: actionMsgSubtitle, showActionMsg: showActionMsg});
	}

	render(){
		//<CarbonDataTable headerData={this.state.pantryColumns[0].columns} tableData={this.state.pantry} tableDataIdSelector="item" onRowDelete={this.deleteIngredient} tableBindMethod={Pantry.bindPantryTable} tableRefreshMethod={Pantry.refreshPantryTable}/>
		return (
			<div id="pantry">
				<PantryTable header={this.state.pantryColumns[0].columns} data={this.state.pantry} onRowDelete={this.deleteIngredient} tableDataIdSelector="item"/>
				<AddIngredients onAddIngredient={this.addIngredient} msg={this.state.actionMsg} showMsg={this.state.showActionMsg} msgIsError={this.state.actionMsgIsError}/>
				{this.state.showActionMsg && <CarbonNotification type={this.state.actionMsgType} title={this.state.actionMsgTitle} subtitle={this.state.actionMsgSubtitle} bindMethod={Pantry.bindNotification} unbindMethod={Pantry.deleteNotification}/>}
			</div>
		);
	}
}

/****************************************/
/*Static Data and Methods to Manage Table and notifications
/****************************************/
Pantry.bindPantryTable = function(ele, options){
	Pantry.pantryTable = new DataTable(ele, options);
}

Pantry.refreshPantryTable = function(){
	//Make sure the table is initialized
	if(Pantry.pantryTable !== undefined){
		Pantry.pantryTable.refreshRows();
	}else{
		console.log("Need to bind table first");
	}
}

Pantry.bindNotification = function(ele, options){
	Pantry.notification = new Notification(ele, options);
}

Pantry.deleteNotification = function(){
	console.log("Delete notification called");
	//Make sure the table is initialized
	if(Pantry.notification !== undefined){
		Pantry.notification.remove();
	}else{
		console.log("No notification to delete");
	}
}
export default Pantry;
