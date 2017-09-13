import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'carbon-components';
import CarbonModal from './carbon/CarbonModal.js';
import CarbonButton from './carbon/CarbonButton.js';
import AddIngredientForm from './AddIngredientForm.js';

class AddIngredients extends Component{
	constructor(props){
		super(props);
		this.state = {enteredIngredient: {}, validateData: {}, modalTarget: "#add-ingredient-modal"};
		this.handleAddSubmit = this.handleAddSubmit.bind(this);
		this.handleIngredientChange = this.handleIngredientChange.bind(this);
	}

	static PropTypes = {
		ingredientFields: PropTypes.array.isRequired,
		ingredientFieldTypes: PropTypes.array.isRequired,
		ingredientFieldOptions: PropTypes.object.isRequired,
		onAddIngredient: PropTypes.func.isRequired,
		msg: PropTypes.string.isRequired,
		showMsg: PropTypes.bool.isRequired,
		msgIsError: PropTypes.bool.isRequired
	};

	handleAddSubmit(e){
		this.props.onAddIngredient(this.state.enteredIngredient);
		//Hide modal
		AddIngredients.hideAddIngredientModal();
	}

	handleIngredientChange(key, data){
		let ingredient = this.state.enteredIngredient;
		let validateData = this.state.validateData

		//Add new ingredient info
		ingredient[key] = data;

		//validate data for strings and numbers
		if((typeof data === "string" && data.length === 0) || (typeof data === "number" && data <= 0)){
			validateData[key] = false;
		}else{
			validateData[key] = true;
		}
			
		this.setState({enteredIngredient: ingredient, validateData: validateData});
	}
	
	isDataInvalid(){
		let dataIsInvalid = false;
		const validateData = this.state.validateData;
		
		//if there are not enough entries to satisfy all fields, data is invalid
		if(Object.keys(validateData).length !== this.props.ingredientFields.length){
			dataIsInvalid = true;
		}else{
			//Check for occurence of validation being false
			for(var key in validateData){
				console.log("checking data valid: "+validateData[key]);
				if(validateData[key] === false){
					dataIsInvalid = true;
					break;
				}
			}
		}
		
		return dataIsInvalid;
	}

	render(){	
		return (
		<div className="add-ingredient-container">
			<CarbonButton text="Add Ingredient" addedClass="add-ingredient-button" isModalControl={true} modalTarget={this.state.modalTarget} onClick={function(){}}/>
			<CarbonModal id="add-ingredient-modal" bindModal={AddIngredients.bindAddIngredientModal}>
				<div className="add-ingredient-modal-header-container">
					<h1>Add Ingredient</h1>
				</div>
				<div className="add-ingredient-modal-content-container">
					<AddIngredientForm onChange={this.handleIngredientChange} ingredient={this.state.enteredIngredient} ingredientFields={this.props.ingredientFields} ingredientFieldTypes={this.props.ingredientFieldTypes} ingredientFieldOptions={this.props.ingredientFieldOptions} validateData={this.state.validateData}/>
				</div>
				<div className="add-ingredient-modal-footer-container">
					<CarbonButton text="Add" onClick={this.handleAddSubmit} isDisabled={this.isDataInvalid()}/>
				</div>
			</CarbonModal>
		</div>
		);
	}


}

AddIngredients.bindAddIngredientModal = function(ele, options){
	AddIngredients.addIngredientModal = new Modal(ele, options);
}

AddIngredients.hideAddIngredientModal = function(){
	if(AddIngredients.addIngredientModal !== undefined){
		AddIngredients.addIngredientModal.hide();
	}else{
		console.log("Please setup (bind) the modal before trying to close it");
	}
}



export default AddIngredients;

