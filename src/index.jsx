import React from 'react';
import { render } from 'react-dom';
import './index.less';
import App from "./components/App";
import {store} from './reducers'
import {Provider} from "react-redux";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
