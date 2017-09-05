export const CHANGE_ORDER = 'CHANGE_ORDER'
export const CHANGE_CATEGORY='CHANGE_CATEGORY'
export const FETCH_CATEGORY='FETCH_CATEGORY'
export const FETCH_POSTS='FETCH_POSTS'
export const FETCH_POST='FETCH_POST'
export const FETCH_COMMENTS='FETCH_COMMENTS'
export const UPDATE_POST='UPDATE_POST'
export const UPDATE_COMMENT='UPDATE_COMMENT'

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

export function fetchCategory ({categories}){
  return {
    type: FETCH_CATEGORY,
    categories
  }
}

export function fetchPosts ({posts}){
  return {
    type: FETCH_POSTS,
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