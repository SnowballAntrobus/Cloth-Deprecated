import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'mobx-react';

import "./index.css";

import store from './stores';
import App from "./app";
import Firebase, { FirebaseContext } from "./components/Firebase";

import dotenv from "dotenv";
dotenv.config();

ReactDOM.render(
  <Provider {...store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);
