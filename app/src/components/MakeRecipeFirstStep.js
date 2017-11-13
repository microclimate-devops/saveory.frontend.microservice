import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from 'carbon-components-react';
import MatchingIngredient from './MatchingIngredient';

class MakeRecipeFirstStep extends Component{
  constructor(props){
    super(props);
    this.state = {
      matchingIngredientPrefix: "matching-ingredient-"
    };
    this.handleIngredientSelectionUpdate = this.handleIngredientSelectionUpdate.bind(this);
  }

  static propTypes = {
    matchingIngredients: PropTypes.array.isRequired,
    selectedIngredients: PropTypes.object.isRequired,
    addIngredient: PropTypes.func.isRequired,
    removeIngredient: PropTypes.func.isRequired
  };

  handleIngredientSelectionUpdate(ingredientId){
    const selectedIngredients = this.props.selectedIngredients;
    if(this.ingredientIsChecked(ingredientId, selectedIngredients)){
      this.props.removeIngredient(ingredientId);
    }else{
      this.props.addIngredient(ingredientId);
    }
  }

  ingredientIsChecked(ingredientLookup, ingredients){
    return typeof ingredients[ingredientLookup] === 'object';
  }

  showMatchingIngredients(){
    const selectedIngredients = this.props.selectedIngredients;
    const idPrefix = this.state.matchingIngredientPrefix;
    return this.props.matchingIngredients.map((ingredientName, i) => {
      return (
        <MatchingIngredient key={i} ingredientId={ingredientName} isChecked={this.ingredientIsChecked(ingredientName, selectedIngredients)} onChange={this.handleIngredientSelectionUpdate} />
      );
    });
  }

  render(){
      return (
        <ul className="make-recipe-step-container first-step-container">
          {this.showMatchingIngredients()}
        </ul>
      );
  }
}

export default MakeRecipeFirstStep;
