import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);
test("renders app correctly", () => {
  const { getByTestId } = render(<App />);
  const testId = getByTestId("app");
  expect(testId).toBeTruthy();
});
