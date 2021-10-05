import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import { contactReducer } from './redux/reducers/contactRedux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; 
import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css";
import { reducer } from './redux/reducers';


const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
