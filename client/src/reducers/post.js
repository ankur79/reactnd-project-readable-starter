import {FETCH_POST} from '../actions'

const initialState = {post: {}}

function post (state = initialState, action) {
  switch (action.type) {
    case FETCH_POST :
      return {post: action.post} 
    default :
      return state
  }
}

export default post