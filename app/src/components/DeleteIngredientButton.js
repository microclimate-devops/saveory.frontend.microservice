import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DeleteIngredientButton extends Component{
  static propTypes = {
		deleteIngredientHandler: PropTypes.number.isRequired
	};

  onPress(e){
    console.log(e);
    console.log(JSON.stringify(this.props.deleteIngredientHandler));
  }

  render(){
    return <button onClick={this.onPress} className="delete-ingredient-button">Remove Ingredient</button>
  }
}

export  default DeleteIngredientButton;
