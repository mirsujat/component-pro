import React from "react";

import TodoAccord from "./components/Todo/TodoAccord";

import "./App.css";

function App() {
  return (
    <div data-testid="app">
      <h1>Hello World</h1>
      <br></br>
      <h2>Default Accordion</h2>
      <TodoAccord>
        <div title="TITLE ONE">
          <p>
            SECTION ONE Place some text here. This will be the section content!!
          </p>
        </div>
        <div title="TITLE TWO">
          <p>
            SECTION TWO Place some text here. This will be the section content!!
          </p>
        </div>
        <div title="TITLE THREE">
          <p>
            SECTION THREE Place some text here. This will be the section
            content!!
          </p>
        </div>
      </TodoAccord>
      <h2>Multiple Open</h2>
      <TodoAccord allowMultipleOpen>
        <div title="TITLE ONE">
          <p>
            SECTION ONE Place some text here. This will be the section content!!
          </p>
        </div>
        <div title="TITLE TWO">
          <p>
            SECTION TWO Place some text here. This will be the section content!!
          </p>
        </div>
        <div title="TITLE THREE">
          <p>
            SECTION THREE Place some text here. This will be the section
            content!!
          </p>
        </div>
      </TodoAccord>
    </div>
  );
}

export default App;
