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
			viewID: 0,
			viewTotal: 2,
			pantryServiceURL: "/api/pantry/",
			pantry: [],
			ingredientFields: [],
			ingredientFieldTypes: [],
			ingredientFieldEditable: [],
			ingredientFieldOptions: {},
			notification: {
				type: "",
				title: "",
				subtitle: "",
				show: false,
			}
		};
		this.addIngredient = this.addIngredient.bind(this);
		this.updateIngredient = this.updateIngredient.bind(this);
		this.deleteIngredient = this.deleteIngredient.bind(this);
		this.setPantry = this.setPantry.bind(this);
	}

	static propTypes = {
		userToken: PropTypes.string.isRequired,
		user: PropTypes.string.isRequired,
		onRecipeFilterUpdate: PropTypes.func.isRequired
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

	
	
	handlePantryResponse(resp, needPantryUpdate){
		//default needPantryUpdate if not specified (or not specified as boolean)
		needPantryUpdate = typeof needPantryUpdate === "boolean" ? needPantryUpdate : true
		//Handle different response codes
		if(resp.code !== undefined){
			switch(resp.code) {
				case 200:
					//Success!!
					this.setNotification({title: "Success", subtitle:resp.msg, isGood:true});
					//Need to refresh the pantry
					if(needPantryUpdate){
						this.retrievePantry();
					}
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
			console.log("Below is supposed to be a pantry");
			console.log(resp);
			this.setState({pantry: resp.pantry});
		}else{ //Unknown Condition
			console.log("The response from the pantry service does not make sense: ");
			console.log(resp);
			this.setNotification({title: "Error", subtitle:"Unable to access user's pantry", isGood:false});
			
		}
	}

	handlePantryError(e, msg){
		console.log("caught pantry error");
		console.log(e);
		this.setNotification({title: "Error", subtitle: msg, isGood:false});
	}

	retrieveIngredientFieldValidation(fieldTypes){
		const ingredientFields = this.state.ingredientFields;
		let pantryRequestURL = this.state.pantryServiceURL + "spec/ingredient/";
		let fieldOptions = this.state.ingredientFieldOptions;
		let currField = undefined;
		for(var i = 0; i < fieldTypes.length; i++){
			//If the field type is a more complicated object, go ahead and request validation data for it
			if(typeof fieldTypes[i] === "object"){
				currField = ingredientFields[i];
				pantryRequestURL += currField;
				//Request validation data and update state
				Client.request(pantryRequestURL, "GET", 
					(resp) => {
						fieldOptions[currField] = resp;
						this.setState({ingredientFieldOptions: fieldOptions});
					},
					(e) => {
						this.handlePantryError(e, "Could not get option info for ingredient field");	
					}
				);
			}
		}
	}

	retrieveIngredientFieldTypes(){
		const pantryRequestURL = this.state.pantryServiceURL + "spec/ingredient/types";
		// eslint-disable-next-line
		Client.request(pantryRequestURL, "GET", 
			(resp) => {
				//Check to see if additional validate info is needed for a field
				console.log("Response for field types: "+JSON.stringify(resp)+", type: "+typeof resp);
				this.retrieveIngredientFieldValidation(resp);
				this.setState({ingredientFieldTypes: resp});
			}, 
			(e) => {
				this.handlePantryError(e, "Could not get ingredient field types");	
			}
		);	
	}

	retrieveIngredientEditableFields(){
		const pantryRequestURL = this.state.pantryServiceURL + "spec/ingredient/edits";
		// eslint-disable-next-line
		Client.request(pantryRequestURL, "GET", 
			(resp) => {
				console.log("Response for editable fields: "+JSON.stringify(resp)+", type: "+typeof resp);
				this.setState({ingredientFieldEditable: resp});
			}, 
			(e) => {
				this.handlePantryError(e, "Could not get ingredient field editable info");	
			}
		);	
	}

	retrieveIngredientFields(){
		const pantryRequestURL = this.state.pantryServiceURL + "spec/ingredient";
		// eslint-disable-next-line
		Client.request(pantryRequestURL, "GET", 
			(resp) => {
				//Now get field types
				console.log("Response for fields: "+JSON.stringify(resp)+", type: "+typeof resp);
				this.retrieveIngredientFieldTypes();
				this.setState({ingredientFields: resp});
			}, 
			(e) => {
				this.handlePantryError(e, "Could not get ingredient fields");	
			}
		);	
	}

	retrievePantry(){
		const pantryRequestURL = this.state.pantryServiceURL + this.props.userToken;
		// eslint-disable-next-line
		Client.request(pantryRequestURL, "GET", 
			(resp) => {this.handlePantryResponse(resp)}, 
			(e) => {this.handlePantryError(e, "Could not access your pantry")}
		);
	}

	//Request and store all needed data from the Pantry backend service
	componentDidMount(){
		this.retrievePantry();
		this.retrieveIngredientFields();
		this.retrieveIngredientEditableFields();
	}

	addIngredient(ingredient){
		//send a request to add the ingredient
		const pantryRequestURL = this.state.pantryServiceURL + this.props.userToken;
		Client.request(pantryRequestURL + "/ingredient", "POST", 
			(resp) => {this.handlePantryResponse(resp)}, 
			(e) => {
				this.handlePantryError(e, "Could not add the ingredient. Please make sure the ingredient is not already in your pantry and try again.")
			}, 
			ingredient);
	}

	updateIngredient(ingredient){
		//send a request to add the ingredient
		const pantryRequestURL = this.state.pantryServiceURL + this.props.userToken;
		Client.request(pantryRequestURL + "/ingredient/" + encodeURIComponent(ingredient[this.state.ingredientFields[0]]), "PUT", (resp) => {this.handlePantryResponse(resp)}, (e) => {this.handlePantryError(e, "Could not update the ingredient. Please make sure all fields are properly formatted.")}, ingredient);
	}

	deleteIngredient(ingredient){
		//send request to delete the ingredient
		const pantryRequestURL = this.state.pantryServiceURL + this.props.userToken;
		Client.request(pantryRequestURL + "/ingredient/" + encodeURIComponent(ingredient[this.state.ingredientFields[0]]), "DELETE", (resp) => {this.handlePantryResponse(resp)}, (e) => {this.handlePantryError(e, "Problem deleting the ingredient")});
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
				<PantryTable header={this.state.ingredientFields} data={this.state.pantry} fieldEditable={this.state.ingredientFieldEditable} onRowDelete={this.deleteIngredient} onRowEdit={this.updateIngredient} tableDataIdSelector="item"/>
				<AddIngredients ingredientFields={this.state.ingredientFields} ingredientFieldTypes={this.state.ingredientFieldTypes} ingredientFieldOptions={this.state.ingredientFieldOptions} onAddIngredient={this.addIngredient} msg={this.state.actionMsg} showMsg={this.state.showActionMsg} msgIsError={this.state.actionMsgIsError}/>
				{this.showNotification()}
			</div>
		);
	}
}

export default Pantry;
