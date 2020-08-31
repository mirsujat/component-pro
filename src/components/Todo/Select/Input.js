import React from "react";

const Input = (props) => (
  <button
    className="placeholder"
    aria-haspopup="true"
    aria-expanded={props.open}
    onClick={props.onClick}
  >
    <div className="placeholder-text">{props.placeholderText}</div>
    <div className="chips-text">{props.children}</div>
    <div className="indicator">{props.indicator}</div>
  </button>
);

export default Input;
