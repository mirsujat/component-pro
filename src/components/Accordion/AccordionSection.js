import React from "react";

const AccordionSection = (props) => {
  const onClick = () => {
    props.onClick(props.label);
  };

  return (
    <div className="container">
      <div onClick={onClick} style={{ cursor: "pointer" }}>
        {props.label}
        <div style={{ float: "right" }}>
          {!props.isOpen && <span>&#10010;</span>}
          {props.isOpen && <span>&#10134;</span>}
        </div>
      </div>
      {props.isOpen && <div>{props.children}</div>}
    </div>
  );
};

export default AccordionSection;
