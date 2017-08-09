import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DeleteIngredientButton extends Component{
  static propTypes = {
		deleteIngredientHandler: PropTypes.func.isRequired
	};

  onPress(e){
    this.props.deleteIngredientHandler(e);
  }

  render(){
    return <button onClick={onPress} className="delete-ingredient-button">Remove Ingredient</button>
  }
}

export  default DeleteIngredientButton;
