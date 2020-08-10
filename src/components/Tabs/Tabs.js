import React, { Component } from "react";

import Tab from "./Tab";

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this;

    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
        <div>
          {children.map((child) => {
            if (child.props.label !== activeTab) return null;
            return <div className="tab-content">{child.props.children}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;