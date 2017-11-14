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
    onChange: PropTypes.func.isRequired,
    unitOptions: PropTypes.array.isRequired
  };

  handleQtyChange(e){
     let numberVal = Number(e.target.value);
     if(numberVal >= 0){
       this.props.onChange(this.props.dataKey, "quantity", numberVal);
     }
  }

  handleUnitChange(e){
    const unitVal = e.target.value;
    if(unitVal !== "Select one"){
      this.props.onChange(this.props.dataKey, "unit", unitVal);
    }
  }

  showUnitOptions(){
    return this.props.unitOptions.map((item, i) => {
        return <option key={i}>{item}</option>
    });
  }

  render(){
    return (
      <li className="updating-ingredient-list-item">
        <div className="updating-ingredient-name">{this.props.dataKey}</div>
        <div className="updating-ingredient-selections">
          <input type="number" value={this.props.data.quantity || ""} onChange={this.handleQtyChange} />
          <select className="updating-ingredient-unit-options" onChange={this.handleUnitChange} value={this.props.data.unit}>
            <option>Select one</option>
            {this.showUnitOptions()}
          </select>
        </div>
      </li>
    );
  }
}

export default UpdatingIngredient;
