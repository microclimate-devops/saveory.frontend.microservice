import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'carbon-components';
import CarbonModal from './carbon/CarbonModal.js';
import CarbonButton from './carbon/CarbonButton.js';
import AddIngredientForm from './AddIngredientForm.js';

/**
 * A dynamically rendered form to add an ingredient
 * @Stateful
 */
class AddIngredients extends Component{
	constructor(props){
		super(props);
		this.state = {enteredIngredient: {}, validateData: {}, modalTarget: "#add-ingredient-modal"};
		this.handleAddSubmit = this.handleAddSubmit.bind(this);
		this.handleIngredientChange = this.handleIngredientChange.bind(this);
	}

	//*********************************************//
	// STATIC DATA & METHODS
	//**********************************************//
	static PropTypes = {
		/**
     * Called when the user submits a new ingredient entry
		 * @param {object} ingredient - the ingredient object formed from user input
     */
		onAddIngredient: PropTypes.func.isRequired,
		/**
		 * All the fields of the ingredient that need a corresponding inputs
		 */
		ingredientFields: PropTypes.array.isRequired,
		/**
		 * The data types of the above fields
		 */
		ingredientFieldTypes: PropTypes.array.isRequired,
		/**
		 * The allowed input values for any specified ingredient fields
		 */
		ingredientFieldOptions: PropTypes.object.isRequired
	};

	static addIngredientModal = undefined;

	/**
	 * Sets the addIngredientModal static variable to a @carbon-components components modal
	 * @param {DOM Element} ele - The DOM element that represents the modal
	 * @param {Object} options - Any options that need to be included for desired modal rendering
	 * @calls {@carbon-components Modal}
	 */
	 static bindAddIngredientModal(ele, options){
		AddIngredients.addIngredientModal = new Modal(ele, options);
	}

	/**
	 * Hides the @carbon-components components modal attached to addIngredientModal static variable
	 * @calls {AddIngredients.addIngredientModal.hide, console}
	 */
	static hideAddIngredientModal(){
		if(AddIngredients.addIngredientModal !== undefined){
			AddIngredients.addIngredientModal.hide();
		}else{
			console.log("Please setup (bind) the modal before trying to close it");
		}
	}

	//*********************************************//
	// STATE CHANGERS
	//**********************************************//

	/**
	 * Updates the state.enteredIngredient for a user edit
	 * @param {string} key - The field ID of the changed data
	 * @param {string} data - The inputed data
	 * @stateUsed {enteredIngredient, validateData}
	 * @calls {this.validateField, this.setState}
	 */
	handleIngredientChange(key, data){
		let ingredient = this.state.enteredIngredient;
		let validateData = this.state.validateData;

		//Add new ingredient info
		ingredient[key] = data;
		validateData[key] = this.validateField(key, data);

		this.setState({enteredIngredient: ingredient, validateData: validateData});
	}

	/**
	 * Sends the entered ingredient through prop handler when user submits
	 * @param {DOM event} e - The submit event
	 * @propsUsed {onAddIngredient}
	 * @stateUsed {enteredIngredient}
	 * @calls {this.props.onAddIngredient, AddIngredients.hideAddIngredientModal}
	 */
	handleAddSubmit(e){
		this.props.onAddIngredient(this.state.enteredIngredient);
		//Hide modal
		AddIngredients.hideAddIngredientModal();
	}

	//*********************************************//
	// DATA PROCESSING
	//**********************************************//

	/**
	 * Validates user input, doesn't allow empty strings or numbers less than 0
	 * If there are a limited number of allowed inputs for a specific fields, it will validate with that standard
	 * @param {string} key - The field ID of the changed data
	 * @param {string} data - The inputed data
 	 * @propsUsed {ingredientFieldOptions}
	 * @calls {Array}
	 * @return {object} - the ingredient field validity object
	 */
	validateField(key, data){
		const fieldOptions = this.props.ingredientFieldOptions[key];
		let isValid = true;
		let invalidMsg = "";

		//Check for empty data
		if((typeof data === "string" && data.length === 0) || (typeof data === "number" && data < 0)){
			isValid=false;
			invalidMsg = "Required";
		}
		//If valid options were defined for this field, make sure the data matches an option
		else if(Array.isArray(fieldOptions) && !fieldOptions.includes(data)){
			isValid=false;
		}
		return {valid: isValid, msg: invalidMsg};
	}

	/**
	 * Checks if any of the input fields have invalid data
 	 * @propsUsed {ingredientFields}
	 * @stateUsed {validateData}
	 * @calls {Object}
	 * @return {boolean} - indicates if there are any invalid fields
	 */
	isAnyDataInvalid(){
		let dataIsInvalid = false;
		const validateData = this.state.validateData;
		const ingredientFields = this.props.ingredientFields;

		//if there are not enough entries to satisfy all fields, data is invalid
		if(Object.keys(validateData).length !== ingredientFields.length){
			dataIsInvalid = true;
		}else{
			//Check for occurence of validation being false
			for(var key in validateData){
				if(validateData[key] === false){
					dataIsInvalid = true;
					break;
				}
			}
		}

		return dataIsInvalid;
	}

	/**
	 * Shows the add ingredient @carbon-components modal that contains AddIngredientForm
	 * @propsUsed {ingredientFields, ingredientFieldTypes}
	 * @stateUsed {modalTarget, enteredIngredient, validateData}
	 * @calls {this.isAnyDataInvalid}
	 * @return {JSX} - Add ingredient container with @carbon-components modal control
	 */
	render(){
		return (
		<div className="add-ingredient-container">
			<CarbonButton text="Add Ingredient" addedClass="add-ingredient-button" isModalControl={true} modalTarget={this.state.modalTarget} onClick={function(){}}/>
			<CarbonModal id="add-ingredient-modal" bindModal={AddIngredients.bindAddIngredientModal}>
				<div className="add-ingredient-modal-header-container">
					<h1>Add Ingredient</h1>
				</div>
				<div className="add-ingredient-modal-content-container">
					<AddIngredientForm onChange={this.handleIngredientChange} ingredient={this.state.enteredIngredient} ingredientFields={this.props.ingredientFields} ingredientFieldTypes={this.props.ingredientFieldTypes} validateData={this.state.validateData}/>
				</div>
				<div className="add-ingredient-modal-footer-container">
					<CarbonButton text="Add" onClick={this.handleAddSubmit} isDisabled={this.isAnyDataInvalid()}/>
				</div>
			</CarbonModal>
		</div>
		);
	}
}

export default AddIngredients;
