import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from 'carbon-components-react';
import CarbonFormInput from './carbon/CarbonFormInput.js';

class AddIngredientForm extends Component{
	constructor(props){
		super(props);
		this.inputChange = this.inputChange.bind(this);
		this.dropdownChange = this.dropdownChange.bind(this);
	}

	static PropTypes = {
		onChange: PropTypes.func.isRequired,
		ingredient: PropTypes.object.isRequired,
		ingredientFields: PropTypes.array.isRequired,
		ingredientFieldTypes: PropTypes.array.isRequired,
		ingredientFieldOptions: PropTypes.object.isRequired,
		validateData: PropTypes.object.isRequired
	};

	componentWillReceiveProps(nextProps){
		console.log("Props received for add ingredient form");
		console.log(nextProps);
	}

	inputChange(target){
		this.props.onChange(target.getAttribute('id'), target.value);
	}

	dropdownChange(target){
		console.log("Dropdown option changed")
		console.log(target.getAttribute('for'));
		console.log(target);
	}

	showDropdownItems(selector){
		const options = this.props.ingredientFieldOptions[selector];
		if(Array.isArray(options)){
			return options.map((opt, i) => {
				return <li key={i} htmlFor={selector}>{opt}</li>
			});
		}else{
			console.log("The options were not an array for selector "+selector);
		}
	}

	showDropdown(selector){
		console.log("attempting to show dropdown for "+selector);
		return(
			<div className="ingredient-field-dropdown">
				<label className="ingredient-field-dropdown-label">{selector}</label>
				<Dropdown onChange={this.dropdownChange}>
					{this.showDropdownItems(selector)}
				</Dropdown>
			</div>
		);
	}

	showInputs(){
		const ingredientFields = this.props.ingredientFields;
		const ingredientFieldTypes = this.props.ingredientFieldTypes;

		let inputs = [];
		let currInput = undefined;
		let currSelector = undefined;
		let currType = undefined;
		let currValue = undefined;
		let currIsInvalid = undefined;

		//Use the ingredient metadata to determine input fields and types
		for(var i = 0; i < ingredientFields.length; i++){
			//Gather data about the field
			currSelector = ingredientFields[i];
			currType = ingredientFieldTypes[i];
			currValue = this.props.ingredient[currSelector];
			currIsInvalid = !this.props.validateData[currSelector];

			//Decide whether to show input or dropdown
			if(typeof currType === "object" && currType.dropdown !== undefined){
				currInput = this.showDropdown(currSelector);
			}else{
				currInput = <CarbonFormInput key={currSelector} inputData={currValue} inputType={ingredientFieldTypes[i]} inputID={currSelector} inputLabel={currSelector} onChange={this.inputChange} invalidText="Required" isInvalid={currIsInvalid} className="add-ingredient-form-item"/>
			} 

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

