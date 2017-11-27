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

  showIngredientUpdateList(){
    const currentIngredients = this.props.currentIngredients;
    const manuallyUpdatedIngredients = this.props.manuallyUpdatedIngredients;
    const selectedIngredients = this.props.selectedIngredients;
    console.log("selectedIngredients");
    console.log(selectedIngredients);
    let ingredientList = [];
    let counter = 0;
    for(var field in manuallyUpdatedIngredients){
      ingredientList.push(<ManualIngredientUpdateDescriptor key={counter+"-descriptor"} ingredient={currentIngredients[field]} updates={selectedIngredients[field]}/>);
      ingredientList.push(<UpdatingIngredient key={counter} dataKey={field} data={manuallyUpdatedIngredients[field]} onChange={this.props.onIngredientUpdate} unitOptions={this.props.unitOptions}/>);
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
