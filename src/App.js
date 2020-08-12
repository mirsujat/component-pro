import React from "react";

import TodoAccord from "./components/Todo/TodoAccord";

import "./App.css";

function App() {
  return (
    <div data-testid="app">
      <h1>Hello World</h1>
      <br></br>
      <TodoAccord>
        <div>
          <div>title one</div>
          <p>Place some text here</p>
        </div>
        <div>
          <div>title two</div>
          <p>Place some text here</p>
        </div>
        <div>
          <div>title three</div>
          <p>Place some text here</p>
        </div>
      </TodoAccord>
    </div>
  );
}

export default App;
