import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'
import reducers from './reducers'
import './index.css';
import './bootstrap.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)


const store = createStore(
  reducers,
  applyMiddleware(middleware)
);

console.log(store.getState())

ReactDOM.render(<Provider store={store}>
					<ConnectedRouter history={history}>
						<App />
					</ConnectedRouter>
				</Provider>, document.getElementById('root'));
registerServiceWorker();

