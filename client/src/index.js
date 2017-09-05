import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Router } from 'react-router'

import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import reducers from './reducers'
import './index.css';
import './bootstrap.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
const enhancers = []
// Build the middleware for intercepting and dispatching navigation actions
const middleware = [thunk, routerMiddleware(history)]
const composedEnhancers = compose(
	applyMiddleware(...middleware),
	...enhancers
  )

const store = createStore(
  reducers,composedEnhancers
);

console.log(store.getState())

ReactDOM.render(<Provider store={store}>
					<ConnectedRouter history={history}>
						<App>
							<Router history={history}/>
						</App>
					</ConnectedRouter>
				</Provider>, document.getElementById('root'));
registerServiceWorker();

