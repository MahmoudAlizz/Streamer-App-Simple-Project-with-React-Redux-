import React from 'react'
import { Fragment } from 'react'
import { createStream } from '../../actions/index'
import { connect } from 'react-redux'
import StreamForm from './StreamForm'
const StreamCreate = (props)=> {
 
  const  onSubmit =  (v) => {
    props.createStream(v);
   }

    return (
      <div className="my-3">
        <h3>Stream Create</h3>
        <StreamForm onSubmit={onSubmit}/>
      </div>
    )
  }


const mapStateToProps = (state)=>({})
const mapDispatchToProps = {createStream}
export default connect(mapStateToProps, mapDispatchToProps )(StreamCreate)