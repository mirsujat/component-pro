import React from "react";

const Input = (props) => (
  <button
    className="placeholder"
    aria-haspopup="listbox"
    aria-expanded={props.open}
    role="combobox"
    aria-controls="IDREF"
    onClick={props.onClick}
  >
    <div className="chips-text">{props.children}</div>
    <div className="indicator">{props.indicator}</div>
  </button>
);

export default Input;
