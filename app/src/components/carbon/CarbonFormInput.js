import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CarbonFormInput extends Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	static PropTypes = {
		inputData: PropTypes.string.isRequired,
		inputType: PropTypes.string.isRequired,
		inputID: PropTypes.string.isRequired,
		inputLabel: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		invalidText: PropTypes.string.isRequired,
		isInvalid: PropTypes.bool.isRequired
	};	

	handleChange(e){
		this.props.onChange(e.target);
	}

	showIfInvalid(){
		//Update the input if it's data is invalid
		if(this.props.inputLabel === "Ingredient Name"){
			console.log("ingredient is invalid: "+this.props.isInvalid);
		}

		if(this.props.isInvalid){
			this.refs.carboninput.setAttribute('data-invalid', 'true');
		}else{
			this.refs.carboninput.removeAttribute('data-invalid');	
		}
	}
	
	componentDidUpdate(){
		//Show if the component is invalid after update
		this.showIfInvalid();
	}
	

	render(){
		//{this.props.isInvalid && "data-invalid"} 
		return (
			<div className="bx--form-item carbon-form-input-container">
			  <label htmlFor={this.props.inputID} className="bx--label">{this.props.inputLabel}</label>
			  <input ref="carboninput" id={this.props.inputID} type={this.props.inputType} className="bx--text-input carbon-form-input-container-input" onChange={this.handleChange} value={this.props.inputData} />
			  <div className="bx--form-requirement carbon-form-input-container-invalid">
			    {this.props.invalidText}
			  </div>
			</div>
		);
	}
}

export default CarbonFormInput;
