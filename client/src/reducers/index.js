import { combineReducers } from 'redux'
import order from './order';
import categories from './categories';
import posts from './posts';
import selectedPost from './post';
import {routerReducer} from 'react-router-redux';


export default combineReducers({order, categories, posts, selectedPost, router: routerReducer})