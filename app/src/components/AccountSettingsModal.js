import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, InlineNotification} from 'carbon-components-react';
import Client from './Client.js';

class AccountSettingsModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      userResource: "/api/users/",
      data: {},
      updateIsValid: false,
      error: {
        show: false,
        msg: "Could not update your account",
      }
    };
    this.errorHandler = this.errorHandler.bind(this);
    this.updateCallback = this.updateCallback.bind(this);
    this.handleAccountUpdate = this.handleAccountUpdate.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  static PropTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
  }

  static defaultProps = {
    open: false
  }

  setError(show, msg){
    let error = this.state.error;

    //Update data if present
    error.show = show || false;
    if(msg){
      error.msg = msg;
    }
    this.setState({error: error});
  }

  showError(){
    const error = this.state.error;
    if(error.show){
      return <InlineNotification kind="error" title="Error" subtitle={error.msg} role="alert"/>;
    }
  }

  errorHandler(e){
      this.setShowError(true);
  }

  updateCallback(resp){
      let showError = false;
      let msg = undefined;
      if(resp.token){
        this.props.onClose();
      }else{
        showError = true;
        msg = "The update response did not contain a token";
      }
      this.setError(showError, msg);
  }

  handleAccountUpdate(e){
    //request update with data
    Client.request(this.state.userMgmtResourceURL+"login", "POST", this.requestCallback, this.requestErrorHandler, this.state.data);
  }

  handleKeyDown(e){
    //Call onClose if esc was pressed
    if (e.which === 27) {
      this.props.onClose();
    }
  }

  render(){
    return (
      <Modal className="account-settings-modal" onRequestClose={this.props.onClose} modalLabel="Change Account Settings" modalHeading="Enter Updates"  secondaryButtonText="Close" primaryButtonText="Save"
        open={this.props.open} onRequestSubmit={this.handleAccountUpdate} onKeyDown={this.handleKeyDown} primaryButtonDisabled={!this.state.updateIsValid} onSecondarySubmit={this.props.onClose}>
        <p> Test </p>
      </Modal>
    );
  }

}

export default AccountSettingsModal;
