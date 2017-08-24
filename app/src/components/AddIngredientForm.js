import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonFormInput from './carbon/CarbonFormInput.js';

class AddIngredientForm extends Component{
	constructor(props){
		super(props);
		this.state = {numberOfIngredientFields: 4};
		this.nameChange = this.nameChange.bind(this);
		this.qtyChange = this.qtyChange.bind(this);
		this.qtyUnitChange = this.qtyUnitChange.bind(this);
		this.expDateChange = this.expDateChange.bind(this);
	}

	static PropTypes = {
		onChange: PropTypes.func.isRequired,
		ingredient: PropTypes.object.isRequired,
		validateData: PropTypes.object.isRequired
	};

	nameChange(input){
		//console.log("name changed: "+e.target.value);
		this.props.onChange("item", input, this.state.numberOfIngredientFields);
	}

	qtyChange(input){
		//console.log("qty changed: "+Number(e.target.value)+" ("+typeof Number(e.target.value)+")");
		this.props.onChange("qty", Number(input), this.state.numberOfIngredientFields);
	}

	qtyUnitChange(input){
		//console.log("qty unit changed: "+e.target.value);
		this.props.onChange("qtyUnit", input, this.state.numberOfIngredientFields);
	}

	expDateChange(input){
		//console.log("exp date changed: "+e.target.value);
		this.props.onChange("expDate", input, this.state.numberOfIngredientFields);
	}

	render(){
		console.log("validate data: "+JSON.stringify(this.props.validateData));

		return (
			<div className="add-ingredient-form-container">
				<CarbonFormInput inputData={this.props.ingredient.name} inputType="text" inputID="item" inputLabel="Ingredient Name" onChange={this.nameChange} invalidText="Please enter ingredient name" isInvalid={!this.props.validateData.item}/>
				<CarbonFormInput inputData={this.props.ingredient.qty} inputType="number" inputID="qty" inputLabel="Quantity" onChange={this.qtyChange} invalidText="Please enter valid quantity" isInvalid={!this.props.validateData.qty}/>
				<CarbonFormInput inputData={this.props.ingredient.qtyUnit} inputType="text" inputID="qtyUnit" inputLabel="Quantity Unit" onChange={this.qtyUnitChange} invalidText="Please enter valid quantity unit" isInvalid={!this.props.validateData.qtyUnit}/>
				<CarbonFormInput inputData={this.props.ingredient.expDate} inputType="date" inputID="expDate" inputLabel="Expiration Date" onChange={this.expDateChange} invalidText="Please select a date" isInvalid={!this.props.validateData.expDate}/>
			</div>
		);
	}
}

export default AddIngredientForm;

