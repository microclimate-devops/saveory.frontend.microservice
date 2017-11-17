import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {InlineNotification} from 'carbon-components-react';
import Client from './Client.js';
import PantryTable from './PantryTable.js';
import AddIngredients from "./AddIngredients.js";


/**
 * The main top-level component for all Pantry views
 */
class Pantry extends Component {
	constructor(props){
		super(props);
		this.state = {
			viewIndex: 0,
			viewMetadata: [
				{
					view: "table",
					carbonIconName: "user"
				},
				{
					view: "cards",
					carbonIconName: "user"
				}
			],
			pantryServiceURL: "/api/pantry/",
			pantry: [],
			ingredientIdField: "",
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
		this.handleViewSwitch = this.handleViewSwitch.bind(this);
	}

	static propTypes = {
		userToken: PropTypes.string.isRequired,
		user: PropTypes.string.isRequired
	};

	/**
	 * Updates the current notification state with new options
	 * @param {param_type} opts-
	 * @calls {this.setState}
	 */
	setNotification(opts){
		//Set values from passed options, apply defaults if necessary
		let {title, subtitle, isGood} = {title: (opts.title || "No Title"), subtitle:(opts.subtitle || "No Message"), isGood:(opts.isGood || false)};
		let notification = this.state.notification;
		notification.type = isGood ? "success" : "error";
		notification.title = title;
		notification.subtitle = subtitle;
		notification.show = true;
		this.setState({notification: notification});
	}

	/**
	 * Handles notifiying the user of the response status and initiating pantry update if necessary
	 * @param {JSON http response} resp - The response object
	 * @param {boolean} needPantryUpdate - Controls whether or not a pantry update is requested
	 * @calls {switch, this.retrievePantry, this.setNotification}
	 */
	processRespCode(resp, needPantryUpdate){
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
	}

	/**
	 * Processes the response of any of the requests going out and notifies the user of status
	 * @param {JSON http response} resp - The response object
   * @param {boolean} needPantryUpdate - Controls whether or not a pantry update is requested
	 * @calls {this.processRespCode, this.setState, this.setNotification}
	 */
	handlePantryResponse(resp, needPantryUpdate){
		//default needPantryUpdate if not specified (or not specified as boolean)
		needPantryUpdate = typeof needPantryUpdate === "boolean" ? needPantryUpdate : true
		//Handle different response codes
		if(resp.code !== undefined){
			this.processRespCode(resp, needPantryUpdate);
		}else if(resp.pantry !== undefined){ //The response is the pantry itself
			this.setState({pantry: resp.pantry});
		}else{ //Unknown Condition
			this.setNotification({title: "Error", subtitle:"Unable to access user's pantry", isGood:false});
		}
	}

	/**
	 * Notifies the user of an error from the request
	 * @param {error} e - error object
	 * @param {string} msg - message to show user
	 * @calls {console.log, this.setNotification}
	 */
	handlePantryError(e, msg){
		console.log("caught pantry error");
		console.log(e.trace);
		this.setNotification({title: "Error", subtitle: msg, isGood:false});
	}

	/**
	 * Update the selected view when the user changes controls
	 * @param {int} index-The index of the selected view
	 * @calls {this.setState}
	 */
	handleViewSwitch(index){
		this.setState({viewIndex: index});
	}

	/**
	 * Gets the validation data for any ingredient field that requires it
	 * @param {param_type} fieldTypes-The array of types that represent what type of data each field represents
	 * @stateUsed {this.state.ingredientFields, this.state.pantryServiceURL, this.state.ingredientFieldOptions}
	 * @calls {Client.request, this.setState, this.handlePantryError}
	 */
	retrieveIngredientFieldValidation(fieldTypes){
		const ingredientFields = this.state.ingredientFields;
		console.log(fieldTypes);
		let pantryRequestURL = this.state.pantryServiceURL;
		let ingredientFieldRequest;
		let fieldOptions = this.state.ingredientFieldOptions;
		let currField = undefined;
		console.log(JSON.parse(fieldTypes[fieldTypes.length-1]));
		for(var i = 0; i < fieldTypes.length; i++){
			//If the field type is a more complicated object, go ahead and request validation data for it
			if(fieldTypes[i].endsWith("}")){
				currField = ingredientFields[i];
				console.log(currField);
				ingredientFieldRequest = pantryRequestURL + "spec/ingredient/" + currField;
				console.log("send to request: "+ingredientFieldRequest);
				//Request validation data and update state
				Client.request(ingredientFieldRequest, "GET",
					(resp) => {
						console.log("response to request: "+ingredientFieldRequest);
						console.log(resp);
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

	/**
	 * Gets the type of each field in an ingredient
	 * @stateUsed {this.state.pantryServiceURL}
	 * @calls {Client.request, JSON.stringify, this.retrieveIngredientFieldValidation, this.setState, this.handlePantryError}
	 */
	retrieveIngredientFieldTypes(){
		const pantryRequestURL = this.state.pantryServiceURL + "spec/ingredient/types";
		// eslint-disable-next-line
		Client.request(pantryRequestURL, "GET",
			(resp) => {
				console.log("Got response for types");
				//Check to see if additional validate info is needed for a field
				this.retrieveIngredientFieldValidation(resp);
				this.setState({ingredientFieldTypes: resp});
			},
			(e) => {
				this.handlePantryError(e, "Could not get ingredient field types");
			}
		);
	}

	/**
	 * Gets the editable field array which specifies for each field if it is editable or not
	 * @stateUsed {this.state.pantryServiceURL}
	 * @calls {Client.request, JSON.stringify, this.setState, this.handlePantryError}
	 */
	retrieveIngredientEditableFields(){
		const pantryRequestURL = this.state.pantryServiceURL + "spec/ingredient/edits";
		// eslint-disable-next-line
		Client.request(pantryRequestURL, "GET",
			(resp) => {
				this.setState({ingredientFieldEditable: resp});
			},
			(e) => {
				this.handlePantryError(e, "Could not get ingredient field editable info");
			}
		);
	}

	/**
	 * Gets the ingredient fields
	 * @stateUsed {this.state.pantryServiceURL}
	 * @calls {Client.request, JSON.stringify, this.retrieveIngredientFieldTypes, this.setState, this.handlePantryError}
	 */
	retrieveIngredientFields(){
		const pantryRequestURL = this.state.pantryServiceURL + "spec/ingredient";
		// eslint-disable-next-line
		Client.request(pantryRequestURL, "GET",
			(resp) => {
				//Now get field types
				this.retrieveIngredientFieldTypes();
				this.setState({ingredientFields: resp});
			},
			(e) => {
				this.handlePantryError(e, "Could not get ingredient fields");
			}
		);
	}

	/**
	 * Get the field name that identifies each ingredient
	 * @stateUsed {this.state.pantryServiceURL}
	 * @calls {Client.request, console.log, this.setState, this.handlePantryError}
	 */
	retrieveIngredientIdField(){
		const pantryRequestURL = this.state.pantryServiceURL + "spec/ingredient/id";
		// eslint-disable-next-line
		Client.request(pantryRequestURL, "GET",
			(resp) => {
				//Now save the returned id
				console.log("Got id");
				console.log(resp);
				this.setState({ingredientIdField: resp.id});
			},
			(e) => {
				this.handlePantryError(e, "Could not get ingredient ID field");
			}
		);
	}

	/**
	 * Get the user's pantry
	 * @propsUsed {this.props.userToken}
	 * @stateUsed {this.state.pantryServiceURL}
	 * @calls {Client.request, this.handlePantryResponse, this.handlePantryError}
	 */
	retrievePantry(){
		const pantryRequestURL = this.state.pantryServiceURL + this.props.userToken;
		// eslint-disable-next-line
		Client.request(pantryRequestURL, "GET",
			(resp) => {this.handlePantryResponse(resp)},
			(e) => {this.handlePantryError(e, "Could not access your pantry")}
		);
	}

	/**
	 * Sends a request to add an ingredient to the user's pantry
	 * @param {object} ingredient - The ingredient object being added
	 * @propsUsed {this.props.userToken}
	 * @stateUsed {this.state.pantryServiceURL}
	 * @calls {Client.request, this.handlePantryResponse, this.handlePantryError}
	 */
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

	/**
	 * Sends a request to update an ingredient in the user's pantry
	 * @param {object} ingredient - The new ingredient data
	 * @propsUsed {this.props.userToken}
	 * @stateUsed {this.state.pantryServiceURL, this.state.ingredientFields}
	 * @calls {Client.request, encodeURIComponent, this.handlePantryResponse, this.handlePantryError}
	 */
	updateIngredient(ingredient){
		//send a request to add the ingredient
		const pantryRequestURL = this.state.pantryServiceURL + this.props.userToken;
		Client.request(pantryRequestURL + "/ingredient/" + encodeURIComponent(ingredient[this.state.ingredientFields[0]]), "PUT", (resp) => {this.handlePantryResponse(resp)}, (e) => {this.handlePantryError(e, "Could not update the ingredient. Please make sure all fields are properly formatted.")}, ingredient);
	}

	/**
	 * Sends a request to delete an ingredient in the user's pantry
	 * @param {object} ingredient - the ingredient to delete
	 * @propsUsed {this.props.userToken}
	 * @stateUsed {this.state.pantryServiceURL, this.state.ingredientFields}
	 * @calls {Client.request, encodeURIComponent, this.handlePantryResponse, this.handlePantryError}
	 */
	deleteIngredient(ingredient){
		//send request to delete the ingredient
		const pantryRequestURL = this.state.pantryServiceURL + this.props.userToken;
		Client.request(pantryRequestURL + "/ingredient/" + encodeURIComponent(ingredient[this.state.ingredientFields[0]]), "DELETE", (resp) => {this.handlePantryResponse(resp)}, (e) => {this.handlePantryError(e, "Problem deleting the ingredient")});
	}


	/**
	 * Sets up a notification to be displayed for the user
	 * @stateUsed {this.state.notification}
	 * @return {InlineNotification}
	 */
	showNotification(){
		const notification = this.state.notification
		if(notification !== undefined && notification.show){
				return <InlineNotification kind={notification.type} title={notification.title} subtitle={notification.subtitle} role="alert"/>;
		}
	}

	/**
	 * Request and store all needed data from the Pantry backend service
	 * @calls {this.retrievePantry, this.retrieveIngredientFields, this.retrieveIngredientEditableFields}
	 */
	componentDidMount(){
		this.retrievePantry();
		this.retrieveIngredientIdField();
		this.retrieveIngredientFields();
		this.retrieveIngredientEditableFields();
	}

	/**
	 * Show the correct view of the user's pantry with the add ingredients option
	 * @propsUsed {this.props.user}
	 * @stateUsed {this.state.pantry, this.state.ingredientFieldEditable, this.state.ingredientFields, this.state.ingredientFieldTypes, this.state.ingredientFieldOptions}
	 * @calls {this.showNotification}
	 * @return {JSX}
	 */
	render(){
		return (
			<div id="pantry">
				<div className="pantry-table-description-container">
					<h3>{this.props.user+"'s Pantry"}</h3>
				</div>
				<PantryTable header={this.state.ingredientFields} data={this.state.pantry} fieldEditable={this.state.ingredientFieldEditable} onRowDelete={this.deleteIngredient} onRowEdit={this.updateIngredient}/>
				<AddIngredients ingredientFields={this.state.ingredientFields} ingredientFieldTypes={this.state.ingredientFieldTypes} ingredientFieldOptions={this.state.ingredientFieldOptions} onAddIngredient={this.addIngredient} />
				{this.showNotification()}
			</div>
		);
	}
}

export default Pantry;
