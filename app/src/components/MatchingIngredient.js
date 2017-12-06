import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from 'carbon-components-react';

class MatchingIngredient extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    isChecked: PropTypes.bool.isRequired,
    ingredientId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  handleChange(e){
    this.props.onChange(this.props.ingredientId);
  }

  generateClasses(){
    let itemClass = "make-recipe-matching-ingredient";
    if(this.props.isChecked){
      itemClass += " selected-matching-ingredient";
    }
    return itemClass;
  }

  render(){
    const ingredientId = this.props.ingredientId;
    return (
      <li className={this.generateClasses()}>
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
