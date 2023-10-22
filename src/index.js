require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Styles/index.scss"

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
