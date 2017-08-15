import React, { Component } from 'react';
//import ReactTable from 'react-table';
import { Modal } from 'react-overlays';

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
	}

	open(){
		this.setState({showModal: true});
	}

	close(){
		this.setState({showModal: false});
	}

	render(){
		return (
			<div className='modal-example'>
				<button onClick={this.open}>
				  Open Modal
				</button>
				<p>Click to get the full Modal experience!</p>

				<Modal
				  aria-labelledby='modal-label'
				  style={modalStyle}
				  backdropStyle={backdropStyle}
				  show={this.state.showModal}
				  onHide={this.close}
				>
				  <div style={dialogStyle()} >
					<div className="login-form-container">
						<h1>enter ingredient info</h1>	
					
					</div>
				  </div>
				</Modal>
			</div>
		);
	}


}

export default AddIngredients;

