export default function(state = [], action){
  console.log('List Reducer Action.Type')
  console.log(action.type)
  console.log('List Reducer Action.Payload')
  console.log(action.payload)
  switch (action.type) {
    case "LISTVIEW":
      console.log('LISTVIEW Action.Payload')
      console.log(action.payload)
      return action.payload
  }
  return state;
}