import React, { Component } from 'react';
//import axios from 'axios';
import Https from 'https';
import PropTypes from 'prop-types';
import PantryIngredients from "./PantryIngredients.js";

class Pantry extends Component{
	constructor(props){
		super(props);
		this.state = {pantry: {}, error: {}, pantryServiceURL: "https://dps-ubuntu-cfcmaster.rtp.raleigh.ibm.com:8443/kubernetes/api/v1/proxy/namespaces/default/services/microservicetalkingbackend-service:9080/microservicetalkingbackend/" };
		this.deleteIngredient = this.deleteIngredient.bind(this);
	}

	static propTypes = {
		user: PropTypes.string.isRequired
	};

	componentDidMount(){
		const pantryRequestURL = this.state.pantryServiceURL+"pantries?user="+this.props.user;
		//retrieve the user's pantry from the backend
		Https.get(pantryRequestURL, (res) => {
			res.on('data', (d) => {
				//Parse the data into a JSON object
				const resultObj = JSON.parse(d);
				var userPantry;

				//If the result is an array then use the first element as the user's pantry
				if(Array.isArray(resultObj)){
					userPantry = resultObj[0].pantry;
				}else{
					userPantry = resultObj.pantry;
				}

				this.setState({pantry: userPantry});
			});
		}).on('error', (e) => {
			this.setState({error: e});
		});
	}

	deleteIngredient(e){
		console.log(JSON.stringify(e));
	}

	render(){
		return (
			<div id="pantry">
				<h1>user {this.props.user}'s pantry</h1>
				<PantryIngredients pantry={this.state.pantry} deleteIngredientHandler="just a test"/>
			</div>
		);
	}
}

export default Pantry;
