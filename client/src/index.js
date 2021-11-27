import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import configureStore from './store/configureStore';
import './index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <ReduxToastr 
        position={'top-center'}
        timeOut={4000}
        closeOnToastrClick
        transitionIn={"fadeIn"}
        transitionOut={"fadeOut"}
      />
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);