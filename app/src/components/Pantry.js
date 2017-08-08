import React, { Component } from 'react';
import axios from 'axios';
import Https from 'https';
import PantrySort from "./PantrySort.js";
import PantryIngredients from "./PantryIngredients.js";

class Pantry extends Component{
	constructor(props){
		super(props);
		this.state = {pantry: {}, error: {}};
	}

	componentDidMount(){ //retrieve the user's pantry from the backend
		axios.get("microservicetalkingbackend-service:9080/microservicetalkingbackend/pantries?user="+this.props.user).then(res => {
			this.setState({pantry: res.data, error: {error: "none"}});
		}).catch((err)=> {this.setState({error: err})});
		
		/*Https.get("https://microservicetalkingbackend-service:9080/microservicetalkingbackend/pantries?user="+this.props.user, (res) => {
			res.on('data', (d) => {
				console.log("data: "+JSON.stringify(d));
				this.setState({pantry: d.pantry});	
			});
		}).on('error', (e) => {
			console.log(this.setState({error: e}));
		});*/
	}

	render(){
		return (
			<div id="pantry">
				<h1>user {this.props.user}'s pantry</h1>
				<PantrySort />
				<PantryIngredients pantry={this.state.pantry}/>	
				<h1>Axios error: {JSON.stringify(this.state.error)}</h1>
			</div>
		);
	}
}

export default Pantry;
