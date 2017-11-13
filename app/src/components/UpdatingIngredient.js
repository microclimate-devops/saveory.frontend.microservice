import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UpdatingIngredient extends Component{
  constructor(props){
    super(props);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
  }

  static propTypes = {
    dataKey: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  handleQtyChange(e){
     this.props.onChange(this.props.dataKey, "quantity", e.target.value);
  }

  handleUnitChange(e){
    this.props.onChange(this.props.dataKey, "unit", e.target.value);
  }

  render(){
    return (
      <li className="updating-ingredient-list-item">
        <div className="updating-ingredient-name">{this.props.dataKey}</div>

      </li>
    );
  }
}

export default UpdatingIngredient;
