import React, { Component, useRef } from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams, deleteStream } from "../../actions";
import StreamCreate from "../streams/StreamCreate";
import Spinner from "../Spinner";
const StreamList = (props) => {
  const btnFilterMyStream= useRef();
  const [filterMyStream, setFilterMyStream] = useState(false);

  useEffect(() => {
    props.fetchStreams();
  },[props.Streams]);


  const renderStream = (str) => {
    return (
      <div key={str.id} id={str.id} className="col-7  my-3 card">
        <div className="d-flex ">
          <div className="align-self-center mx-3">
            <i
              className="fa fa-duotone fa-camera-retro fa-xl "
              style={{ color: "#343a40", fontSize: "40px" }}
            ></i>
          </div>
          <div className="p-3 mr-3">
            <Link to={`/stream/show/${str.id}`} className=" font-weight-bold">
              {str.title}
            </Link>
            <p className="mb-0">{str.description}</p>
          </div>
          <div className="ml-auto align-self-center">
            {renderEditAndDeleteButton(str)}
          </div>
        </div>
      </div>
    );
  };

  const renderListStreams = () => {
  
    if (props.streamsCount == null) {
      return (
        <div className="font-weight-bold p-4">
          <Spinner />
        </div>
      );
    }
    if (props.streamsCount == 0) {
      return (
        <div className="font-weight-bold p-4">
          <h3 className="text-danger">No Streams Now</h3>
        </div>
      );
    }

    if (filterMyStream == true) {
      const isImptyMyStream = props.Streams.find((s)=>(s.userId==props.userId))
      if(!isImptyMyStream){
        return <h4 className="my-2 text-danger">You Don't Have Any Stream</h4>
      }
      return props.Streams.map((str) => {
        if (props.userId === str.userId) {
          return renderStream(str);
        }
      });
    } 
      return props.Streams.map((str) => {
          return renderStream(str);
      });
      
  };

  const renderCreateStream = () => {
    if (props.isSignIn) {
      return (
        <Link
          to="/stream/new"
          target="_self"
          className="btn btn-outline-dark mr-3"
        >
          Create Stream
        </Link>
      );
    }
  };

  const renderFilterMyStream = () => {
    if (props.isSignIn) {
      return (
        <button
        ref={btnFilterMyStream}
          className="btn btn-outline-dark"
          onClick={() => {
            setFilterMyStream(!filterMyStream);
            if(!filterMyStream){
              btnFilterMyStream.current.innerText='Show All Streams'
            }
            else{
              btnFilterMyStream.current.innerText='Show My Streams'
            }
          }}
        >
          Show My Streams
        </button>
      );
    }
  };

  const renderEditAndDeleteButton = (stream) => {
    if (props.userId != null && props.userId == stream.userId) {
      return (
        <>
          <Link className="btn btn-info mr-2 " to={`/stream/edit/${stream.id}`}>
            Edit
          </Link>
          <Link className="btn btn-info " to={`/stream/delete/${stream.id}`}>
            Delete
          </Link>
        </>
      );
    }
  };

  return (
    <div>
      <div className="row">{renderListStreams()}</div>
      <div>
        <div className="my-2">{renderCreateStream()}{renderFilterMyStream()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  if(state.Streams.stream==null){
    return { isSignIn: state.auth.isSignedIn,
      userId: state.auth.userId,
      streamsCount:state.Streams.streamsCount,};
  }
  return {
    Streams: Object.values(state.Streams.stream),
    isSignIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    streamsCount:state.Streams.streamsCount,
  };
};

const mapDispatchToProps = { fetchStreams, deleteStream };

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
