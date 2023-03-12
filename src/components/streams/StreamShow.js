import React, {useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStream } from "../../actions";
import Spinner from "../Spinner";
import FlvJs from "flv.js";

let id = null;
const StreamShow = (props) =>{
  const videoRef = useRef();
  const params = useParams();
  id = params.id;

  useEffect(()=>{
    props.fetchStream(id);
    buildPlayer();
  },[])

  const buildPlayer = () => {
    if (!props.stream) {
      return;
    }
    const player = FlvJs.createPlayer({
      type:'flv',
      url:`http://localhost:8000/live/${id}.flv`
    })
    player.attachMediaElement(videoRef.current);
    player.load()
  };

  if (!props.stream) {
    return <div className=""><Spinner/></div>;
  }

  const { title, description } = props.stream;
  return (
    <div className="my-5">
      <video ref={videoRef}  controls className="w-100" />
      <h1>{title}</h1>
      <h3>{description}</h3>
    </div>
  );

}

const mapStateToProps = (state) => {
  return { stream:state.Streams[id] };
};

const mapDispatchToProps = { fetchStream };

export default connect(mapStateToProps, mapDispatchToProps)(StreamShow);
