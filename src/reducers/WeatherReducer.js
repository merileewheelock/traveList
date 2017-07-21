import { GET_WEATHERDATA } from '../actions/index' 

export default function(state = [], action) {
  switch (action.type) {
  case GET_WEATHERDATA:
    return [action.payload.data, ...state]
  }
  return state;
}