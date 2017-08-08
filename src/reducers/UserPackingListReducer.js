export default function(state = [], action){
  switch (action.type) {
    case "USER_PACKING_LIST":
      return action.payload
  }
  return state;
}