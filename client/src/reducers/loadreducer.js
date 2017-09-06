import {LOAD_INPROGRESS, LOAD_ERROR} from '../actions'

const initialOrderState = {isLoading: false, loadErrored:false}

function loadreducer (state = initialOrderState, action) {
  switch (action.type) {
    case LOAD_INPROGRESS :
      return {isLoading: action.isLoading, loadErrored:state.loadErrored}
    case LOAD_ERROR :
      return {isLoading: state.isLoading, loadErrored:action.loadErrored}      
    default :
      return state
  }
}

export default loadreducer