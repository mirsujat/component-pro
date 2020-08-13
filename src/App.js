import React from "react";

import "./App.css";
import Tab from "./components/Todo/Tab/Tab";

function App() {
  return (
    <div data-testid="app" className="app">
      <h1>Hello World</h1>
      <br></br>
      <h3>Tabs</h3>
      <Tab>
        <div label="Tab One">
          <p>Hello From Tab One</p>
        </div>
        <div label="Tab Two">
          <p>Hi! Tab Two</p>
        </div>
        <div label="Tab three">
          <p>it's me Tab Three</p>
        </div>
      </Tab>
    </div>
  );
}

export default App;
