import {FETCH_POSTS_SUCCESS, FETCH_POST_SUCCESS, POST_UPDATE} from '../actions'

const initialOrderState = {posts: [], post: {}}

function posts (state = initialOrderState, action) {
  console.log(action)
  switch (action.type) {
    case FETCH_POSTS_SUCCESS :
      return {posts: action.posts, post: state.post} 
    case FETCH_POST_SUCCESS :
      return {posts: state.posts, post: action.post}       
    case POST_UPDATE :
      const p = action.postType === "post" ? action.post : updatePosts(action.post, state);
      return {[action.postType]: p}       
    default :
      return state
  }
}

function updatePosts(post, state){
  const dataSet = state.posts.map(item => {
    if(item.id === post.id){
      item = post;
    }
    return item;
  });
  return dataSet;
}

export default posts