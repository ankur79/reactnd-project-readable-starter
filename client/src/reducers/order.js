import {CHANGE_ORDER} from '../actions'

const initialOrderState = {sortOrder:"voteScore", all: [{"value":"voteScore", "name":"Vote Score"}, {"value":"timestamp", "name":"Time"}]}

function order (state = initialOrderState, action) {
  const { sortOrder } = action

  switch (action.type) {
    case CHANGE_ORDER :
      return {sortOrder, all:state.all}
    case "@@router/LOCATION_CHANGE" :
      return {sortOrder :"voteScore", all:state.all}      
    default :
      return state
  }
}

export default order