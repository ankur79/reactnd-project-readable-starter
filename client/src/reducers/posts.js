import {FETCH_POSTS} from '../actions'

const initialOrderState = {posts: []}

function categories (state = initialOrderState, action) {
  switch (action.type) {
    case FETCH_POSTS :
      return {posts: action.posts} 
    default :
      return state
  }
}

export default categories