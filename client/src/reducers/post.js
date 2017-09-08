import {FETCH_POST_SUCCESS} from '../actions'

const initialState = {post: {}}

function post (state = initialState, action) {
  switch (action.type) {
    case FETCH_POST_SUCCESS :
      return {post: action.post} 
    default :
      return state
  }
}

export default post