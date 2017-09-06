import * as ReadableAPI from '../utils/ReadableAPI';

export const CHANGE_ORDER = 'CHANGE_ORDER'
export const CHANGE_CATEGORY='CHANGE_CATEGORY'
export const FETCH_CATEGORY_SUCCESS='FETCH_CATEGORY'
export const FETCH_POSTS_SUCCESS='FETCH_POSTS_SUCCESS'

export const FETCH_POST='FETCH_POST'
export const FETCH_COMMENTS='FETCH_COMMENTS'
export const UPDATE_POST='UPDATE_POST'
export const UPDATE_COMMENT='UPDATE_COMMENT'
export const LOAD_ERROR='LOAD_ERROR'
export const LOAD_INPROGRESS='LOAD_INPROGRESS'


export function apiLoadError(bool) {
  return {
      type: 'LOAD_ERROR',
      loadErrored: bool
  };
}

export function loadInProgress(bool) {
  return {
      type: 'LOAD_INPROGRESS',
      isLoading: bool
  };
}


export function changeOrder ({sortOrder}){
  return {
    type: CHANGE_ORDER,
    sortOrder
  }
}

export function changeCategory ({category}){
  return {
    type: CHANGE_CATEGORY,
    category
  }
}

export function fetchCategorySuccess ({categories}){
  return {
    type: FETCH_CATEGORY_SUCCESS,
    categories
  }
}

export function fetchPostsSuccess ({posts}){
  return {
    type: FETCH_POSTS_SUCCESS,
    posts
  }
}

export function fetchPost ({post}){
  return {
    type: FETCH_POST,
    post
  }
}

export function fetchComments ({comments}){
  return {
    type: FETCH_COMMENTS,
    comments
  }
}

export function postsFetchData() {
  return (dispatch) => {
      dispatch(loadInProgress(true));
      ReadableAPI.getAllPost().then(posts => {
        dispatch(loadInProgress(false));
        dispatch(fetchPostsSuccess({posts}))
      });
  };
}

export function categoryFetchData() {
  return (dispatch) => {
      dispatch(loadInProgress(true));
      ReadableAPI.getAllCategories().then(categories => {
        dispatch(loadInProgress(false));
        dispatch(fetchCategorySuccess({categories}))
      });
  };
}
