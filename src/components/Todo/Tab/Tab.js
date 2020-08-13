import React, { Component, Fragment } from "react";

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }
  //todo
  // get activeTab information from props -- done
  // setting active in state; i,e activeTab --done
  // create a handleClick method to update activeTab status defined in state obj -done
  // conditonally show the currently active tab

  handleClick = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { children } = this.props;
    const { activeTab } = this.state;

    const tab_label = children.map((child) => {
      const { label } = child.props;
      return (
        <li
          className="tab-list-item"
          key={label}
          label={label}
          onClick={() => this.handleClick(label)}
          activetab={activeTab}
        >
          {label}
        </li>
      );
    });

    return (
      <div className="tab">
        <ol className="tab-list-item">{tab_label}</ol>
        <div className="tab_content">
          {children.map((child, i) => {
            if (child.props.label !== activeTab) return null;
            return <div key={i}>{child.props.children}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default Tab;
