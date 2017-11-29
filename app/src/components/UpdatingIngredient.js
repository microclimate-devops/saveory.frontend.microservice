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
    updateDesc: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    unitOptions: PropTypes.array.isRequired
  };

  static defaultProps = {
    labelText: ""
  };

  handleQtyChange(e){
     let numberVal = Number(e.target.value);
     if(numberVal >= 0){
       this.props.onChange(this.props.dataKey, "quantity", numberVal);
     }
  }

  handleUnitChange(e){
    const unitVal = e.target.value;
    if(unitVal !== "Select Unit"){
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
        <div className="updating-ingredient-desc">{this.props.updateDesc}</div>
        <div className="updating-ingredient-selections">
          <label>{this.props.labelText}</label>
          <input type="number" value={this.props.data.quantity || ""} onChange={this.handleQtyChange} />
          <select className="updating-ingredient-unit-options" onChange={this.handleUnitChange} value={this.props.data.unit}>
            <option>Select Unit</option>
            {this.showUnitOptions()}
          </select>
        </div>
      </li>
    );
  }
}

export default UpdatingIngredient;
