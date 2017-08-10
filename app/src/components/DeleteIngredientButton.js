import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DeleteIngredientButton extends Component{
	constructor(props){
		super(props);
		this.onPress = this.onPress.bind(this);
	}  

  	static propTypes = {
		deleteIngredientHandler: PropTypes.func.isRequired,
		targetItem: PropTypes.object.isRequired
	};

	onPress(e){
		console.log(e);
		this.props.deleteIngredientHandler(this.props.targetItem);
	}

	render(){
		return <button onClick={this.onPress} className="delete-ingredient-button">Remove Ingredient</button>
	}
}

export  default DeleteIngredientButton;
