import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UpdatingIngredient from './UpdatingIngredient';

class MakeRecipeSecondStep extends Component{
  constructor(props){
    super(props);
    this.state = {
      unitOptions: []
    };
  }

  static propTypes = {
    selectedIngredients: PropTypes.object.isRequired,
    onIngredientUpdate: PropTypes.func.isRequired,
    unitOptions: PropTypes.array.isRequired
  };

  showIngredientUpdateList(){
    const selectedIngredients = this.props.selectedIngredients;
    return Object.keys(selectedIngredients).map((field, i) => {
      return (
        <UpdatingIngredient key={i} dataKey={field} updateDesc={field} data={selectedIngredients[field]} onChange={this.props.onIngredientUpdate} unitOptions={this.props.unitOptions}/>
      );
    });
  }

  render(){
    return (
      <ul className="make-recipe-step-container second-step-container">
        <li className="updating-ingredient-list-item updating-ingredient-list-header">
          <div className="updating-ingredient-list-header-item">Ingredient</div>
          <div className="updating-ingredient-list-header-qty">Quantity Used</div>
          <div className="updating-ingredient-list-header-unit">Unit</div>
        </li>
        {this.showIngredientUpdateList()}
      </ul>
    );
  }
}

export default MakeRecipeSecondStep;
