import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {username: "", pantry: []};
	}

	static propTypes = {
		userToken: PropTypes.number.isRequired
	};

	componentDidMount(){
		//Get the user's name
		/*Https.get("https://localhost:3000/users/"+this.props.userToken, (res) => {
			res.on('data', (d) => {
				this.setState({username: d.user});	
			});
		}).on('error', (e) => {
			console.log(JSON.stringify(e));
		});*/
		/*const userDataURL = "http://localhost:3000/users/"+this.props.userToken;
		console.log("URL: "+userDataURL)
		axios.get(userDataURL).then(res => {
			console.log("res: "+JSON.stringify(res));
			this.setState({username: res.data.user});
		}).catch((err)=> {console.log(JSON.stringify(err))});*/
	
		//Get the user's pantry 
		/*Https.get("https://localhost:3000/pantries/"+this.props.userToken, (res) => {
			res.on('data', (d) => {
				this.setState({pantry: d.pantry});	
			});
		}).on('error', (e) => {
			console.log(JSON.stringify(e));
		});*/
	}

	render(){
		return (
			<h1>User {this.state.username}'s pantry: {JSON.stringify(this.state.pantry)}</h1>
		);
	}
}

export default Home;
