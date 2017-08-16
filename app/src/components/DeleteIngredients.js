import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DeleteIngredients extends Component{
	constructor(props){
		super(props);
		this.state = {ingredient: ""};
		this.handleIngredientChange = this.handleIngredientChange.bind(this);
		this.deleteHandler = this.deleteHandler.bind(this);
	}

	static PropTypes = {
		onDeleteIngredient: PropTypes.func.isRequired
	};

	componentWillReceiveProps(nextProps){
		//update state to reset the ingredient input
		this.setState({ingredient: ""});
	}

	handleIngredientChange(e){
		//The user typed something new so hide messages
		this.setState({ingredient: e.target.value});
	}

	deleteHandler(e){	
		//When the user submits an ingredient for removal, use delete handler in Pantry and prepare to show any messages
		this.props.onDeleteIngredient(this.state.ingredient);
	}

	render(){
 		return(
			<div className="delete-ingredients-form">		 
				Ingredient Name: <input type="text" onChange={this.handleIngredientChange} value={this.state.ingredient}/>
				<button onClick={this.deleteHandler}>Delete Ingredient</button> 
			</div>
		);
	}
}


export default DeleteIngredients;
