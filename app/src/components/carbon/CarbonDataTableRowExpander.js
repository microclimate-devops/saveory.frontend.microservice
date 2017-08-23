import React, { Component } from 'react';

class CarbonDataTableRowExpander extends Component{
	componentDidMount(){
		//set custom attributes
		this.refs.expander.setAttribute("tabindex", "0");
		this.refs.expander.setAttribute("data-event", "expand");
		this.refs.expandersvg.setAttribute("width", "8");
		this.refs.expandersvg.setAttribute("height", "12");
		this.refs.expandersvg.setAttribute("viewBox", "0 0 8 12");
		this.refs.expandersvg.setAttribute("fill-rule", "evenodd");
		this.refs.expandersvgpath.setAttribute("d", "M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z");
	}

	render(){
		return (
		<td ref="expander" className="bx--table-expand">
		  <svg ref="expandersvg" className="bx--table-expand__svg">
		    <path ref="expandersvgpath"></path>
		  </svg>
		</td>	
		);		
	}
}

export default CarbonDataTableRowExpander;
