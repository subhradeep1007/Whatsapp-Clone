import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {initialstate}from "./components/reducer"
import reducer from "./components/reducer"
import {StateProvider} from "./components/StateProvider"

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialstate={initialstate} reducer={reducer}>
     <App />
    </StateProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


