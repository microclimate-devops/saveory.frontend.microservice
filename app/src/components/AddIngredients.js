import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-overlays';
import AddIngredientForm from './AddIngredientForm.js';
import InfoMessage from './InfoMessage.js';

//***********************************
//Modal Style constants
//***********************************
const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5
};

const dialogStyle = function() {
  // we use some psuedo random coords so nested modals
  // don't sit right on top of each other.
  let top = 50;
  let left = 50;

  return {
    position: 'absolute',
    width: 400,
    top: top + '%', left: left + '%',
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20
  };
};


class AddIngredients extends Component{
	constructor(props){
		super(props);
		this.state = {showModal: false};
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.handleNewIngredientSubmit = this.handleNewIngredientSubmit.bind(this);
	}

	static PropTypes = {
		onAddIngredient: PropTypes.func.isRequired,
		msg: PropTypes.string.isRequired,
		showMsg: PropTypes.bool.isRequired,
		msgIsError: PropTypes.bool.isRequired
	};

	open(){
		this.setState({showModal: true});
	}

	close(){
		this.setState({showModal: false});
	}

	handleNewIngredientSubmit(ingred){
		this.props.onAddIngredient(ingred);
	}

	render(){
		return (
			<div className='modal-example'>
				<button onClick={this.open}>
				  Add Ingredient
				</button>

				<Modal
				  aria-labelledby='modal-label'
				  style={modalStyle}
				  backdropStyle={backdropStyle}
				  show={this.state.showModal}
				  onHide={this.close}
				>
				  <div style={dialogStyle()} >
					<div className="login-form-container">
						<h1>Enter Ingredient</h1>	
						<AddIngredientForm onSubmit={this.handleNewIngredientSubmit}/>
						<InfoMessage msg={this.props.msg} showMsg={this.props.showMsg} msgIsError={this.props.msgIsError}/>
					</div>
				  </div>
				</Modal>
			</div>
		);
	}


}

export default AddIngredients;

