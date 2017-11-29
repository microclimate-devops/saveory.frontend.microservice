import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'carbon-components-react';
import CarbonButton from './carbon/CarbonButton.js';
import AddIngredientForm from './AddIngredientForm.js';

/**
 * A dynamically rendered form to add an ingredient
 * @Stateful
 */
class AddIngredients extends Component{
	constructor(props){
		super(props);
		this.state = {
			enteredIngredient: {},
			validateData: {},
			defaultValidateData: {
				valid: false,
				msg: "Required"
			},
			showModal: false
		};
		this.handleAddSubmit = this.handleAddSubmit.bind(this);
		this.handleIngredientChange = this.handleIngredientChange.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	//*********************************************//
	// STATIC DATA & METHODS
	//**********************************************//
	static propTypes = {
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

	//*********************************************//
	// STATE CHANGERS
	//**********************************************//

	/**
	 * Sets the showModal state to parameter value
	 * @param {boolean} show
	 * @calls {this.setState}
	 */
	setShowModal(show){
		this.setState({showModal: show});
	}

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
	 * Clears all the inputs of the add ingredient form
	 * @stateUsed {this.state.enteredIngredient}
	 * @calls {this.setState}
	 */
	clearInputs(){
		let enteredIngredient = this.state.enteredIngredient;
		for(var key in enteredIngredient){
			enteredIngredient[key] = "";
		}
		this.setState({enteredIngredient:enteredIngredient});
	}

	//*********************************************//
	// ACTION HANDLERS
	//**********************************************//

	/**
	 * Triggers opening the add ingredient form modal
	 * @param {DOM event} e-
	 * @calls {this.setShowModal}
	 */
	openModal(e){
		this.setShowModal(true);
	}

	/**
	 * Triggers closing the add ingredient form modal
	 * @param {DOM event} e-
	 * @calls {this.setShowModal}
	 */
	closeModal(e){
		this.setShowModal(false);
	}

	/**
	 * Triggered on key press, closes modal if 'esc' pressed
	 * @param {DOM event} e-
	 * @calls {this.closeModal}
	 */
	handleKeyDown(e){
		//toggle modal if esc was pressed
		if (e.which === 27 && this.state.showModal) {
			this.closeModal();
		}
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
		//clear input data
		this.clearInputs();

		//Hide modal
		this.closeModal();
	}

	//*********************************************//
	// DATA PROCESSING
	//**********************************************//

	createInvalidMsg(validList){
		return "Please enter one of the following: "+validList.join(", ");
	}

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
		if((typeof data === "string" && data.length === 0) || (typeof data === "number" && data <= 0)){
			isValid=false;
			invalidMsg = "Required";
		}
		//If valid options were defined for this field, make sure the data matches an option
		else if(Array.isArray(fieldOptions) && !fieldOptions.includes(data)){
			console.log("Got array option");
			isValid=false;
			invalidMsg = this.createInvalidMsg(fieldOptions);
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
			/*console.log("Checking valid fields");
			console.log(validateData);*/
			for(var key in validateData){
				if(validateData[key] === undefined || validateData[key].valid === false){
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
			<CarbonButton text="Add Ingredient" addedClass="add-ingredient-button" onClick={this.openModal} />
			<Modal onRequestClose={this.closeModal} modalLabel="Add an Ingredient" modalHeading="Enter Data Here"  secondaryButtonText="Close" primaryButtonText="Add"
        open={this.state.showModal} onRequestSubmit={this.handleAddSubmit} onKeyDown={this.handleKeyDown} primaryButtonDisabled={this.isAnyDataInvalid()} onSecondarySubmit={this.closeModal}>
				<div className="add-ingredient-modal-content-container">
					<AddIngredientForm onChange={this.handleIngredientChange} ingredient={this.state.enteredIngredient} ingredientFields={this.props.ingredientFields} ingredientFieldTypes={this.props.ingredientFieldTypes}
						validateData={this.state.validateData} defaultValidateData={this.state.defaultValidateData}/>
				</div>
			</Modal>
		</div>
		);
	}
}

export default AddIngredients;
