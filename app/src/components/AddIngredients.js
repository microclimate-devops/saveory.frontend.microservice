import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonModal from './carbon/CarbonModal.js';
import CarbonButton from './carbon/CarbonButton.js';
import AddIngredientForm from './AddIngredientForm.js';
import InfoMessage from './InfoMessage.js';

class AddIngredients extends Component{
	constructor(props){
		super(props);
		this.state = {enteredIngredient: {}, validateData: {}, numberOfIngredientFields: 0};
		this.handleAddSubmit = this.handleAddSubmit.bind(this);
		this.handleIngredientChange = this.handleIngredientChange.bind(this);
	}

	static PropTypes = {
		onAddIngredient: PropTypes.func.isRequired,
		msg: PropTypes.string.isRequired,
		showMsg: PropTypes.bool.isRequired,
		msgIsError: PropTypes.bool.isRequired
	};

	handleAddSubmit(e){
		this.props.onAddIngredient(this.state.enteredIngredient);
	}

	handleIngredientChange(key, data, numberOfIngredientFields){
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
			
		this.setState({enteredIngredient: ingredient, validateData: validateData, numberOfIngredientFields: numberOfIngredientFields});
	}
	
	isDataInvalid(){
		let dataIsInvalid = false;
		const validateData = this.state.validateData;
		
		//if data is empty or there are not enough entries to satisfy all fields, data is invalid
		if(Object.keys(validateData).length === 0 || Object.keys(validateData).length !== this.state.numberOfIngredientFields){
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
		<div>
			<CarbonButton text="Add Ingredient" addedClass="add-ingredient-button" isModalControl={true} modalTarget="#add-ingredient-modal" onClick={function(){}}/>
			<CarbonModal id="add-ingredient-modal">
				<div className="add-ingredient-modal-header-container">
					<h1>Add Ingredient Form</h1>
				</div>
				<div className="add-ingredient-modal-content-container">
					<AddIngredientForm onChange={this.handleIngredientChange} ingredient={this.state.enteredIngredient} validateData={this.state.validateData}/>
				</div>
				<div className="add-ingredient-modal-footer-container">
					<CarbonButton text="Add" onClick={this.handleAddSubmit} isDisabled={this.isDataInvalid()}/>
					<InfoMessage msg={this.props.msg} showMsg={this.props.showMsg} msgIsError={this.props.msgIsError}/>
				</div>
			</CarbonModal>
		</div>
		);
	}


}

export default AddIngredients;

