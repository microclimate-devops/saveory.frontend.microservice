import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarbonFormInput from './carbon/CarbonFormInput.js';

/**
 * Manages an account settings form
 */
class AccountSettingsForm extends Component{
  static PropTypes = {
    inputsData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    validateInputs: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired
  }

  /**
   * Checks the validity of a field using the validate prop object
   * @param {string} field-the field to check, used as key for validate object
   * @propsUsed {this.props.validateInputs}
   * @return {boolean}
   */
  isFieldInvalid(field){
    const validity = this.props.validateInputs[field];
    //If validate data is present, invert because checking for invalidity
    return validity !== undefined ? !validity : false;
  }

  /**
   * Show the settings form
   * @propsUsed {this.props.inputsData, this.props.onChange, this.props.userData}
   * @calls {this.isFieldInvalid}
   * @return {JSX(CarbonFormInput)}
   */
  render(){
    const inputsData = this.props.inputsData;
    const userData =  this.props.userData;
    return (
      <div className="account-settings-form-container">
				<CarbonFormInput className="account-settings-form-item" inputData={inputsData.name} inputType="text" inputID="name" inputLabel="Name" onChange={this.props.onChange} invalidText="Required" isInvalid={this.isFieldInvalid("name")} inputPlaceholder={userData.name}/>
				<CarbonFormInput className="account-settings-form-item" inputData={inputsData.email} inputType="text" inputID="email" inputLabel="Email" onChange={this.props.onChange} invalidText="Required" isInvalid={this.isFieldInvalid("email")} inputPlaceholder={userData.email}/>
				<CarbonFormInput className="account-settings-form-item" inputData={inputsData.password} inputType="password" inputID="password" inputLabel="New Password" onChange={this.props.onChange} invalidText="Required" isInvalid={this.isFieldInvalid("password")}/>
				<CarbonFormInput className="account-settings-form-item" inputData={inputsData.verifyPassword} inputType="password" inputID="verifyPassword" inputLabel="Verify New Password" onChange={this.props.onChange} invalidText="Passwords Must Match" isInvalid={this.isFieldInvalid("verifyPassword")}/>
			</div>
    );
  }
}

export default AccountSettingsForm;
