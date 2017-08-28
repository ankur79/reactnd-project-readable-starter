import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers'
import './index.css';
import './bootstrap.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers);
ReactDOM.render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
