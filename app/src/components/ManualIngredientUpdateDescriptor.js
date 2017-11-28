import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ManualIngredientUpdateDescriptor extends Component{
  static PropTypes = {
    ingredient: PropTypes.object.isRequired,
    updates: PropTypes.object.isRequired
  };

  render(){
    const ingredient = this.props.ingredient;
    const updates = this.props.updates;
    return (
      <li className="ingredient-update-descriptor">
        <div>
          <p className="ingredient-update-descriptor-operation">{"  "+ingredient.quantity+" "+ingredient.unit + " - "+updates.quantity+" "+updates.unit}</p>
        </div>
      </li>
    );
  }
}

export default ManualIngredientUpdateDescriptor;
