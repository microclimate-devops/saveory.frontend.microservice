import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonFormInput from './carbon/CarbonFormInput.js';

/**
 * A dynamically rendered form to add an ingredient
 * @Stateless
 */
class AddIngredientForm extends Component{
	constructor(props){
		super(props);
		this.inputChange = this.inputChange.bind(this);
	}

	static propTypes = {
		/**
     * Called when an input changes.
		 * @param {string} dataID - the identifier for a given input field
		 * @param {string} data - the new input data
     */
		onChange: PropTypes.func.isRequired,
		/**
     * The ingredient object
     */
		ingredient: PropTypes.object.isRequired,
		/**
     * All the fields of the ingredient that need a corresponding input
     */
		ingredientFields: PropTypes.array.isRequired,
		/**
     * The data types of the above fields
     */
		ingredientFieldTypes: PropTypes.array.isRequired,
		/**
     * A dictionary to lookup a fields validity based on it's field name
		 * Each value is an object with valid and msg fields
     */
		validateData: PropTypes.object.isRequired,
		/**
		 * If a field does not have an entry in validateData
		 * Use this as a default
		 */
		defaultValidateData: PropTypes.object.isRequired
	};

	/**
	 * Called when the input is changed. The new value along with its ingredient field is passed to onChange prop
	 * @param {event.target} target - The DOM target for which the change event was triggered
	 * @propsUsed {ingredientFields, ingredientFieldTypes, onChange}
	 * @calls {this.props.onChange, Number}
	 */
	inputChange(inputId, target){
		//get selector
		const targetIndex = Number(inputId);
		const selector = this.props.ingredientFields[targetIndex];
		//convert to number if the field specifies it should be
		let value = this.props.ingredientFieldTypes[targetIndex] === "number" ? Number(target.value) : target.value;

		this.props.onChange(selector, value);
	}

	/**
	 * Creates a list of JSX inputs each corresponding to an ingredient field
	 * @param {event.target} target - The DOM target for which the change eveVdnt was triggered
	 * @propsUsed {ingredient, ingredientFields, ingredientFieldTypes, validateData}
	 */
	showInputs(){
		const ingredient = this.props.ingredient;
		const ingredientFields = this.props.ingredientFields;
		const ingredientFieldTypes = this.props.ingredientFieldTypes;
		const validateData = this.props.validateData;
		const defaultValidateData = this.props.defaultValidateData;

		let inputs = [];
		let currInput = undefined;
		let currInputType = undefined;
		let currSelector = undefined;
		let currValue = undefined;
		let currValidateData = undefined;

		//Use the ingredient metadata to determine input fields and types
		for(var i = 0; i < ingredientFields.length; i++){
			//Gather data about the field
			currSelector = ingredientFields[i];
			currValue = ingredient[currSelector];
			currInputType = (typeof ingredientFieldTypes[i] === "object" ? ingredientFieldTypes[i][currSelector] : ingredientFieldTypes[i]);
			//try to get validate data, default if not there
			currValidateData = validateData[currSelector] || defaultValidateData;
			currInput = <CarbonFormInput key={currSelector} inputData={currValue} inputType={ingredientFieldTypes[i]} inputID={i.toString()} inputLabel={currSelector} onChange={this.inputChange} invalidText={currValidateData.msg} isInvalid={!currValidateData.valid} className="add-ingredient-form-item"/>

			//Add the input to list
			inputs.push(currInput);
		}

		return inputs;
	}

	/**
	 * Shows all the inputs needed to add a new ingredient
	 * @calls {this.showInputs}
	 */
	render(){
		return (
			<div className="add-ingredient-form-container">
				{this.showInputs()}
			</div>
		);
	}
}

export default AddIngredientForm;
