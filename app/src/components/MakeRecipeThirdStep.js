import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UpdatingIngredient from './UpdatingIngredient';
import ManualIngredientUpdateDescriptor from './ManualIngredientUpdateDescriptor';

class MakeRecipeThirdStep extends Component{
  static PropTypes = {
    currentIngredients: PropTypes.object.isRequired,
    selectedIngredients: PropTypes.object.isRequired,
    manuallyUpdatedIngredients: PropTypes.object,
    onIngredientUpdate: PropTypes.func.isRequired,
    unitOptions: PropTypes.array.isRequired
  };

  getUpdateEquationText(ingredient, updates){
    return ingredient.quantity+" "+ingredient.unit + " - "+updates.quantity+" "+updates.unit + " =";
  }

  showIngredientUpdateList(){
    const currentIngredients = this.props.currentIngredients;
    const manuallyUpdatedIngredients = this.props.manuallyUpdatedIngredients;
    const selectedIngredients = this.props.selectedIngredients;
    let ingredientList = [];
    let counter = 0;
    for(var field in manuallyUpdatedIngredients){
      ingredientList.push(<div key={counter+"-ingredient"} className="manual-update-ingredient-name"><p>{field}</p></div>);
      ingredientList.push(<UpdatingIngredient key={counter} dataKey={field} data={manuallyUpdatedIngredients[field]} updateDesc={this.getUpdateEquationText(currentIngredients[field], selectedIngredients[field])} onChange={this.props.onIngredientUpdate} unitOptions={this.props.unitOptions}/>);
      counter++;
    }
    return ingredientList;
  }

  render(){
    return (
      <ul className="make-recipe-step-container third-step-container">
        {this.showIngredientUpdateList()}
      </ul>
    );
  }
}

export default MakeRecipeThirdStep;
