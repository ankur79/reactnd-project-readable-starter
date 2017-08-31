import { combineReducers } from 'redux'
import order from './order';
import categories from './categories';
import posts from './posts';
import routerReducer from './location';


export default combineReducers({order, categories, posts, router: routerReducer})