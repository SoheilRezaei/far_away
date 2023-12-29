import React from "react";
import "./Modal.css";

export const Modal = () => {
  return (
    <div className="modal-container">
      <div className="modal-header">
        <button className="close">❌</button>
      </div>
      <div className="modal-content">
        <input
          onChangeText={(changedText) => this.props.onInputChanged(changedText)}
        >
          Where to...?
        </input>
        {/* <div className="modal-footer">
          <button className="btn btn-submit">Submit</button>
          <button className="btn btn-cancel">Cancel</button>
        </div> */}
      </div>
    </div>
  );
};
