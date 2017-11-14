import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UpdatingIngredient from './UpdatingIngredient';
import Client from './Client.js';

class MakeRecipeSecondStep extends Component{
  constructor(props){
    super(props);
    this.state = {
      unitOptions: []
    };
  }

  static propTypes = {
    selectedIngredients: PropTypes.object.isRequired,
    onQuantityUpdate: PropTypes.func.isRequired,
    pantryServiceURL: PropTypes.string.isRequired
  };

  componentDidMount(){
    this.getUnitOptions();
  }

  getUnitOptions(){
    const reqURL = this.props.pantryServiceURL + "spec/ingredient/units";
    Client.request(reqURL, "GET",
      (resp) => {
        this.setState({unitOptions: resp});
      },
      (e) => {
        console.log("GET to "+reqURL+" failed with message: "+e.message);
      });
  }

  showIngredientUpdateList(){
    const selectedIngredients = this.props.selectedIngredients;
    return Object.keys(selectedIngredients).map((field, i) => {
      return (
        <UpdatingIngredient key={i} dataKey={field} data={selectedIngredients[field]} onChange={this.props.onQuantityUpdate} unitOptions={this.state.unitOptions}/>
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
