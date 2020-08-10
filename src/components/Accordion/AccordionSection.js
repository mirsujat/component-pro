import React from "react";

const AccordionSection = (props) => {
  const onClick = () => {
    props.onClick(props.label);
  };

  return (
    <div className="accord_section">
      <div
        className="accord_label"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        {props.label}
        <div style={{ float: "right" }}>
          {!props.isOpen && <span className="plus">&#43;</span>}
          {props.isOpen && <span className="minus">&#8722;</span>}
        </div>
      </div>
      {props.isOpen && <div className="accord_content">{props.children}</div>}
    </div>
  );
};

export default AccordionSection;
