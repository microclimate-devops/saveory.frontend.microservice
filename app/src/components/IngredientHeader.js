import React, { Component } from 'react';

class IngredientHeader extends Component{
	render(){
		return (
			<tr id={this.props.data.item}>
					<th>{this.props.data.item}</th>
					<th>{this.props.data.qty}</th>
					<th>{this.props.data.qtyUnit}</th>
					<th>{this.props.data.expDate}</th>
			</tr>
		);
	}
}

export default IngredientHeader;
