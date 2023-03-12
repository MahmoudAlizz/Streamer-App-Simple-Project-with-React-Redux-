import React, { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "../Modal";
import {deleteStream} from '../../actions'
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom";

const StreamDelete = (props)=> {
  const params = useParams();
  const navigate = useNavigate();
  const id =params.id;
  const actions = (
    <div className="d-flex bg-info">
      <button
        className=" btn btn-danger flex-fill "
        onClick={() => {
          props.deleteStream(id);
          navigate('/')
        }}
      >
        Delete
      </button>
      <Link to="/" className="btn  btn-info flex-fill ">
        Cancel
      </Link>
    </div>
  );
  
  return (
    <div className="">
      {
        <Modal
          title="Delete Stream"
          content="Are You Sure You Want To Delete This Stream ?"
          actions={actions}
          dismiss={()=>{navigate('/')}}
        />
      }
    </div>
  );
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {deleteStream}

export default connect(mapStateToProps, mapDispatchToProps)(StreamDelete)
