import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UpdatingIngredient from './UpdatingIngredient';

class MakeRecipeSecondStep extends Component{
  constructor(props){
    super(props);
  }

  static propTypes = {
    selectedIngredients: PropTypes.object.isRequired,
    onQuantityUpdate: PropTypes.func.isRequired
  };

  showIngredientUpdateList(){
    const selectedIngredients = this.props.selectedIngredients;
    return Object.keys(selectedIngredients).map((field, i) => {
      return (
        <UpdatingIngredient key={i} data={selectedIngredients[field]} onChange={this.onQuantityUpdate}/>
      );
    });
  }

  render(){
    return (
      <div className="make-recipe-step-container second-step-container">
        <h1>Step 2</h1>
        <p>{JSON.stringify(this.props.selectedIngredients)}</p>
      </div>
    );
  }
}

export default MakeRecipeSecondStep;
