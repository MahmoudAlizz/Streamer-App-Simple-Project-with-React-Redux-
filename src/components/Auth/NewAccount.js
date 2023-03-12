import { Field, reduxForm } from "redux-form";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Component } from "react";
import { newAccount } from "../../actions";
import '../../css/index.css'
import { useNavigate } from "react-router-dom";

const NewAccount = (props) => {
  const renderError = ({ error, touched }) => {
    if (error && touched) {
      return <small className="text-danger">{error}</small>;
    }
  };
  const renderInput = ({ input, meta, id, label, type }) => {
    return (
      <div className="form-group">
        <div className="col">
        <label htmlFor="id">{label}</label>
        <input {...input} id={id} type={type} className="form-control" />
        {renderError(meta)}
        </div>
      </div>
    );
  };
  const navigate = useNavigate();
  const onSubmit=(v)=>{
    props.newAccount(v);
    document.getElementById('b2').click();
    navigate("/");
    }
    const { handleSubmit } = props;
    return (
      <div>
        <div className="modal fade" id="newaccount">
          <div className="modal-dialog  modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header justify-content-center">
                <p className="modal-title font-weight-bold text-uppercase">New Account</p>
                <button id='b2' data-dismiss='modal' data-target='#newaccount' className="close text-dark"><span>&times;</span></button>
              </div>
              <div className="modal-body">
                <form action=""onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                  <div className="row justify-content-center">
                  <Field
                    name="firstname"
                    label="First Name"
                    id="firstname"
                    type="text"
                    component={renderInput}
                  />
                  <Field
                    name="lastname"
                    label="Last Name"
                    id="lastname"
                    type="text"
                    component={renderInput}
                  />
                  </div>
                  <Field
                    name="email"
                    label="Email"
                    id="email"
                    type="email"
                    component={renderInput}
                  />
                  <Field
                    name="username"
                    label="User Name"
                    id="username"
                    type="text"
                    component={renderInput}
                  />
                  <Field
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    component={renderInput}
                  />
                  <p className="text-center text-danger">{props.ErrorMessage}</p>
                  <button className="btn btn-dark btn-block">Create Account</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

const validate = (formProps) => {
  const errors = {};
  if (!formProps.username) {
    errors.username = " * You must enter a username";
  }
  if (!formProps.password) {
    errors.password = " * You must enter a password";
  }
  if (!formProps.firstname) {
    errors.firstname = " * You must enter a first name";
  }
  if (!formProps.lastname) {
    errors.lastname = " * You must enter a last name";
  }
  if (!formProps.email) {
    errors.email = " * You must enter a email";
  }
  return errors;
};
const mapStateToProps = (state) => ({ ErrorMessage:state.auth.errormessage });
const mapDispatchToProps = {newAccount};
const formWrapped = reduxForm({ form: "newAccount", validate: validate })(NewAccount);
export default connect(mapStateToProps, mapDispatchToProps)(formWrapped);
