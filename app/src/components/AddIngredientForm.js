import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonFormInput from './carbon/CarbonFormInput.js';

class AddIngredientForm extends Component{
	constructor(props){
		super(props);
		this.inputChange = this.inputChange.bind(this);
	}

	static PropTypes = {
		onChange: PropTypes.func.isRequired,
		ingredient: PropTypes.object.isRequired,
		ingredientMetadata: PropTypes.array.isRequired,
		validateData: PropTypes.object.isRequired
	};

	inputChange(target){
		this.props.onChange(target.getAttribute('id'), target.value);
	}

	showInputs(){
		let inputs = [];
		let currInput = undefined;
		let currSelector = undefined;
		let currValue = undefined;
		let currIsInvalid = undefined;

		//Use the ingredient metadata to determine input fields and types
		for(var fieldMetadata of this.props.ingredientMetadata){
			//Gather data about the field
			currSelector = fieldMetadata.selector;
			currValue = this.props.ingredient[currSelector];
			currIsInvalid = !this.props.validateData[currSelector];

			currInput = <CarbonFormInput key={currValue} inputData={currValue} inputType={fieldMetadata.type} inputID={currSelector} inputLabel={fieldMetadata.title} onChange={this.inputChange} invalidText="Required" isInvalid={currIsInvalid}/>
 

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

