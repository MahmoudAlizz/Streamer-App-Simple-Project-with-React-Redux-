import React from "react";
import { createPortal } from "react-dom";

const Modal = (props) => {
  return createPortal(
    <div id="deletemodel" onClick={props.dismiss}>
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-header">
            <p className="m-auto font-weight-bold">{props.title}</p>
          </div>
          <div className="modal-body">
            <p className="text-center mb-0">{props.content}</p>
          </div>
          <div className="modal-footer d-block">{props.actions}</div>
        </div>
      </div>
    </div>,
    document.querySelector("#model")
  );
};

export default Modal;
