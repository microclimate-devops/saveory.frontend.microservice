import React, { Component } from 'react';

class Ingredient extends Component{
	render(){
		return (
			<tr id={this.props.data.item}>
					<td>{this.props.data.item}</td>
					<td>{this.props.data.qty}</td>
					<td>{this.props.data.qtyUnit}</td>
					<td>{this.props.data.expDate}</td>	
			</tr>
		);
	}
}

export default Ingredient;
