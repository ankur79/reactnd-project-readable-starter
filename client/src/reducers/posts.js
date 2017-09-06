import {FETCH_POSTS_SUCCESS} from '../actions'

const initialOrderState = {posts: []}

function posts (state = initialOrderState, action) {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS :
      return {posts: action.posts} 
    default :
      return state
  }
}

export default posts