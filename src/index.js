import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import './index.css';
import App from './App';
import MapboxFunction from './components/mapboxFunction.js'
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
 <Provider store={store}>
    <App />
</Provider>,
 document.getElementById('root')
);
registerServiceWorker();
