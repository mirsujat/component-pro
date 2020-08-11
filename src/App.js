import React from "react";

import "./App.css";
import TodoAccord from "./components/Todo/TodoAccord";

function App() {
  return (
    <div data-testid="app">
      <h1>Hello World</h1>
      <TodoAccord>
        <div title="ONE">
          <div>
            Section ONE sit amet consectetur adipisicing elit. Nisi dolores
            impedit adipisci reprehenderit placeat, debitis vero eaque. Porro
            magnam nesciunt ipsa excepturi quis possimus, doloribus, a
            temporibus, aut suscipit velit!
          </div>
        </div>
        <div title="TWO">
          <div>
            Section TWO Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nisi dolores impedit adipisci reprehenderit placeat, debitis vero
            eaque. Porro magnam nesciunt ipsa excepturi quis possimus,
            doloribus, a temporibus, aut suscipit velit!
          </div>
        </div>
      </TodoAccord>
    </div>
  );
}

export default App;
