import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonFormInput from './carbon/CarbonFormInput.js';

class AccountSettingsForm extends Component{
  static PropTypes = {
    inputsData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    validateInputs: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired
  }

  isFieldInvalid(field){
    const validity = this.props.validateInputs[field];
    //If validate data is present, invert because checking for invalidity
    return validity !== undefined ? !validity : false;
  }

  render(){
    return (
      <div className="account-settings-form-container">
				<CarbonFormInput className="account-settings-form-item" inputText={this.props.inputsData.name} inputType="text" inputID="name" inputLabel="Name" onChange={this.props.onChange} invalidText="Required" isInvalid={this.isFieldInvalid("name")} inputPlaceholder={this.props.userData.name}/>
				<CarbonFormInput className="account-settings-form-item" inputText={this.props.inputsData.email} inputType="text" inputID="email" inputLabel="Email" onChange={this.props.onChange} invalidText="Required" isInvalid={this.isFieldInvalid("email")} inputPlaceholder={this.props.userData.email}/>
				<CarbonFormInput className="account-settings-form-item" inputText={this.props.inputsData.password} inputType="password" inputID="password" inputLabel="New Password" onChange={this.props.onChange} invalidText="Required" isInvalid={this.isFieldInvalid("password")}/>
				<CarbonFormInput className="account-settings-form-item" inputText={this.props.inputsData.verifyPassword} inputType="password" inputID="verifyPassword" inputLabel="Verify New Password" onChange={this.props.onChange} invalidText="Passwords Must Match" isInvalid={this.isFieldInvalid("verifyPassword")}/>
			</div>
    );
  }
}

export default AccountSettingsForm;
