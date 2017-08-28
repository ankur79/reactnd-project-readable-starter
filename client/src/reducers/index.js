import { combineReducers } from 'redux'
import order from './order';
import categories from './categories';
import posts from './posts';


export default combineReducers({order, categories, posts})