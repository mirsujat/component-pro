import React from "react";

const Input = (props) => (
  <div className="placeholder">
    <div className="placeholder-text">{props.placeholderText}</div>
    <div className="chips-text">{props.children}</div>
    <div className="indicator">{props.indicator}</div>
  </div>
);

export default Input;
