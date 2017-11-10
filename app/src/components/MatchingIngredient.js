import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from 'carbon-components-react';

class MatchingIngredient extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.onChange(this.props.ingredientId);
  }

  render(){
    const ingredientId = this.props.ingredientId;
    return (
      <li className="make-recipe-matching-ingredient">
        <div className="matching-ingredient-title">
          {ingredientId}
        </div>
        <Checkbox id={"matching-ingredient-"+ingredientId} checked={this.props.isChecked} labelText="Used" onChange={this.handleChange} />
      </li>
    );
  }
}

MatchingIngredient.propTypes = {
  ingredientId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired
};


export default MatchingIngredient;
