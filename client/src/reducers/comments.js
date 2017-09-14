import {FETCH_COMMENTS_SUCCESS, COMMENT_UPDATE, COMMENT_EDIT, COMMENT_NEW} from '../actions'

const initialState = {comments: []}

function comments (state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS :
      return {comments: action.dataSet}  
    case COMMENT_UPDATE :
      return {comments: updateComments(action.comment, state)}   
    case COMMENT_EDIT :
      return {comments: action.comments}   
    case COMMENT_NEW :
      return {
        ...state,
        comments: state.comments.concat(action.comment)
      }                
    default :
      return state
  }
}

function updateComments(comment, state){
  const dataSet = state.comments.map(item => {
    if(item.id === comment.id){
      item = comment;
    }
    return item;
  });
  return dataSet;
}

export default comments