import { combineReducers } from 'redux'
import order from './order';
import categories from './categories';
import posts from './posts';
import loadreducer from './loadreducer';
import comments from './comments';
import {routerReducer} from 'react-router-redux';


export default combineReducers({order, categories, posts, loadreducer, comments, router: routerReducer})