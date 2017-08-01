export default function(state = [], action){
	console.log(action.type)
	if (action.type === "SURVEY"){
		console.log(action.payload)
		return action.payload;
	}else{
		return state;
	}
}