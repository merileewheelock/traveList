export default function(state = [], action){
	if (action.type === "SURVEY"){
		return action.payload;
	}else{
		return state;
	}
}