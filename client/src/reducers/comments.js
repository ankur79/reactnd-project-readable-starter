import {FETCH_COMMENTS_SUCCESS} from '../actions'

const initialState = {comments: []}

function comments (state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS :
      return {comments: action.comments} 
    default :
      return state
  }
}

export default comments