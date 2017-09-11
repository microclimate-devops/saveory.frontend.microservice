import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {InlineNotification} from 'carbon-components-react';
import Client from './Client.js';
import PantryTable from './PantryTable.js';
//import axios from 'axios';
import Https from 'https';
import AddIngredients from "./AddIngredients.js";


class Pantry extends Component {
	constructor(props){
		super(props);
		this.state = {
			pantryServiceURL: "/api/pantry/",
			pantry: [ { "item" : "apple" , "qty" : 4 , "qtyUnit" : "piece" , "expDate" : "08-04-2017"} , { "item" : "whole milk" , "qty" : 2 , "qtyUnit" : "gallon" , "expDate" : "08-10-2017"}],
			error: {}, 

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
							type: "text",
							title: "Item",
							selector: "item"
						},
						{
							type: "number",
							title: "Quantity",
							selector: "qty"
						},
						{
							type: "text",
							title: "Quantity Unit",
							selector: "qtyUnit"
						},
						{
							type: "date",
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
		this.setPantry = this.setPantry.bind(this);
		this.handlePantryResponse = this.handlePantryResponse(this);
		this.handlePantryError = this.handlePantryError(this);
	}

	static propTypes = {
		user: PropTypes.string.isRequired
	};

	retrievePantry_old(){
		const pantryRequestURL = "https://dps-ubuntu-cfcmaster.rtp.raleigh.ibm.com:8443/kubernetes/api/v1/proxy/namespaces/default/services/microservicetalkingbackend-service:9080/microservicetalkingbackend/pantries?user="+this.props.user;
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

	setNotification(opts){
		//Set values from passed options, apply defaults if necessary 
		let {title, subtitle, isGood} = {title: (opts.title || "No Title"), subtitle:(opts.subtitle || "No Message"), isGood:(opts.isGood || false)};
		this.setState({actionMsgType: isGood ? "success" : "error", actionMsgTitle: title, actionMsgSubtitle: subtitle, showActionMsg: true});
		
	}

	setPantry(resp){
		console.log(resp);
		//If the response sent back an internal server error code, set an error notification 
		if(resp.code !== undefined && resp.code === 500){
			this.setNotification({title: "Error", subtitle:"Internal application error, there was a problem retrieving the user's pantry from the backend", type:"error"});
		}else{
			this.setState({pantry: resp.pantry});
		}
	}

	handlePantryResponse(resp){
		console.log("Received resp");
		console.log(resp);
		//Handle different response codes
		if(resp.code !== undefined){
			switch(resp) {
				case 200:
					//Success!!
					this.setNotification({title: "Success", subtitle:resp.msg, isGood:true});
					//Need to refresh the pantry
					this.retrievePantry();
					break;
				case 500:
					this.setNotification({title: "Error", subtitle:resp.msg, isGood:false});
					break;
					
					
			}
		}else if(resp.pantry != undefined){ //The response is the pantry itself
			this.setState({pantry: resp.pantry});
		}else{ //Unknown Condition
			console.log("The response from the pantry service does not make sense: ");
			console.log(resp);
			this.setNotification({title: "Error", subtitle:"Unable to access user's pantry", isGood:false});
			
		}
	}

	handlePantryError(e){
		console.log("caught error");
		console.log(e);
		this.setNotification({title: "error", subtitle: "Got an error while trying to send request to pantry service", isGood:false});
	}

	testGetPantry(url){
		//this.setPantry({"id":"59b3152846e0fb000175a6e4","user":"daniel","pantry":[{"item":"apple","qty":10,"qtyUnit":"piece","expDate":"08-04-2017","contains":"false"}]});
		this.setPantry({code: 500, status:"Error", msg:"Failed"});
	}

	retrievePantry(){
		const pantryRequestURL = this.state.pantryServiceURL + this.props.user;
		Client.request(pantryRequestURL, "GET", this.handlePantryResponse, this.handlePantryError);
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
		//send request to delete the ingredient
		const pantryRequestURL = this.state.pantryServiceURL + this.props.user;
		Client.request(pantryRequestURL + "/ingredient/" + ingredient.item, "DELETE", this.handlePantryResponse, this.handlePantryError);
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
		//send a request to add the ingredient
		const pantryRequestURL = this.state.pantryServiceURL + this.props.user;
		Client.request(pantryRequestURL + "/ingredient", "POST", this.handlePantryResponse, this.handlePantryError, ingredient);
	}

	showNotification(){
		let notification = null;
		if(this.state.showActionMsg){
				notification = <InlineNotification kind={this.state.actionMsgType} title={this.state.actionMsgTitle} subtitle={this.state.actionMsgSubtitle} role="alert"/>;
		}
		return notification;
	}

	render(){
		return (
			<div id="pantry">
				<div className="pantry-table-description-container">
					<h3>{this.props.user}'s Pantry</h3>
				</div>
				<PantryTable header={this.state.pantryColumns[0].columns} data={this.state.pantry} onRowDelete={this.deleteIngredient} tableDataIdSelector="item"/>
				<AddIngredients ingredientMetadata={this.state.pantryColumns[0].columns} onAddIngredient={this.addIngredient} msg={this.state.actionMsg} showMsg={this.state.showActionMsg} msgIsError={this.state.actionMsgIsError}/>
				{this.showNotification()}
			</div>
		);
	}
}

/****************************************/
/*Static Data and Methods to Manage Table and notifications
/****************************************/
export default Pantry;
