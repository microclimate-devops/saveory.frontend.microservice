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
			pantry: [],
			ingredientFields: [],
			ingredientFieldTypes: [],
			notification: {
				type: "",
				title: "",
				subtitle: "",
				show: false,
			}
		};
		this.deleteIngredient = this.deleteIngredient.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.setPantry = this.setPantry.bind(this);
		/*this.handlePantryResponse = this.handlePantryResponse(this);
		this.handlePantryError = this.handlePantryError(this);*/
	}

	static propTypes = {
		userToken: PropTypes.string.isRequired,
		user: PropTypes.string.isRequired
	};

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
		//Handle different response codes
		if(resp.code !== undefined){
			switch(resp) {
				case 200:
					//Success!!
					this.setNotification({title: "Success", subtitle:resp.msg, isGood:true});
					//Need to refresh the pantry
					this.retrievePantry();
					break;

				case 204: //The user's pantry was not found
					this.setNotification({title: "Empty Pantry", subtitle:"Please add your first ingredient", isGood:true});
					break;
				case 500:
					this.setNotification({title: "Error", subtitle:resp.msg, isGood:false});
					break;
				default:	
					this.setNotification({title: "Unknown Response", subtitle:resp.msg, isGood:false});
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

	retrievePantry(){
		const pantryRequestURL = this.state.pantryServiceURL + this.props.userToken;
		// eslint-disable-next-line
		Client.request(pantryRequestURL, "GET", 
			(resp) => {this.handlePantryResponse(resp)}, 
			(e) => {this.handlePantryError(e)}
		);
	}

	retrieveIngredientFields(){
		const pantryRequestURL = this.state.pantryServiceURL + "spec/ingredient";
		// eslint-disable-next-line
		Client.request(pantryRequestURL, "GET", 
			(resp) => {this.setState({ingredientFields: resp})}, 
		);	
	}

	retrieveIngredientFieldTypes(){
		const pantryRequestURL = this.state.pantryServiceURL + "spec/ingredient/types";
		// eslint-disable-next-line
		Client.request(pantryRequestURL, "GET", 
			(resp) => {this.setState({ingredientFieldTypes: resp})}, 
		);	
	}

	componentDidMount(){
		this.retrievePantry();
		this.retrieveIngredientFields();
		this.retrieveIngredientFieldTypes();
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
		const pantryRequestURL = this.state.pantryServiceURL + this.props.userToken;
		Client.request(pantryRequestURL + "/ingredient/" + ingredient.item, "DELETE", (resp) => {this.handlePantryResponse(resp)}, (e) => {this.handlePantryError(e)});
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
		const pantryRequestURL = this.state.pantryServiceURL + this.props.userToken;
		Client.request(pantryRequestURL + "/ingredient", "POST", (resp) => {this.handlePantryResponse(resp)}, (e) => {this.handlePantryError(e)}, ingredient);
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
				<PantryTable header={this.state.ingredientFields} data={this.state.pantry} onRowDelete={this.deleteIngredient} tableDataIdSelector="item"/>
				<AddIngredients ingredientFields={this.state.ingredientFields} ingredientFieldTypes={this.state.ingredientFieldTypes} onAddIngredient={this.addIngredient} msg={this.state.actionMsg} showMsg={this.state.showActionMsg} msgIsError={this.state.actionMsgIsError}/>
				{this.showNotification()}
			</div>
		);
	}
}

export default Pantry;
