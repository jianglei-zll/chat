import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { AliveScope } from 'react-activation'
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AliveScope>
    <App />
  </AliveScope>
);
