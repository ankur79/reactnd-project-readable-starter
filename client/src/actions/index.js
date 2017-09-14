import * as ReadableAPI from '../utils/ReadableAPI';

export const CHANGE_ORDER = 'CHANGE_ORDER'
export const CHANGE_CATEGORY='CHANGE_CATEGORY'
export const FETCH_CATEGORY_SUCCESS='FETCH_CATEGORY'
export const FETCH_POSTS_SUCCESS='FETCH_POSTS_SUCCESS'

export const FETCH_POST_SUCCESS='FETCH_POST_SUCCESS'
export const FETCH_COMMENTS_SUCCESS='FETCH_COMMENTS_SUCCESS'
export const POST_UPDATE='POST_UPDATE'
export const UPDATE_COMMENT='UPDATE_COMMENT'
export const LOAD_ERROR='LOAD_ERROR'
export const LOAD_INPROGRESS='LOAD_INPROGRESS'

export const COMMENT_UPDATE='COMMENT_UPDATE'
export const COMMENT_EDIT='COMMENT_EDIT'
export const COMMENT_NEW='COMMENT_NEW'


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

export function fetchPostSuccess ({post}){
  return {
    type: FETCH_POST_SUCCESS,
    post
  }
}

export function updatePost ({post, postType}){
  return {
    type: POST_UPDATE,
    postType,
    post
  }
}

export function fetchCommentsSuccess ({comments}){
  const dataSet = comments.map(comment => {comment.editable = false; return comment})
  return {
    type: FETCH_COMMENTS_SUCCESS,
    dataSet
  }
}

export function editComments (comments){
  return {
    type: COMMENT_EDIT,
    comments
  }
}

export function updateComment ({comment}){
  return {
    type: COMMENT_UPDATE,
    comment
  }
}

export function newComment (comment){
  return {
    type: COMMENT_NEW,
    comment
  }
}

export function postAdded (){
  return{
    type: "@@router/LOCATION_CHANGE",
    payload:{pathname: "/"}

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

export function getselectedPost(id) {
  return (dispatch) => {
      dispatch(loadInProgress(true));
      ReadableAPI.getPost(id).then(post => {
        dispatch(loadInProgress(false));
        dispatch(fetchPostSuccess({post}))
      });
  };
}

export function getComments(id) {
  return (dispatch) => {
      dispatch(loadInProgress(true));
      ReadableAPI.getComments(id).then(comments => {
        dispatch(loadInProgress(false));
        dispatch(fetchCommentsSuccess({comments}))
      });
  };
}



export function postVote(id, vote, postType="posts"){
  return (dispatch) => {
    dispatch(loadInProgress(true));
    ReadableAPI.voteChange(id, vote, "posts").then(post => {
      dispatch(loadInProgress(false));
      dispatch(updatePost({post, postType}))
    });
  };  
}

export function voteChange(id, vote){
  return (dispatch) => {
    dispatch(loadInProgress(true));
    ReadableAPI.voteChange(id, vote).then(comment => {
      dispatch(loadInProgress(false));
      dispatch(updateComment({comment}))
    });
  };  
}

export function commentChange(id, comment){
  return (dispatch) => {
    dispatch(loadInProgress(true));
    ReadableAPI.updateComment(id, comment).then(comment => {
      dispatch(loadInProgress(false));
      dispatch(updateComment({comment}))
    });
  };  
}

export function addComment(id, comment){
  return (dispatch) => {
    dispatch(loadInProgress(true));
    ReadableAPI.addComment(id, comment).then(comment => {
      dispatch(loadInProgress(false));
      dispatch(newComment(comment))
    });
  };  
}

export function addPost(id, post){
  return (dispatch) => {
    dispatch(loadInProgress(true));
    ReadableAPI.addPost(id, post).then(post => {
      dispatch(loadInProgress(false));
      dispatch(postAdded())
    });
  };  
}

export function editPost(id, post){
  return (dispatch) => {
    dispatch(loadInProgress(true));
    ReadableAPI.updatePost(id, post).then(post => {
      dispatch(loadInProgress(false));
      //dispatch(postAdded())
    });
  };  
}

export function deleteComment(id){
  return (dispatch) => {
    dispatch(loadInProgress(true));
    ReadableAPI.deleteComment(id).then(comment => {
      dispatch(loadInProgress(false));
      dispatch(updateComment({comment}))
    });
  };  
}

