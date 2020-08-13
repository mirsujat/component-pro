import React from "react";

// import TodoAccord from "./components/Todo/Accord/TodoAccord";

import "./App.css";
import Tabs from "./components/Tabs/Tabs";

function App() {
  return (
    <div data-testid="app" className="app">
      <h1>Hello World</h1>
      <br></br>
      <h3>Tabs</h3>
      <Tabs>
        <div label="tab one">
          <p>Hello from tab one</p>
        </div>
        <div label="tab two">
          <p>Hello from tab two</p>
        </div>
        <div label="tab three">
          <p>Hello from tab three</p>
        </div>
      </Tabs>
    </div>
  );
}

export default App;
