import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import io from "socket.io-client";

// Styles
import './index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

// Internals
import configureStore from './store/configureStore';
import App from './App';

const socket = io("http://localhost:5000");

socket.on("connect", () => console.log(socket.id));
socket.on("disconnect", () =>  console.log(socket.id));

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReduxToastr
        position={'top-center'}
        timeOut={4000}
        closeOnToastrClick
        transitionIn={"bounceInDown"}
        transitionOut={"bounceOutUp"}
      />
      <App socket={socket} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);