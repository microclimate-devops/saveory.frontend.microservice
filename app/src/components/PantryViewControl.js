import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonButton from './carbon/CarbonButton.js';

class PantryViewControl extends Component{
  constructor(props){
    super(props);
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }

  static PropTypes = {
    viewIndex: PropTypes.number.isRequired,
    viewMetadata: PropTypes.object.isRequired,
    onSwitch: PropTypes.func.isRequired
  }

  handleOptionClick(e){
    const newIndex = Number(e.target.getAttribute('id'));
    if(this.props.viewIndex !== newIndex){
      this.props.onSwitch(newIndex);
    }
  }

  /**
   * Creates a list of icons to represent the different pantry view options
   * @propsUsed {this.props.viewIndex, this.props.viewMetadata}
   * @calls {this.props.viewMetadata.map}
   * @return {return_type} -
   */
	showViewOptions(){
		const viewIndex = this.props.viewIndex;
		let optionClass = "pantry-view-option";
		//return list of option icons created from state.viewMetadata
		return this.props.viewMetadata.map( (vMeta, i) => {
				//add class to indicate selection
				if(viewIndex === i){
					optionClass += " pantry-view-selected";
				}
				//return <CarbonButton id={i} isSecondary={true}><Icon key={i} name={vMeta.carbonIconName} height={vMeta.carbonIconHeight} width={vMeta.carbonIconWidth}/></CarbonButton>;
				return <CarbonButton addedClass={optionClass} id={i} key={i} isSecondary={true} onClick={this.handleOptionClick}><p className="pantry-view-title">{vMeta.view}</p></CarbonButton>;
		});
	}

  render(){
    return (
      <div className="pantry-view-control-container">
        {this.showViewOptions()}
      </div>
    )
  }
}

export default PantryViewControl;
