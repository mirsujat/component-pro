import React, { Component } from "react";

import AccordionSection from "./AccordionSection";

class Accordion extends Component {
  static defaultProps = {
    allowMultipleOpen: false,
  };

  constructor(props) {
    super(props);

    const openSections = {};

    this.props.children.forEach((child) => {
      if (child.props.isOpen) {
        openSections[child.props.label] = true;
      }
    });

    this.state = { openSections };
  }

  onClick = (label) => {
    const {
      props: { allowMultipleOpen },
      state: { openSections },
    } = this;

    // this will toggle the value of isOpen as true or false
    const isOpen = !!openSections[label];

    if (allowMultipleOpen) {
      this.setState({
        openSections: {
          ...openSections,
          [label]: !isOpen,
        },
      });
    } else {
      this.setState({
        openSections: {
          [label]: !isOpen,
        },
      });
    }
  };

  render() {
    const {
      onClick,
      props: { children },
      state: { openSections },
    } = this;

    return (
      <div className="container">
        {children.map((child) => (
          <AccordionSection
            isOpen={!!openSections[child.props.label]}
            label={child.props.label}
            onClick={onClick}
            key={Math.random() * 100}
          >
            {child.props.children}
          </AccordionSection>
        ))}
      </div>
    );
  }
}

export default Accordion;
