import {CHANGE_CATEGORY, FETCH_CATEGORY_SUCCESS} from '../actions'

const initialOrderState = {category: "all", categories:[]}

function categories (state = initialOrderState, action) {
  switch (action.type) {
    case CHANGE_CATEGORY :
      return {category: action.category, categories:state.categories}
    case FETCH_CATEGORY_SUCCESS :
      return {category: state.category, categories:action.categories.categories}      
    default :
      return state
  }
}

export default categories