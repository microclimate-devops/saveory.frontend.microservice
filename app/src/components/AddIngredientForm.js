import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddIngredientForm extends Component{
	constructor(props){
		super(props);
		this.nameChange = this.nameChange.bind(this);
		this.qtyChange = this.qtyChange.bind(this);
		this.qtyUnitChange = this.qtyUnitChange.bind(this);
		this.expDateChange = this.expDateChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {name: "", qty: 0, qtyUnit: "", expDate: ""};	
	}

	static PropTypes = {
		onSubmit: PropTypes.func.isRequired
	};

	nameChange(e){
		//console.log("name changed: "+e.target.value);
		this.setState({name: e.target.value});
	}

	qtyChange(e){
		//console.log("qty changed: "+Number(e.target.value)+" ("+typeof Number(e.target.value)+")");
		this.setState({qty: Number(e.target.value)});
	}

	qtyUnitChange(e){
		//console.log("qty unit changed: "+e.target.value);
		this.setState({qtyUnit: e.target.value});
	}

	expDateChange(e){
		//console.log("exp date changed: "+e.target.value);
		this.setState({expDate: e.target.value});
	}

	handleSubmit(e){
		const ingredient = {
			item: this.state.name,
			qty: this.state.qty,
			qtyUnit: this.state.qtyUnit,
			expDate: this.state.expDate
		};
		this.props.onSubmit(ingredient)	
	}

	render(){
		return (
			<div className="add-ingredient-form-container">
				Name:<br/><input type="text" onChange={this.nameChange} value={this.state.name}/><br/>
				Quantity:<br/><input type="number" onChange={this.qtyChange} value={this.state.qty}/><br/>
				Quantity Unit:<br/><input type="text" onChange={this.qtyUnitChange} value={this.state.qtyUnit}/><br/>
				Expiration Date:<br/><input type="date" onChange={this.expDateChange} value={this.state.expDate}/><br/>
				<button onClick={this.handleSubmit}>Submit</button>
			</div>
		);
	}
}

export default AddIngredientForm;

