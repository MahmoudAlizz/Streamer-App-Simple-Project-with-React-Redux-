import React, { useState } from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStream , editStream} from '../../actions';
import StreamForm from './StreamForm'
import Spinner from '../Spinner'
import { Fragment } from 'react';
import _ from 'lodash';

let id=null;

export const StreamEdit = (props) => {
  const params =useParams();
  
  useEffect(()=>{
      props.fetchStream(params.id)
      id=params.id
  },[])

  const onSubmit = (v)=>{
    props.editStream(id,v)
  }

    if(!props.stream){
      return <Spinner/>
    }

    else{
      return (
      <div className="my-3">
          <h3>Stream Edit</h3>
          <StreamForm onSubmit={onSubmit} initialValues={_.pick(props.stream,'title','description')} />
      </div>
      )
    }
}

const mapStateToProps = (state) => {
return {stream:state.Streams[id]}
}

const mapDispatchToProps = {fetchStream,editStream}

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit)