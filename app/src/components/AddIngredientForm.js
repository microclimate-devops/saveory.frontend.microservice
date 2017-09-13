import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from 'carbon-components-react';
import CarbonFormInput from './carbon/CarbonFormInput.js';

class AddIngredientForm extends Component{
	constructor(props){
		super(props);
		this.inputChange = this.inputChange.bind(this);
	}

	static PropTypes = {
		onChange: PropTypes.func.isRequired,
		ingredient: PropTypes.object.isRequired,
		ingredientFields: PropTypes.array.isRequired,
		ingredientFieldTypes: PropTypes.array.isRequired,
		validateData: PropTypes.object.isRequired
	};

	inputChange(target){
		//get selector 
		const targetIndex = Number(target.getAttribute('id'));
		const selector = this.props.ingredientFields[targetIndex];
		//convert to number if the field specifies it should be
		let value = this.props.ingredientFieldTypes[targetIndex] === "number" ? Number(target.value) : target.value;
		
		this.props.onChange(selector, value);
	}

	showInputs(){
		const ingredientFields = this.props.ingredientFields;
		const ingredientFieldTypes = this.props.ingredientFieldTypes;

		let inputs = [];
		let currInput = undefined;
		let currSelector = undefined;
		let currValue = undefined;
		let currValidateData = undefined;

		//Use the ingredient metadata to determine input fields and types
		for(var i = 0; i < ingredientFields.length; i++){
			//Gather data about the field
			currSelector = ingredientFields[i];
			currValue = this.props.ingredient[currSelector];
			//try to get validate data, default if not there
			currValidateData = this.props.validateData[currSelector] || {};

			currInput = <CarbonFormInput key={currSelector} inputData={currValue} inputType={ingredientFieldTypes[i]} inputID={i} inputLabel={currSelector} onChange={this.inputChange} invalidText={currValidateData.msg} isInvalid={!currValidateData.valid} className="add-ingredient-form-item"/>

			//Add the input to list
			inputs.push(currInput);
		}

		return inputs;
	}

	render(){
		return (
			<div className="add-ingredient-form-container">
				{this.showInputs()}
			</div>
		);
	}
}

export default AddIngredientForm;

