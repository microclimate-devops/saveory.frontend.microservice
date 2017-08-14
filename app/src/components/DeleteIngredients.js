import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DeleteIngredients extends Component{
	constructor(props){
		super(props);
		this.state = {ingredient: "", errorMsg: "Ingredient not found in your pantry", successMsg: "Successfully deleted", showMsg:false};
		this.handleIngredientChange = this.handleIngredientChange.bind(this);
		this.deleteHandler = this.deleteHandler.bind(this);
	}

	static PropTypes = {
		deleteError: PropTypes.bool.isRequired,
		onDelete: PropTypes.func.isRequired
	};

	componentWillReceiveProps(nextProps){
		console.log("receiving props");
		console.log("error: "+this.props.deleteError);
		//update state to show messages and reset the ingredient input
		this.setState({ingredient: "", showMsg:true});
	}

	handleIngredientChange(e){
		//The user typed something new so hide messages
		this.setState({ingredient: e.target.value, showMsg:false});
	}

	deleteHandler(e){	
		//When the user submits an ingredient for removal, use delete handler in Pantry and prepare to show any messages
		this.props.onDelete(this.state.ingredient);
	}

	render(){
 		return(
			<div className="delete-ingredients-form">		 
				Ingredient Name: <input type="text" onChange={this.handleIngredientChange} value={this.state.ingredient}/>
				<button onClick={this.deleteHandler}>Delete Ingredient</button> 
				<h2 className="error-msg">{this.state.showMsg && this.props.deleteError && this.state.deleteError}</h2>
				<h2 className="success-msg">{this.state.showMsg && !this.props.deleteError && this.state.successMsg}</h2>
			</div>
		);
	}
}


export default DeleteIngredients;
