import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableData extends Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	
	static PropTypes = {
		id: PropTypes.string.isRequired,
		editable: PropTypes.bool,
		onChange: PropTypes.func,
		className: PropTypes.string,
		iconData: PropTypes.obj
	};

	static defaultProps = {
		editable: false,
		onChange: undefined,
		className: "",
		iconData: undefined
	};

	handleChange(e){
		if(this.props.onChange !== undefined){
			this.props.onChange(e.target);	
		}
	}

	showData(){
		const data = this.props.children;
		let content = undefined;
		const contentClass = this.props.className+"-content";
		const iconData = this.props.iconData;

		//Change to input if it's currently editable
		if(this.props.editable){
			content = <input id={this.props.id} type="text" value={data} onChange={this.handleChange} className={contentClass}/>
		}else{
			content = <p className={contentClass}>{data}</p>;
		}

		//Add icon if specified
		if(typeof iconData === "object" && Object.keys(iconData).length > 0){
			content = (
				<div className={contentClass+"-wrap"}>
					<Icon className={iconData.className} name={iconData.name} height={iconData.height} width={iconData.width}/>
					{content}
				</div>
			);	
		}

		return content;
	}

	render(){
		return (
			<td className={this.props.className}>
				{this.showData()}
			</td>
		);
	}
}

export default TableData;

