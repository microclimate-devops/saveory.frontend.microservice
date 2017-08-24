import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CarbonNotification extends Component{
	static PropTypes = {
		type: PropTypes.string.isRequired, //e.g. "error" "info" "success" "warning"
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string.isRequired,
		bindMethod: PropTypes.func.isRequired,
		unbindMethod: PropTypes.func.isRequired
	};

	bindNotification(){	
		//Bind the notification, include method to unbind when the notification is closed
		this.props.bindMethod(this.refs.notification, undefined);	
	}

	customizeNotification(){
		//variable data that depends on the type
		let notificationClass = "bx--inline-notification";
		let notificationIcon = "";
		

		//Set universal custom attributes
		this.refs.notification.setAttribute("role", "alert");
		this.refs.notification.setAttribute("data-notification", "true");
		this.refs.notificationdetailsvg.setAttribute("width", "16");
		this.refs.notificationdetailsvg.setAttribute("height", "16");
		this.refs.notificationdetailsvg.setAttribute("viewBox", "0 0 16 16");
		this.refs.notificationdetailsvg.setAttribute("fill-rule", "evenodd");
		this.refs.notificationbutton.setAttribute("data-notification-btn", "true");
		this.refs.notificationbuttonsvg.setAttribute("aria-label", "close");
		this.refs.notificationbuttonsvg.setAttribute("width", "10");
		this.refs.notificationbuttonsvg.setAttribute("height", "10");
		this.refs.notificationbuttonsvg.setAttribute("viewBox", "0 0 10 10");
		this.refs.notificationbuttonsvg.setAttribute("fill-rule", "evenodd");
		this.refs.notificationbuttonsvgpath.setAttribute("d", "M9.8 8.6L8.4 10 5 6.4 1.4 10 0 8.6 3.6 5 .1 1.4 1.5 0 5 3.6 8.6 0 10 1.4 6.4 5z");

		//Set adaptive custom attributes
		switch(this.props.type){
		 	case "error":
				notificationClass += " bx--inline-notification--error";
				notificationIcon = "M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM5.1 13.3L3.5 12 11 2.6l1.5 1.2-7.4 9.5z"
				break;
		 	case "info":
				notificationClass += " bx--inline-notification--info";
				notificationIcon = "M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm2 8H6v-1h1V8H6V7h3v4h1v1z";
				break;
		 	case "success":
				notificationClass += " bx--inline-notification--success";
				notificationIcon ="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6.7 11.5L3.4 8.1l1.4-1.4 1.9 1.9 4.1-4.1 1.4 1.4-5.5 5.6z"; 
				break;
		 	case "warning":
				notificationClass += " bx--inline-notification--warning";
				notificationIcon = "M8 1L0 15h16L8 1zm-.8 5h1.5v1.4L8.3 11h-.8l-.4-3.6V6h.1zm.8 8c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z";
				break;
			default:
				console.log("Unknown message type");
				break;
		}

		this.refs.notification.setAttribute("class", notificationClass);
		this.refs.notificationdetailsvgpath.setAttribute("d", notificationIcon);
		
		//bind notification to carbon-components library
		this.bindNotification();
	}

	componentDidMount(){
		this.customizeNotification();
	}

	componentDidUpdate(nextProps, prevState){
		//unbind and rebind with new options
		this.props.unbindMethod();
		this.customizeNotification();
	}
	
	shouldComponentUpdate(prevProps, newProps){
		//Always update the notification
		return true;
	}

	render(){
		return (
			<div ref="notification" className="bx--inline-notification">
			  <div className="bx--inline-notification__details">
			    <svg ref="notificationdetailsvg" className="bx--inline-notification__icon">
			      <path ref="notificationdetailsvgpath"></path>
			    </svg>
			    <div className="bx--inline-notification__text-wrapper">
			      <p className="bx--inline-notification__title">{this.props.title}</p>
				<p className="bx--inline-notification__subtitle">{this.props.subtitle}</p>
			    </div>
			  </div>
			  <button data-notification-btn ref="notificationbutton" className="bx--inline-notification__close-button" type="button">
			    <svg ref="notificationbuttonsvg" className="bx--inline-notification__close-icon">
			      <path ref="notificationbuttonsvgpath"></path>
			    </svg>
			  </button>
			</div>
		);
	}
}

export default CarbonNotification;
