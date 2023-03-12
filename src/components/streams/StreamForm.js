import { Field, reduxForm } from 'redux-form'
import React from 'react'
import { Fragment } from 'react'
import '../../css/index.css'
import { useNavigate } from 'react-router-dom';

const StreamForm = (props) => {
  const renderError = ({ error, touched }) => {
    if (error && touched) {
      return (
        <div className="">
          <small className='text-danger'>{error}</small>
        </div>
      )
    }
  }
  const renderInput = ({ input, id, label, meta }) => {
    const classname = `form-control ${meta.error && meta.touched ? 'bg-danger-o' : ''}`
    return (
      <div className='form-group'>
        <label htmlFor={id}>{label}</label>
        <input {...input} id={id} className={classname} />
        {renderError(meta)}
      </div>
    )
  }
  const navigate = useNavigate();
  const onSubmit = (v) => {
    props.onSubmit(v);
    navigate("/");
  }
  const { handleSubmit } = props;
  return (
    <Fragment>
      <div className="row">
        <div className="col-8">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <Field name='title' id="t" type="text" label="Title" component={renderInput} />
            <Field name='description' id="d" type="text" label="Description" component={renderInput} />
            <button className='btn btn-outline-dark'>Submit</button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.title) {
    errors.title = 'You must enter a title'
  }
  if (!formProps.description) {
    errors.description = 'You must enter a description'
  }
  if (formProps.title && formProps.title.length < 3) {
    errors.title = "The number of characters must be greater than 3"
  }
  return errors;
}

export default reduxForm({ form: 'StreamForm', validate: validate })(StreamForm)