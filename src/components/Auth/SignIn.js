import { Field, reduxForm } from "redux-form";
import React, { createRef, Fragment } from "react";
import { connect } from "react-redux";
import { signIn } from "../../actions";
import '../../css/index.css'
import { useNavigate } from 'react-router-dom';


const SignIn = (props) => {
  const renderError = ({ error, touched }) => {
    if (error && touched) {
      return <small className="text-danger">{error}</small>;
    }
  };
  const renderInput = ({ input, meta, id, label, type }) => {
    return (
      <div className="form-group">
        <label htmlFor="id">{label}</label>
        <input {...input} id={id} type={type} className="form-control" />
        {renderError(meta)}
      </div>
    );
  };
  const navigate = useNavigate();
  
 const onSubmit=(v)=>{
    props.signIn(v);
    document.getElementById('b1').click();
    navigate('/')
  }
    const { handleSubmit } = props;
    return (
      <div>
        <div className="modal fade show"  id="signin">
          <div className="modal-dialog  modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header justify-content-center">
                <p className="modal-title font-weight-bold text-uppercase">Sign In</p>
                <button id='b1' data-dismiss='modal' data-target='#signin' className="close text-dark"><span>&times;</span></button>
              </div>
              <div className="modal-body">
                <form action=""onSubmit={handleSubmit(onSubmit)}autoComplete='off'>
                  <Field
                    name="username"
                    label="User Name"
                    id="username1"
                    type="text"
                    component={renderInput}
                  />
                  <Field
                    name="password"
                    label="Password"
                    type="password"
                    id="password1"
                    component={renderInput}
                  />
                  <p className="text-center text-danger">{props.ErrorMessage}</p>
                  <button className="btn btn-dark btn-block" >Sign in</button>
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
  return errors;
};
const mapStateToProps = (state) => ({ ErrorMessage:state.auth.errormessage });
const mapDispatchToProps = {signIn};
const formWrapped = reduxForm({ form: "signIn", validate: validate })(SignIn);
export default connect(mapStateToProps, mapDispatchToProps)(formWrapped);
