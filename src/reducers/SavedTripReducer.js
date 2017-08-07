export default function(state = [], action){
  switch (action.type) {
    case "SAVEDTRIP":
      return action.payload
  }
  return state;
}