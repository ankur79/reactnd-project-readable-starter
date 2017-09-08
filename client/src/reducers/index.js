import { combineReducers } from 'redux'
import order from './order';
import categories from './categories';
import posts from './posts';
import selectedPost from './post';
import loadreducer from './loadreducer';
import comments from './comments';
import {routerReducer} from 'react-router-redux';


export default combineReducers({order, categories, posts, selectedPost, loadreducer, comments, router: routerReducer})