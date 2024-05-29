import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import ToggleColorMode from "./components/ToggleColorMode";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToggleColorMode>
          <App />
        </ToggleColorMode>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
