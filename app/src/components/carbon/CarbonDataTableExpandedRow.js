import React, { Component } from 'react';

class CarbonDataTableExpandedRow extends Component{
	componentDidMount(){
		//set custom attributes
		this.refs.innercontent.setAttribute("colspan", "6");
	}

	render(){
		return (
		<tr className="bx--table-row bx--expandable-row bx--expandable-row--hidden">
			<td ref="innercontent">
				{this.props.children}
			</td>
		</tr>
		);		
	}
}

export default CarbonDataTableExpandedRow;
