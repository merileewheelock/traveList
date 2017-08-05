export default function(state = null, action) {

	// console.log('Survey Reducer Action.Type')
	// console.log(action.type)

  switch (action.type) {
  case "SURVEY":
  	// console.log('Action.Payload.TripInfoId')
  	// console.log(action.payload.tripInfoId)
    return action.payload.tripInfoId
  }
  return state;
}