import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CarbonFormInput extends Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	static propTypes = {
		inputData: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		dataOptions: PropTypes.array,
		dataOnlyPositive: PropTypes.bool,
		inputType: PropTypes.string,
		inputID: PropTypes.string.isRequired,
		inputLabel: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		invalidText: PropTypes.string,
		isInvalid: PropTypes.bool,
		inputPlaceholder: PropTypes.string,
		className: PropTypes.string
	};

	static defaultProps = {
		inputData: "",
		dataOptions: [],
		dataOnlyPositive: false,
		inputType: "text",
		invalidText: "",
		isInvalid: false,
		inputPlaceholder: "",
		className: ""
	};

	handleChange(e){
		if(e.target.value === "Select One"){
			e.target.value = "";
		}
		this.props.onChange(this.props.inputID, e.target);
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

	dataToString(inputData){
		let stringData = inputData;
		//Show the number correctly as a string
		if(typeof inputData === "number"){
			if(this.props.dataOnlyPositive && inputData <= 0){
				stringData =  "";
			}else{
				stringData = inputData.toString();
			}
		}
		return stringData;
	}

	showInputLabel(){
		let labelEle = null;
		const labelText = this.props.inputLabel;
		if(labelText !== ""){
			labelEle = <label className="bx--label">{labelText}</label>;
		}
		return labelEle;
	}

	showDataOptions(dataOptions){
		return dataOptions.map((currOption, i) => {
			return <option key={i}>{currOption}</option>;
		});
	}

	showInput(){
		let inputEle = null;
		const currData = this.dataToString(this.props.inputData);
		const dataOptions = this.props.dataOptions;
		const className = "bx--text-input carbon-form-input-container-input";
		if(dataOptions.length > 0){
			inputEle = (
				<select className={className} value={currData} onChange={this.handleChange}>
					<option>Select One</option>
					{this.showDataOptions(dataOptions)}
				</select>
			);
		}else{
			inputEle = <input ref="carboninput" type={this.props.inputType} className={className} onChange={this.handleChange}
				value={currData} placeholder={this.props.inputPlaceholder}/>
		}
		return inputEle;
	}


	render(){
		return (
			<div className={"bx--form-item carbon-form-input-container "+this.props.className}>
			  {this.showInputLabel()}
			  <input ref="carboninput" type={this.props.inputType} className="bx--text-input carbon-form-input-container-input" onChange={this.handleChange}
					value={this.dataToString(this.props.inputData)} placeholder={this.props.inputPlaceholder}/>
			  <div className="bx--form-requirement carbon-form-input-container-invalid">
			    {this.props.invalidText}
			  </div>
			</div>
		);
	}
}

export default CarbonFormInput;
